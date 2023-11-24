<template>
    <div class="edit-container fl-sta-bet fl-col">
        <!-- <el-collapse v-model="activeNames" :accordion="false">
            <el-collapse-item title="标题" name="titleConfig">
                <TitleConfig />
            </el-collapse-item>
        </el-collapse> -->

        <div class="section-title">图表</div>
        <ChartConfig />
        <div class="section-title">标题</div>
        <TitleConfig />
        <div class="section-title">颜色</div>
        <ColorConfig />
    </div>
</template>

<script>
import { ref } from 'vue';
import TitleConfig from './TitleConfig.vue';
import ChartConfig from './ChartConfig.vue';
import ColorConfig from './ColorConfig.vue';

export default {
    components: {
        TitleConfig,
        ChartConfig,
        ColorConfig,
    },
    setup() {
        let activeNames = ref(['titleConfig']);
        let collapseList = [
            {
                id: 'titleConfig',
                title: '标题',
            }
        ]

        return {
            activeNames,
            collapseList,
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
