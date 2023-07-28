<template>
    <div>
        <el-dialog
            v-model="visible"
            :title="title"
            width="30%"
            :before-close="beforeClose"
        >
            <el-form
                ref="formRef"
                :model="form"
                :rules="rules"
                label-position="top"
                :inline="false"
            >
                <el-form-item label="UID" prop="uid">
                    <el-input v-model="form.uid"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="form.sex">
                        <el-radio
                            v-for="item in sexList"
                            :key="item"
                            :label="item"
                        >
                            {{ item }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input-number
                        v-model="form.age"
                        label="aaa"
                        :min="18"
                        :max="100"
                        :step="1"
                        :controls="true"
                        controls-position="right"
                    >
                    </el-input-number>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="form.mobile"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span>
                    <el-button type="primary" plain @click="visible = false"
                        >取消</el-button
                    >
                    <el-button type="primary" @click="submitHandle"
                        >确认</el-button
                    >
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { ref, reactive, nextTick, toRaw, inject } from "vue";
import { addUserApi, updateUserApi } from "../../../api/user.api";
export default {
    emits: ["refresh"],
    setup(props, { emit, expose }) {
        const $msg = inject("globalMsg");
        let visible = ref(false);
        let title = ref("");
        let isEdit = ref(false);
        let sexList = ["男", "女"];
        let form = reactive({
            uid: "",
            name: "",
            sex: "男",
            age: 18,
            mobile: "",
            email: "",
        });
        let rules = reactive({
            uid: [{ required: true, message: "请输入UID", trigger: "blur" }],
            name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
            sex: [{ required: true, message: "请选择性别", trigger: "change" }],
            age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
            mobile: [
                { required: true, message: "请输入手机号", trigger: "blur" },
            ],
            email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        });
        let formRef = ref();

        const init = (data) => {
            visible.value = true;
            nextTick(() => {
                formRef.value.resetFields();
                if (data) {
                    isEdit.value = true;
                    title.value = "编辑用户";
                    form = Object.assign(form, data);
                } else {
                    isEdit.value = false;
                    title.value = "创建用户";
                }
            });
        };

        const submitHandle = () => {
            formRef.value.validate((valid, fields) => {
                if (valid) {
                    if (isEdit.value) {
                        updateSubmit();
                    } else {
                        addSubmit();
                    }
                } else {
                    console.log('字段校验出错', fields)
                    // return false;
                }
            });
        };

        const addSubmit = () => {
            addUserApi(toRaw(form))
                .then((res) => {
                    emit("refresh");
                    $msg.message("success", "创建成功！");
                })
                .finally(() => {
                    visible.value = false;
                });
        };

        const updateSubmit = () => {
            updateUserApi(toRaw(form))
                .then((res) => {
                    emit("refresh");
                    $msg.message("success", "编辑成功！");
                })
                .finally(() => {
                    visible.value = false;
                });
        };

        const beforeClose = (done) => {
            done();
        };

        expose({
            init,
        });

        return {
            visible,
            title,
            isEdit,
            sexList,
            form,
            rules,
            formRef,

            submitHandle,
            addSubmit,
            updateSubmit,
            beforeClose,
        };
    },
};
</script>

<style lang="scss" scoped></style>
