<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="6">
                <Chart
                    ref="pieChart"
                    domId="pie-echart"
                    :chartOptions="pieChartOptions"
                    :height="240"
                />
            </el-col>
            <el-col :span="12">
                <Chart
                    ref="barChart"
                    domId="bar-echart"
                    :chartOptions="barChartOptions"
                    :height="240"
                />
            </el-col>
            <el-col :span="6">
                <div class="chart-box">
                    <ChartHeader title="Timeline" />
                    <ul class="time-list">
                        <li v-for="(item, index) in timeLine" :key="index" class="fl-sta-cen">
                            <div class="full-width fl-bet-cen">
                                <span>{{ item.title }}</span>
                                <span>{{ item.created }}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </el-col>
        </el-row>
        <el-row class="mr-t-20">
            <el-col :span="24" :offset="0">
                <Table :data="tableData" :columns="columns"></Table>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="mr-t-20">
            <el-col :span="24">
                <Chart
                    ref="lineChart"
                    domId="line-echart"
                    :chartOptions="lineChartOptions"
                    :height="240"
                />
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from "vue";
import Chart from "../../components/charts/Chart.vue";
import ChartHeader from "../../components/charts/ChartHeader.vue";
import Table from '../../components/TableComponent/Table.vue';
import * as echarts from "echarts/core";

export default {
    components: [Chart, ChartHeader, Table],
    setup() {
        const barChart = new ref();
        const lineChart = new ref();
        const pieChart = new ref();
        let timeLine = new ref([]);
        let tableData = new ref([]);
        let columns = new ref([]);

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

        let lineChartOptions = {
            title: "LineChart",

            options: {
                tooltip: {
                    trigger: 'axis',
                    formatter: '{c}',
                    backgroundColor: 'var(--bg-color)',
                    borderWidth: 0,
                    padding: [3, 10],
                    textStyle: {
                        color: '#FFFFFF'
                    },
                    axisPointer: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.05)'
                        }
                    }
                },


                xAxis: {
                    type: "category",
                    data: [
                        "2000-06-05",
                        "2000-06-06",
                        "2000-06-07",
                        "2000-06-08",
                        "2000-06-09",
                        "2000-06-10",
                        "2000-06-11",
                        "2000-06-12",
                        "2000-06-13",
                        "2000-06-14",
                        "2000-06-15",
                        "2000-06-16",
                        "2000-06-17",
                        "2000-06-18",
                        "2000-06-19",
                        "2000-06-20",
                        "2000-06-21",
                        "2000-06-22",
                        "2000-06-23",
                        "2000-06-24",
                        "2000-06-25",
                        "2000-06-26",
                        "2000-06-27",
                        "2000-06-28",
                        "2000-06-29",
                        "2000-06-30",
                        "2000-07-01",
                        "2000-07-02",
                        "2000-07-03",
                        "2000-07-04",
                        "2000-07-05",
                        "2000-07-06",
                        "2000-07-07",
                        "2000-07-08",
                        "2000-07-09",
                        "2000-07-10",
                        "2000-07-11",
                        "2000-07-12",
                        "2000-07-13",
                        "2000-07-14",
                        "2000-07-15",
                        "2000-07-16",
                        "2000-07-17",
                        "2000-07-18",
                        "2000-07-19",
                        "2000-07-20",
                        "2000-07-21",
                        "2000-07-22",
                        "2000-07-23",
                        "2000-07-24",
                    ],
                    splitLine: {
                        show: false,
                    },
                },
                yAxis: {
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
                color: ["#F04969"],
                series: [
                    {
                        data: [
                            116, 129, 135, 86, 73, 85, 73, 68, 92, 130, 245,
                            139, 115, 111, 309, 206, 137, 128, 85, 94, 71, 106,
                            84, 93, 85, 73, 83, 125, 107, 82, 44, 72, 106, 107,
                            66, 91, 92, 113, 107, 131, 111, 64, 69, 88, 77, 83,
                            111, 57, 55, 60,
                        ],
                        type: "line",
                        showSymbol: false,
                        symbolSize: 10,
                        smooth: true,
                        itemStyle: {
                            color: "#F04969",
                        },
                        areaStyle: {
                            color: {
                                type: "linear",
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: "#F04969",
                                    },
                                    {
                                        offset: 0.6,
                                        color: "#F04969",
                                    },
                                    {
                                        offset: 1,
                                        color: "rgba(240, 73, 104, 0.2)",
                                    },
                                ],
                            },
                        },
                    },
                ],
            },
        };

        timeLine = [
            {
                title: '测试信息',
                created: '2023-07-18 18:32:24'
            },
            {
                title: '测试信息',
                created: '2023-07-18 18:32:24'
            },
            {
                title: '测试信息',
                created: '2023-07-18 18:32:24'
            },
            {
                title: '测试信息',
                created: '2023-07-18 18:32:24'
            },
            {
                title: '测试信息',
                created: '2023-07-18 18:32:24'
            },
            {
                title: '测试信息',
                created: '2023-07-18 18:32:24'
            },
            {
                title: '测试信息',
                created: '2023-07-18 18:32:24'
            },
            {
                title: '测试信息',
                created: '2023-07-18 18:32:24'
            },
            {
                title: '测试信息',
                created: '2023-07-18 18:32:24'
            },
        ];

        
        columns = [
            {
                label: 'name',
                prop: 'name'
            },
            {
                label: 'desc',
                prop: 'desc'
            },
            {
                label: 'name',
                prop: 'name'
            },
            {
                label: 'desc',
                prop: 'desc'
            },
        ];

        tableData = [
            {
                name: 'test',
                desc: '测试'
            },
            {
                name: 'test',
                desc: '测试'
            },
            {
                name: 'test',
                desc: '测试'
            },
            {
                name: 'test',
                desc: '测试'
            },
            {
                name: 'test',
                desc: '测试'
            },
        ];

        const resizeHandle = () => {
            barChart.value.resize();
            lineChart.value.resize();
            pieChart.value.resize();
        }


        onMounted(() => {
            window.addEventListener('resize', resizeHandle, null, false)
        });

        onUnmounted(() => {
            window.removeEventListener('resize', resizeHandle);
        })

        return {
            pieChart,
            pieChartOptions,
            barChart,
            barChartOptions,
            lineChart,
            lineChartOptions,
            timeLine,
            tableData,
            columns,

            resizeHandle,
        };
    },
};
</script>

<style lang="scss" scoped>
.chart-box {
    background-color: #272E43;
    border-radius: 8px;
    padding: 15px;
}
.time-list {
    height: 220px;
    margin-top: 20px;
    padding-right: 5px;
    overflow: auto;
    li {
        line-height: 2;
        &::before {
            content: '';
            display: inline-block;
            width: 5px;
            height: 5px;
            background-color: var(--bg-color);
            border-radius: 50%;
            margin-right: 10px;
        }
    }
}
</style>
