import { Line } from 'vue-chartjs'

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
        labels: [],
        datasets: [
          {
            label: 'Average',
            data: [],
            fill: false,
            borderColor: 'rgba(53, 158, 255, 1)',
            backgroundColor: '#2554FF',
            borderWidth: 3,
            pointRadius: 0,
            lineTension: 0
          },
          {
            label: 'Normal',
            data: [],
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
    },
    yAverage() {
      let sum = this.yStack.reduce((pv, cv) => pv + cv, 0)
      let average = sum / this.yStack.length
      return average
    }
  },
  methods: {
    render() {
      return this.renderChart(this.chartData, this.options)
    },
    setLabels() {
      return (this.chartData.labels = this.xStack.map((i) => i))
    },
    updateDataset(index, value) {
      return this.chartData.datasets[index].data.push(value)
    },
    reset() {
      this.xStack = []
      this.yStack = []
      this.chartData.datasets[0].data = []
      this.chartData.datasets[1].data = []
    }
  },
  watch: {
    xData: function (newVal) {
      if (typeof newVal !== 'number') {
        this.xStack.push(0)
        console.error('xData type error: newVal not a number')
      } else if (!this.$attrs.isContrasting) {
        this.xStack.push(newVal)
        // if not contrasting we want to push every y value
        this.yStack.push(this.yData)
      } else {
        this.xStack.push(newVal)
      }
    },
    xStack: function () {
      this.setLabels()
      this.render()
    },
    yData: function (newVal) {
      if (
        this.$attrs.isContrasting &&
        typeof newVal === 'number' &&
        this.yStack.length < this.xStack.length / this.$attrs.sampleSize
      ) {
        this.yStack.push(newVal)
      } else if (this.$attrs.isContrasting && typeof newVal === 'number') {
        this.yStack = []
        this.yStack.push(newVal)
      } else {
        this.yStack.push(0)
        // emit error - log issue
        console.error('yData type error: newVal not a number')
      }
    },
    yStack: function () {
      // Set Average
      this.updateDataset(0, this.yAverage)
      // Set Normal
      this.updateDataset(1, this.yData)
      this.render()
    }
  },
  mounted() {
    this.render()
  }
}
