<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="chart-box">
                    <Chart dom-id="pie-chart" :title="pieChartData.title" :chart-type="pieChartData.type" :chartData="pieChartData.data" />
                </div>
            </el-col>
            <el-col :span="12">
                <div class="chart-box">
                    <Chart dom-id="bar-chart" :title="xBarChartData.title" :chart-type="xBarChartData.type" :chartData="xBarChartData.data" />
                </div>
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
                <div class="chart-box">
                    <Chart dom-id="line-chart" :title="lineChartData.title" :chart-type="lineChartData.type" :chartData="lineChartData.data" />
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { ref } from "vue";
import ChartHeader from "../../components/ChartComponent/ChartHeader.vue";
import Table from '../../components/TableComponent/Table.vue';
import Chart from "../../components/ChartComponent/Chart.vue";

export default {
    components: {
        Chart,
        ChartHeader,
        Table,
    },
    setup() {
        let timeLine = new ref([]);
        let tableData = new ref([]);
        let columns = new ref([]);

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

        
        let lineChartData = {
            type: 'line',
            title: '趋势图',
            data: {
                axis: [
                    '2000-06-05',
                    '2000-06-06',
                    '2000-06-07',
                    '2000-06-08',
                    '2000-06-09',
                    '2000-06-10',
                    '2000-06-11',
                    '2000-06-12',
                    '2000-06-13',
                    '2000-06-14',
                    '2000-06-15',
                ],
                series: [
                    {
                        data: [116, 129, 135, 86, 73, 85, 73, 68, 92, 130, 245],
                    },
                    {
                        data: [139, 115, 111, 309, 206, 137, 128, 85, 94, 71, 106],
                    },
                    {
                        data: [84, 93, 85, 73, 83, 125, 107, 82, 44, 72, 106],
                    },
                    {
                        data: [66, 91, 92, 113, 107, 131, 111, 64, 69, 88, 77],
                    },
                ],
            }
        };
        
        let xBarChartData = {
            type: 'xbar',
            title: '柱状图',
            data: {
                axis: [
                    "2000-06-05",
                    "2000-06-06",
                    "2000-06-07",
                    "2000-06-08",
                    "2000-06-09",
                    "2000-06-10",
                ],
                series: [
                    {
                        data: [116, 129, 135, 86, 73, 85],
                    },
                ],
            }
        };

        let pieChartData = {
            type: 'pie',
            title: '环形图',
            data: {
                axis: ['测试数据', 'data1', 'data2', 'data3'],
                series: [
                    {
                        data: [95, 56, 56, 56],
                    },
                ],
            }
        };

        return {
            timeLine,
            tableData,
            columns,

            lineChartData,
            xBarChartData,
            pieChartData,
        };
    },
};
</script>

<style lang="scss" scoped>
.chart-box {
    color: #fff;
    background-color: var(--contain-bg-color);
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
