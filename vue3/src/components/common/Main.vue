<template>
    <el-container>
        <el-aside>
            <Sidebar />
        </el-aside>
        <el-container direction="vertical">
            <Header />
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import Sidebar from './Sidebar.vue';
import Header from './Header.vue';
export default {
    components: {
        Sidebar,
        Header
    },
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>
</style>