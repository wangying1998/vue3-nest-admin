<template>
    <Chart
        :dom-id="domId"
        :chart-options="barChartOptions"
        :height="height"
        :header-show="headerShow"
    />
</template>

<script>
import Chart from "../../components/charts/Chart.vue";
import * as echarts from "echarts/core";
export default {
    props: {
        domId: {
            type: String,
            default: "",
        },
        height: {
            type: Number,
            default: 240,
        },
        headerShow: {
            type: Boolean,
            default: true,
        },
    },
    components: {
        Chart,
    },
    setup (props) {
        let barChartOptions = {
            title: "Chart",

            options: {
                yAxis: {
                    type: "category",
                    data: [
                        "2000-06-05",
                        "2000-06-06",
                        "2000-06-07",
                        "2000-06-08",
                        "2000-06-09",
                        "2000-06-10",
                    ],
                    splitLine: {
                        show: false,
                    },
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                },
                xAxis: {
                    show: false,
                    type: "value",
                    splitLine: {
                        show: false,
                    },
                },
                grid: {
                    left: 0,
                    right: 0,
                    top: "30px",
                    bottom: 0,
                    containLabel: true,
                },
                series: [
                    {
                        data: [116, 129, 135, 86, 73, 85],
                        type: "bar",
                        symbol: "none",
                        smooth: true,
                        label: {
                            show: true,
                            position: 'right',
                            distance: 10,
                            color: '#fff',
                            backgroundColor: 'transparent'
                        },
                        barWidth: "12px",
                        itemStyle: {
                            borderRadius: 6,
                            color: new echarts.graphic.LinearGradient(
                                    0,0,1,0,
                                    [
                                        {
                                            offset: 1,
                                            color: "rgba(240, 73, 104, 0.9)",
                                        },
                                        {
                                            offset: 0.5,
                                            color: "rgba(240, 73, 104, 0.9)",
                                        },
                                        {
                                            offset: 0,
                                            color: "rgba(240, 73, 104, 0.2)",
                                        },
                                    ]
                                )
                        },
                        emphasis: {
                            focus: 'none',
                            itemStyle: {
                                color: new echarts.graphic.LinearGradient(
                                    0,0,1,0,
                                    [
                                        {
                                            offset: 1,
                                            color: "rgba(240, 73, 104, 0.2)",
                                        },
                                        {
                                            offset: 0.5,
                                            color: "#F04969",
                                        },
                                        {
                                            offset: 0,
                                            color: "#F04969",
                                        },
                                    ]
                                )
                            },
                        },
                    },
                ],
            },
        };

        return {
            props,

            barChartOptions,
        }
    }
}
</script>

<style lang="scss" scoped>

</style>