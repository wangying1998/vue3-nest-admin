<template>
    <div class="contain-box">
        <ChartHeader
            :title="title"
            v-show="headerShow"
            :node-data="nodeData"
            @resize:element="resizeElement"
            @edit:element="editElement"
        />
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
import { onMounted, onUnmounted, } from 'vue';
import useChartOption from '../../composition/useChartOption.js';

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
        title: {
            type: String,
            default: 'Title',
        },
        // 图表高度
        height: {
            type: Number,
            default: 240,
        },
        // 是否显示 表头信息
        headerShow: {
            type: Boolean,
            default: true,
        },
        // 拖拽节点数据 grid-item
        nodeData: {
            type: Object,
            default: () => ({}),
        },
        // 图表类型
        chartType: {
            type: String,
            default: 'bar'
        },
        // 图表数据
        chartData: {
            type: Object,
            default: () => ({}),
        },
    },
    setup(props, { emit }) {
        let chart = null;
        
        let { generateChartConfig } = useChartOption();

        let chartOptions = generateChartConfig({
            type: props.chartType,
            ...props.chartData
        });

        /**
         * 初始化画布
         */
        const initChart = () => {
            chart && chart.clear();
        };

        /**
         * 绘制图表
         */
        const draw = () => {
            chart = echarts.init(document.getElementById(props.domId));
            chart.setOption(chartOptions);
        };

        /**
         * 窗口resize事件，触发图标resize，自适应尺寸
         */
        const resize = () => {
            setTimeout(() => {
                chart && chart.resize();
            }, 0);
        };

        const resizeElement = function (data) {
            emit('resize:element', data);
        };

        const editElement = function (data) {
            emit('edit:element', data);
        };

        onMounted(() => {
            initChart();
            draw();
            window.addEventListener('resize', resize, null, false);
        });

        onUnmounted(() => {
            window.removeEventListener('resize', resize);
        });

        return {
            props,
            resize,
            resizeElement,
            editElement,
        };
    },
};
</script>

<style lang="scss" scoped></style>
