<template>
    <div class="full-height flex">
        <div class="side-box fl-sta-cen fl-col">
            <div
                class="element fl-cen-cen cursor"
                draggable="true"
                unselectable="true"
                @drag="drag"
                @dragend="dragend"
            >
                元素
            </div>
        </div>
        <div class="fl-item">
            <div id="content">
                <grid-layout
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
                        v-for="item in data"
                        :key="item.i"
                        :i="item.i"
                        :x="item.x"
                        :y="item.y"
                        :w="item.w"
                        :h="item.h"
                    >
                        {{ item.i }}
                    </grid-item>
                </grid-layout>
            </div>
        </div>
    </div>
</template>

<script>
import { nextTick, onMounted, ref } from 'vue';
import { GridLayout, GridItem } from 'vue-grid-layout';
import useCalcLayout from '@/composition/useCalcLayout.js';
export default {
    components: {
        GridLayout,
        GridItem,
    },
    props: {
        data: {
            type: Array,
            default: () => []
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
        });

        const drag = function (e) {
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
                        DragPos.i = String(index);
                        DragPos.x = layoutData[index].x;
                        DragPos.y = layoutData[index].y;
                    }

                    if (mouseInGrid === false) {
                        console.log(101010101010, false)
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

        const dragend = function (e) {
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
                    
                    // console.log(gridlayout.value.$refs.item)
                    // try {
                    //     gridlayout.value.$refs.item.children[
                    //         layoutData.length
                    //     ].$refs.item.style.display = 'block';
                    // } catch (err) {
                    //     console.log(err);
                    // }
                    mouseXY = { x: null, y: null };
                    DragPos = { x: null, y: null, w: 3, h: 4, i: null };
                }
            });
        };

        
        return {
            props,
            gridlayout,

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
        };
    },
};
</script>

<style lang="scss" scoped>
.side-box {
    width: 200px;
    border: 1px solid;
}
.element {
    width: 50%;
    height: 50px;
    margin-top: 10px;
    background-color: azure;
    color: #121212;
}
#content {
    // border: 1px solid;
}
</style>

<style lang="scss">
.vue-grid-item {
    color: #121212;
    background-color: #ffffff;
    padding: 10px;
}
.vue-grid-item.vue-grid-placeholder {
    background: #85d5fd !important;
}
</style>
