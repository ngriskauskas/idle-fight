import { EnemyCard } from "./EnemyCard";
import { useState, useEffect } from "react";
import { useGameStore } from "../store/gameStore";

export function EnemySection() {
  const enemies = useGameStore((state) => state.enemies);
  const [showDeath, setShowDeath] = useState<string | null>(null);

  useEffect(() => {}, []);

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
