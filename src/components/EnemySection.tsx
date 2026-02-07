import { EnemyCard } from "./EnemyCard";
import { useGameStore } from "../store/gameStore";
import { useEffect, useState } from "react";

export function EnemySection() {
  const enemies = useGameStore((state) => state.enemies);
  const [prevIndexes, setPrevIndexes] = useState<{ [id: string]: number }>({});
  const [moving, setMoving] = useState<{ [id: string]: boolean }>({});

  useEffect(() => {
    const newMoving: { [id: string]: boolean } = {};
    enemies.forEach((enemy, idx) => {
      if (
        prevIndexes[enemy.id] !== undefined &&
        prevIndexes[enemy.id] !== idx
      ) {
        newMoving[enemy.id] = true;
        setTimeout(() => {
          setMoving((m) => ({ ...m, [enemy.id]: false }));
        }, 400); // match animation duration
      }
    });
    setMoving((m) => ({ ...m, ...newMoving }));
    // Update prevIndexes for next render
    const nextIndexes: { [id: string]: number } = {};
    enemies.forEach((enemy, idx) => {
      nextIndexes[enemy.id] = idx;
    });
    setPrevIndexes(nextIndexes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enemies.map((e) => e.id).join(",")]);

  return (
    <div className="flex-1 relative">
      {enemies.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 enemy-grid-anim">
          {enemies.map((enemy) => (
            <div
              key={enemy.id}
              className={`enemy-move animate-enemy-spawn${enemy.isDead ? " enemy-fade-out" : ""}${moving[enemy.id] ? " enemy-move-anim" : ""}`}
              style={{
                animation: `enemy-spawn 0.4s cubic-bezier(.4,2,.6,1)${enemy.isDead ? ", enemy-fadeout 1s linear forwards" : ""}${moving[enemy.id] ? ", enemy-move-key 0.4s cubic-bezier(.4,0,.2,1)" : ""}`,
                pointerEvents: enemy.isDead ? "none" : undefined,
              }}
            >
              <EnemyCard enemy={enemy} />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-700 rounded-lg p-6 border border-slate-600 text-center">
          <p className="text-gray-300">
            All enemies defeated! Spawn a new one.
          </p>
        </div>
      )}
      <style>{`
        @keyframes enemy-spawn {
          0% { opacity: 0; transform: scale(0.7) translateY(20px); }
          80% { opacity: 1; transform: scale(1.05) translateY(-4px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-enemy-spawn {
          animation: enemy-spawn 0.4s cubic-bezier(.4,2,.6,1);
        }
        .enemy-grid-anim {
          position: relative;
        }
        .enemy-move {
          transition: transform 0.35s cubic-bezier(.4,2,.6,1), opacity 0.25s;
        }
        @keyframes enemy-move-key {
          0% { transform: translateX(-5px); }
          40% { transform: translateX(2px); }
          100% { transform: translateX(0); }
        }
        .enemy-move-anim {
          animation: enemy-move-key 1s cubic-bezier(.4,0,.2,1);
        }
        @keyframes enemy-fadeout {
          0% { opacity: 1; }
          70% { opacity: 1; }
          100% { opacity: 0; }
        }
        .enemy-fade-out {
          animation: enemy-fadeout 1s linear forwards;
        }
      `}</style>
    </div>
  );
}
