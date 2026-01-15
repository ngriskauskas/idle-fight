import { Enemy, useEnemyStore } from "../enemyStore";
import { EnemyCard } from "./EnemyCard";
import { useState, useEffect } from "react";

interface EnemySectionProps {
  enemies: Enemy[];
}

export function EnemySection({ enemies }: EnemySectionProps) {
  const [showDeath, setShowDeath] = useState<string | null>(null);
  const enemyKilled = useEnemyStore((state) => state.enemyKilled);

  useEffect(() => {
    if (enemyKilled) {
      setShowDeath(enemyKilled.name);
      setTimeout(() => {
        setShowDeath(null);
        useEnemyStore.setState({ enemyKilled: null });
      }, 1000);
    }
  }, [enemyKilled]);

  return (
    <div className="flex-1 relative">
      {showDeath && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg font-bold animate-pulse">
          {showDeath} killed!
        </div>
      )}

      {enemies.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {enemies.map((enemy) => (
            <EnemyCard key={enemy.id} enemy={enemy} />
          ))}
        </div>
      ) : (
        <div className="bg-slate-700 rounded-lg p-6 border border-slate-600 text-center">
          <p className="text-gray-300">
            All enemies defeated! Spawn a new one.
          </p>
        </div>
      )}
    </div>
  );
}
