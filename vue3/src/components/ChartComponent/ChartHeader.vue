<template>
    <div class="fl-sta-cen fl-row-reverse full-width title-contain">
        <div class="chart-title fl-item" v-show="showTitle" :style="{
            'font-size': fontSize + 'px',
            'color': titleColor
        }">
            {{ title }}
        </div>
        <!-- <div class="fl-item"></div> -->
        <div class="fl-sta-cen operate-icon">
            <i class="iconfont icon-edit" @click="operateHandle('edit')"></i>
            <i
                class="iconfont icon-shuaxin"
                @click="operateHandle('refresh')"
            ></i>
            <i
                v-show="nodeData.isFullScreen"
                class="iconfont icon-quxiaoquanping"
                @click="operateHandle('closefullScreen')"
            ></i>
            <i
                v-show="!nodeData.isFullScreen"
                class="iconfont icon-quanping"
                @click="operateHandle('fullScreen')"
            ></i>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        // title: {
        //     type: String,
        //     default: '标题',
        // },
        // // 文字颜色
        // titleColor: {
        //     type: String,
        //     default: '#121212',
        // },
        // // 文字字号
        // fontSize: {
        //     type: Number,
        //     default: 14,
        // },
        // showTitle: {
        //     type: Boolean,
        //     default: true,
        // },
        nodeData: {
            type: Object,
            default: () => ({}),
        },
        nodeIndex: {
            type: Number,
            default: 0,
        },
        layoutData: {
            type: Object,
            default: () => ({}),
        },
    },
    setup(props, { emit }) {
        const operateHandle = function (operate) {
            chartOperate(operate, props.nodeIndex, props.nodeData);
        };

        const chartOperate = function (operate, index, data) {
            if (operate === 'edit') {
                // data: 元素本身
                emit('edit', index, data);
            } else if (operate === 'refresh') {
                // data: 元素本身
                emit('refresh', index, data);
            } else if (operate === 'fullScreen') {
                // data: 元素本身
                data.isFullScreen = true;
                emit('resize', index, data);
            } else if (operate === 'closefullScreen') {
                // data: 元素本身
                data.isFullScreen = false;
                emit('resize', index, data);
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
