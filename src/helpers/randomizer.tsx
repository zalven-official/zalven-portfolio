export function getRandomInt(min_val: number, max_val: number) {
  const min: number = Math.ceil(min_val);
  const max: number = Math.floor(max_val);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default getRandomInt;
