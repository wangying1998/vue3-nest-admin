<template>
    <div>
        <el-form
            ref="formModule"
            :model="form"
            :rules="rules"
            label-width="80px"
            class="fl-item"
        >
            <el-form-item label="显示" prop="display">
                <el-checkbox
                    v-model="form.display"
                    label="是否显示标题"
                    @change="displayChange"
                ></el-checkbox>
            </el-form-item>
            <div v-show="form.display">
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
                    <el-color-picker v-model="form.fontColor" :show-alpha="false" @change="colorChange"></el-color-picker>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>

<script>
import { reactive, ref, watch } from 'vue';
export default {
    props: {
        activeModule: {
            type: Object,
            default: () => ({})
        }
    },
    setup (props) {
        let fontSizes = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 68, 60];

        let form = reactive({
            display: true,
            title: '',
            fontSize: 14,
            fontColor: '#121212',
        });
        let rules = ref({});

        let activeDataBack = {};

        
        watch(
            () => props.activeModule,
            (data) => {
                activeDataBack = data;
                form.title = data.titleOptions.title;
                form.showTitle = data.titleOptions.showTitle;
                form.fontSize = data.titleOptions.fontSize;
                form.fontColor = data.titleOptions.titleColor;
            },
        );

        const titleChangeHandle = function(value) {
            activeDataBack.titleOptions.title = value;
        }
        const displayChange = function(value) {
            activeDataBack.titleOptions.showTitle = value;
        }
        const fontSizeChange = function(value) {
            activeDataBack.titleOptions.fontSize = value;
        }
        const colorChange = function(value) {
            activeDataBack.titleOptions.titleColor = value;
        }

        return {
            props,
            fontSizes,

            form,
            rules,

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