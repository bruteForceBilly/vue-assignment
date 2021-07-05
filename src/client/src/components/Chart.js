import { Line } from 'vue-chartjs'
// Chart could inherit props

export default {
  extends: Line,
  data() {
    return {
      yStack: [],
      chartData: {
        labels: ['', '', '', ''],
        datasets: [
          {
            label: 'Profile',
            data: [0, 0, 0, 0],
            fill: false,
            borderColor: 'rgba(53, 158, 255, 1)',
            backgroundColor: '#2554FF',
            borderWidth: 3,
            pointRadius: 0,
            lineTension: 0
          },
          {
            label: 'History',
            data: [0, 0, 0, 0],
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
                display: true,
                beginAtZero: false
              },
              gridLines: {
                display: true,
                lineWidth: 0,
                z: 1,
                zeroLineColor: 'rgba(121, 121, 121, 1)',
                zeroLineWidth: 3
              }
            }
          ]
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  computed: {
    yData() {
      return this.$attrs['yData']
    }
  },
  methods: {
    render() {
      this.renderChart(this.chartData, this.options)
    },
    setChartData() {
      // Profile
      this.chartData.datasets[0].data = this.yStack.slice(0, 4).map((i) => i)

      // History
      this.chartData.datasets[1].data = this.yStack.slice(5, 9).map((i) => i)
    }
  },
  watch: {
    yData: function (newVal) {
      if (this.yStack.length < 9) {
        this.yStack.push(newVal)
      } else {
        this.yStack.shift()
        this.yStack.push(newVal)
      }
    },
    yStack: function () {
      this.setChartData()
      this.render()
    }
  },
  mounted() {
    //console.log('chart ', this.$attrs)
    this.render()
  }
}
