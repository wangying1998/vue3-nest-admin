<template>
    <div>
        <el-form
            ref="formModule"
            :model="form"
            :rules="rules"
            label-width="80px"
            class="fl-item"
        >
            <!-- <div class="" style="margin-bottom: 20px">标题</div> -->
            <el-form-item label="显示" prop="display">
                <el-checkbox
                    v-model="form.show"
                    label="是否显示标题"
                ></el-checkbox>
            </el-form-item>
            <el-form-item label="标题内容" prop="title">
                <el-input
                    v-model="form.title"
                    placeholder="请输入标题"
                ></el-input>
            </el-form-item>
            <el-form-item label="文字大小">
                <el-select v-model="form.fontSize" placeholder="请选择">
                    <el-option v-for="item in fontSizes" :key="item" :label="item + 'px'" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="颜色">
                <el-color-picker v-model="form.fontColor" :show-alpha="false"></el-color-picker>
            </el-form-item>
            
            
            <!-- <el-form-item label="图表类型" prop="type">
                <el-select
                    v-model="form.type"
                    placeholder="请选择图表类型"
                    clearable
                    filterable
                >
                    <el-option
                        v-for="item in chartTypeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
            </el-form-item> -->
        </el-form>
    </div>
</template>

<script>
import { reactive, ref } from 'vue';
export default {
    setup () {
        let fontSizes = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 68, 60];

        let form = reactive({
            show: true,
            title: '',
            fontSize: 14,
            fontColor: '#121212',
        });
        let rules = ref({});

        return {
            fontSizes,

            form,
            rules,
        }
    }
}
</script>

<style lang="scss" scoped>

</style>