import { useEffect, useState } from "react";
import { useGameStore } from "../store/gameStore";
import type { Combatant, DamageLog, Enemy, KillLog } from "../types";
import { formatNumber } from "../utils/format";
import { ICON_MAP } from "../data/iconMap";

interface CombatLogAnimationProps {
  combatant: Combatant;
}

interface AnimationEvent {
  id: string;
  type: "damage" | "kill";
  value: number;
  spellIcon?: string;
  isCrit?: boolean;
  spellName?: string;
  combatantIcon?: string;
  combatantName?: string;
}

export function CombatLogAnimation({ combatant }: CombatLogAnimationProps) {
  const animationQueue = useGameStore((state) => state.animationQueue);
  const [events, setEvents] = useState<AnimationEvent[]>([]);

  useEffect(() => {
    if (!animationQueue.length) return;
    const processedIds: string[] = [];
    const newEvents: AnimationEvent[] = [];
    for (let i = 0; i < animationQueue.length; i++) {
      const anim = animationQueue[i];
      const log = anim.log as any;
      let matches = false;
      if (combatant.isMainCharacter) {
        if (log.target && log.target.id === combatant.id) matches = true;
      } else {
        if (log.target.id === combatant.id) {
          matches = true;
        }
      }
      if (matches) {
        if (anim.type === "damage") {
          const damageLog = log as DamageLog;
          newEvents.push({
            id: damageLog.id,
            type: "damage",
            value: damageLog.damage,
            spellIcon: damageLog.spell?.icon,
            isCrit: !!damageLog.attack?.isCrit,
            spellName: damageLog.spell?.name,
          });
        } else if (anim.type === "kill") {
          const killLog = log as KillLog;
          newEvents.push({
            id: killLog.id,
            type: "kill",
            value: 0,
            combatantIcon: killLog.target.icon,
            combatantName: killLog.target.name,
          });
        }
        processedIds.push(anim.log.id);
      }
    }
    if (newEvents.length > 0) {
      setEvents((evts) => {
        const all = [...evts, ...newEvents];
        const seen = new Set<string>();
        return all.filter((e) => {
          if (seen.has(e.id)) return false;
          seen.add(e.id);
          return true;
        });
      });
    }
    if (processedIds.length > 0) {
      useGameStore.setState((state) => {
        state.animationQueue = state.animationQueue.filter(
          (anim) => !processedIds.includes(anim.log.id),
        );
      });
    }
  }, [animationQueue, combatant]);

  useEffect(() => {
    if (!events.length) return;
    const timeout = setTimeout(() => {
      setEvents([]);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [events]);

  if (!events.length) return null;

  return (
    <div className="absolute left-1/2 top-0 z-50 pointer-events-none select-none">
      {events.map((evt, idx) => {
        if (evt.type === "damage") {
          const SpellIcon = evt.spellIcon ? ICON_MAP[evt.spellIcon] : null;
          return (
            <span
              key={evt.id + "-" + idx}
              className="animate-float-damage text-red-400 font-extrabold text-lg drop-shadow flex items-center gap-1"
              style={{
                transform: "translate(-50%, 0)",
                animation: "float-damage 1s cubic-bezier(.4,2,.6,1)",
              }}
            >
              {SpellIcon && <SpellIcon size={22} color="#f87171" />}-
              {formatNumber(evt.value)}
              {evt.isCrit && (
                <span className="text-yellow-300 font-black ml-1">CRIT</span>
              )}
            </span>
          );
        } else {
          const CombatantIcon = evt.combatantIcon
            ? ICON_MAP[evt.combatantIcon]
            : null;
          return (
            <span
              key={evt.id + "-" + idx}
              className="animate-float-kill text-yellow-400 font-extrabold text-lg drop-shadow flex items-center gap-2"
              style={{
                transform: "translate(-50%, 0)",
                animation: "float-kill 2s cubic-bezier(.4,2,.6,1)",
              }}
            >
              {CombatantIcon && <CombatantIcon size={26} color="#fbbf24" />}
              <span>{evt.combatantName}</span>
              <span className="text-yellow-200 font-bold">killed</span>
            </span>
          );
        }
      })}
      <style>{`
        @keyframes float-damage {
          0% { opacity: 1; transform: translate(-50%, 0) scale(1); }
          60% { opacity: 1; transform: translate(-50%, -30px) scale(1.2); }
          100% { opacity: 0; transform: translate(-50%, -60px) scale(0.8); }
        }
        @keyframes float-kill {
          0% { opacity: 1; transform: translate(-50%, 0) scale(1); }
          40% { opacity: 1; transform: translate(-50%, -30px) scale(1.2); }
          70% { opacity: 1; transform: translate(-50%, -60px) scale(1.3); }
          100% { opacity: 0; transform: translate(-50%, -120px) scale(0.7); }
        }
      `}</style>
    </div>
  );
}
