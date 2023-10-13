<template>
    <grid-layout
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
</template>

<script>
import { GridLayout, GridItem } from 'vue-grid-layout';
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
        // 栅格布局的列数
        colNum: {
            type: Number,
            default: 12,
        },
        // 栅格布局的行高
        rowHeight: {
            type: Number,
            default: 30,
        },
        // 栅格布局的间距
        margin: {
            type: Array,
            default: () => [10, 10]
        },
        // 元素是否可拖拽
        isDraggable: {
            type: Boolean,
            default: true,
        },
        // 元素是否可调整大小
        isResizable: {
            type: Boolean,
            default: true,
        },
        // 栅格中的元素是否可镜像反转
        isMirrored: {
            type: Boolean,
            default: false,
        },
        // 布局是否垂直压缩
        verticalCompact: {
            type: Boolean,
            default: true,
        },
        // 标识是否使用CSS属性 transition-property: transform;
        useCssTransforms: {
            type: Boolean,
            default: true,
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
        
        
        return {
            props
        };
    },
};
</script>

<style lang="scss">
.vue-grid-item {
    color: #121212;
    background-color: #FFFFFF;
    padding: 10px;
}
.vue-grid-item.vue-grid-placeholder {
    background: #85d5fd !important;
}
</style>
