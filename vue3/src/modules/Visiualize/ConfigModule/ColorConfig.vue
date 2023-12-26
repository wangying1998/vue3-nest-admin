<template>
    <div>
        <el-form
            ref="chartForm"
            :model="form"
            :rules="rules"
            label-width="80px"
            class="fl-item"
        >
            <el-form-item label="配色方案">
                <el-popover
                    placement="bottom"
                    title=""
                    width="400px"
                    trigger="click"
                >
                    <div>
                        <div class="fl-sta-cen">
                            <span class="pop-label">配色方案</span>
                            <el-select
                                v-model="activeTheme"
                                placeholder="请选择"
                                filterable
                                :teleported="false"
                                @change="planChangeHandle"
                                class="fl-item mr-r-10"
                            >
                                <el-option
                                    v-for="chartColor in ChartColors"
                                    :key="chartColor.theme"
                                    :label="chartColor.label"
                                    :value="chartColor.theme"
                                >
                                    <div class="fl-sta-cen">
                                        <div class="flex">
                                            <span
                                                v-for="item in chartColor.color"
                                                :key="item"
                                                class="color-item"
                                                :style="{
                                                    'background-color': item,
                                                }"
                                            ></span>
                                        </div>
                                        <span class="mr-l-20">{{
                                            chartColor.label
                                        }}</span>
                                    </div>
                                </el-option>
                            </el-select>
                            <el-link type="primary" :underline="false" @click="resetColorHandle">重置</el-link>
                        </div>
                        <div class="fl-sta-cen mr-t-20">
                            <span class="pop-label">自定义</span>
                            <div class="flex">
                                <div
                                    v-for="(color, index) in currColors"
                                    :key="color"
                                    class="color-box"
                                    :class="
                                        activeIndex === index ? 'active' : ''
                                    "
                                >
                                    <div
                                        class="color-item cursor"
                                        :style="{ 'background-color': color }"
                                        @click="changeIndexHandle(color, index)"
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div class="fl-sta-cen mr-t-10">
                            <span class="pop-label"></span>
                            <el-color-picker
                                v-model="customColor"
                                :show-alpha="false"
                                :teleported="false"
                                @change="customColorChange"
                            ></el-color-picker>
                        </div>
                    </div>
                    <template #reference>
                        <div class="flex cursor">
                            <span
                                v-for="item in currColors"
                                :key="item"
                                class="color-item"
                                :style="{ 'background-color': item }"
                            ></span>
                        </div>
                    </template>
                </el-popover>
            </el-form-item>
            <el-form-item label="不透明度">
                <el-slider v-model="opacity" show-input></el-slider>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import { ChartColors } from '@/config/chartColors';
import { useChartStore } from '../../../store/layout-chart';

export default {
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
        let form = ref({});
        let rules = ref({});

        let currColors = ref([]);
        let activeTheme = ref('');
        let customColor = ref('');
        let activeIndex = ref(0);
        let opacity = ref(100);
        let activeDataBack = {};
        let chartStore = useChartStore();

        const planChangeHandle = function (value) {
            activeDataBack.theme = value;
            
            let item = ChartColors.find(ele => ele.theme === value);
            currColors.value = [].concat(item.color);
            activeIndex.value = 0;
            customColor.value = currColors.value[0];
            refreshChart(currColors.value);
        };
        const changeIndexHandle = function (color, index) {
            activeIndex.value = index;
            customColor.value = color;
        };
        const customColorChange = function (color) {
            currColors.value[activeIndex.value] = color;
            
            refreshChart(currColors.value);
        };

        /**
         * 颜色变化后 重新渲染图表
         * @param {Array} colors 颜色数组
         */
        const refreshChart = function(colors) {
            activeDataBack.color = colors;
            emit('refresh:chart', props.activeModuleIndex, activeDataBack);
        }

        const resetColorHandle = function () {
            let item = ChartColors.find(ele => ele.theme === activeTheme.value);
            currColors.value = [].concat(item.color);
            activeIndex.value = 0;
            customColor.value = currColors.value[0];
        }

        watch(
            () => props.activeModule,
            (data) => {
                activeDataBack = JSON.parse(JSON.stringify(data));
                activeTheme.value = data.theme;
                currColors.value = [].concat(data.color);
                activeIndex.value = 0;
                customColor.value = currColors.value[0];
            },
            {
                deep: true
            }
        );
        
        return {
            props,
            ChartColors,
            chartStore,

            currColors,
            customColor,
            activeTheme,
            activeIndex,
            opacity,

            form,
            rules,

            planChangeHandle,
            changeIndexHandle,
            customColorChange,
            refreshChart,

            resetColorHandle,
        };
    },
};
</script>

<style lang="scss" scoped>
.color-item {
    width: 20px;
    height: 20px;
}
.color-box {
    padding: 4px;
    border: transparent 1px solid;
    &.active {
        border-color: var(--bg-color);
    }
}
.pop-label {
    width: 70px;
}
</style>
