import mapboxgl from 'mapbox-gl/dist/mapbox-gl';

const API_KEY = 'pk.eyJ1Ijoidml0YWxpYnVyYWtvdSIsImEiOiJja2lzd2hhZTYwcDBuMnFzYzNhazFnbmJiIn0.mfrcB7xDMdW2jJSJqOqnUQ';

const urls = {
  baseUrl: 'https://disease.sh/v3/covid-19/countries',
};

export default class CreateMap {
  // constructor() {
  // }

  getSizeFromCasesCount = (count) => {
    if (count > 1000000 && count < 5000000) return 20;
    if (count > 500000 && count < 1000000) return 18;
    if (count > 400000 && count < 500000) return 16;
    if (count > 250000 && count < 400000) return 14;
    if (count > 50000 && count < 100000) return 12;
    if (count > 20000 && count < 50000) return 10;
    if (count > 3000 && count < 20000) return 8;
    if (count > 1000 && count < 3000) return 6;
    if (count > 1 && count < 1000) return 4;
    return '';
  };

  createMap = () => {
    mapboxgl.accessToken = API_KEY;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      zoom: 0.5,
      center: [0, 20],
    });

    fetch(urls.baseUrl)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        data.forEach((dataElement) => {
          const {
            country, cases, deaths, recovered,
          } = dataElement;
          const el = this.renderMarker(cases);
          // console.log(cases)

          new mapboxgl.Marker(el)
            .setLngLat([dataElement.countryInfo.long, dataElement.countryInfo.lat])
            .setPopup(new mapboxgl.Popup({ offset: 25 })
              .setHTML(`<h3>${country}</h3><p>Cases: ${cases}</p>
              <p>Deaths: ${deaths}</p><p>Recovered: ${recovered}</p>`))
            .addTo(map);
        });
      });
    map.addLegend(document.getElementById('legend').innerHTML);
  }

  renderMarker = (count) => {
    const el = document.createElement('div');
    const size = this.getSizeFromCasesCount(count);
    el.className = 'marker';
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    return el;
  }
}
