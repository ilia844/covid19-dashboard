export default function mapCountryIdentify(data, countryCode, indicator) {
  const countryElem = data.find((dataElem) => dataElem.countryInfo.iso3 === countryCode);
  return [countryElem.country, indicator, countryElem[indicator]];
}
