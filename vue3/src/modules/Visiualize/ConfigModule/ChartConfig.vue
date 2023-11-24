<template>
    <div>
        <el-form
            ref="chartForm"
            :model="form"
            :rules="rules"
            label-width="80px"
            class="fl-item"
        >
            <el-form-item label="图表类型">
                <div class="full-width fl-bet-cen">
                    <div class="fl-sta-cen">
                        <svg class="icon-box" aria-hidden="true">
                            <use :xlink:href="`#${form.icon}`"></use>
                        </svg>
                        <span class="mr-l-10">{{ form.label }}</span>
                    </div>
    
                    <el-button type="text" @click="changeChartType">更换类型</el-button>
                </div>
            </el-form-item>
            <!-- 对应类型的配置项 -->
            
        </el-form>

        <ChartTypeDialog ref="chartTypeDialog" v-show="dialogVisible" @refresh="refreshHandle" />
    </div>
</template>

<script>
import { nextTick, ref } from 'vue';

import { TypeList } from '@/config/chartTypes';
import ChartTypeDialog from './ChartTypeDialog.vue';

export default {
    components: {
        ChartTypeDialog,
    },
    setup() {
        let chartForm = ref();
        let form = ref({
            type: TypeList[0].type,
            label: TypeList[0].label,
            icon: TypeList[0].icon,
        });

        let dialogVisible = ref(false);
        let chartTypeDialog = ref();

        const changeChartType = function() {
            dialogVisible.value = true;
            nextTick(() => {
                chartTypeDialog.value.init();
            })
        }
        
        const refreshHandle = function(data) {
            form.value.label = data.label;
            form.value.type = data.type;
            form.value.icon = data.icon;
        }
        return {
            chartForm,
            form,
            TypeList,
            dialogVisible,
            chartTypeDialog,

            changeChartType,
            refreshHandle,
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
