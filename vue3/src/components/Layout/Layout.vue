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
                    <use :xlink:href="'#' + item.icon"></use>
                </svg>
                <div>
                    {{ item.label }}
                </div>
            </li>
        </ul>
        <div class="fl-item radius-8 border ov-auto">
            <div id="content">
                <grid-layout
                    v-show="data.length"
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
                        :class="item.isFullScreen ? 'contain-full-screen' : ''"
                        @resize="resizeEvent(item)"
                        @resized="resizeEvent(item)"
                        @moved="resizeEvent(item)"
                        @container-resized="resizeEvent(item)"
                    >
                        <div class="full-width" :is-full-screen="item.isFullScreen">
                            <Chart
                                :node-data="item"
                                :dom-id="'chart-' + item.i"
                                :height="item.chartHeight"
                                :title="item.title"
                                :chart-type="item.type"
                                :chart-data="item.options"
                                @resize:element="resizeEvent"
                                @edit:element="editEvent"
                            />
                        </div>
                        <span class="vue-resizable-handle">
                            <i class="resize-icon iconfont icon-zhijiao"></i>
                        </span>
                        <i
                            class="remove-icon iconfont icon-delete cursor"
                            @click="removeHandle(index)"
                        ></i>
                    </grid-item>
                </grid-layout>
                <div v-show="!data.length" class="full-height fl-cen-cen no-data">
                    <!-- 拖拽左侧模块至此处 -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { nextTick, onMounted, ref, watch } from 'vue';
import { GridLayout, GridItem } from 'vue-grid-layout';
import useCalcLayout from '@/composition/useCalcLayout.js';
import Chart from '@/components/ChartComponent/Chart.vue';
export default {
    components: {
        GridLayout,
        GridItem,
        Chart,
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
        // 初始化各个元素的全屏状态为false
        layoutData.forEach(layoutDatum => {
            layoutDatum.isFullScreen = false;
        })

        let mouseXY = { x: null, y: null };
        let DragPos = { x: null, y: null, w: 1, h: 1, i: null };
        const gridlayout = ref(null);

        onMounted(() => {
            // 全局增加 dragover 事件，便于获取鼠标位置
            document.addEventListener(
                'dragover',
                function (ev) {
                    mouseXY.x = ev.clientX;
                    mouseXY.y = ev.clientY;
                },
                false,
            );

            // 主动触发窗口resize，保证图表尺寸正确
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
            }, 0);
        });

        /**
         * 拖拽事件，判断鼠标位置决定页面显示，计算新增元素位置
         * @param {*} data 
         */
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
                    let node = {
                        x: (layoutData.length * 2) % colNum,
                        // puts it at the bottom
                        y: layoutData.length + colNum,
                        w: defaultSize.w,
                        h: defaultSize.h,
                        i: 'drop',
                        ...data
                    };
                    node.title = node.i;
                    layoutData.push(node);
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

        /**
         * 结束拖拽，将数据对象加入数据列表，并放置在所选位置
         * @param {Object} data 新增数据对象 
         */
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

                    let node = {
                        x: DragPos.x,
                        y: DragPos.y,
                        w: defaultSize.w,
                        h: defaultSize.h,
                        i: DragPos.i,
                        ...data
                    };
                    node.title = node.i;
                    layoutData.push(node);

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

        /**
         * 删除 grid-item
         * @param {Number} index 元素下标
         */
        const removeHandle = function (index) {
            layoutData.splice(index, 1);
            // 更新父组件数据
            emit('update:data', layoutData);
        };

        /**
         * watch
         */
        watch(
            () => props.data,
            (val) => {
                layoutData = val;
            },
        );

        /**
         * grid-item resize
         * @param {Object} item 数据对象
         */
        const resizeEvent = function (item) {
            let dom = document.querySelector('#contain-' + item.i);
            nextTick(() => {
                item.chartHeight = dom.clientHeight - 60;
                window.dispatchEvent(new Event('resize'));
            });
        };


        const editEvent = function (data) {
            emit('edit:element', data);
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
            resizeEvent,
            editEvent,
            removeHandle,
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
        color: #121212;
        box-shadow: 2px 2px 5px rgba(95, 131, 203, 0.3);
    }
    .icon-box {
        width: 28px;
        height: 28px;
    }
}
.border {
    border: #999 1px solid;
}

#content {
    min-height: 100%;
    color: #121212;
}


.resize-icon {
    font-size: 10px;
    color: var(--text-color);
}
.remove-icon {
    display: none;
    position: absolute;
    top: 17px;
    right: 3px;
    &:hover {
        color: var(--text-color);
    }
}
.no-data {
    color: rgba($color: #999, $alpha: 0.3);
    font-size: 40px;
    letter-spacing: .5em;
}
</style>

<style lang="scss">
.vue-grid-item {
    background-color: var(--contain-bg-color);
    box-shadow: 0 0 10px rgba(95, 131, 203, 0.3);
    padding: 15px 20px 20px;
    border-radius: 8px;
    &.vue-grid-placeholder {
        background: #5F83CB !important;
    }
    & > .vue-resizable-handle {
        background: none;
        padding: 3px 0 0 0;
        transform: rotate(270deg);
    }
    &:hover .operate-icon,
    &:hover .remove-icon {
        display: block;
    }

    
    &.contain-full-screen {
        width: 100% !important;
        height: 100% !important;
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        z-index: 9999 !important;
        transform: none !important;
    }
}
</style>
