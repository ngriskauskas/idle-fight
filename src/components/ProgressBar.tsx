interface ProgressBarProps {
  current: number;
  max: number;
  label: string;
  colorClass: string;
  showReady?: boolean;
  size?: "sm" | "md" | "lg";
}

export function ProgressBar({
  current,
  max,
  label,
  colorClass,
  showReady = false,
  size = "md",
}: ProgressBarProps) {
  const percentage = (current / max) * 100;
  const isReady = current >= max;

  const heightClass = {
    sm: "h-5",
    md: "h-6",
    lg: "h-8",
  }[size];

  const textSizeClass = {
    sm: "text-xs",
    md: "text-xs",
    lg: "text-sm",
  }[size];

  return (
    <div className="mb-4 mt-4">
      <div className={`flex items-center ${label ? "gap-2" : ""}`}>
        {label && <span className="w-16 text-sm">{label}</span>}
        <div className={label ? "flex-1" : "w-full"}>
          <div
            className={`relative w-full bg-slate-800 rounded-full overflow-hidden border border-slate-600 ${heightClass}`}
          >
            <div
              className={`h-full transition-all duration-100 ${
                showReady && isReady
                  ? colorClass.split(" ")[0] === "green"
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
                    : "bg-gradient-to-r from-red-400 to-red-500"
                  : colorClass
              }`}
              style={{ width: `${percentage}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className={`font-bold text-white drop-shadow ${textSizeClass}`}
              >
                {Math.floor(current)} / {max}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
