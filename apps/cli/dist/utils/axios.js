"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var confStore_1 = require("./confStore");
var token = (0, confStore_1.getConfig)('apiKey');
token = token + ":";
exports["default"] = axios_1["default"].create({
    baseURL: 'https://api.doppler.com/v3',
    headers: {
        Accept: 'application/json',
        Authorization: 'Basic ' + btoa(token)
    }
});
