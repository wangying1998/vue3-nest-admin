<template>
    <div class="contain-box">
        <!-- :title="titleOptions.title"
        :show-title="titleOptions.show"
        :title-color="titleOptions.color"
        :font-size="titleOptions.fontSize" -->
        <!-- <ChartHeader
            :node-data="nodeData"
            :node-index="nodeIndex"
            @resize="resizeHandle"
            @edit="editHandle"
            @refresh="refreshHandle"
        /> -->
        <div
            :id="domId"
            :style="{ width: '100%', height: height + 'px' }"
        ></div>
    </div>
</template>

<script>
import ChartHeader from './ChartHeader.vue';

import * as echarts from 'echarts/core';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    LegendComponent,
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { nextTick, onMounted, onUnmounted } from 'vue';
import useChartOption from '../../composition/useChartOption.js';
import { useChartStore } from '../../store/layout-chart';

echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    LegendComponent,
    BarChart,
    LineChart,
    PieChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
]);

export default {
    components: [ChartHeader],
    props: {
        // 元素id
        domId: {
            type: String,
            default: '',
        },
        // 图表title
        titleOptions: {
            type: Object,
            default: () => ({
                title: '标题',
                show: true,
                fontSize: 14,
                color: '#121212',
            }),
        },
        // 图表高度
        height: {
            type: Number,
            default: 240,
        },
        // 图表类型
        chartType: {
            type: String,
            default: 'bar'
        },
        // 图表主题
        chartTheme: {
            type: String,
            default: ''
        },
        // 图表颜色
        chartColor: {
            type: Array,
            default: []
        },
        // 图表数据
        chartData: {
            type: Object,
            default: () => ({}),
        },
        // layout 节点数据
        nodeData: {
            type: Object,
            default: () => ({}),
        },
        // layout 节点下标
        nodeIndex: {
            type: Number,
            default: 0,
        },
    },
    setup(props, { emit }) {
        let chart = null;
        let chartStore = useChartStore();
        
        let { generateChartConfig } = useChartOption();

        /**
         * 初始化画布
         */
        const initChart = () => {
            chart && chart.clear();
        };

        /**
         * 绘制图表
         */
        const draw = (domId, options) => {
            initChart();
            nextTick(() => {
                if(!chart) {
                    chart = echarts.init(document.getElementById(domId));
                }
                chart.setOption(options, true);
            })
        };

        /**
         * 窗口resize事件，触发图标resize，自适应尺寸
         */
        const resize = () => {
            setTimeout(() => {
                chart && chart.resize();
            }, 0);
        };

        /**
         * 全屏/非全屏
         * @param {*} index 
         * @param {*} data 
         */
        const resizeHandle = function (index, data) {
            emit('resize:chart', index, data);
        };

        /**
         * 编辑按钮
         * @param {*} index 
         * @param {*} data 
         */
        const editHandle = function (index, data) {
            emit('edit:chart', index, data);
        };

        /**
         * 点击刷新/更新配置后需要触发刷新
         * @param {*} index 
         * @param {*} data 
         */
        const refreshHandle = function (index, data) {
            let option = generateChartConfig({
                type: data.type,
                color: data.color,
                theme: data.theme,
                titleOptions: data.titleOptions,
                ...data.options
            });
            draw('chart-' + data.i, option);
        };

        onMounted(() => {
            let chartOptions = generateChartConfig({
                type: props.chartType,
                color: props.chartColor,
                theme: props.chartTheme,
                titleOptions: props.titleOptions,
                ...props.chartData
            });
            draw(props.domId, chartOptions);

            window.addEventListener('resize', resize, null, false);
        });

        onUnmounted(() => {
            window.removeEventListener('resize', resize);
        });

        return {
            props,
            chartStore,

            resize,
            resizeHandle,
            editHandle,
            refreshHandle,
        };
    },
};
</script>

<style lang="scss" scoped></style>
