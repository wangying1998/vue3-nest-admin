<template>
    <div>
        <el-menu
            background-color="#1B2339"
            text-color="#FFFFFF"
            active-text-color="#F04969"
            :default-active="activeNav"
            @select="navChange"
        >
            <template v-for="(submenu, index) in menuList" :key="submenu.key">
                <el-sub-menu :index="submenu.name" v-if="submenu.children">
                    <template #title>{{ submenu.title }}</template>
                    <el-menu-item
                        v-for="(item, subIndex) in submenu.children"
                        :index="item.name"
                        :key="item.key"
                    >
                        {{ item.title }}
                    </el-menu-item>
                </el-sub-menu>
                <el-menu-item :index="submenu.name" v-else>{{
                    submenu.title
                }}</el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script>
import { computed, ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
    name: "SubMenu",
    setup() {
        const store = useStore();
        const router = useRouter();
        const route = useRoute();

        let activeNav = computed(() => store.state.activeMenu);
        let menuList = computed(() => store.state.menuList);

        watchEffect(() => {
            activeNav = route.name;
            // console.log(route.name);
        });

        const navChange = (route) => {
            router.push({
                name: route,
            });
        };

        return {
            activeNav,
            menuList,

            navChange,
        };
    },
};
</script>

<style lang="scss" scoped></style>
