import { Enemy } from "../enemyStore";
import { EnemyCard } from "./EnemyCard";

interface EnemySectionProps {
  enemies: Enemy[];
}

export function EnemySection({ enemies }: EnemySectionProps) {
  return (
    <div className="flex-1">
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
