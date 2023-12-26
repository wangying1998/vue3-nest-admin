<template>
    <div class="edit-container fl-sta-bet fl-col">
        <div class="fl-bet-cen config-title">
            <span class="title">编辑图表</span>
            <i class="iconfont icon-guanbi cursor" @click="closeHandle"></i>
        </div>
        <div class="ov-auto">
            <div class="section-title">图表</div>
            <ChartConfig :active-module="activeModule" :active-module-index="activeModuleIndex" @refresh:chart="refreshChart" />
            <div class="section-title">标题</div>
            <TitleConfig :active-module="activeModule" :active-module-index="activeModuleIndex" @refresh:chart="refreshChart" />
            <div class="section-title">颜色</div>
            <ColorConfig :active-module="activeModule" :active-module-index="activeModuleIndex" @refresh:chart="refreshChart" />
        </div>
    </div>
</template>

<script>
import ChartConfig from './ChartConfig.vue';
import TitleConfig from './TitleConfig.vue';
import ColorConfig from './ColorConfig.vue';
import { watch } from 'vue';

export default {
    components: {
        ChartConfig,
        TitleConfig,
        ColorConfig,
    },
    props: {
        activeModule: {
            type: Object,
            default: () => ({})
        },
        activeModuleIndex: {
            type: Number,
            default: -1
        },
    },
    setup(props, { emit }) {
        const refreshChart = function (index, data) {
            emit('refresh:chart', index, data);
        };

        const closeHandle = function() {
            emit('close');
        };

        watch(
            () => props.activeModule,
            (data) => {
                console.log('config: ', data)
            },
            {
                deep: true
            }
        );

        return {
            props,
            refreshChart,
            closeHandle,
        };
    },
};
</script>

<style lang="scss" scoped>
.edit-container {
    width: 500px;
    margin-left: 20px;
    padding: 10px 20px;
    background-color: #fff;
    border-radius: 8px;
    // border: #999 1px solid;
    box-shadow: 0 0 10px rgba($color: rgba(100, 100, 100, 0.5), $alpha: 0.3);
}

.config-title {
    line-height: 40px;
    .title {
        font-size: 20px;
    }
}

.section-title {
    padding: 6px 12px;
    border-radius: 4px;
    margin-bottom: 10px;
    position: relative;

    &::before {
        content: '';
        width: 4px;
        height: 16px;
        border-radius: 4px 0 4px 0;
        background-color: var(--bg-color);
        position: absolute;
        left: 0;
        top: 8px;
    }
}
</style>
