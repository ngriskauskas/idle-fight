const SUFFIXES = ["", "K", "M", "B", "T"];

// 987, 1.2K, 34.5M ... and scientific notation only past trillions
export function formatNumber(val: number): string {
  const abs = Math.abs(val);
  if (abs >= 1000) {
    let tier = Math.floor(Math.log10(abs) / 3);
    // 999,999 would round up to "1000K": move it to the next suffix
    if (Math.round(abs / Math.pow(1000, tier)) >= 1000) tier += 1;
    if (tier >= SUFFIXES.length) {
      return val.toExponential(1).replace(/\+/, "").replace(/\.0+e/, "e");
    }
    const scaled = val / Math.pow(1000, tier);
    const digits = Math.abs(scaled) >= 100 ? 0 : 1;
    return scaled.toFixed(digits).replace(/\.0$/, "") + SUFFIXES[tier];
  }
  if (Number.isInteger(val)) return val.toString();
  // one decimal below 1000, so a fractional stat never shows a long tail
  return (Math.round(val * 10) / 10).toString();
}

export function formatPercent(val: number): string {
  const percent = val * 100;
  if (Number.isInteger(percent)) return percent + "%";
  let truncated = Math.trunc(percent * 10) / 10;
  return truncated.toString() + "%";
}
