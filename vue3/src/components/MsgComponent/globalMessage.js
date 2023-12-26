import { ElMessage, ElMessageBox, ElNotification } from "element-plus";

const globalMsg = {
    message: (message, type) => {
        return ElMessage({
            type,
            message,
        });
    },
    confirm: async (title, message, type, callback) => {
        return ElMessageBox.confirm(message, title || "提示", {
            type,
            confirmButtonText: '确认',
            cancelButtonText: '取消'
        })
            .then(() => {
                callback && callback();
            })
            .catch((err) => {
                console.log(err);
            });
    },
    notification: (title, message, type, showClose) => {
        return ElNotification({
            title: title || "提示",
            message,
            type,
            showClose: showClose || true,
        });
    },
};

export default globalMsg;
