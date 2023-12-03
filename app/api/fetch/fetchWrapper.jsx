import {userService} from '@Services/index';
import axios from 'axios';

export const fetchWrapper = {
    get,
    getWithTokenParam,
    getPaginate,
    getWithSignal,
    getPaginateAxios,
    post,
    put,
    upload,
    update,
    delete: _delete
};

function get(url) {
    const requestOptions = {
        method: 'GET',
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function getWithSignal(url, signal) {
    const requestOptions = {
        method: 'GET',
        ...signal
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function getPaginate(url, body) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', ...authHeader(url)},
        body: JSON.stringify(body)
    };
    const {timeout = 8000} = requestOptions
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), timeout)
    const response = fetch(url, requestOptions).then(handleResponse);
    clearTimeout(id)
    return response
}

function getPaginateAxios(url, body) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', ...authHeader(url)},
    };
    return axios.post(url, body, requestOptions);
}

function getWithTokenParam(url, token) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'x-access-token': token
        }
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', ...authHeader(url)},
        // credentials: true,
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function upload(url, body) {
    const headers = {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data; boundary=100000000', ...authHeader(url)},
    };
    return axios.post(url, body, headers);
}

function update(url, body) {
    const headers = {
        method: 'PUT',
        headers: {'Content-Type': 'multipart/form-data; boundary=100000000', ...authHeader(url)},
    };
    return axios.put(url, body, headers);
}

function put(url, body) {
    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json', ...authHeader(url)},
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(url),
    };
    return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

function authHeader(url) {
    // return meter header with jwt if user is logged in and request is to the api url
    const user = userService.userValue;
    const isLoggedIn = user && user.userToken;
    const isApiUrl = url.startsWith(process.env.apiUrl);
    if (isLoggedIn && isApiUrl) {
        return {'x-access-token': user.userToken};
    } else {
        return {};
    }
}

class FetchError extends Error {
    constructor(message, statusCode) {
        super(message);
    }
}

function handleResponse(response) {

    if (!response.ok) {

        if (response.status == 401) {
            userService.logout();
        }

        throw new FetchError(`Problem fetching the data (${response.status} ${response.statusText})`, response.status);
    }

    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {

            if (response.status == 401) {
                userService.logout();
            }

            if (response.status == 403) {
                // const error = (data && data.message) || response.statusText;
                // return error
                return data
            }

            const error = (data && data.message) || response.statusText;
            return error
        }
        return data
    });
}

function handleResponseAxios(response) {
    if (!response.ok) {
        if (response.status == 401) {
            userService.logout();
        }
        if (response.status == 403) {
            userService.logout();
        }
        const error = (response && response.message) || response.statusText;
        return error;
    } else {
        return response;
    }
}

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    try {
        if (401 === error.response.status) {
            userService.logout();
            // const error = (response && response.message) || response.statusText;
            return error.response.data;
            // handle error: inform user, go to login, etc
        } else {
            return Promise.reject(error.response.data);
        }
    } catch (errorCatch) {
        return Promise.reject(error);
    }
});