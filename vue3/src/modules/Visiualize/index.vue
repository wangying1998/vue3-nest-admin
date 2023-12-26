<template>
    <div class="full-width full-height fl-item fl-sta-bet">
        <Layout
            ref="layout"
            class="fl-item"
            :data="chartStore.chartData"
            :drag-element-list="dragElementList"
            @edit:chart="editChartHandle"
            @sync:data="syncModuleData"
        ></Layout>
        <ConfigModule
            ref="configModule"
            v-show="isEdit"
            :active-module="editModule"
            :active-module-index="editIndex"
            @refresh:chart="refreshChart"
            @close="closeHandle"
        />
    </div>
</template>

<script>
import { nextTick, ref } from 'vue';
import Layout from '@/components/Layout/Layout.vue';
import { TypeList, DefaultOption } from '../../config/chartTypes';
import ConfigModule from './ConfigModule/index.vue';
import { useChartStore } from '../../store/layout-chart';

export default {
    components: {
        Layout,
        ConfigModule,
    },
    setup() {
        let data = ref([]);
        // 初始数据请求
        data.value = [
            {
                x: 0,
                y: 0,
                w: 6,
                h: 6,
                i: '0',
                chartHeight: 200,
                type: 'line',
                theme: 'classic',
                titleOptions: {
                    title: '趋势图',
                    show: true,
                    fontSize: 14,
                    color: '#121212',
                },
                options: {
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
                            data: [
                                116, 129, 135, 86, 73, 85, 73, 68, 92, 130, 245,
                            ],
                        },
                        {
                            data: [
                                139, 115, 111, 309, 206, 137, 128, 85, 94, 71,
                                106,
                            ],
                        },
                        {
                            data: [
                                84, 93, 85, 73, 83, 125, 107, 82, 44, 72, 106,
                            ],
                        },
                        {
                            data: [
                                66, 91, 92, 113, 107, 131, 111, 64, 69, 88, 77,
                            ],
                        },
                    ],
                },
            },
            {
                x: 6,
                y: 0,
                w: 6,
                h: 6,
                i: '1',
                chartHeight: 200,
                type: 'bar',
                theme: 'vibrant',
                titleOptions: {
                    title: '柱状图',
                    show: true,
                    fontSize: 14,
                    color: '#121212',
                },
                options: {
                    axis: [
                        '2000-06-05',
                        '2000-06-06',
                        '2000-06-07',
                        '2000-06-08',
                        '2000-06-09',
                        '2000-06-10',
                    ],
                    series: [
                        {
                            data: [116, 129, 135, 86, 73, 85],
                        },
                        {
                            data: [139, 115, 111, 109, 156, 137],
                        },
                    ],
                },
            },
            {
                x: 0,
                y: 6,
                w: 6,
                h: 6,
                i: '2',
                chartHeight: 200,
                type: 'pie',
                theme: 'bright',
                titleOptions: {
                    title: '饼图',
                    show: true,
                    fontSize: 14,
                    color: '#121212',
                },
                options: {
                    axis: ['测试数据', 'data1', 'data2', 'data3'],
                    series: [
                        {
                            data: [95, 56, 56, 56],
                        },
                    ],
                },
            },
            {
                x: 6,
                y: 6,
                w: 6,
                h: 6,
                i: '3',
                chartHeight: 200,
                type: 'xbar',
                theme: 'default',
                titleOptions: {
                    title: '横向柱状图',
                    show: true,
                    fontSize: 14,
                    color: '#121212',
                },
                options: {
                    axis: [
                        '2000-06-05',
                        '2000-06-06',
                        '2000-06-07',
                        '2000-06-08',
                        '2000-06-09',
                        '2000-06-10',
                    ],
                    series: [
                        {
                            data: [116, 129, 135, 86, 73, 85],
                        },
                    ],
                },
            },
        ];

        let chartStore = useChartStore();
        // 初始化数据
        chartStore.initChartData(data.value);

        let dragElementList = ref([]);
        dragElementList.value = TypeList.map((item) => {
            return {
                ...item,
                ...DefaultOption,
            };
        });

        let configModule = ref();

        // 当前编辑的数据模块和对应下标
        let editModule = ref();
        let editIndex = ref();

        let layout = ref();

        let isEdit = ref(false);

        const editChartHandle = function (index, data) {
            editIndex.value = index;
            editModule.value = data;

            isEdit.value = true;
            nextTick(() => {
                window.dispatchEvent(new Event('resize'));
            });
        };

        // 数据编辑前后的同步问题

        /**
         * 数据编辑后，对视图进行更新
         * @param {*} index
         * @param {*} data
         */
        const refreshChart = function (index, data) {
            layout.value.refreshChart(index, data);
        };

        const closeHandle = function() {
            isEdit.value = false;
            // 主动触发窗口resize，保证图表尺寸正确
            nextTick(() => {
                window.dispatchEvent(new Event('resize'));
            });
        };

        const syncModuleData = function (data) {
            editModule.value = data;
        };

        return {
            chartStore,

            data,
            dragElementList,
            configModule,
            editModule,
            editIndex,

            layout,
            isEdit,

            editChartHandle,
            refreshChart,
            closeHandle,
            syncModuleData,
        };
    },
};
</script>
