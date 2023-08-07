import {
  createRouter,
  createWebHashHistory,
} from 'vue-router';

import Main from '../components/common/Main.vue';
import NotFound from '../modules/pages/NotFound.vue';

// 页面路由(独立页面)
const pageRoutes = [{ path: "/:path(.*)", component: NotFound }];

// 模块路由(基于主入口布局页面)
const moduleRoutes = {
    path: "/",
    name: "main",
    component: Main,
    redirect: {
        name: 'DashBoard'
    },
    children: [
        {
            path: "/DashBoard",
            name: "DashBoard",
            component: () => import("../modules/Dashboard/index.vue")
        },
        {
            path: '/UserManage',
            name: 'UserManage',
            component: () => import("../modules/UserManage/index.vue"),
            redirect: {
                name: 'UserList'
            },
            children: [
                {
                    path: '/UserManage/UserList',
                    name: 'UserList',
                    component: () => import('../modules/UserManage/UserList/index.vue')
                }
            ]
        },
        {
            path: "/MenuManage",
            name: "MenuManage",
            component: () => import("../modules/MenuManage/index.vue")
        },
    ],
};
const router = createRouter({
    // hash模式：createWebHashHistory，history模式：createWebHistory
    history: createWebHashHistory(),
    routes: pageRoutes.concat(moduleRoutes),
});

export default router;
