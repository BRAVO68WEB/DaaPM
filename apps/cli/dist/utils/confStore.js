"use strict";
exports.__esModule = true;
exports.getConfigPath = exports.clearConfig = exports.deleteConfig = exports.getConfig = exports.setConfig = void 0;
var conf_1 = require("conf");
var config = new conf_1["default"]({
    configName: 'cli-config',
    projectName: 'daapm',
    projectSuffix: ""
});
var setConfig = function (key, value) {
    config.set(key, value);
};
exports.setConfig = setConfig;
var getConfig = function (key) {
    return config.get(key);
};
exports.getConfig = getConfig;
var deleteConfig = function (key) {
    config["delete"](key);
};
exports.deleteConfig = deleteConfig;
var clearConfig = function () {
    config.clear();
};
exports.clearConfig = clearConfig;
var getConfigPath = function () {
    return config.path;
};
exports.getConfigPath = getConfigPath;
