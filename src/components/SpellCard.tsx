import { Spell } from "../spellTypes";
import { ProgressBar } from "./ProgressBar";

interface SpellCardProps {
  spell: Spell;
  colorClass?: string;
}

export function SpellCard({
  spell,
  colorClass = "bg-gradient-to-r from-purple-500 to-purple-600",
}: SpellCardProps) {
  return (
    <div className="bg-slate-800 rounded p-3 border border-slate-700">
      {/* Spell Header */}
      <div className="mb-2 flex items-center gap-2">
        <span className="text-xl">{spell.icon}</span>
        <div className="flex-1">
          <span className="font-semibold text-base">{spell.name}</span>
          <span className="text-xs text-gray-400 ml-2">Lvl {spell.level}</span>
        </div>
      </div>

      {/* Spell Stats */}
      <div className="mb-2 space-y-1 text-xs bg-slate-900 rounded p-2">
        <div className="flex justify-between">
          <span className="text-gray-300">Damage:</span>
          <span className="font-bold text-orange-400">{spell.damage}</span>
        </div>
        {spell.statusStats && (
          <div className="mt-1 pt-1 border-t border-slate-700 space-y-1">
            {spell.statusStats.poison ? (
              <div className="flex justify-between">
                <span className="text-purple-400">Poison:</span>
                <span className="font-bold">{spell.statusStats.poison}</span>
              </div>
            ) : null}
            {spell.statusStats.bleed ? (
              <div className="flex justify-between">
                <span className="text-red-400">Bleed:</span>
                <span className="font-bold">{spell.statusStats.bleed}</span>
              </div>
            ) : null}
            {spell.statusStats.fire ? (
              <div className="flex justify-between">
                <span className="text-orange-400">Fire:</span>
                <span className="font-bold">{spell.statusStats.fire}</span>
              </div>
            ) : null}
            {spell.statusStats.ice ? (
              <div className="flex justify-between">
                <span className="text-cyan-400">Ice:</span>
                <span className="font-bold">{spell.statusStats.ice}</span>
              </div>
            ) : null}
            {spell.statusStats.lightning ? (
              <div className="flex justify-between">
                <span className="text-yellow-400">Lightning:</span>
                <span className="font-bold">{spell.statusStats.lightning}</span>
              </div>
            ) : null}
          </div>
        )}
      </div>

      {/* Cast Progress */}
      <ProgressBar
        current={spell.currentAttackCost}
        max={spell.attackCost}
        label=""
        colorClass={colorClass}
        showReady={true}
        size="sm"
      />
    </div>
  );
}
