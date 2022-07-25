"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.updateSecret = exports.viewSecrets = exports.setupEnvironment = exports.setupProject = exports.loginToWorkspace = void 0;
var axios_1 = require("../utils/axios");
var confStore_1 = require("../utils/confStore");
var loginToWorkspace = function () { return __awaiter(void 0, void 0, void 0, function () {
    var token, res, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                token = (0, confStore_1.getConfig)('apiKey');
                if (!token) {
                    throw new Error('Please login first.');
                }
                return [4 /*yield*/, axios_1["default"].get('/workplace')];
            case 1:
                res = _a.sent();
                (0, confStore_1.setConfig)("account", res.data.workplace.name);
                (0, confStore_1.setConfig)("workplace_id", res.data.workplace.id);
                return [2 /*return*/, res.data.workplace];
            case 2:
                e_1 = _a.sent();
                console.log(e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.loginToWorkspace = loginToWorkspace;
var setupProject = function (pname) { return __awaiter(void 0, void 0, void 0, function () {
    var token, CheckIfProjectExists, res, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                token = (0, confStore_1.getConfig)('apiKey');
                if (!token) {
                    throw new Error('Please login first.');
                }
                return [4 /*yield*/, axios_1["default"].get("/projects/project?project=".concat(pname))];
            case 1:
                CheckIfProjectExists = _a.sent();
                if (!CheckIfProjectExists.data.success) return [3 /*break*/, 2];
                (0, confStore_1.setConfig)("project", CheckIfProjectExists.data.project.name);
                return [2 /*return*/, CheckIfProjectExists.data.project];
            case 2: return [4 /*yield*/, axios_1["default"].post('/projects', {
                    name: pname,
                    description: "Project used by DaaPM to store passwords"
                })];
            case 3:
                res = _a.sent();
                (0, confStore_1.setConfig)("project", res.data.project.name);
                return [2 /*return*/, res.data.project];
            case 4: return [3 /*break*/, 6];
            case 5:
                e_2 = _a.sent();
                console.log(e_2);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.setupProject = setupProject;
var setupEnvironment = function (pname) { return __awaiter(void 0, void 0, void 0, function () {
    var token, CheckIfEnvAlreadyExists, res, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                token = (0, confStore_1.getConfig)('apiKey');
                if (!token) {
                    throw new Error('Please login first.');
                }
                return [4 /*yield*/, axios_1["default"].get("/environments/environment?project=".concat(pname, "&environment=daapm-cli"))];
            case 1:
                CheckIfEnvAlreadyExists = _a.sent();
                if (!CheckIfEnvAlreadyExists.data.success) return [3 /*break*/, 2];
                (0, confStore_1.setConfig)("environment", CheckIfEnvAlreadyExists.data.environment.name);
                return [2 /*return*/, CheckIfEnvAlreadyExists.data.environment];
            case 2: return [4 /*yield*/, axios_1["default"].post('/environments', {
                    project: pname,
                    name: "daapm-cli",
                    slug: "daapm-cli"
                })];
            case 3:
                res = _a.sent();
                (0, confStore_1.setConfig)("environment", res.data.environment.name);
                return [2 /*return*/, res.data.environment];
            case 4: return [3 /*break*/, 6];
            case 5:
                e_3 = _a.sent();
                console.log(e_3);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.setupEnvironment = setupEnvironment;
var viewSecrets = function (sname) { return __awaiter(void 0, void 0, void 0, function () {
    var token, res, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                sname = sname.toUpperCase();
                token = (0, confStore_1.getConfig)('apiKey');
                if (!token) {
                    throw new Error('Please login first.');
                }
                return [4 /*yield*/, axios_1["default"].get("/configs/config/secret?project=".concat((0, confStore_1.getConfig)("project"), "&config=").concat((0, confStore_1.getConfig)("environment"), "&name=").concat(sname))];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.data];
            case 2:
                e_4 = _a.sent();
                console.log(e_4.response.data);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.viewSecrets = viewSecrets;
var updateSecret = function (sname, svalue) { return __awaiter(void 0, void 0, void 0, function () {
    var secrets, res, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sname = sname.toUpperCase();
                secrets = {};
                secrets["".concat(sname)] = svalue;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios_1["default"].post("/configs/config/secrets", {
                        "project": (0, confStore_1.getConfig)("project"),
                        "config": (0, confStore_1.getConfig)("environment"),
                        secrets: secrets
                    })];
            case 2:
                res = _a.sent();
                return [2 /*return*/, res.data];
            case 3:
                e_5 = _a.sent();
                console.log(e_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateSecret = updateSecret;
