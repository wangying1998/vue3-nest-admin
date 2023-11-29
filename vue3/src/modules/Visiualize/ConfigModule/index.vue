<template>
    <div class="edit-container fl-sta-bet fl-col">
        <div class="section-title">图表</div>
        <ChartConfig :active-module="activeModule" />
        <div class="section-title">标题</div>
        <TitleConfig :active-module="activeModule" />
        <div class="section-title">颜色</div>
        <ColorConfig :active-module="activeModule" />
    </div>
</template>

<script>
import { ref } from 'vue';
import ChartConfig from './ChartConfig.vue';
import TitleConfig from './TitleConfig.vue';
import ColorConfig from './ColorConfig.vue';

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
        }
    },
    setup(props) {
        return {
            props,
        };
    },
};
</script>

<style lang="scss" scoped>
.edit-container {
    width: 500px;
    margin-left: 20px;
    padding: 10px;
    background-color: #fff;
    // border-radius: 8px;
    border: #999 1px solid;
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
