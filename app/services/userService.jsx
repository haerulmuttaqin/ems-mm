import {BehaviorSubject} from 'rxjs'
import {fetchWrapper} from '@Api/fetch'

const { useQuery } = require('react-query');

const baseUrl = process.env.apiUrl
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')))

export const userService = {
    user: userSubject.asObservable(),
    get userValue() { return userSubject.value },
    login,
    logout,
    create,
    getAll,
    getPaginate,
    getPaginateContact,
    getById,
    update,
    updatePassword,
    bulkDelete,
    delete: _delete
};

function login(username, password) {
    return fetchWrapper.post(`${baseUrl}/auth/login`, { username, password })
        .then(user => {
            userSubject.next(user.data);
            localStorage.setItem('user', JSON.stringify(user.data));
        });
}

function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    userSubject.next(null);
}

function bulkDelete(params) {
    return fetchWrapper.post(`${baseUrl}/user/delete`, params);
}

// async function getPaginate(page, size) {
//     return await fetchWrapper.get(`${baseUrl}/users/paginate?page=${page}&size=${size}`);
// }

function getPaginate(page, size) {
    return useQuery(
        ['users', page, size],
        async () => {
            const res = await fetchWrapper.get(`${baseUrl}/users/paginate?page=${page}&size=${size}`);
            return res.data;
        },
        { keepPreviousData: false }
    );
}

function getPaginateContact(page, size) {
    return useQuery(
        ['users', page, size],
        async () => {
            const res = await fetchWrapper.get(`${baseUrl}/usercontacts/paginate?page=${page}&size=${size}`);
            return res.data;
        },
        { keepPreviousData: false }
    );
}

function create(params) {
    return fetchWrapper.post(`${baseUrl}/user`, params);
}

function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/user/${id}`);
}

function update(params) {
    return fetchWrapper.put(`${baseUrl}/user`, params)
        .then(x => {
            // update stored user if the logged in user updated their own record
            if (params.userSid === userSubject.value.userSid) {
                // update local storage
                const user = { ...userSubject.value, ...params };
                localStorage.setItem('user', JSON.stringify(user.data));

                // publish updated user to subscribers
                userSubject.next(user);
            }
            return x;
        });
}

function updatePassword(params) {
    return fetchWrapper.put(`${baseUrl}/user/password`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
