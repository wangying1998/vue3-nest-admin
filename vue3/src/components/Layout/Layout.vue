<template>
    <div class="full-height flex">
        <ul class="side-box fl-sta-cen fl-col mr-r-20 radius-8">
            <li
                v-for="(item, index) in dragElementList"
                :key="index"
                class="element fl-sta-cen cursor-move radius-8"
                draggable="true"
                unselectable="true"
                @drag="drag(item)"
                @dragend="dragend(item)"
            >
                <svg class="icon-box mr-r-10" aria-hidden="true">
                    <use :xlink:href="item.icon"></use>
                </svg>
                <div>
                    {{ item.label }}
                </div>
            </li>
        </ul>
        <div class="fl-item radius-8 border">
            <div id="content">
                <grid-layout
                    v-if="data.length"
                    ref="gridlayout"
                    :layout="data"
                    :col-num="colNum"
                    :row-height="rowHeight"
                    :is-draggable="isDraggable"
                    :is-resizable="isResizable"
                    :is-mirrored="isMirrored"
                    :vertical-compact="verticalCompact"
                    :margin="margin"
                    :use-css-transforms="useCssTransforms"
                >
                    <grid-item
                        v-for="(item, index) in data"
                        :key="item.i"
                        :i="item.i"
                        :x="item.x"
                        :y="item.y"
                        :w="item.w"
                        :h="item.h"
                        :id="'contain-' + item.i"
                        @resize="resizeEvent(item)"
                        @resized="resizeEvent(item)"
                        @moved="movedEvent"
                        @container-resized="containerResizedEvent"
                    >
                        <div class="full-width" v-if="item.type === 'line'">
                            <LineChart
                                :dom-id="'chart-' + item.i"
                                :height="item.chartHeight"
                            />
                        </div>
                        <div class="full-width" v-else-if="item.type === 'bar'">
                            <BarChart
                                :dom-id="'chart-' + item.i"
                                :height="item.chartHeight"
                            />
                        </div>
                        <div class="full-width" v-else-if="item.type === 'pie'">
                            <PieChart
                                :dom-id="'chart-' + item.i"
                                :height="item.chartHeight"
                            />
                        </div>
                        <div v-else>
                            {{ item.i }}
                        </div>

                        <i
                            class="remove-icon iconfont icon-jianqu"
                            @click="removeItem(index)"
                        ></i>
                        <span class="vue-resizable-handle">
                            <i class="resize-icon iconfont icon-zhijiao"></i>
                        </span>
                    </grid-item>
                </grid-layout>
                <div v-else class="full-height fl-cen-cen no-data">
                    拖拽左侧模块至此处
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { nextTick, onMounted, ref, watch } from 'vue';
import { GridLayout, GridItem } from 'vue-grid-layout';
import useCalcLayout from '@/composition/useCalcLayout.js';
import LineChart from '../../components/charts/LineChart.vue';
import BarChart from '../../components/charts/BarChart.vue';
import PieChart from '../../components/charts/PieChart.vue';
export default {
    components: {
        GridLayout,
        GridItem,
        LineChart,
        BarChart,
        PieChart,
    },
    props: {
        data: {
            type: Array,
            default: () => [],
        },
        dragElementList: {
            type: Array,
            default: () => [],
        },
    },
    setup(props, { emit }) {
        /**
            let gridItem = {
                i: '元素id',
                // 元素位于第几列，自然数
                x: 0,
                // 元素位于第几行，自然数
                y: 0,
                // 元素 初始宽度
                w: 100,
                // 元素 初始高度
                h: 300,
            };
         */
        let {
            containerWidth,
            margin,
            colNum,
            rowHeight,
            maxRows,
            innerW,
            innerH,
            isDraggable,
            isResizable,
            isMirrored,
            verticalCompact,
            useCssTransforms,
            defaultSize,
            calcXY,
        } = useCalcLayout();

        let layoutData = props.data;

        let mouseXY = { x: null, y: null };
        let DragPos = { x: null, y: null, w: 1, h: 1, i: null };
        const gridlayout = ref(null);

        onMounted(() => {
            document.addEventListener(
                'dragover',
                function (ev) {
                    mouseXY.x = ev.clientX;
                    mouseXY.y = ev.clientY;
                },
                false,
            );

            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
            }, 0);
        });

        const drag = function (data) {
            nextTick(() => {
                let parentRect = document
                    .getElementById('content')
                    .getBoundingClientRect();
                // 判断鼠标是否移动到 content 区域内
                let mouseInGrid = false;
                if (
                    mouseXY.x > parentRect.left &&
                    mouseXY.x < parentRect.right &&
                    mouseXY.y > parentRect.top &&
                    mouseXY.y < parentRect.bottom
                ) {
                    mouseInGrid = true;
                }

                // 如果移动到 content 内，生成一个元素
                if (
                    mouseInGrid === true &&
                    layoutData.findIndex((item) => item.i === 'drop') === -1
                ) {
                    layoutData.push({
                        x: (layoutData.length * 2) % colNum,
                        // puts it at the bottom
                        y: layoutData.length + colNum,
                        w: defaultSize.w,
                        h: defaultSize.h,
                        i: 'drop',
                        type: data.type,
                        chartHeight: data.chartHeight
                    });
                }

                let index = layoutData.findIndex((item) => item.i === 'drop');

                if (index !== -1) {
                    try {
                        gridlayout.value.$refs.item.children[
                            layoutData.length - 1
                        ].style.display = 'none';
                    } catch (err) {
                        console.log(err);
                    }
                    let el = gridlayout.value.$refs.item.children[index];

                    // 计算相对位置
                    el.dragging = {
                        top: mouseXY.y - parentRect.top,
                        left: mouseXY.x - parentRect.left,
                    };

                    containerWidth.value =
                        document.querySelector('#content').clientWidth;
                    // 转换成 容器范围内的位置
                    let new_pos = calcXY(
                        mouseXY.y - parentRect.top,
                        mouseXY.x - parentRect.left,
                    );

                    if (mouseInGrid === true) {
                        gridlayout.value.dragEvent(
                            'dragstart',
                            'drop',
                            new_pos.x,
                            new_pos.y,
                            defaultSize.h,
                            defaultSize.w,
                        );
                        DragPos.i = Math.random().toString(36).substr(2);
                        DragPos.x = layoutData[index].x;
                        DragPos.y = layoutData[index].y;
                    }

                    if (mouseInGrid === false) {
                        gridlayout.value.dragEvent(
                            'dragend',
                            'drop',
                            new_pos.x,
                            new_pos.y,
                            defaultSize.w,
                            defaultSize.h,
                        );
                        layoutData = layoutData.filter(
                            (obj) => obj.i !== 'drop',
                        );
                        emit('update:data', layoutData);
                    }
                }
            });
        };

        const dragend = function (data) {
            nextTick(() => {
                let parentRect = document
                    .getElementById('content')
                    .getBoundingClientRect();
                let mouseInGrid = false;
                if (
                    mouseXY.x > parentRect.left &&
                    mouseXY.x < parentRect.right &&
                    mouseXY.y > parentRect.top &&
                    mouseXY.y < parentRect.bottom
                ) {
                    mouseInGrid = true;
                }
                if (mouseInGrid === true) {
                    gridlayout.value.dragEvent(
                        'dragend',
                        'drop',
                        DragPos.x,
                        DragPos.y,
                        defaultSize.w,
                        defaultSize.h,
                    );
                    layoutData = layoutData.filter((obj) => obj.i !== 'drop');

                    layoutData.push({
                        x: DragPos.x,
                        y: DragPos.y,
                        w: defaultSize.w,
                        h: defaultSize.h,
                        i: DragPos.i,
                        type: data.type,
                        chartHeight: data.chartHeight
                    });

                    emit('update:data', layoutData);

                    gridlayout.value.dragEvent(
                        'dragend',
                        DragPos.i,
                        DragPos.x,
                        DragPos.y,
                        defaultSize.w,
                        defaultSize.h,
                    );

                    // try {
                    //     gridlayout.value.$refs.item.children[
                    //         layoutData.length
                    //     ].$refs.item.style.display = 'block';
                    // } catch (err) {
                    //     console.error(err);
                    // }
                    mouseXY = { x: null, y: null };
                    DragPos = { x: null, y: null, w: 3, h: 4, i: null };
                    nextTick(() => {
                        window.dispatchEvent(new Event('resize'));
                    });
                }
            });
        };

        const removeItem = function (index) {
            layoutData.splice(index, 1);
            emit('update:data', layoutData);
        };

        // watch
        watch(
            () => props.data,
            (val) => {
                layoutData = val;
            },
        );

        const resizeEvent = function (item) {
            let dom = document.querySelector('#contain-' + item.i);
            nextTick(() => {
                item.chartHeight = dom.clientHeight - 60;
                window.dispatchEvent(new Event('resize'));
            });
        };
        const movedEvent = function () {
            nextTick(() => {
                window.dispatchEvent(new Event('resize'));
            });
        };
        const containerResizedEvent = function () {
            nextTick(() => {
                window.dispatchEvent(new Event('resize'));
            });
        };

        return {
            props,
            gridlayout,
            layoutData,

            // useCalcLayout
            margin,
            colNum,
            rowHeight,
            maxRows,
            innerW,
            innerH,
            isDraggable,
            isResizable,
            isMirrored,
            verticalCompact,
            useCssTransforms,

            drag,
            dragend,
            removeItem,
            resizeEvent,
            movedEvent,
            containerResizedEvent,
        };
    },
};
</script>

<style lang="scss" scoped>
.side-box {
    width: 180px;
    border: #999 1px solid;
    .element {
        width: 90%;
        height: 50px;
        padding: 10px;
        margin-top: 10px;
        background-color: #fff;
        color: #121212;
    }
    .icon-box {
        width: 28px;
        height: 28px;
    }
}
#content {
    height: 100%;
    border: #999 1px solid;
}
.remove-icon {
    position: absolute;
    right: -5px;
    top: -5px;
    font-size: 20px;
    cursor: pointer;
    color: var(--text-color);
}
.resize-icon {
    color: var(--text-color);
    font-size: 10px;
}
.no-data {
    color: rgba($color: #ffffff, $alpha: 0.3);
    font-size: 40px;
    letter-spacing: .5em;
}
</style>

<style lang="scss">
.vue-grid-item {
    background-color: #272e43;
    padding: 20px;
    border-radius: 8px;
}
.vue-grid-item.vue-grid-placeholder {
    background: #fff !important;
}
.vue-grid-item > .vue-resizable-handle {
    background: none;
    padding: 3px 0 0 0;
    transform: rotate(270deg);
}
</style>
