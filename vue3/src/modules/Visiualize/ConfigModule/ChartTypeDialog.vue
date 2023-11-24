<template>
    <div>
        <el-dialog title="选择图表类型" v-model="visible" width="600px">
            <ul class="fl-sta-cen fl-wrap list-contain">
                <li
                    class="list-item fl-bet-cen fl-col cursor"
                    :class="activeIndex === index ? 'active' : ''"
                    v-for="(item, index) in TypeList"
                    :key="item.type"
                    @click="chooseHandle(item, index)"
                >
                    <svg class="icon-box" aria-hidden="true">
                        <use :xlink:href="`#${item.icon}`"></use>
                    </svg>
                    <span class="mr-t-10">{{ item.label }}</span>
                </li>
            </ul>
            <template #footer>
                <span>
                    <el-button @click="visible = false">取消</el-button>
                    <el-button type="primary" @click="submitHandle"
                        >确认</el-button
                    >
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { ref } from 'vue';
import { TypeList } from '@/config/chartTypes';
export default {
    setup(props, { emit, expose }) {
        let visible = ref(false);
        let activeIndex = ref(0);
        let activeData = ref({});

        const init = function () {
            visible.value = true;
            activeIndex.value = 0;
            activeData.value = {};
        };

        const chooseHandle = function (data, index) {
            activeIndex.value = index;
            activeData.value = data;
        };

        const submitHandle = function () {
            emit('refresh', activeData.value);
            visible.value = false;
        };

        expose({
            init,
        });

        return {
            visible,
            TypeList,
            activeIndex,
            activeData,

            chooseHandle,
            submitHandle,
        };
    },
};
</script>

<style lang="scss" scoped>
.list-item {
    border-radius: 8px;
    box-shadow: 0 3px 8px rgba($color: #000000, $alpha: 0.15);
    padding: 15px;
    width: 120px;
    margin: 10px;
    &:hover,
    &.active {
        transform: translateY(-5px);
        color: var(--text-color);
        background-color: rgba(240, 73, 104, 0.05);
    }
}
.icon-box {
    width: 30px;
    height: 30px;
}
</style>
