<template>
    <div>
        <Input @add="add" total="总数"></Input>
        <ul class="list">
            <li v-for="(item, index) in list" :key="index">
                <span style="margin-right: 20px">{{ item.title }}</span>
                <el-button type="text" @click="delHandle(index)">删除</el-button>
            </li>
        </ul>
    </div>
</template>

<script>
import { ref } from "vue";
import Input from "@/modules/Dashboard/Parent/Input.vue";
export default {
    components: {
        Input,
    },
    setup() {
        const list = ref([]);

        const delHandle = function (index) {
            list.value.splice(index, 1);
        };
        const add = function (val) {
            list.value.push({
                title: val,
            });
        };

        return {
            list,
            delHandle,
            add,
        };
    },
};
</script>

<style lang="scss" scoped>
.list {
    border: 1px solid;
    height: 500px;
    padding-left: 30px;
    margin: 20px 0 0;
    overflow: auto;
}
</style>