import addZero from './addZero';

export default function setCurrentData() {
  const currentDate = new Date();

  const day = addZero(currentDate.getDate());
  const month = addZero(currentDate.getMonth() + 1);
  const year = addZero(currentDate.getFullYear());

  return `${day} ${month} ${year}`;
}
