import { Line } from 'vue-chartjs'
// Chart could inherit props
export default {
  extends: Line,
  props: {
    yAxis: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      stack: [],
      chartData: {
        labels: ['Babol', 'Cabanatuan', 'Daegu', 'Jerusalem'],
        datasets: [
          {
            label: 'Speed Profile',
            data: [0, 31, 23, 16],
            fill: false,
            borderColor: 'rgba(53, 158, 255, 1)',
            backgroundColor: '#2554FF',
            borderWidth: 3,
            pointRadius: 0,
            lineTension: 0
          },
          {
            label: 'Speed History',
            data: [0, 31, 23, 16],
            fill: false,
            borderColor: 'rgba(225, 225, 225, 1)',
            backgroundColor: '#2554FF',
            borderWidth: 3,
            pointRadius: 0,
            lineTension: 0
          }
        ]
      },
      options: {
        animation: {
          duration: 0
        },
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: false
              },
              position: 'right',
              ticks: {
                display: false,
                beginAtZero: true
              },
              gridLines: {
                display: true,
                lineWidth: 0,
                z: 1,
                zeroLineColor: 'rgba(121, 121, 121, 1)',
                zeroLineWidth: 6
              }
            }
          ],
          xAxes: [
            {
              scaleLabel: {
                display: false
              },
              position: 'top',
              ticks: {
                display: false,
                beginAtZero: true
              },
              gridLines: {
                display: true,
                lineWidth: 0,
                z: 1,
                zeroLineColor: 'rgba(121, 121, 121, 1)',
                zeroLineWidth: 6
              }
            }
          ]
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  methods: {
    render() {
      this.renderChart(this.chartData, this.options)
    },
    setChartData() {
      // Speed Profile
      this.chartData.datasets[0].data = this.stack.slice(0, 4).map((i) => i)

      // Speed History
      this.chartData.datasets[1].data = this.stack.slice(5, 9).map((i) => i)
    }
  },
  watch: {
    yAxis: function (newVal) {
      if (this.stack.length < 9) {
        this.stack.push(newVal)
      } else {
        this.stack.shift()
        this.stack.push(newVal)
      }
    },
    stack: function () {
      this.setChartData()
      this.render()
    }
  },
  mounted() {
    this.render()
  }
}
