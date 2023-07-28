<template>
    <div>
        <div class="logo-box fl-cen-cen">
            <div class="logo">Logo</div>
        </div>
        <SubMenu />
    </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import SubMenu from "./SubMenu.vue";

export default {
    // components: {
    //     SubMenu,
    // },
    setup() {
        const store = useStore();
        const router = useRouter();
        const goPage = (name) => {
            router.push({
                path: name,
            });
        };

        // const isCollapse = computed(() => {
        //     return sidebar.value.opened
        // })

        return {
            goPage,
        };
    },
};
</script>

<style lang="scss" scoped></style>
