import { createStore } from 'vuex';

import menuList from '../MenuData/menuMock';

// 创建一个新的 store 实例
const store = createStore({
    state () {
        return {
            menuList: menuList,
            activeMenu: 'DashBoard',
        }
    },
    mutations: {
        setMenuList(state, data) {
            // this.menuList = data;
            state.menuList = menuList;
        },
        setActiveMenu(state, data) {
            state.activeMenu = data;
        }
    }
})

export default store;
