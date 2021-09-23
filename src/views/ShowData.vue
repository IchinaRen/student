<template>
  <!--  <el-col :span="24">-->
  <!--  <div ref="LineDom" style="width: 100%;height: 100%;"></div>-->
  <!--  </el-col>-->
  <el-col :span="20" :offset="2">

    <div id="myChart" :style="{width: '600px', height: '400px'}"></div>
    <el-button @click="ClickButton">点击切换</el-button>
  </el-col>

</template>

<script>
import * as echarts from 'echarts';

let data_x = [];
let data_s = [];
let text = {text: "学生选课统计"};
export default {
  name: "ShowData",
  created() {
    let _this = this;
    axios.get("/api/studentTcousrse/SumStudent").then(function (res) {
      console.log(res.data)

      console.log(data_x)
      _this.data_x1 = Object.keys(res.data);
      _this.data_s1 = Object.values(res.data);
      for (let i = 0; i < _this.data_x1.length; i++) {
        data_x.push(_this.data_x1[i]);
        data_s.push(_this.data_s1[i]);
      }

      _this.drawLine(_this.option);
    });
    axios.get("/api/studentTcousrse/SumByClass").then(function (res) {
      console.log(Object.keys(res.data))
      console.log(Object.values(res.data))
      _this.data_x2 = Object.keys(res.data);
      _this.data_s2 = Object.values(res.data);
    });
    console.log(_this.option);

  },
  data() {
    return {
      option: {
        title: text,
        tooltip: {},
        xAxis: {
          data: data_x,
          axisLabel: {
            color: '#333',
            //  让x轴文字方向为竖向
            interval: 0,
            formatter: function (value) {
              return value.split('').join('\n')
            }
          }

        },
        yAxis: {},
        series: [{
          name: '数量',
          type: 'bar',
          data: data_s,
          itemStyle: {
            normal: {
              color: function (params) {
                //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                var colorList = ['#cb5a58', '#5d9ac4', '#61a889', '#cd7b5f', '#91c7ae', '#749f83', '#ca8622'];
                return colorList[params.dataIndex]
              },
              label: {
                show: true, //开启显示
                position: 'top', //在上方显示
                textStyle: { //数值样式
                  color: 'black',
                  fontSize: 16
                }
              }
            }
          }

        }]
      },
      data_x1: [],
      data_x2: [],
      data_s2: [],
      data_s1: [],
      data_x: [],
      data_s: [],

    }
  },

  methods: {
    drawLine(option) {
      // 基于准备好的dom，初始化echarts实例
      console.log("基于准备好的dom，初始化echarts实例")
      let myChart = echarts.getInstanceByDom(document.getElementById('myChart'))
      if (myChart == null) {
        myChart = echarts.init(document.getElementById('myChart'))
      }
      // 绘制图表
      myChart.setOption(option);
    },
    ClickButton() {

      if (text.text === '学生选课统计') {
        text.text = "课程人数统计";
        data_x.length = data_s.length = 0;
        for (let i = 0; i < this.data_x2.length; i++) {
          data_x.push(this.data_x2[i]);
          data_s.push(this.data_s2[i]);
        }

      } else {
        text.text = "学生选课统计";
        data_x.length = data_s.length = 0;
        for (let i = 0; i < this.data_x1.length; i++) {
          data_x.push(this.data_x1[i]);
          data_s.push(this.data_s1[i]);
        }
      }
      this.drawLine(this.option);
    }

  }
}
</script>

<style scoped>

</style>