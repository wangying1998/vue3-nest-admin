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
                                class="fl-item"
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
                                        @click="changeColorHandle(color, index)"
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
            <el-form-item label="不透明度" size="normal">
                <el-slider v-model="opacity" show-input></el-slider>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { ChartColors } from '@/config/chartColors';
export default {
    props: {
        activeModule: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props) {
        let currColors = ref([]);
        currColors.value = [].concat(ChartColors[0].color);
        let activeTheme = ref('');
        activeTheme.value = ChartColors[0].theme;

        let customColor = ref('');
        let activeIndex = ref(0);
        customColor.value = currColors.value[0];

        let opacity = ref(100);



        const planChangeHandle = function (theme) {
            let item = ChartColors.find(ele => ele.theme === theme);
            currColors.value = item.color;
            activeIndex.value = 0;
            customColor.value = item.color[0];
        };
        const changeColorHandle = function (color, index) {
            activeIndex.value = index;
            customColor.value = color;
        };
        const customColorChange = function (color) {
            console.log(123, color);
            currColors.value[activeIndex.value] = color;
        };

        return {
            ChartColors,
            currColors,
            customColor,
            activeTheme,
            activeIndex,
            opacity,

            planChangeHandle,
            changeColorHandle,
            customColorChange,
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
