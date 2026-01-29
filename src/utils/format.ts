export function formatNumber(val: number): string {
  if (Math.abs(val) >= 1000) {
    // 1 decimal, remove trailing 0, remove '+' in exponent
    let exp = val.toExponential(1).replace(/\+/, "");
    // Remove trailing .0 if present
    exp = exp.replace(/\.0+e/, "e");
    return exp;
  }
  if (Number.isInteger(val)) return val.toString();
  // Truncate to 2 decimals, remove trailing zeros
  let truncated = Math.trunc(val * 100) / 100;
  return truncated.toString();
}

export function formatPercent(val: number): string {
  const percent = val * 100;
  if (Number.isInteger(percent)) return percent + "%";
  let truncated = Math.trunc(percent * 10) / 10;
  return truncated.toString() + "%";
}
