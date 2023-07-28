<template>
    <el-header class="fl-sta-cen fl-row-reverse">
        <div class="avatar fl-cen-cen">{{ username[0] }}</div>
    </el-header>
</template>

<script>
import { ref } from 'vue';

export default {
    setup () {
        let username = ref('');

        username = 'Admin';

        return {
            username,

        }
    }
}
</script>

<style lang="scss" scoped>
.avatar {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    font-size: 18px;
    line-height: 1;
    background-color: var(--bg-color);
}
</style>