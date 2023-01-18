<template>
  <div class="calendar_box">
    <div id="calendar"></div>
  </div>

</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';

onMounted(() => {
  const calendar = document.getElementById('calendar');
  const chart = echarts.init(calendar);
  function getVirtualData(year) {
    const date = +echarts.time.parse(year + '-01-01');
    const end = +echarts.time.parse(+year + 1 + '-01-01');
    const dayTime = 3600 * 24 * 1000;
    const data = [];
    for (let time = date; time < end; time += dayTime) {
      data.push([
        echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
        Math.floor(Math.random() * 3)
      ]);
    }
    return data;
  }
  const option = {
    title: {
      top: 0,
      left: 'center',
      text: '博客上传记录'
    },
    tooltip: {},
    visualMap: {
      min: 0,
      max: 5,
      type: 'piecewise',
      categories:[0,1,2],
      orient: 'horizontal',
      left: 'center',
      top: 30,
    },
    calendar: {
      top: 80,
      left: 30,
      right: 30,
      cellSize: ['auto', 'auto'],
      range: '2016',
      itemStyle: {
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0)'
      },
      yearLabel: { show: false },
      splitLine: { show: false }
    },
    series: {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data: getVirtualData('2016')
    }
  }
  chart.setOption(option);

  window.addEventListener('resize',() => {
    chart.resize()
  })
})





</script>

<style scoped>
.calendar_box {
  border-radius: 15px;
  height: fit-content;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  box-sizing: border-box;
  margin-bottom: 20px;
}

.calendar_box:hover {
  scale: 1.02;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
}

#calendar {
  width: 100%;
  height: 200px;
}
</style>