<template>

 <div id="chartpie" style="width:100%; height:400px;"></div>

</template>

<script>
import echarts from 'echarts';
export default{
data() {
        return {
            chartie: null,
            data: {
                title: '垂直方向柱状标题',
                subtext: '子标题描述信息',
            },
        }
    },
    methods: {
        init() {
            //基于准备好的dom，初始化echarts实例
            this.chartpie = echarts.init(document.getElementById('chartpie'));
            return this;
        },
        update() {
            if (this.chartpie === null) {
                this.init();
            }

            this.chartpie.setOption({
                title: {
                    text: '维修类型统计',
                    x: 'center',
                    y:370
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['珠宝','皮具','腕表', '定制']
                },
                grid: {
                    left: '50px',
                    right: '50px',
                    bottom: '80px',
                    containLabel: true
                },
                 series : [
        {
            name: '访问来源',
            type: 'pie',
            radius: '65%',
            data:[
                {value:235, name:'珠宝'},
                {value:274, name:'皮具'},
                {value:310, name:'腕表'},
                {value:335, name:'定制'}
            ]
        }
    ]
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
