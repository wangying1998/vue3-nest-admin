<template>
    <div>
        <el-form ref="chartForm" :model="form" label-width="80px" class="fl-item">
            <el-form-item label="图表类型">
                <div class="full-width fl-bet-cen">
                    <div class="fl-sta-cen">
                        <svg class="icon-box" aria-hidden="true">
                            <use :xlink:href="`#${currChartType.icon}`"></use>
                        </svg>
                        <span class="mr-l-10">{{ currChartType.label }}</span>
                    </div>

                    <el-link type="primary" :underline="false" @click="changeChartType">更换类型</el-link>
                </div>
            </el-form-item>
            <!-- 对应类型的配置项 -->
        </el-form>

        <ChartTypeDialog ref="chartTypeDialog" v-show="dialogVisible" @refresh="refreshHandle" />
    </div>
</template>

<script>
import { nextTick, ref, watch } from 'vue';

import { TypeList } from '@/config/chartTypes';
import ChartTypeDialog from './ChartTypeDialog.vue';

export default {
    components: {
        ChartTypeDialog,
    },
    props: {
        activeModule: {
            type: Object,
            default: () => ({}),
        },
    },
    setup(props) {
        let chartForm = ref();
        let form = ref({});
        let currChartType = ref({});
        
        let dialogVisible = ref(false);
        let chartTypeDialog = ref();

        const changeChartType = function () {
            dialogVisible.value = true;
            nextTick(() => {
                chartTypeDialog.value.init();
            });
        };

        const refreshHandle = function (data) {
            currChartType.value = data;
        };

        const reshowConfig = function () {
            let data = props.activeModule;

        };

        let activeDataBack = {};

        watch(
            () => props.activeModule,
            (data) => {
                activeDataBack = JSON.parse(JSON.stringify(data));
                let item = TypeList.find(ele => ele.type === data.type);
                currChartType.value = item;
            },
            {
                deep: true
            }
        );

        return {
            chartForm,
            form,
            TypeList,
            dialogVisible,
            chartTypeDialog,
            currChartType,

            activeDataBack,

            changeChartType,
            refreshHandle,
            reshowConfig,
        };
    },
};
</script>

<style lang="scss" scoped>
.icon-box {
    width: 24px;
    height: 24px;
}
</style>
