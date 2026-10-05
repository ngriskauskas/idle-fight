import { applyAuraEffect } from "../hooks/useCheckAuraEffects";
import { applyStatusEffects } from "../hooks/useCheckStatuses";
import { useGameStore } from "../store/gameStore";
import { AuraSpell, Combatant, MagicSpell, PhysicalSpell } from "../types";
import { Trigger, TriggerAction, TriggerType } from "../types/triggers";
import { getCombatant } from "../utils/getCombatant";
import { launchMagicAttack, launchPhysicalAttack } from "./attackActions";
import { getScaleMulti } from "./progressionActions";

// What a player's procs and aura ticks scale with: attack for fighters, mana cost for casters.
function getPower(combatant: Combatant): number {
  return Math.max(combatant.attack.total, combatant.manaCost.total, 0);
}

// Per point of a trigger's status value, the share of the owner's power added as stacks.
// Ticks land every second on every enemy, so the share is a third of a spell's.
const TRIGGER_STATUS_SHARE = 0.01;

// A self-inflicted status takes this share of your own status stat, so the price of
// Immolation grows with the fire you deal.
const SELF_STATUS_SHARE = 1 / 3;

const SHATTER_POWER_SHARE = 0.05;
const SPEED_BOOST_COOLDOWN_TICKS = 10;

// Stacks a status trigger applies. A player's grow with their power and status gear, so
// auras and procs follow the build. An enemy's grow with its wave, like its stats.
function triggerStacks(
  combatant: Combatant,
  status: string,
  value: number,
  ownShare: number = 1,
): number {
  if (status === "ice") return value;
  const own = combatant.statusStats[status as keyof Combatant["statusStats"]]?.total ?? 0;
  const scaled = combatant.isEnemy
    ? value * getScaleMulti()
    : value * (1 + getPower(combatant) * TRIGGER_STATUS_SHARE);
  return Math.ceil(scaled + own * ownShare);
}

// Multiplying stacks on every crit grows without limit on anything that survives a few
// hits. The result is capped at twice the owner's attack plus status stat (per second of
// damage), so the payoff still follows gear.
const MULTIPLY_CAP_PER_POWER = 2;

function multipliedStacks(owner: Combatant, status: string, stacks: number, multi: number): number {
  const own = owner.statusStats[status as keyof Combatant["statusStats"]]?.total ?? 0;
  const cap = MULTIPLY_CAP_PER_POWER * (Math.max(1, owner.attack.total) + own);
  return Math.max(stacks, Math.min(Math.floor(stacks * multi), Math.ceil(cap)));
}

function getOpponents(combatant: Combatant): Combatant[] {
  const state = useGameStore.getState();
  return (combatant.isEnemy ? state.friends : state.enemies).filter((c) => !c.isDead);
}

export function getTriggerMap(
  combatant: Combatant,
  trigger: Trigger,
): Record<TriggerAction, () => void> {
  return {
    speedBoost: () => {
      useGameStore.setState((state) => {
        const targetCombatant = getCombatant(combatant.id, state);
        if (!targetCombatant) return;
        if ((targetCombatant.speedBoostCooldown ?? 0) > 0) return;

        targetCombatant.speedBoostCooldown = SPEED_BOOST_COOLDOWN_TICKS;

        targetCombatant.spells.forEach((spell) => {
          // stop one tick short of ready, so a boosted spell casts on the next tick
          // instead of chaining hit -> boost -> cast forever inside one pass
          spell.attackCost.current = Math.max(
            spell.attackCost.current,
            Math.min(spell.attackCost.total - 1, spell.attackCost.current + trigger.value!),
          );
        });
      });
    },
    castSpell: () => {
      if (trigger.spell!.spellType === "magic") {
        launchMagicAttack(trigger.spell as MagicSpell, combatant.id);
      } else if (trigger.spell!.spellType === "physical") {
        launchPhysicalAttack(trigger.spell as PhysicalSpell, combatant.id);
      }
    },
    castAura: () => {
      applyAuraEffect(trigger.spell as AuraSpell, combatant.id, combatant.isEnemy);
    },
    castAuraAll: () => {
      const state = useGameStore.getState();
      const targets = [...state.friends, ...state.enemies];
      targets.forEach((target) => {
        applyAuraEffect(trigger.spell as AuraSpell, target.id, combatant.isEnemy);
      });
    },
    poisonAll: () => {
      const state = useGameStore.getState();

      const targets = [...state.friends, ...state.enemies];
      targets.forEach((target) => {
        applyStatusEffects(
          {
            poison: triggerStacks(combatant, "poison", trigger.value!),
          },
          target.id,
        );
      });
    },
    poisonAoe: () => {
      const state = useGameStore.getState();
      const targets = combatant.isEnemy ? state.friends : state.enemies;
      targets.forEach((target) => {
        applyStatusEffects(
          {
            poison: triggerStacks(combatant, "poison", trigger.value!),
          },
          target.id,
        );
      });
    },
    poisonSpread: () => {
      const poisonEffect = combatant.statusEffects.find((se) => se.type === "poison");
      if (!poisonEffect || poisonEffect.stacks <= 0) return;

      const state = useGameStore.getState();
      const otherTargets = !combatant.isEnemy
        ? state.friends.filter((f) => f.id !== combatant.id && !f.isDead)
        : state.enemies.filter((e) => e.id !== combatant.id && !e.isDead);
      if (otherTargets.length === 0) return;
      const target = otherTargets[0];
      applyStatusEffects(
        {
          poison: poisonEffect.stacks,
        },
        target.id,
      );
    },
    multiplyPoison: () => {
      useGameStore.setState((state) => {
        const target = combatant.isEnemy ? state.friends[0] : state.enemies[0];
        if (!target) return;

        const poisonEffect = target.statusEffects.find((se) => se.type === "poison");
        if (!poisonEffect || poisonEffect.stacks <= 0) return;

        poisonEffect.stacks = multipliedStacks(
          combatant,
          "poison",
          poisonEffect.stacks,
          trigger.value!,
        );
      });
    },
    healForBleedStacks: () => {
      useGameStore.setState((state) => {
        const combatantState = getCombatant(combatant.id, state);
        if (!combatantState) return;

        const targets = combatant.isEnemy ? state.friends : state.enemies;
        const totalBleedStacks = targets
          .flatMap((t) => t.statusEffects)
          .filter((se) => se.type === "bleed")
          .reduce((sum, se) => sum + (se.stacks || 0), 0);

        if (totalBleedStacks <= 0) return;
        combatantState.health.current = Math.min(
          combatantState.health.total,
          combatantState.health.current + totalBleedStacks * trigger.value!,
        );
      });
    },
    minusDefensePerBleedStack: () => {
      useGameStore.setState((state) => {
        const combatantState = getCombatant(combatant.id, state);
        if (!combatantState) return;
        const bleedStacks =
          combatantState.statusEffects.find((se) => se.type === "bleed")?.stacks || 0;
        combatantState.defense.current = Math.max(
          0,
          combatantState.defense.total - Math.max(0, bleedStacks) * trigger.value!,
        );
      });
    },
    applyStatus: () => {
      const target = getOpponents(combatant)[0];
      if (!target) return;
      applyStatusEffects(
        { [trigger.status!]: triggerStacks(combatant, trigger.status!, trigger.value!) },
        target.id,
      );
    },
    applyStatusSelf: () => {
      const stacks = triggerStacks(combatant, trigger.status!, trigger.value!, SELF_STATUS_SHARE);
      applyStatusEffects({ [trigger.status!]: stacks }, combatant.id);
    },
    applyStatusAoe: () => {
      const stacks = triggerStacks(combatant, trigger.status!, trigger.value!);
      getOpponents(combatant).forEach((target) => {
        applyStatusEffects({ [trigger.status!]: stacks }, target.id);
      });
    },
    multiplyStatus: () => {
      const target = getOpponents(combatant)[0];
      if (!target) return;
      useGameStore.setState((state) => {
        const status = getCombatant(target.id, state)?.statusEffects.find(
          (se) => se.type === trigger.status,
        );
        if (!status || status.stacks <= 0) return;
        status.stacks = multipliedStacks(combatant, trigger.status!, status.stacks, trigger.value!);
      });
    },
    // runs on the dying combatant: its stacks jump to everyone left on its side
    spreadStatus: () => {
      const stacks = combatant.statusEffects.find((se) => se.type === trigger.status)?.stacks ?? 0;
      if (stacks <= 0) return;
      const state = useGameStore.getState();
      (combatant.isEnemy ? state.enemies : state.friends)
        .filter((c) => c.id !== combatant.id && !c.isDead)
        .forEach((target) => {
          applyStatusEffects({ [trigger.status!]: stacks }, target.id);
        });
    },
    // consume the target's stacks, dealing value damage per stack
    shatterStatus: () => {
      const target = getOpponents(combatant)[0];
      if (!target) return;
      useGameStore.setState((state) => {
        const targetState = getCombatant(target.id, state)!;
        const status = targetState.statusEffects.find((se) => se.type === trigger.status);
        if (!status || status.stacks <= 0) return;
        // each stack is worth more the harder the owner hits, so a slow (which never
        // grows) still pays off late
        const damage = Math.floor(
          status.stacks * trigger.value! * (1 + getPower(combatant) * SHATTER_POWER_SHARE),
        );
        const shieldDamage = Math.min(targetState.shield.current, damage);
        targetState.shield.current -= shieldDamage;
        targetState.health.current -= damage - shieldDamage;
        status.stacks = 0;
      });
    },
    healPerOwnStatus: () => {
      useGameStore.setState((state) => {
        const combatantState = getCombatant(combatant.id, state);
        if (!combatantState) return;
        const stacks =
          combatantState.statusEffects.find((se) => se.type === trigger.status)?.stacks ?? 0;
        if (stacks <= 0) return;
        combatantState.health.current = Math.min(
          combatantState.maxHealth.total,
          combatantState.health.current + stacks * trigger.value!,
        );
      });
    },
    gainShield: () => {
      useGameStore.setState((state) => {
        const combatantState = getCombatant(combatant.id, state);
        if (!combatantState) return;
        combatantState.shield.current = Math.min(
          combatantState.maxShield.total,
          // value is a percent of max shield, so it keeps its worth as shields grow
          combatantState.shield.current +
            Math.ceil((combatantState.maxShield.total * trigger.value!) / 100),
        );
      });
    },
    gainMana: () => {
      useGameStore.setState((state) => {
        const combatantState = getCombatant(combatant.id, state);
        if (!combatantState) return;
        combatantState.mana.current = Math.max(
          0,
          Math.min(
            combatantState.maxMana.total,
            // value is a percent of max mana
            combatantState.mana.current +
              Math.round((combatantState.maxMana.total * trigger.value!) / 100),
          ),
        );
      });
    },
  };
}

export function callTriggerAction(trigger: Trigger, combatant: Combatant): void {
  if (combatant.isDead) return;
  const triggerMap = getTriggerMap(combatant, trigger);
  if (Math.random() * 100 >= (trigger.chance ?? 100)) return;
  const action = triggerMap[trigger.action];
  action();
}

export function callTriggers(type: TriggerType, combatantId: string) {
  const combatant = getCombatant(combatantId, useGameStore.getState());
  if (!combatant || combatant.isDead) return;

  const triggers = combatant.triggers[type];
  triggers.forEach((trigger) => {
    callTriggerAction(trigger, combatant);
  });
}

export function addTrigger(trigger: Trigger, combatant: Combatant) {
  useGameStore.setState((state) => {
    const targetCombatant = getCombatant(combatant.id, state);
    if (!targetCombatant) return;

    if (targetCombatant.triggers[trigger.type].some((t) => t.id === trigger.id)) return;
    targetCombatant.triggers[trigger.type].push(trigger);
  });
}

export function removeTrigger(trigger: Trigger, combatant: Combatant) {
  useGameStore.setState((state) => {
    const targetCombatant = getCombatant(combatant.id, state);
    if (!targetCombatant) return;

    targetCombatant.triggers[trigger.type] = targetCombatant.triggers[trigger.type].filter(
      (t) => t.id !== trigger.id,
    );
  });
}
