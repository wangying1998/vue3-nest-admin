<template>
    <div class="edit-container fl-sta-bet fl-col">
        <el-collapse v-model="activeNames" :accordion="false">
            <el-collapse-item
                v-for="item in collapseList"
                :key="item.id"
                :title="item.title"
                :name="item.id"
            >
                <template :v-html="component">
                    
                </template>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
import { ref } from 'vue';
import TitleConfig from './ConfigModule/TitleConfig.vue';
export default {
    components: {
        TitleConfig
    },
    setup() {
        let collapseList = [
            {
                id: 'titleConfig',
                title: '标题',
            }
        ]

        return {
            collapseList,
        };
    },
};
</script>

<style lang="scss" scoped>
.edit-container {
    width: 300px;
    margin-left: 20px;
    padding: 10px;
    background-color: #fff;
    // border-radius: 8px;
    border: #999 1px solid;
}
</style>
