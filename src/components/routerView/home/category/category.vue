<template>

 <div id="chartDom" style="width:100%; height:400px;"></div>

</template>

<script>
import echarts from 'echarts';
export default{
data() {
        return {
            chartDom: null,
        }
    },
    methods: {
        init() {
            //基于准备好的dom，初始化echarts实例
            this.chartDom = echarts.init(document.getElementById('chartDom'));
            return this;
        },
        update() {
            if (this.chartDom === null) {
                this.init();
            }
            this.chartDom.setOption({
                title: {
                    text: '地区销量统计',
                    x: 'center',
                    y:370
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['上海', '北京', '杭州']
                },
                grid: {
                    left: '50px',
                    right: '50px',
                    bottom: '80px',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['一季度', '二季度', '三季度', '四季度']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    name: '上海',
                    type: 'line',
                    stack: '总量',
                    data: [820, 1254, 981, 1563]
                }, {
                    name: '北京',
                    type: 'line',
                    stack: '总量',
                    data: [680, 482, 991, 634]
                }, {
                    name: '杭州',
                    type: 'line',
                    stack: '总量',
                    data: [720, 832, 901, 1034]
                }]
            });
        }
    },
    mounted: function() {
        this.init()
            .update();
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
