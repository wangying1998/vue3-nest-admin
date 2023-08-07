import request from '@/api/request';

export function getMenuApi(data = {}) {
    return request({
        url: '/menu/list',
        method: 'POST',
        data,
    });
}

export function addMenuApi(data = {}) {
    return request({
        url: '/menu/add',
        method: 'POST',
        data,
    });
}

export function updateMenuApi(data = {}) {
    return request({
        url: '/menu/update',
        method: 'POST',
        data,
    });
}

export function delMenuApi(data = {}) {
    return request({
        url: '/menu/del',
        method: 'POST',
        data,
    });
}