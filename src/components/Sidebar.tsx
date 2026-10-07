import { useState } from "react";
import { TalentPanel } from "./TalentPanel";
import { ItemPanel } from "./ItemPanel";
import { SpellPanel } from "./SpellPanel";
import { LogPanel } from "./LogPanel";
import { SaveUI } from "./SaveUI";

type TabType = "items" | "talents" | "spells" | "logs";

const TABS: { id: TabType; label: string }[] = [
  { id: "spells", label: "Spells" },
  { id: "items", label: "Items" },
  { id: "talents", label: "Talents" },
  { id: "logs", label: "Logs" },
];

const TAB_BASE = "flex-1 py-2 lg:py-1 px-1 sm:px-2 rounded text-sm font-semibold transition-colors";
const TAB_ACTIVE = "bg-blue-600 text-white";
const TAB_INACTIVE = "bg-slate-600 text-slate-300 hover:bg-slate-500";
// the open panel's tab while the fight covers it: only lit on desktop, where both show
const TAB_ACTIVE_DESKTOP_ONLY =
  "bg-slate-600 text-slate-300 hover:bg-slate-500 lg:bg-blue-600 lg:text-white lg:hover:bg-blue-600";

interface SidebarProps {
  // Below lg the tab row is a bottom nav with an extra Fight tab, and the panel
  // is hidden while the fight is showing. From lg up both are always visible.
  showFight: boolean;
  onShowFight: (showFight: boolean) => void;
}

export function Sidebar({ showFight, onShowFight }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<TabType>("spells");

  return (
    <div className="flex flex-col-reverse lg:flex-col h-full p-2 lg:p-3">
      {/* Tab Navigation */}
      <div className={`flex gap-1 sm:gap-2 lg:mb-3 ${showFight ? "" : "mt-2 lg:mt-0"}`}>
        <button
          onClick={() => onShowFight(true)}
          className={`lg:hidden ${TAB_BASE} ${showFight ? TAB_ACTIVE : TAB_INACTIVE}`}
        >
          Fight
        </button>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              onShowFight(false);
            }}
            className={`${TAB_BASE} ${
              activeTab !== tab.id
                ? TAB_INACTIVE
                : showFight
                  ? TAB_ACTIVE_DESKTOP_ONLY
                  : TAB_ACTIVE
            }`}
          >
            {tab.label}
          </button>
        ))}
        <SaveUI />
      </div>

      {/* Tab Content */}
      <div
        className={`${showFight ? "hidden" : "flex"} lg:flex flex-1 min-h-0 overflow-y-auto flex-col`}
      >
        {activeTab === "items" && <ItemPanel />}
        {activeTab === "spells" && <SpellPanel />}
        {activeTab === "talents" && <TalentPanel />}
        {activeTab === "logs" && <LogPanel />}
      </div>
    </div>
  );
}
