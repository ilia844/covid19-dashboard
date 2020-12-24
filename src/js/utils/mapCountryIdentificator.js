import translatePer100k from './translatePer100k';

export default function mapCountryIdentify(data, countryCode, indicator, isPer100k) {
  const dataElement = data.find((dataElem) => dataElem.countryInfo.iso3 === countryCode);
  let count;
  if (isPer100k) {
    count = translatePer100k(dataElement[indicator], dataElement.population);
  } else {
    count = dataElement[indicator];
  }
  return [dataElement.country, indicator, count];
}
