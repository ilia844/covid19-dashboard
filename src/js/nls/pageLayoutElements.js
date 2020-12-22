export default {
  headerInner: 'Covid19-Dashboard',
  mainElements: `
  <section class='container container_info'>Global cases</section>
  <section class='container container_table'>table</section>
  <section class='container list'></section>
  <section class='container container_list'>list</section>
  <section class='container container_map' id='map'></section>
  <section class='container container_chart'>chart</section>`,
  footerElements: `<a href='#' target='_blank'>Author <img src="" alt=""></a>
  <a href='#' target='_blank'>Author <img src="" alt=""></a>
  <a href='#' target='_blank'>Author <img src="" alt=""></a>
  <a href='#' target='_blank'>Author <img src="" alt=""></a>
  <a href='#' target='_blank'>School <img src="" alt=""></a>`,
  mapLegend: `
  <div id="state-legend" class="map-legend">
  <h4>Confirmed</h4>
  <div><span></span>1,000,000 – 5,000,000</div>
  <div><span></span>500,000 – 1,000,000</div>
  <div><span></span>400,000 – 500,000</div>
  <div><span></span>250,000 – 400,000</div>
  <div><span></span>100,000 – 250,000</div>
  <div><span></span>50,000 – 100,000</div>
  <div><span></span>20,000 – 50,000</div>
  <div><span></span>3,000 – 20,000</div>
  <div><span></span>1,000 – 3,000</div>
  </div>`,
  mapPopup: `
  <div class="mapboxgl-popup">
    <div class="mapboxgl-popup-content">
      <h3>Libyan Arab Jamahiriya</h3><p>Cases: 95200</p><p>Deaths: 1369</p><p>Recovered: 65532</p>
      <button class="mapboxgl-popup-close-button" type="button" aria-label="Close popup">×</button>
    </div>
  </div>`,
};
