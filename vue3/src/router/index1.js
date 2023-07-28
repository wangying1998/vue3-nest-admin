import Vue from 'vue'
import Router from 'vue-router'
// import Cookies from 'js-cookie';
import Main from '@/components/common/main.vue';
import store from '../store';

Vue.use(Router)

// 页面路由(独立页面)
export const pageRoutes = [
    // {
    //     path: '/404',
    //     name: '404',
    //     component: NotFound
    // },
    // {
    //     path: '/login',
    //     name: 'login',
    //     component: Login
    // },
    // {
    //     path: '*',
    //     redirect: '/404'
    // }
]

// 模块路由(基于主入口布局页面)
export const moduleRoutes = {
    path: '/',
    name: 'main',
    component: Main,
    children: []
}
const router = new Router({
    mode: 'hash',
    routes: pageRoutes.concat(moduleRoutes)
})

/** 多次点击路由报错 */
// const originalPush = Router.prototype.push;
// Router.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// }

/** 路由拦截 */
// router.beforeEach((to, from, next) => {
//     /** 根据路由元 判断是否显示全面屏 */
//     if (to.meta.isFullScreen) {
//         store.commit('setFullScreen', true)
//     } else {
//         store.commit('setFullScreen', false)
//     }
    
//     if (to.path == '/login') {
//         next();
//     } else {
//         next();
//     }
//     /** 登录判断 */
//     if (!Cookies.get('ztpmsuser')) {
//         next('/login');
//     } else {
//         next();
//     }
// });

export default router