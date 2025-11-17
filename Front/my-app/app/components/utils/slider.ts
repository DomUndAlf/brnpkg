export function rangeValue(
  oldValue: number[],
  newValue: number[],
  activeThumb: number,
  minDistance: number,
  min: number,
  max: number
) {
  if (activeThumb === 0) {
    const left = Math.min(newValue[0], oldValue[1] - minDistance);
    return [Math.max(min, left), oldValue[1]];
  } else {
    const right = Math.max(newValue[1], oldValue[0] + minDistance);
    return [oldValue[0], Math.min(max, right)];
  }
}