<template>
    <div>
        <el-form
            ref="formModule"
            :model="form"
            :rules="rules"
            label-width="80px"
            class="fl-item"
        >
            <el-form-item label="显示" prop="show">
                <el-checkbox
                    v-model="form.show"
                    label="是否显示标题"
                    @change="displayChange"
                ></el-checkbox>
            </el-form-item>
            <div v-show="form.show">
                <el-form-item label="标题内容" prop="title">
                    <el-input
                        v-model="form.title"
                        placeholder="请输入标题"
                        @change="titleChangeHandle"
                    ></el-input>
                </el-form-item>
                <el-form-item label="文字大小">
                    <el-select v-model="form.fontSize" placeholder="请选择" @change="fontSizeChange">
                        <el-option v-for="item in fontSizes" :key="item" :label="item + 'px'" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="颜色">
                    <el-color-picker v-model="form.color" :show-alpha="false" @change="colorChange"></el-color-picker>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>

<script>
import { reactive, ref, watch } from 'vue';
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
    setup (props, { emit }) {
        let fontSizes = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 68, 60];

        let form = ref({
            show: true,
            title: '',
            fontSize: 14,
            color: '#121212',
        });
        let rules = ref({});

        let activeDataBack = {};

        let chartStore = useChartStore();
        
        watch(
            () => props.activeModule,
            (data) => {
                // 引用类型，直接修改会导致源数据修改
                activeDataBack = JSON.parse(JSON.stringify(data));
                form.value.title = data.titleOptions.title;
                form.value.show = data.titleOptions.show;
                form.value.fontSize = data.titleOptions.fontSize;
                form.value.color = data.titleOptions.color;
            },
            {
                deep: true
            }
        );

        const displayChange = function(value) {
            activeDataBack.titleOptions.show = value;
            emit('refresh:chart', props.activeModuleIndex, activeDataBack);
        }
        const titleChangeHandle = function(value) {
            activeDataBack.titleOptions.title = value;
            emit('refresh:chart', props.activeModuleIndex, activeDataBack);
        }
        const fontSizeChange = function(value) {
            activeDataBack.titleOptions.fontSize = value;
            emit('refresh:chart', props.activeModuleIndex, activeDataBack);
        }
        const colorChange = function(value) {
            activeDataBack.titleOptions.color = value;
            emit('refresh:chart', props.activeModuleIndex, activeDataBack);
        }

        return {
            props,
            fontSizes,
            form,
            rules,
            
            chartStore,

            titleChangeHandle,
            displayChange,
            fontSizeChange,
            colorChange,
        }
    }
}
</script>

<style lang="scss" scoped>

</style>