<template>
    <div>
        <div style="margin-bottom: 20px">{{ total }}</div>
        <div class="fl-sta-cen">
            <el-input
                v-model="input"
                placeholder="请输入"
                style="width: 200px; margin-right: 10px"
            ></el-input>
            <el-button type="primary" @click="addHandle()">添加</el-button>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
export default {
    props: {
        total: String,
    },
    emits: ["add"],
    setup(props, { emit }) {
        const input = ref("");

        const addHandle = function () {
            emit("add", input.value);
            input.value = "";
        };

        return {
            // props,
            input,
            addHandle,
        };
    },
};
</script>

<style lang="scss" scoped>
</style>