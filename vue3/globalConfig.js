export default {
    development: {
        target: 'http://localhost:8083/', // 测试接口域名
    },
    beta: {
        target: '/', // 测试接口域名
    },
    release: {
        target: '/', // 正式接口域名
    },
    production: {
        target: '/',
    },
};