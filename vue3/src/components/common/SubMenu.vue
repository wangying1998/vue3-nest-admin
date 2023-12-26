<template>
    <div>
        <el-menu
            :default-active="activeNav"
            @select="navChange"
        >
            <template v-for="(submenu,) in menuList" :key="submenu.key">
                <el-sub-menu :index="submenu.name" v-if="submenu.children">
                    <template #title>{{ submenu.title }}</template>
                    <el-menu-item
                        v-for="(item) in submenu.children"
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
import { useMenuStore } from "../../store/menu";

export default {
    name: "SubMenu",
    setup() {
        const router = useRouter();
        const route = useRoute();

        let menuStore = useMenuStore();

        let activeNav = computed(() => menuStore.activeMenu);
        let menuList = computed(() => menuStore.menuList);

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
