<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="chart-box">
                    <PieChart />
                </div>
            </el-col>
            <el-col :span="12">
                <div class="chart-box">
                    <BarChart />
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
                    <LineChart />
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { ref } from "vue";
import ChartHeader from "../../components/charts/ChartHeader.vue";
import Table from '../../components/TableComponent/Table.vue';
import LineChart from "../../components/charts/LineChart.vue";
import BarChart from "../../components/charts/BarChart.vue";
import PieChart from "../../components/charts/PieChart.vue";

export default {
    components: {
        LineChart,
        BarChart,
        PieChart,
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

        return {
            timeLine,
            tableData,
            columns,
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
