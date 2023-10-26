<template>
    <div class="contain-box">
        <ChartHeader :title="chartOptions.title" v-show="headerShow" />
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
import { nextTick, onMounted, onUnmounted, ref } from "vue";

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
        headerShow: {
            type: Boolean,
            default: true,
        }
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
            setTimeout(() => {
                chart && chart.resize();
            }, 0);
        };

        onMounted(() => {
            console.log(123456)
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
        };
    },
};
</script>

<style lang="scss" scoped>
.contain-box {
    // background-color: transparent;
    // background-color: #272E43;
    // border-radius: 8px;
    // padding: 15px;
}
</style>
