import Chart from 'chart.js';

export default class ViewChart {
  createChart = () => {
    this.chartElement = document.createElement('canvas');
    this.chartElement.classList.add('chart-canvas');
    document.querySelector('.container_chart').prepend(this.chartElement);

    this.chartContext = this.chartElement.getContext('2d');
    this.setChartOptions();
  }

  setChartOptions = () => {
    this.chartOptions = {
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            fontColor: 'white',
            maxTicksLimit: 5,
            callback: this.convertAxisData,
          },
          gridLines: {
            zeroLineColor: 'rgba(255, 255, 255, 0.8)',
            color: 'rgba(255, 255, 255, 0.1)',
            borderDash: [3, 2],
          },
        }],
        xAxes: [{
          ticks: {
            fontColor: 'white',
            maxTicksLimit: 12,
            callback: (val) => val.slice(0, 3),
          },
          gridLines: {
            zeroLineColor: 'rgba(255, 255, 255, 0.8)',
            color: 'rgba(255, 255, 255, 0.1)',
            borderDash: [3, 2],
          },
        }],
      },
    };
  }

  // createSliderBar = () => {
  //   const sliderBar = document.createElement('div');
  //   const leftBtn = document.createElement('button');
  //   const rightBtn = document.createElement('button');
  //   const sliderTitle = document.createElement('span');

  //   sliderBar.classList.add('chart-slider');
  //   leftBtn.classList.add('chart-slider__btn', 'chart-left-btn');
  //   rightBtn.classList.add('chart-slider__btn', 'chart-right-btn');
  //   sliderTitle.classList.add('chart-slider__title', 'chart-title');

  //   sliderBar.append(leftBtn, sliderTitle, rightBtn);
  //   document.querySelector('.container_chart').append(sliderBar);
  // }

  convertAxisData = (value) => {
    let convertNum = value;
    if (value >= 1000000) {
      convertNum = `${value / 1000000}M`;
    } else if (value >= 1000) {
      convertNum = `${value / 1000}K`;
    }
    return convertNum;
  }

  generateChart = (dataForChart) => {
    // const chartTitle = document.querySelector('.chart-title');
    const dataNew = JSON.parse(dataForChart);

    // chartTitle.textContent = dataNew.data.datasets[0].label;

    dataNew.options = this.chartOptions;

    if (this.myChart) this.myChart.destroy();
    this.myChart = new Chart(this.chartContext, dataNew);
  }
}
