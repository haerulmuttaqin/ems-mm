import {BehaviorSubject} from 'rxjs'
import {fetchWrapper} from '@Api/fetch'

const { useQuery } = require('react-query');

const storageName = 'meterGroup'
const baseUrl = process.env.API_URL
const meterGroupRepo = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem(storageName) as any))
const meterLiveDataList = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('meterLiveDataList') as any))

export const meterGroupService = {
    user: meterGroupRepo.asObservable(),
    meterLiveDataList: meterLiveDataList.asObservable(),
    get meterGroupValue() { return meterGroupRepo.value || null },
    get meterLiveDataListValue() { return meterLiveDataList.value || [] },
    fetchMeterGroup,
    fetchMeterByGroup,
    fetchMeterCounterLiveByMeterID,
    fetchMeterCounterLiveByMeterIDuseQuery,
    fetchAllMeterCounterLiveByMeterID,
    fetcAndStorehMeterCounterLiveByMeterIDuseQuery,
};

function fetchMeterGroup() {
    return fetchWrapper.get(`${baseUrl}/group_meter/`)
        .then(response => {
            meterGroupRepo.next(response.data);
            localStorage.setItem(storageName, JSON.stringify(response.data));
            return response
        });
}

function fetchMeterByGroup(groupID) {
    return fetchWrapper.get(`${baseUrl}/group_meter/group/${groupID}`)
}

function fetchMeterCounterLiveByMeterIDuseQuery(meterID) {
    return useQuery(
        ['counter_live', meterID],
        async () => {
            const res = await fetchWrapper.get(`${baseUrl}/counter_live/meter/${meterID}`);
            return res?.data?.[0];
        },
        { keepPreviousData: true, refetchInterval: 2500, refetchIntervalInBackground: true }
    );
}

function fetcAndStorehMeterCounterLiveByMeterIDuseQuery(meterID) {
    return useQuery(
        ['counter_live', meterID],
        async () => {
            const res = await fetchWrapper.get(`${baseUrl}/counter_live/meter/${meterID}`);
            meterLiveDataList.next(meterDataList => [...meterDataList, res?.data?.[0]]);
            return res?.data?.[0]
        },
        { keepPreviousData: true, refetchInterval: 1000, refetchIntervalInBackground: true }
    );
}
function fetchAllMeterCounterLiveByMeterID(meterID) {
    return fetchWrapper.get(`${baseUrl}/counter_live/all/meter/${meterID}`)
}
function fetchMeterCounterLiveByMeterID(meterID) {
    return fetchWrapper.get(`${baseUrl}/counter_live/meter/${meterID}`)
}

//
// function logout() {
//     // remove user from local storage, publish null to user subscribers and redirect to login page
//     localStorage.removeItem('user');
//     userSubject.next(null);
// }
//
// function bulkDelete(params) {
//     return fetchWrapper.post(`${baseUrl}/user/delete`, params);
// }
//
// // async function getPaginate(page, size) {
// //     return await fetchWrapper.get(`${baseUrl}/users/paginate?page=${page}&size=${size}`);
// // }
//
// function getPaginate(page, size) {
//     return useQuery(
//         ['users', page, size],
//         async () => {
//             const res = await fetchWrapper.get(`${baseUrl}/users/paginate?page=${page}&size=${size}`);
//             return res.data;
//         },
//         { keepPreviousData: false }
//     );
// }
//
// function getPaginateContact(page, size) {
//     return useQuery(
//         ['users', page, size],
//         async () => {
//             const res = await fetchWrapper.get(`${baseUrl}/usercontacts/paginate?page=${page}&size=${size}`);
//             return res.data;
//         },
//         { keepPreviousData: false }
//     );
// }
//
// function create(params) {
//     return fetchWrapper.post(`${baseUrl}/user`, params);
// }
//
// function getAll() {
//     return fetchWrapper.get(baseUrl);
// }
//
// function getById(id) {
//     return fetchWrapper.get(`${baseUrl}/user/${id}`);
// }
//
// function update(params) {
//     return fetchWrapper.put(`${baseUrl}/user`, params)
//         .then(x => {
//             // update stored user if the logged in user updated their own record
//             if (params.userSid === userSubject.value.userSid) {
//                 // update local storage
//                 const user = { ...userSubject.value, ...params };
//                 localStorage.setItem('user', JSON.stringify(user.data));
//
//                 // publish updated user to subscribers
//                 userSubject.next(user);
//             }
//             return x;
//         });
// }
//
// function updatePassword(params) {
//     return fetchWrapper.put(`${baseUrl}/user/password`, params);
// }
//
// // prefixed with underscored because delete is a reserved word in javascript
// function _delete(id) {
//     return fetchWrapper.delete(`${baseUrl}/${id}`);
// }
