<template>
    <div>
        <el-table
            class="table-box"
            :data="data"
            :height="height"
            :row-key="rowKey"
            :reserve-selection="reserveSelection"
            :tree-props="treeProps"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="55" v-if="hasSelection" />
            <!-- <el-table-column type="index" width="50" /> -->
            <el-table-column
                v-for="col in columns"
                :prop="col.prop"
                :key="col.prop"
                :label="col.label"
                :width="col.width"
            >
            </el-table-column>
            <el-table-column prop="" label="操作" v-if="hasOperate">
                <template #default="scope">
                    <el-link
                        type="primary"
                        :underline="false"
                        v-for="item in operateList"
                        @click="opreateHandle(item, scope.row)"
                        >{{ operateButtons[item] }}</el-link
                    >
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import tableOprateButtons from "@/tools/tableOprateButtons";
export default {
    emits: ["operate"],
    props: {
        rowKey: {
            type: String,
        },
        reserveSelection: {
            type: Boolean,
            default: true,
        },
        columns: {
            type: Array,
            default: () => [],
        },
        data: {
            type: Array,
            default: () => [],
        },
        treeProps: {
            type: Object,
            default: {
                hasChildren: "hasChildren",
                children: "children",
            },
        },
        height: {
            type: String,
        },
        hasSelection: {
            type: Boolean,
            default: false,
        },
        hasOperate: {
            type: Boolean,
            default: false,
        },
        operateList: {
            type: Array,
            default: ["edit", "delete"],
        },
    },
    setup(props, { emit }) {
        const operateButtons = tableOprateButtons;

        const opreateHandle = (opt, row) => {
            emit("operate", opt, row);
        };

        return {
            props,
            operateButtons,

            opreateHandle,
        };
    },
};
</script>

<style lang="scss" scoped>
.table-box {
    border-radius: 8px;
}
.el-link {
    margin-right: 10px;
}
</style>
