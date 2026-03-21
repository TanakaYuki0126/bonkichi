export function getSectionProgress(
  progress: number,
  start: number,
  end: number
) {
  const t = (progress - start) / (end - start);
  return Math.min(1, Math.max(0, t));
}
