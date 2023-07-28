import request from '@/api/request';

export function getUserListApi(data = {}) {
    return request({
        url: '/user/getUserList',
        method: 'POST',
        data,
    });
}

export function addUserApi(data = {}) {
    return request({
        url: '/user/addUser',
        method: 'POST',
        data,
    });
}

export function updateUserApi(data = {}) {
    return request({
        url: '/user/updateUser',
        method: 'POST',
        data,
    });
}

export function delUserApi(data = {}) {
    return request({
        url: '/user/delUser',
        method: 'POST',
        data,
    });
}