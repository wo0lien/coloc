var ctx = document.getElementById('graph');

window.chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
};

var config = {
  type: 'doughnut', //pie
  data: {
    datasets: [{
      data: [4, 42, 8
      ],
      backgroundColor: [
        window.chartColors.red,
        window.chartColors.blue,
        window.chartColors.yellow
      ],
      label: 'Dataset 1'
    }],
    labels: [
      'Rob',
      'Tom',
      'Jules'
    ]
  },
  options: {
    responsive: true
  }
};

var myDoughnutChart = new Chart(ctx, config);