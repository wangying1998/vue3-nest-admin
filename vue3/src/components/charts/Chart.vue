<template>
    <div class="chart-box">
        <ChartHeader :title="chartOptions.title" />
        <div
            :id="domId"
            :style="{ width: '100%', height: height + 'px' }"
        ></div>
    </div>
</template>

<script>
import ChartHeader from "./ChartHeader.vue";

import * as echarts from "echarts/core";
import { BarChart, LineChart, PieChart } from "echarts/charts";
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
} from "echarts/components";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { onMounted, ref } from "vue";

echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
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
        domId: {
            type: String,
            default: "",
        },
        height: {
            type: Number,
            default: 240,
        },
        chartOptions: {
            type: Object,
            default: () => {},
        },
    },
    setup(props, { emit }) {
        let chart = null;

        const initChart = () => {
            chart && chart.clear();
        };

        const draw = () => {
            chart = echarts.init(document.getElementById(props.domId));
            chart.setOption(props.chartOptions.options);
        };

        const resize = () => {
            chart && chart.resize();
        };

        onMounted(() => {
            initChart();
            draw();
        });

        return {
            props,
            resize,
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
</style>
