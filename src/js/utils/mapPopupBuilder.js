export default function mapPopupBuild(country, indicator, indicatorCount) {
  return `
  <div class="mapboxgl-popup-content">
    <h3>${country}</h3><p>${indicator}: ${indicatorCount}</p>
  </div>`;
}
