export default function totalToToday(isToday, indicator) {
  const indicatorObj = {
    total: ['cases', 'deaths', 'recovered'],
    atDay: ['todayCases', 'todayDeaths', 'todayRecovered'],
  };
  if (isToday) {
    const i = indicatorObj.total.indexOf(indicator);
    return indicatorObj.atDay[i];
  }
  const i = indicatorObj.atDay.indexOf(indicator);
  return indicatorObj.total[i];
}
