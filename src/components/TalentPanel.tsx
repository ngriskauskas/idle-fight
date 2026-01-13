import { useTalentStore } from "../talentStore";

export function TalentPanel() {
  const { talents, availablePoints, levelUpTalent } = useTalentStore();

  const getTalentColor = (category: string): string => {
    switch (category) {
      case "attack":
        return "border-red-500 bg-red-950";
      case "defense":
        return "border-blue-500 bg-blue-950";
      case "speed":
        return "border-yellow-500 bg-yellow-950";
      case "status":
        return "border-purple-500 bg-purple-950";
      default:
        return "border-slate-500 bg-slate-900";
    }
  };

  const getCategoryLabel = (category: string): string => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="bg-slate-700 rounded-lg p-4 border border-slate-600 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Talents</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold">Points:</span>
          <span className="text-lg font-bold text-amber-400">
            {availablePoints}
          </span>
        </div>
      </div>

      {/* Talents List */}
      <div className="space-y-2 overflow-y-auto flex-1">
        {talents.map((talent) => (
          <div
            key={talent.id}
            className={`p-3 rounded border-2 ${getTalentColor(
              talent.category
            )}`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <div className="font-bold text-sm">{talent.name}</div>
                <div className="text-xs text-gray-300 mt-1">
                  {talent.description}
                </div>
              </div>
              <div className="text-right ml-2">
                <div className="text-xs font-bold text-gray-400">
                  {getCategoryLabel(talent.category)}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm">
                <span className="font-bold text-amber-400">{talent.level}</span>
                <span className="text-gray-400">/{talent.maxLevel}</span>
              </div>

              <button
                onClick={() => levelUpTalent(talent.id)}
                disabled={
                  talent.level >= talent.maxLevel || availablePoints === 0
                }
                className={`px-3 py-1 rounded text-sm font-bold transition ${
                  talent.level >= talent.maxLevel
                    ? "bg-slate-600 text-gray-500 cursor-not-allowed"
                    : availablePoints === 0
                    ? "bg-slate-600 text-gray-500 cursor-not-allowed"
                    : "bg-amber-600 hover:bg-amber-500 text-white cursor-pointer"
                }`}
              >
                {talent.level >= talent.maxLevel
                  ? "Max"
                  : availablePoints === 0
                  ? "No Points"
                  : "Level Up"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
