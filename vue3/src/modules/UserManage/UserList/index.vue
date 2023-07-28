<template>
    <div>
        <div class="fl-bet-cen">
            <el-button type="primary" @click="addHandle">立即创建</el-button>
            <div class="fl-sta-cen">
                <el-input
                    v-model="form.uid"
                    placeholder="请输入UID进行查询"
                    clearable
                    @clear="getUserList"
                    @keyup.enter.native="getUserList"
                    style="width: 200px; margin-right: 12px"
                ></el-input>
                <el-button type="primary" plain @click="getUserList">
                    搜索
                </el-button>
            </div>
        </div>

        <Table
            :data="tableData"
            :columns="columns"
            class="mr-t-20"
            :hasOperate="true"
            @operate="operateHandle"
        ></Table>
        <AddUser
            ref="addUserModule"
            v-show="addVisible"
            @refresh="getUserList"
        ></AddUser>
    </div>
</template>

<script>
import { ref, reactive, onMounted, nextTick, inject, toRaw } from "vue";
import Table from "../../../components/TableComponent/Table.vue";
import { getUserListApi, delUserApi } from "../../../api/user.api";
import AddUser from "@/modules/UserManage/UserList/AddUser.vue";

export default {
    name: "UserList",
    components: {
        Table,
        AddUser,
    },
    setup(props, ctx) {
        let tableData = ref([]);
        let columns = ref([]);
        let total = ref(0);
        let form = reactive({
            uid: "",
            page: 0,
            size: 100,
        });
        let rules = ref({});
        let addVisible = ref(false);
        const addUserModule = ref();
        const $msg = inject("globalMsg");

        columns = [
            {
                prop: "uid",
                label: "UID",
            },
            {
                prop: "name",
                label: "姓名",
            },
            {
                prop: "sex",
                label: "性别",
            },
            {
                prop: "age",
                label: "年龄",
            },
            {
                prop: "mobile",
                label: "手机号",
            },
            {
                prop: "email",
                label: "邮箱",
            },
        ];

        const getUserList = () => {
            getUserListApi(toRaw(form)).then((res) => {
                tableData.value = res.data.data;
                total.value = res.data.total;
            });
        };

        const addHandle = () => {
            addVisible.value = true;
            nextTick(() => {
                addUserModule.value.init();
            });
        };

        const delHandle = (row) => {
            $msg.confirm("", "确定删除该用户？", "warning", () => {
                delUserApi({
                    id: row.id,
                }).then((res) => {
                    $msg.message("删除成功！", "success");
                    getUserList();
                });
            });
        };

        const editHandle = (data) => {
            addVisible.value = true;
            nextTick(() => {
                addUserModule.value.init(data);
            });
        };

        const operateHandle = (opt, row) => {
            let data = toRaw(row);
            switch (opt) {
                case "edit":
                    editHandle(data);
                    break;
                case "delete":
                    delHandle(data);
                    break;

                default:
                    break;
            }
        };

        onMounted(() => {
            getUserList();
        });

        return {
            tableData,
            columns,
            total,
            form,
            rules,
            addVisible,
            addUserModule,

            getUserList,
            addHandle,
            operateHandle,
        };
    },
};
</script>

<style lang="scss" scoped></style>
