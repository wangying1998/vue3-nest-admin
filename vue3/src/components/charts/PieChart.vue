<template>
    <Chart
        :dom-id="domId"
        :chart-options="pieChartOptions"
        :height="height"
        :header-show="headerShow"
    />
</template>

<script>
import Chart from "../../components/charts/Chart.vue";
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
        let pieChartOptions = {
            title: "Chart",

            options: {
                // tooltip: {
                //     trigger: 'item',
                //     formatter: '{c}',
                //     backgroundColor: 'var(--bg-color)',
                //     borderWidth: 0,
                //     padding: [3, 10],
                //     textStyle: {
                //         color: '#FFFFFF'
                //     }
                // },
                series: {
                    type: "pie",
                    data: [
                        {
                            name: '测试数据',
                            value: 95,
                        },
                        {
                            name: 'data1',
                            value: 23,
                        },
                        {
                            name: 'data2',
                            value: 56,
                        },
                    ],
                    radius: ['60%', '80%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center',
                        color: '#fff',
                        backgroundColor: 'transparent',
                    },
                    emphasis: {
                        label: {
                            show: true,
                            formatter: '{b}\n\n{c}',
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    itemStyle: {
                        color: {
                            x: 1,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 1,
                                    color: "rgba(240, 73, 104, 1)",
                                },
                                {
                                    offset: 0,
                                    color: "rgba(240, 73, 104, 0.2)",
                                },
                            ],
                        }
                    }
                },
            },
        };

        return {
            props,

            pieChartOptions,
        }
    }
}
</script>

<style lang="scss" scoped>

</style>