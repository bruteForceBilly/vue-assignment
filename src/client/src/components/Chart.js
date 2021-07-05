import { Line } from 'vue-chartjs'
// Chart could inherit props

export default {
  extends: Line,
  props: {
    showText: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      xStack: [],
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
          display: this.showText
        },
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: this.showText
              },
              position: 'right',
              ticks: {
                display: this.showText,
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
                display: this.showText
              },
              position: 'top',
              ticks: {
                display: this.showText,
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
  computed: {
    xData() {
      return this.$attrs['xData']
    },
    yData() {
      return this.$attrs['yData']
    }
  },
  methods: {
    render() {
      this.renderChart(this.chartData, this.options)
    },
    setChartLabels() {
      this.chartData.labels = this.xStack.map((i) => i)
    },
    setChartData() {
      // Profile
      this.chartData.datasets[0].data = this.yStack.slice(0, 4).map((i) => i)
      // History
      this.chartData.datasets[1].data = this.yStack.slice(5, 9).map((i) => i)
    },
    setStack(stack, length, newVal) {
      if (stack.length < length) {
        stack.push(newVal)
      } else {
        stack.shift()
        stack.push(newVal)
      }
    }
  },
  watch: {
    xData: function (newVal) {
      this.setStack(this.xStack, 4, newVal)
    },
    xStack: function () {
      this.setChartLabels()
      this.render()
    },
    yData: function (newVal) {
      this.setStack(this.yStack, 9, newVal)
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
