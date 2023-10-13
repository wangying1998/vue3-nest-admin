<template>
    <div class="full-height flex fl-col">
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
                <!-- <grid-layout ref="gridlayout" :data="data"></grid-layout> -->

                <grid-layout
                    ref="gridlayout"
                    class="fl-item"
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
                        ref="griditem"
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
// import GridLayout from '@/components/Layout/GridLayout.vue';
import { nextTick, onMounted, ref } from 'vue';
import { GridLayout, GridItem } from 'vue-grid-layout';
import useCalcLayout from '@/composition/useCalcLayout.js';
export default {
    components: {
        GridLayout,
        GridItem,
    },
    setup() {
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
            calcXY
        } = useCalcLayout();

        let data = ref([]);
        data.value = [
            {
                x: 0,
                y: 0,
                w: 4,
                h: 6,
                i: '0',
            },
            {
                x: 4,
                y: 0,
                w: 4,
                h: 6,
                i: '1',
            },
            {
                x: 8,
                y: 0,
                w: 4,
                h: 6,
                i: '2',
            },
        ];

        let mouseXY = { x: null, y: null };
        let DragPos = { x: null, y: null, w: 3, h: 4, i: null };
        const gridlayout = ref(null);

        onMounted(() => {
            document.addEventListener(
                'dragover',
                function (ev) {
                    mouseXY.x = ev.clientX;
                    mouseXY.y = ev.clientY;
                    // console.log(mouseXY);
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
                    data.value.findIndex((item) => item.i === 'drop') === -1
                ) {
                    data.value.push({
                        x: (data.value.length * 2) % colNum,
                        y: data.value.length + colNum,
                        w: defaultSize.w,
                        h: defaultSize.h,
                        i: 'drop',
                    });
                }

                let index = data.value.findIndex((item) => item.i === 'drop');

                if (index !== -1) {
                    try {
                        // console.log(111, gridlayout.value)

                        gridlayout.value.$refs.item.children[
                            data.value.length
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
                    // 转换成 框框范围内的位置
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
                            defaultSize.w,
                            defaultSize.h,
                        );
                        // console.log(222222222, data.value[index]);
                        DragPos.i = String(index);
                        DragPos.x = data.value[index].x;
                        DragPos.y = data.value[index].y;
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
                        data.value = data.value.filter(
                            (obj) => obj.i !== 'drop',
                        );
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
                    console.log(
                        `Dropped element props:\n${JSON.stringify(
                            DragPos,
                            ['x', 'y', 'w', 'h'],
                            2,
                        )}`,
                    );
                    gridlayout.value.dragEvent(
                        'dragend',
                        'drop',
                        DragPos.x,
                        DragPos.y,
                        defaultSize.w,
                        defaultSize.h,
                    );
                    data.value = data.value.filter((obj) => obj.i !== 'drop');
                    
                    data.value.push({
                        x: DragPos.x,
                        y: DragPos.y,
                        w: defaultSize.w,
                        h: defaultSize.h,
                        i: DragPos.i,
                    });
                    
                    gridlayout.value.dragEvent(
                        'dragend',
                        DragPos.i,
                        DragPos.x,
                        DragPos.y,
                        defaultSize.w,
                        defaultSize.h,
                    );
                    try {
                        gridlayout.value.$refs.item.children[data.value.length].$refs.item.style.display="block";
                    } catch {
                    }

                    // UNCOMMENT below if you want to add a grid-item
                    /*
                    data.value.push({
                        x: DragPos.x,
                        y: DragPos.y,
                        w: 1,
                        h: 1,
                        i: DragPos.i,
                    });
                    gridlayout.value.dragEvent('dragend', DragPos.i, DragPos.x,DragPos.y,1,1);
                    try {
                        gridlayout.value.$refs.item.children[data.value.length].$refs.item.style.display="block";
                    } catch {
                    }
                    */
                }
            });
        };

        return {
            data,
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
    // border: 1px solid;
    background-color: azure;
    color: #121212;
}
#content {
    border: 1px solid;
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
