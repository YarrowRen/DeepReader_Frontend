<template>
    <div :class="className" :style="{height:height,width:width}"  />
</template>

<script>
//Vue.prototype.$echarts = echarts
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    heatList: {
      type: Array,
      default: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initCharts()
    })
  },
  created() {
  },
  methods: {
    initCharts() {
        this.chart = echarts.init(this.$el);
        this.setOptions();
    },
    setOptions() {
      this.chart.setOption({
        title: {
            top: 30,
            left: 'center',
            text: '用户活跃热力图'
        },
        tooltip: {
          show: true,     // 显示提示框组件
            trigger: "item",     // 触发类型
            triggerOn: "mousemove",  // 出发条件
            formatter: function (params) {
            	//这里可以debugger出params内容
                // var xValue = params[0];
                // var yValue = params[1];
                var result='您在'+params.data[0]+'时，活跃度为'+params.data[1];
                return result;
            }
        },
        visualMap: {
            min: 0,
            max: 4,
            type: 'piecewise',
            orient: 'horizontal',
            left: 'center',
            top: 65,
            inRange: {
                color: ['WhiteSmoke','Brown']
            }
        },
        calendar: {
            top: 120,
            left: 30,
            right: 30,
            cellSize: ['auto', 13],
            range: '2021',
            itemStyle: {
            borderWidth: 0.5
            },
            yearLabel: { show: false }
        },
        series: {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: this.getVirtulData('2021')
        }
      })
    },
    
    getVirtulData(year) {
        year = year || '2017';
        var date = +echarts.number.parseDate(year + '-01-01');
        var end = +echarts.number.parseDate(+year + 1 + '-01-01');
        var dayTime = 3600 * 24 * 1000;
        var data = [];
        // for (var time = date; time < end; time += dayTime) {
        //     data.push([
        //     echarts.format.formatTime('yyyy-MM-dd', time),
        //     Math.floor(Math.random() * 10000)
        //     ]);
        // }

        console.log(this.heatList)
        for (var time = date; time < end; time += dayTime) {
          var formatedTime=echarts.format.formatTime('yyyy-MM-dd', time)
          var heat=0
          for(var i=0;i<this.heatList.length;i++){
            if(this.heatList[i].date==formatedTime){
              console.log(this.heatList[i].date+":"+formatedTime)
              heat=this.heatList[i].heat
            }
          }
          data.push([formatedTime,heat]);
        }
        return data;
    },
  }
}
</script>
