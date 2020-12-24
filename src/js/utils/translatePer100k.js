export default function translatePer100k(indicatorCount, population) {
  const result = Math.ceil((indicatorCount / population) * 100000);
  return result;
}
