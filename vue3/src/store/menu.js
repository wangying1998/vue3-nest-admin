import { defineStore } from 'pinia';
import menuList from '../MenuData/menuMock';

// 创建一个新的 store 实例
export const useMenuStore = defineStore('menu', {
    state: () => {
        return {
            menuList: menuList,
            activeMenu: 'DashBoard',
        }
    },
    actions: {
        setMenuList(state, data) {
            // this.menuList = data;
            state.menuList = menuList;
        },
        setActiveMenu(state, data) {
            state.activeMenu = data;
        }
    }
})
