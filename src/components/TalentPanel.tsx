import { useMemo } from "react";
import { useGameStore } from "../store/gameStore";
import { unlockTalent } from "../logic/talentActions";
import { EffectsDisplay } from "./EffectsDisplay";
import { TriggersDisplay } from "./TriggersDisplay";
import { Tooltip } from "./Tooltip";
import type { Talent } from "../types/talent";

// why a talent can't be taken yet, if anything stops it
function talentBlocker(
  talent: Talent,
  tierPointsNeeded: number,
  characterLevel: number,
  availablePoints: number,
): string | null {
  if (talent.level >= talent.maxLevel) return null;
  if (tierPointsNeeded > 0)
    return `Tier ${talent.tier} opens after ${tierPointsNeeded} more talent ${tierPointsNeeded === 1 ? "point is" : "points are"} spent in lower tiers.`;
  if (characterLevel < (talent.requiredLevel ?? 0))
    return `Requires character level ${talent.requiredLevel}.`;
  if (availablePoints < talent.cost)
    return `Costs ${talent.cost} talent ${talent.cost === 1 ? "point" : "points"}, you have ${availablePoints}.`;
  return null;
}

function TalentTooltip({ talent, blocker }: { talent: Talent; blocker: string | null }) {
  return (
    <div className="bg-slate-900 border-2 border-slate-600 rounded p-3 w-64 max-w-full shadow-lg">
      <div className="font-bold text-sm text-white">{talent.name}</div>
      {talent.description && (
        <div className="mt-1 text-xs text-gray-300">{talent.description}</div>
      )}
      {talent.triggers && talent.triggers.length > 0 && (
        <div className="mt-2 pt-2 border-t border-slate-700">
          <TriggersDisplay triggers={talent.triggers} size="sm" />
        </div>
      )}
      {talent.effects && talent.effects.length > 0 && (
        <div className="mt-2 pt-2 border-t border-slate-600">
          <EffectsDisplay effects={talent.effects} size="sm" />
        </div>
      )}
      {blocker && (
        <div className="mt-2 pt-2 border-t border-slate-600 text-xs text-red-400">{blocker}</div>
      )}
    </div>
  );
}

export function TalentPanel() {
  const talents = useGameStore((state) => state.talents);
  const availablePoints = useGameStore((state) => state.talentPoints);
  const characterLevel = useGameStore(
    (state) => state.friends.find((f) => f.id === "main")?.level ?? 1,
  );

  const getTalentColor = (category: string): string => {
    switch (category) {
      case "attack":
        return "border-red-500 bg-red-950 hover:bg-red-900";
      case "defense":
        return "border-blue-500 bg-blue-950 hover:bg-blue-900";
      case "speed":
        return "border-yellow-500 bg-yellow-950 hover:bg-yellow-900";
      case "status":
        return "border-purple-500 bg-purple-950 hover:bg-purple-900";
      default:
        return "border-slate-500 bg-slate-900 hover:bg-slate-800";
    }
  };

  const getTierTalents = useMemo(
    () => (tier: number) => talents.filter((t) => t.tier === tier),
    [talents],
  );

  const getMaxTier = useMemo(
    () => Math.max(...talents.map((t) => t.tier || 1), 1),
    [talents],
  );

  const totalPoints = useMemo(
    () => talents.reduce((sum, t) => sum + t.level * t.cost, 0),
    [talents],
  );

  const getPointsToUnlock = useMemo(
    () => (tier: number) => {
      const pointsNeeded = 5 * (tier - 1);
      return Math.max(0, pointsNeeded - totalPoints);
    },
    [totalPoints],
  );

  return (
    <div className="bg-slate-700 rounded-lg p-3 lg:p-4 border border-slate-600 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Talents</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold">Points:</span>
          <span className="text-lg font-bold text-amber-400">
            {availablePoints}
          </span>
        </div>
      </div>

      {/* Talents Grid by Tier */}
      <div className="overflow-y-auto flex-1 pr-2 space-y-4">
        {Array.from({ length: getMaxTier }, (_, i) => i + 1).map((tier) => {
          const tierTalents = getTierTalents(tier);

          return (
            <div key={tier}>
              {/* Tier Header */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-amber-400">
                  Tier {tier}
                </h3>
                {getPointsToUnlock(tier) > 0 && (
                  <span className="text-xs text-yellow-400">
                    {getPointsToUnlock(tier)} {getPointsToUnlock(tier) === 1 ? "point" : "points"} to unlock
                  </span>
                )}
              </div>

              {/* Tier Talents Grid */}
              <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-4 gap-2">
                {tierTalents.map((talent) => {
                  const isTierLocked =
                    getPointsToUnlock(tier) > 0 || characterLevel < (talent.requiredLevel ?? 0);
                  const cannotUnlock =
                    isTierLocked || (!talent.unlocked && availablePoints < talent.cost);
                  return (
                    <Tooltip
                      key={talent.id}
                      content={
                        <TalentTooltip
                          talent={talent}
                          blocker={talentBlocker(
                            talent,
                            getPointsToUnlock(tier),
                            characterLevel,
                            availablePoints,
                          )}
                        />
                      }
                    >
                      {/* Talent Square */}
                      <button
                        onClick={() => {
                          if (!isTierLocked) {
                            unlockTalent(talent.id);
                          }
                        }}
                        // aria-disabled rather than disabled, so a tap still opens the tooltip
                        aria-disabled={cannotUnlock}
                        className={`w-16 h-18 rounded border-2 flex flex-col items-center justify-between transition p-1 ${getTalentColor(talent.category || "attack")} ${
                          isTierLocked
                            ? "opacity-20"
                            : talent.unlocked
                              ? "opacity-100"
                              : "opacity-50"
                        } ${cannotUnlock ? "cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        {/* Icon */}
                        <div className="text-2xl">{talent.icon}</div>

                        {/* Level Badge */}
                        <div className="text-xs font-bold text-center">
                          <span className="text-amber-400">{talent.level}</span>
                          <span className="text-gray-400">
                            /{talent.maxLevel}
                          </span>
                        </div>
                        <div className="text-[10px] text-gray-300 leading-none pt-1">
                          Cost: {talent.cost}
                        </div>
                      </button>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
