import { useState } from "react";
import { TalentPanel } from "./TalentPanel";
import { ItemPanel } from "./ItemPanel";
import { SpellPanel } from "./SpellPanel";
import { LogPanel } from "./LogPanel";
import { SaveUI } from "./SaveUI";

type TabType = "items" | "talents" | "spells" | "logs";

export function Sidebar() {
  const [activeTab, setActiveTab] = useState<TabType>("spells");

  return (
    <div className="flex flex-col h-screen p-3">
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setActiveTab("spells")}
          className={`flex-1 py-1 px-2 rounded text-sm font-semibold transition-colors ${
            activeTab === "spells"
              ? "bg-blue-600 text-white"
              : "bg-slate-600 text-slate-300 hover:bg-slate-500"
          }`}
        >
          Spells
        </button>
        <button
          onClick={() => setActiveTab("items")}
          className={`flex-1 py-1 px-2 rounded text-sm font-semibold transition-colors ${
            activeTab === "items"
              ? "bg-blue-600 text-white"
              : "bg-slate-600 text-slate-300 hover:bg-slate-500"
          }`}
        >
          Items
        </button>
        <button
          onClick={() => setActiveTab("talents")}
          className={`flex-1 py-1 px-2 rounded text-sm font-semibold transition-colors ${
            activeTab === "talents"
              ? "bg-blue-600 text-white"
              : "bg-slate-600 text-slate-300 hover:bg-slate-500"
          }`}
        >
          Talents
        </button>
        <button
          onClick={() => setActiveTab("logs")}
          className={`flex-1 py-1 px-2 rounded text-sm font-semibold transition-colors ${
            activeTab === "logs"
              ? "bg-blue-600 text-white"
              : "bg-slate-600 text-slate-300 hover:bg-slate-500"
          }`}
        >
          Logs
        </button>
        <SaveUI />
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto flex flex-col">
        {activeTab === "items" && <ItemPanel />}
        {activeTab === "spells" && <SpellPanel />}
        {activeTab === "talents" && <TalentPanel />}
        {activeTab === "logs" && <LogPanel />}
      </div>
    </div>
  );
}
