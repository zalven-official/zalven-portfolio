export function checkAPoint(
  a: number,
  b: number,
  x: number,
  y: number,
  r: number
) {
  const distPoints: number = (a - x) * (a - x) + (b - y) * (b - y);
  const ra = r * r;
  if (distPoints < ra) {
    return true;
  }
  return false;
}

export function distanceBetweenTwoPoints(
  x1: number,
  y1: number,
  x2: number,
  y2: number
) {
  const a = x1 - x2;
  const b = y1 - y2;

  const c = Math.sqrt(a * a + b * b);
  return c;
}
export default checkAPoint;
