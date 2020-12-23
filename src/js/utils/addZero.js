export default function addZero(value) {
  let currentValue = value;
  if (currentValue < 10) {
    currentValue = `0${currentValue}`;
  }
  return currentValue;
}
