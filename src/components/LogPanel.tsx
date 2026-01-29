import { useGameStore } from "../store/gameStore";
import { ICON_MAP } from "../data/iconMap";
import type { Log, LogType, DamageLog, KillLog, ItemDropLog } from "../types";
import { formatNumber } from "../utils/format";

const LOG_TYPES: LogType[] = ["damage", "kill", "itemDrop"];

const RARITY_COLORS: Record<string, string> = {
  common: "text-gray-400",
  uncommon: "text-green-400",
  rare: "text-blue-400",
  epic: "text-purple-400",
  legendary: "text-yellow-400",
};

function DamageLogEntry({ log }: { log: DamageLog }) {
  const sourceName = log.source.name;
  const SourceIcon = ICON_MAP[log.source.icon];
  const SpellIcon = ICON_MAP[log.spell.icon];
  const timestamp = new Date(log.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const targetName = log.target.name;
  const TargetIcon = ICON_MAP[log.target.icon];

  return (
    <div className="bg-gray-700 rounded p-1 text-sm border border-gray-600">
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <SourceIcon size={16} color="#06b6d4" />
            <span className="text-cyan-400 font-semibold">{sourceName}</span>
            <span className="text-gray-400">used</span>
            <SpellIcon size={16} color="#60a5fa" />
            <span className="text-blue-400 font-semibold">
              {log.spell.name}
            </span>
          </div>
          <div className="text-gray-500 text-xs">{timestamp}</div>
        </div>
        {log.attack.isCrit && (
          <span className="text-red-400 font-bold text-sm">Crit</span>
        )}
      </div>

      <div className="bg-gray-800 rounded p-2 mb-2 text-xs space-y-1 border border-gray-600">
        <div className="flex justify-between">
          <span className="text-gray-400">Spell Damage:</span>
          <span className="text-blue-400 font-semibold">
            {formatNumber(log.attack.damage)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Defense:</span>
          <span className="text-purple-400 font-semibold">
            {formatNumber(log.target.defense.total)}
          </span>
        </div>
        <div className="border-t border-gray-600 pt-1 mt-1 flex justify-between font-semibold">
          <span className="text-yellow-400">Final Damage:</span>
          <span className="text-yellow-400">{formatNumber(log.damage)}</span>
        </div>
      </div>

      {log.attack.statusStats &&
        Object.keys(log.attack.statusStats).length > 0 && (
          <div className="text-xs text-purple-300 bg-gray-800 rounded p-2 border border-gray-600 mb-2">
            <div className="font-semibold mb-1">Status Effects:</div>
            {Object.entries(log.attack.statusStats).map(([status, stacks]) => (
              <div key={status} className="text-purple-300">
                {status.charAt(0).toUpperCase() + status.slice(1)}: +{stacks}
              </div>
            ))}
          </div>
        )}

      <div className="flex items-center gap-2">
        <span className="text-gray-400">to</span>
        <TargetIcon size={16} color="#f87171" />
        <span className="text-red-400 font-semibold">{targetName}</span>
      </div>
    </div>
  );
}

function KillLogEntry({ log }: { log: KillLog }) {
  const TargetIcon = ICON_MAP[log.target.icon];
  const timestamp = new Date(log.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="bg-gray-700 rounded p-1 mt-3 text-sm border-2 border-red-500">
      <div className="flex justify-between items-start gap-3 mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <TargetIcon size={16} color="#f87171" />
            <span className="text-red-400 font-semibold">
              {log.target.name}
            </span>
            <span className="text-gray-400">defeated</span>
          </div>
          <div className="text-gray-500 text-xs">{timestamp}</div>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-gray-400 text-xs">XP Reward:</span>
        <span className="text-blue-400 font-bold">{log.xpGained} XP</span>
      </div>
    </div>
  );
}

function ItemDropLogEntry({ log }: { log: ItemDropLog }) {
  const rarityColor = RARITY_COLORS[log.item.rarity] || "text-gray-400";
  const timestamp = new Date(log.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const ItemIcon = ICON_MAP[log.item.icon] || ICON_MAP["sword"];
  return (
    <div className="bg-gray-700 rounded p-1 mt-3 text-sm border-2 border-blue-500">
      <div className="flex justify-between items-start gap-2 mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Dropped </span>
            <ItemIcon size={16} color="#60a5fa" />
            <span className={`${rarityColor} font-semibold`}>
              {log.item.name}
            </span>
          </div>
          <div className="text-gray-500 text-xs mt-1">{timestamp}</div>
        </div>
        <div className={`text-xs font-semibold ${rarityColor} capitalize`}>
          {log.item.rarity}
        </div>
      </div>
    </div>
  );
}

function LogEntry({ log }: { log: Log }) {
  switch (log.type) {
    case "damage":
      return <DamageLogEntry log={log as DamageLog} />;
    case "kill":
      return <KillLogEntry log={log as KillLog} />;
    case "itemDrop":
      return <ItemDropLogEntry log={log as ItemDropLog} />;
    default:
      return null;
  }
}

export function LogPanel() {
  const logs = useGameStore((state) => state.logs);
  const selectedTypes = useGameStore((state) => state.selectedLogTypes);

  const filteredLogs = logs.filter((log) => selectedTypes[log.type]);

  const toggleType = (type: LogType) => {
    useGameStore.setState((state) => {
      state.selectedLogTypes[type] = !state.selectedLogTypes[type];
    });
  };

  return (
    <div className="flex flex-col h-full gap-4 bg-gray-800 border-2 border-gray-600 rounded p-3">
      <div className="flex gap-2 flex-wrap">
        {LOG_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => toggleType(type)}
            className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
              selectedTypes[type]
                ? "bg-blue-600 text-white"
                : "bg-gray-600 text-gray-300 hover:bg-gray-500"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredLogs.length === 0 ? (
          <div className="text-gray-500 text-sm">No logs</div>
        ) : (
          <div className="space-y-2">
            {[...filteredLogs].reverse().map((log) => (
              <LogEntry key={log.id} log={log} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
