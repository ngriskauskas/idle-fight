import { useEffect } from "react";
import { useGameStore } from "../store/gameStore";

export function useRecalcCharacterSpellSpeeds() {
  const speed = useGameStore((state) => state.character.speed.current);
  const spells = useGameStore((state) => state.character.spells);

  useEffect(() => {
    useGameStore.setState((state) => {
      state.character.spells.forEach((spell) => {
        spell.attackCost.total = Math.max(
          1,
          spell.attackCost.base - state.character.speed.current,
        );
      });
    });
  }, [speed, spells]);
}

export function useRecalcCharacterSpellCosts() {
  const manaCost = useGameStore((state) => state.character.manaCost.total);
  useEffect(() => {
    useGameStore.setState((state) => {
      state.character.spells
        .filter((spell) => spell.spellType === "magic")
        .forEach((spell) => {
          spell.manaCost.total =
            spell.manaCost.base + state.character.manaCost.total;
        });
    });
  }, [manaCost]);
}

export function useRecalcEnemySpellSpeeds() {
  const enemySpeeds = useGameStore((state) =>
    state.enemies.map((e) => e.speed.current),
  );
  useEffect(() => {
    useGameStore.setState((state) => {
      state.enemies.forEach((enemy) => {
        enemy.spells.forEach((spell) => {
          spell.attackCost.total = Math.max(
            1,
            spell.attackCost.base - enemy.speed.current,
          );
        });
      });
    });
  }, [JSON.stringify(enemySpeeds)]);
}

export function useRecalcEnemySpellCosts() {
  const enemyManaCosts = useGameStore((state) =>
    state.enemies.map((e) => e.manaCost.total),
  );
  useEffect(() => {
    useGameStore.setState((state) => {
      state.enemies.forEach((enemy) => {
        enemy.spells.forEach((spell) => {
          spell.manaCost.total = spell.manaCost.base + enemy.manaCost.total;
        });
      });
    });
  }, [JSON.stringify(enemyManaCosts)]);
}
