'use strict';
const {
    CODE_SUCCESS,
    CODE_INTERNAL_SERVER_ERROR,
    CODE_UNAUTHORIZED,
    CODE_FORBIDDEN,
    CODE_BAD_REQUEST,
    CODE_NOTFOUND
} = require("../utils/constants.js");

exports.ok = (message, data, res) => {
    const response = {
        'success': true,
        'message': message == null ? 'Fetch successfully' : message,
        'data': data != null ? data : null,
    };
    res.status(CODE_SUCCESS)
    res.json(response)
    res.end()
};

exports.success = (values, res) => {
    const response = {
        'success': true,
        'message': values,
    };
    res.status(CODE_SUCCESS)
    res.json(response)
    res.end()
};

exports.notFound = (message, res) => {
    const response = {
        'success': false,
        'message': message
    };
    res.status(CODE_NOTFOUND)
    res.json(response)
    res.end()
};

exports.unauthorized = (message, res) => {
    const response = {
        'success': false,
        'message': message
    };
    res.status(CODE_UNAUTHORIZED)
    res.json(response)
    res.end()
};

exports.error = (message, error, res) => {
    const response = {
        'success': false,
        'message': message,
    };
    if (process.env.NODE_ENV == 'development') {
        response['data'] = error != null ? {error: error} : null
    }
    res.status(CODE_INTERNAL_SERVER_ERROR)
    res.json(response)
    res.end()
};

exports.badRequest = (message, data, res) => {
    let response = {
        'success': false,
        'message': message,
        'data': {fieldName: data},
    }
    res.status(CODE_BAD_REQUEST)
    res.json(response)
    res.end()
};

exports.forbidden = (message, res) => {
    const response = {
        'success': false,
        'message': message
    };
    res.status(CODE_FORBIDDEN)
    res.json(response)
    res.end()
};

exports.unauthorized = function (message, res) {
    const response = {
        'success': false,
        'message': `Unauthorized ${message}`
    };
    res.status(CODE_UNAUTHORIZED)
    res.json(response)
    res.end()
};