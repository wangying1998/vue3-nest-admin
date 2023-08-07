<template>
    <div>
        <el-tree
            ref="tree"
            :data="props.data"
            :node-key="props.nodeKey"
            :props="props.defaultProps"
            empty-text="无数据"
            :show-checkbox="props.showCheckbox"
            :highlight-current="props.highlightCurrent"
            @node-click="nodeClick"
        ></el-tree>
    </div>
</template>

<script>
import { ref } from "vue";

export default {
    props: {
        data: {
            type: Object,
            default: () => {}
        },
        nodeKey: {
            type: String,
            default: ''
        },
        defaultProps: {
            type: Object,
            default: () => {}
        },
        showCheckbox: {
            type: Boolean,
            default: false
        },
        highlightCurrent: {
            type: Boolean,
            default: true
        }
    },
    emits: ['nodeClick'],
    setup(props, { emit }) {
        let tree = ref();
        
        const nodeClick = () => {
            emit('nodeClick');
        }

        return {
            props,

            tree,

            nodeClick,
        };
    },
};
</script>

<style lang="scss" scoped></style>
