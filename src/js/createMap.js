const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

export default class CreateMap {
  // constructor() {
  // }

  create = () => {
    const mapboxToken = 'pk.eyJ1Ijoidml0YWxpYnVyYWtvdSIsImEiOiJja2lzd2hhZTYwcDBuMnFzYzNhazFnbmJiIn0.mfrcB7xDMdW2jJSJqOqnUQ';

    mapboxgl.accessToken = mapboxToken;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      zoom: 0.5,
      center: [0, 20],
    });

    const getColorFromCasesCount = (count) => {
      if (count >= 100) return 'red';
      if (count >= 10) return 'blue';
      return 'grey';
    };

    fetch('https://disease.sh/v3/covid-19/countries')
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        data.forEach((dataElement) => {
          // console.log(country);
          const {
            country, cases, deaths, recovered,
          } = dataElement;
            // eslint-disable-next-line no-console
          console.log(country, cases, deaths, recovered);

          new mapboxgl.Marker({
            color: getColorFromCasesCount(cases),
          })
            .setLngLat([dataElement.countryInfo.long, dataElement.countryInfo.lat])
            .addTo(map);
        });
      });
  }
}
