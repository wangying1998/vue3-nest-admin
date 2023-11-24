<template>
    <div class="fl-bet-cen title-contain">
        <div class="chart-title">{{ title }}</div>
        <div class="fl-sta-cen operate-icon">
            <i class="iconfont icon-edit" @click="operateHandle('edit')"></i>
            <i class="iconfont icon-shuaxin" @click="operateHandle('refresh')"></i>
            <i v-show="nodeData.isFullScreen" class="iconfont icon-quxiaoquanping" @click="operateHandle('closefullScreen')"></i>
            <i v-show="!nodeData.isFullScreen" class="iconfont icon-quanping" @click="operateHandle('fullScreen')"></i>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: '',
        },
        nodeData: {
            type: Object,
            default: () => ({}),
        },
        layoutData: {
            type: Object,
            default: () => ({})
        },
    },
    setup(props, { emit }) {
        const operateHandle = function (operate) {
            chartOperate(operate, props.nodeData);
        };

        const chartOperate = function (operate, data) {
            if (operate === 'edit') {
                // data: 元素本身
                emit('edit:element', data);
            } else if (operate === 'refresh') {
                // data: 元素本身
            } else if (operate === 'fullScreen') {
                // data: 元素本身
                data.isFullScreen = true;
                emit('resize:element', data);
            } else if (operate === 'closefullScreen') {
                // data: 元素本身
                data.isFullScreen = false;
                emit('resize:element', data);
            }
        };

        return {
            props,
            operateHandle,
        };
    },
};
</script>

<style lang="scss" scoped>
.title-contain {
    height: 23px;
    line-height: 23px;
    overflow: hidden;
    .chart-title {
        &::before {
            content: '';
            display: inline-block;
            width: 8px;
            height: 8px;
            margin-right: 5px;
            border-radius: 3px;
            background-color: var(--bg-color);
        }
    }
    .operate-icon {
        cursor: pointer;
        letter-spacing: 3px;
        display: none;
        i:hover {
            color: var(--text-color);
        }
    }
}
</style>
