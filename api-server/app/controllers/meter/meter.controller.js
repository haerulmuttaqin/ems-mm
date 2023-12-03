const response = require("../../response");
const request = require('request');

const meterGroupDummy = require('./dummy_metergroup.json');
const metersDummy = require('./dummy_meters.json');
const meterDummy = require('./dummy_meter.json');

exports.getMeterGroup = (req, res) => {

    // return response.ok('Fetch successfully', meterGroupDummy, res)

    request({
        uri: `http://203.194.113.230:4584/api_nbt/api/group_meter/`,
        method: 'GET'
    }, function (err, resp, body) {
        if (!err) {
            const result = JSON.parse(resp.body)
            response.ok('Fetch successfully', result, res)
        } else {
            response.error('Failed to fetch', err, res)
        }
    });

};

exports.getMeterByGroupID = (req, res) => {

    // return response.ok('Fetch successfully', metersDummy, res)

    request({
        uri: `http://203.194.113.230:4584/api_nbt/api/data_meter/`,
        method: 'GET'
    }, function (err, resp, body) {
        if (!err) {
            const data = JSON.parse(resp.body)
            const dataFiltered = data?.filter(item => item.metergroupid === req.params.groupID)
            const meterID = []
            let result = []
            dataFiltered.forEach(item => {
                meterID.push(item.id)
            })
            request({
                uri: `http://203.194.113.230:4584/api_nbt/api/counter_live/`,
                method: 'GET'
            }, function (err, resp, body) {
                const data = JSON.parse(resp.body)
                const meterFiltered = data?.filter(item => meterID.includes(item.id)).sort(function(a, b){return a.id + b.id});
                response.ok('Fetch successfully ' + req.params.groupID, meterFiltered, res)
            });
        } else {
            response.error('Failed to fetch', err, res)
        }
    });

};

exports.getCounterLiveByMeterID = (req, res) => {

    // return response.ok('Fetch successfully', meterDummy, res)

    request({
        uri: `http://203.194.113.230:4584/api_nbt/api/counter_live/${req.params.meterID}`,
        method: 'GET'
    }, function (err, resp, body) {
        if (!err) {
            const data = JSON.parse(resp.body)
            response.ok('Fetch successfully ' + req.params.meterID, data, res)
        } else {
            response.error('Failed to fetch', err, res)
        }
    });
};

exports.getAllCounterLiveByMeterID = (req, res) => {

    // return response.ok('Fetch successfully', metersDummy, res)

    request({
        uri: `http://203.194.113.230:4584/api_nbt/api/counter_hourly/${req.params.meterID}/12`,
        method: 'GET'
    }, function (err, resp, body) {
        if (!err) {
            const dataInit = JSON.parse(resp.body)
            const dataFiltered = dataInit?.filter(item => item.id === req.params.meterID).sort(function(a, b){return new Date(a.date_time) - new Date(b.date_time)});
            response.ok('Fetch successfully ' + req.params.meterID, dataFiltered, res)
        } else {
            response.error('Failed to fetch', err, res)
        }
    });
};