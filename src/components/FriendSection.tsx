import { useGameStore } from "../store/gameStore";
import { useEffect, useState } from "react";
import { CombatantCard } from "./CombatantCard";

export function FriendSection() {
  const friends = useGameStore((state) => state.friends);
  const [prevIndexes, setPrevIndexes] = useState<{ [id: string]: number }>({});
  const [moving, setMoving] = useState<{ [id: string]: boolean }>({});

  useEffect(() => {
    const newMoving: { [id: string]: boolean } = {};
    friends.forEach((friend, idx) => {
      if (prevIndexes[friend.id] !== undefined && prevIndexes[friend.id] !== idx) {
        newMoving[friend.id] = true;
        setTimeout(() => {
          setMoving((m) => ({ ...m, [friend.id]: false }));
        }, 400); // match animation duration
      }
    });
    setMoving((m) => ({ ...m, ...newMoving }));
    // Update prevIndexes for next render
    const nextIndexes: { [id: string]: number } = {};
    friends.forEach((friend, idx) => {
      nextIndexes[friend.id] = idx;
    });
    setPrevIndexes(nextIndexes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friends.map((f) => f.id).join(",")]);

  return (
    <div className="flex-1 relative">
      {friends.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 enemy-grid-anim">
          {friends.map((friend) => (
            <div
              key={friend.id}
              className={`enemy-move animate-enemy-spawn${friend.isDead && !friend.isMainCharacter ? " enemy-fade-out" : ""}${moving[friend.id] ? " enemy-move-anim" : ""}`}
              style={{
                animation: `enemy-spawn 0.4s cubic-bezier(.4,2,.6,1)${friend.isDead && !friend.isMainCharacter ? ", enemy-fadeout 1s linear forwards" : ""}${moving[friend.id] ? ", enemy-move-key 0.4s cubic-bezier(.4,0,.2,1)" : ""}`,
                pointerEvents: friend.isDead && !friend.isMainCharacter ? "none" : undefined,
              }}
            >
              <CombatantCard combatant={friend} />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-700 rounded-lg p-6 border border-slate-600 text-center">
          <p className="text-gray-300">All enemies defeated! Spawn a new one.</p>
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
