export default function changeIndicator(currentIndicator, direction, isToday) {
  let indicatorArray = ['cases', 'deaths', 'recovered'];
  if (isToday) indicatorArray = ['todayCases', 'todayDeaths', 'todayRecovered'];
  const index = indicatorArray.indexOf(currentIndicator);
  if (direction === 'next') {
    if (index === 2) return indicatorArray[0];
    return indicatorArray[index + 1];
  } if (direction === 'prev') {
    if (index === 0) return indicatorArray[2];
    return indicatorArray[index - 1];
  }
  return '';
}
