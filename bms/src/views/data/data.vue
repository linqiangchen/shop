<template>
  <div id="home">
  <div class="chart flex">
  
   
     <div id="container2" ref="container" class="container"></div>
 <div id="container" ref="container" class="container"></div> 
  </div>
  </div>
</template>

<script>
import { Chart, Util } from '@antv/g2';

export default {
  mounted() {
   const data = [
  { type: '手链', value: 0.19 },
  { type: '耳环', value: 0.21 },
  { type: '项链', value: 0.27 },
  { type: '腕表', value: 0.28 },
   { type: '其他', value: 0.05 },
];
const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
});
chart.data(data);

chart.coordinate('theta', {
  radius: 0.75
});
chart.tooltip({
  showMarkers: false,
  title:'一周销售额占比',
  showTitle:true,
});

const interval = chart
  .interval()
  .adjust('stack')
  .position('value')
  .color('type', ['#063d8a', '#1770d6', '#47abfc', '#38c060','#f0657d'])
  .style({ opacity: 0.4 })
  .state({
    active: {
      style: (element) => {
        const shape = element.shape;
        return {
          matrix: Util.zoom(shape, 1.1),
        }
      }
    }
  })
  .label('type', (val) => {
    const opacity = val === '四线及以下' ? 1 : 0.5;
    return {
      offset: -30,
      style: {
        opacity,
        fill: 'white',
        fontSize: 12,
        shadowBlur: 2,
        shadowColor: 'rgba(0, 0, 0, .45)',
      },
      content: (obj) => {
        return obj.type + '\n' + obj.value + '%';
      },
    };
  });

chart.interaction('element-single-selected');

chart.render();
const data2 = [
  { city: '10月12日', type: '手链', value: 145 },
  { city: '10月12日', type: '项链', value: 850 },
  { city: '10月12日', type: '耳环', value: 100 },
  { city: '10月12日', type: '腕表', value: 700 },
  { city: '10月12日', type: '其他', value: 700 },
  { city: '10月13日', type: '手链', value: 900 },
  { city: '10月13日', type: '项链', value: 850 },
  { city: '10月13日', type: '耳环', value: 110 },
  { city: '10月13日', type: '腕表', value: 600 },
  { city: '10月13日', type: '其他', value: 700 },
  { city: '10月14日', type: '手链', value: 160 },
  { city: '10月14日', type: '项链', value: 500 },
  { city: '10月14日', type: '耳环', value: 600 },
  { city: '10月14日', type: '腕表', value: 100 },
  { city: '10月14日', type: '其他', value: 700 },
  { city: '10月15日', type: '手链', value: 140 },
  { city: '10月15日', type: '项链', value: 900 },
  { city: '10月15日', type: '耳环', value: 100 },
  { city: '10月15日', type: '腕表', value: 900 },
  { city: '10月15日', type: '其他', value: 700 },
  { city: '10月16日', type: '手链', value: 1400 },
  { city: '10月16日', type: '项链', value: 900 },
  { city: '10月16日', type: '耳环', value: 1100 },
  { city: '10月16日', type: '腕表', value: 600 },
  { city: '10月17日', type: '项链', value: 450 },
  { city: '10月17日', type: '耳环', value: 1000 },
  { city: '10月17日', type: '腕表', value: 600 },
  { city: '10月17日', type: '其他', value: 700 },
  { city: '10月18日', type: '手链', value: 1700 },
  { city: '10月18日', type: '项链', value: 600 },
  { city: '10月18日', type: '耳环', value: 700 },
  { city: '10月18日', type: '腕表', value: 1000 },
  { city: '10月18日', type: '其他', value: 700 },
];

const chart2 = new Chart({
  container: 'container2',
  autoFit: true,
  height: 500,
});

chart2.coordinate().transpose().scale(1, -1);

chart2.data(data2);

chart2.scale({
  value: {
    max: 2000,
    min: 0,
    alias: '销售额',
  },
});

chart2.axis('city', {
  label: {
    style: {
      fill: '#aaaaaa',
      fontSize: 12,
    },
  },
  tickLine: null,
  title: null,
});
chart2.axis('value', {
  label: {
    style: {
      fill: '#aaaaaa',
      fontSize: 12,
    },
  },
  title: {
    style: {
      fontSize: 12,
      fontWeight: 300,
    },
    position: 'end'
  },
});

chart2.legend({
  position: 'right-bottom',
});

chart2.tooltip({
  shared: true,
  showMarkers: false,
});

chart2
  .interval()
  .position('city*value')
  .color('type')
  .adjust([
    {
      type: 'dodge',
      marginRatio: 0.3,
    },
  ]);

chart2.interaction('active-region');
chart2.interaction('legend-highlight');

chart2.render();
  },
  
};
</script>

<style lang="scss" scoped>

  .chart{
    width: 100%;
    .container{
      flex: 1;
    }
  }
</style>