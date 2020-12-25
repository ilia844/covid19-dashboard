export default function getSizeFromCount(count, sizeNumbers) {
  if (sizeNumbers === 'big') {
    if (count > 1000000) return 20;
    if (count > 500000 && count < 1000000) return 18;
    if (count > 400000 && count < 500000) return 16;
    if (count > 250000 && count < 400000) return 14;
    if (count > 50000 && count < 250000) return 12;
    if (count > 20000 && count < 50000) return 10;
    if (count > 3000 && count < 20000) return 8;
    if (count > 1000 && count < 3000) return 6;
    if (count > 1 && count < 1000) return 4;
    if (!count) return 1;
  }
  if (sizeNumbers === 'middle') {
    if (count > 100000) return 20;
    if (count > 50000 && count < 100000) return 18;
    if (count > 40000 && count < 50000) return 16;
    if (count > 25000 && count < 40000) return 14;
    if (count > 5000 && count < 25000) return 12;
    if (count > 2000 && count < 5000) return 10;
    if (count > 300 && count < 2000) return 8;
    if (count > 100 && count < 300) return 6;
    if (count > 1 && count < 100) return 4;
    if (!count) return 1;
  }
  if (sizeNumbers === 'small') {
    if (count > 10000) return 20;
    if (count > 5000 && count < 10000) return 18;
    if (count > 4000 && count < 5000) return 16;
    if (count > 2500 && count < 4000) return 14;
    if (count > 500 && count < 2500) return 12;
    if (count > 200 && count < 500) return 10;
    if (count > 30 && count < 200) return 8;
    if (count > 10 && count < 30) return 6;
    if (count > 1 && count < 10) return 4;
    if (!count) return 1;
  }
  return '';
}
