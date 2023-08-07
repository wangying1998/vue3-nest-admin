<template>
    <div>
        <div>
            <TableTree
                :data="data"
                :columns="columns"
                :has-selection="true"
                :has-operate="true"
                row-key="id"
                :tree-props="treeProps"
            ></TableTree>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
import TableTree from "../../components/TableComponent/TableTree.vue";
import { getMenuApi } from '@/api/menu.api.js';

export default {
    components: {
        TableTree,
    },
    setup() {
        let data = ref([]);
        let columns = ref([
            {
                label: "菜单",
                prop: "title",
            },
            {
                label: "路由",
                prop: "name",
            },
            {
                label: '图标',
                prop: 'icon',
            }
        ]);
        let treeProps = ref({
            // hasChildren: 'hasChildren',
            children: "children",
        });

        const getData = () => {
            getMenuApi().then(res => {
                console.log(res.data)
                data.value = res.data;
            })
        }

        onMounted(() => {
            getData();
        })

        return {
            data,
            columns,
            treeProps,

            getData,
        };
    },
};
</script>

<style lang="scss" scoped></style>
