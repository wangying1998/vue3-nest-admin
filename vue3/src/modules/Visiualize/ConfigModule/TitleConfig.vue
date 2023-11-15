<template>
    <div>
        <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-position="left"
            class="fl-item"
        >
            <div class="" style="margin-bottom: 20px">标题</div>
            <el-form-item label="显示" prop="display">
                <el-checkbox
                    v-model="form.display"
                    label="是否显示标题"
                ></el-checkbox>
            </el-form-item>
            <el-form-item label="图表标题" prop="title">
                <el-input
                    v-model="form.title"
                    placeholder="请输入图表标题"
                ></el-input>
            </el-form-item>
            <el-form-item label="图表类型" prop="type">
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
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    setup () {
        let form = ref({
            title: '',
            type: '',
            colors: [],
            range: '',
            axis: [],
            data: [],
        });

        return {
            form,
            
        }
    }
}
</script>

<style lang="scss" scoped>

</style>