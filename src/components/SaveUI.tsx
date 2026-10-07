import { useState, useEffect } from "react";
import { saveGame, wipeSave } from "../utils/saveSystem";

export function SaveUI() {
  const [lastSave, setLastSave] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Check localStorage for last save time
    const savedTime = localStorage.getItem("idle-fight-save-time");
    if (savedTime) {
      setLastSave(new Date(savedTime));
    }

    // Update display every second to reflect elapsed time
    const updateInterval = setInterval(() => {
      const updatedTime = localStorage.getItem("idle-fight-save-time");
      if (updatedTime) {
        setLastSave(new Date(updatedTime));
      }
    }, 1000);

    return () => clearInterval(updateInterval);
  }, []);

  const handleManualSave = () => {
    setIsSaving(true);
    const success = saveGame();
    if (success) {
      const now = new Date();
      setLastSave(now);
      localStorage.setItem("idle-fight-save-time", now.toISOString());
    }
    setTimeout(() => setIsSaving(false), 300);
  };

  const handleWipeSave = () => {
    if (
      confirm("Are you sure you want to wipe your save? This cannot be undone!")
    ) {
      wipeSave();
      localStorage.removeItem("idle-fight-save-time");
      setLastSave(null);
      window.location.reload();
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    if (minutes === 0) {
      return `${seconds}s ago`;
    } else if (minutes < 60) {
      return `${minutes}m ago`;
    } else {
      const hours = Math.floor(minutes / 60);
      return `${hours}h ago`;
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-3 py-2 bg-slate-600 hover:bg-slate-500 rounded text-sm font-semibold transition border border-slate-500"
        title="Save/Load Game"
      >
        💾
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 w-80 max-w-[calc(100vw-2rem)] shadow-xl">
            <h2 className="text-lg font-bold text-white mb-4">Game Save</h2>

            <div className="mb-6 p-3 bg-slate-900 rounded">
              {lastSave ? (
                <div className="text-sm">
                  <span className="text-gray-400">Last save: </span>
                  <span className="text-green-400">{formatTime(lastSave)}</span>
                </div>
              ) : (
                <div className="text-sm text-gray-500">No save found</div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  handleManualSave();
                }}
                disabled={isSaving}
                className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 rounded text-sm font-semibold transition"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-3 py-2 bg-slate-600 hover:bg-slate-700 rounded text-sm font-semibold transition"
              >
                Close
              </button>
              <button
                onClick={handleWipeSave}
                className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-semibold transition"
              >
                Wipe
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
