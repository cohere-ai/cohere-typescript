(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["cohere"] = factory();
	else
		root["cohere"] = factory();
})(global, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 828:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var api_service_1 = __importDefault(__webpack_require__(836));
var ENDPOINT;
(function (ENDPOINT) {
    ENDPOINT["GENERATE"] = "/generate";
    ENDPOINT["EMBED"] = "/embed";
    ENDPOINT["CLASSIFY"] = "/classify";
    ENDPOINT["TOKENIZE"] = "/tokenize";
    ENDPOINT["DETOKENIZE"] = "/detokenize";
    ENDPOINT["DETECT_LANGUAGE"] = "/detect-language";
})(ENDPOINT || (ENDPOINT = {}));
var COHERE_EMBED_BATCH_SIZE = 5;
var Cohere = /** @class */ (function () {
    function Cohere() {
    }
    Cohere.prototype.init = function (key, version) {
        api_service_1.default.init(key, version);
    };
    Cohere.prototype.makeRequest = function (endpoint, data) {
        return api_service_1.default.post(endpoint, data);
    };
    /** Generates realistic text conditioned on a given input.
     * See: https://docs.cohere.ai/generate-reference
     */
    Cohere.prototype.generate = function (config) {
        return this.makeRequest(ENDPOINT.GENERATE, config);
    };
    /** Returns a list of tokens for the specified text.
     * See: https://docs.cohere.ai/tokenize-reference
     */
    Cohere.prototype.tokenize = function (_a) {
        var text = _a.text;
        return this.makeRequest(ENDPOINT.TOKENIZE, {
            text: text,
        });
    };
    /** Returns a string for the specified list of tokens.
     * See: https://docs.cohere.ai/detokenize-reference
     */
    Cohere.prototype.detokenize = function (_a) {
        var tokens = _a.tokens;
        return this.makeRequest(ENDPOINT.DETOKENIZE, {
            tokens: tokens,
        });
    };
    /** Returns text embeddings. An embedding is a list of floating point numbers that captures semantic
     * information about the text that it represents.
     * See: https://docs.cohere.ai/embed-reference
     */
    Cohere.prototype.embed = function (config) {
        var _this = this;
        var createBatches = function (array) {
            var result = [];
            for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
                var value = array_1[_i];
                var lastArray = result[result.length - 1];
                if (!lastArray || lastArray.length === COHERE_EMBED_BATCH_SIZE) {
                    result.push([value]);
                }
                else {
                    lastArray.push(value);
                }
            }
            return result;
        };
        return Promise.all(createBatches(config.texts).map(function (texts) {
            return _this.makeRequest(ENDPOINT.EMBED, __assign(__assign({}, config), { texts: texts }));
        })).then(function (results) {
            var embeddings = [];
            results.forEach(function (result) {
                embeddings = embeddings.concat(result.body.embeddings);
            });
            var response = {
                statusCode: results[0].statusCode,
                body: { embeddings: embeddings },
            };
            return response;
        });
    };
    /**
     * Classifies text as one of the given labels. Returns a confidence score for each label.
     * See: https://docs.cohere.ai/classify-reference
     */
    Cohere.prototype.classify = function (config) {
        return this.makeRequest(ENDPOINT.CLASSIFY, config);
    };
    Cohere.prototype.detectLanguage = function (config) {
        return this.makeRequest(ENDPOINT.DETECT_LANGUAGE, config);
    };
    return Cohere;
}());
var cohere = new Cohere();
module.exports = cohere;


/***/ }),

/***/ 836:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var https = __webpack_require__(211);
var error_service_1 = __importDefault(__webpack_require__(959));
var URL;
(function (URL) {
    URL["COHERE_API"] = "api.cohere.ai";
})(URL || (URL = {}));
var APIImpl = /** @class */ (function () {
    function APIImpl() {
        this.COHERE_API_KEY = "";
        this.COHERE_VERSION = "";
    }
    APIImpl.prototype.init = function (key, version) {
        this.COHERE_API_KEY = key;
        if (version === undefined) {
            this.COHERE_VERSION = "2022-12-06"; // currently latest, update when we version better
        }
        else {
            this.COHERE_VERSION = version;
        }
    };
    APIImpl.prototype.post = function (endpoint, data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        try {
                            // workaround for js projects that pass json strings.
                            data = JSON.parse("" + data);
                        }
                        catch (e) { }
                        var reqData = JSON.stringify(data);
                        var req = https.request({
                            hostname: URL.COHERE_API,
                            path: endpoint,
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json; charset=utf-8",
                                "Content-Length": Buffer.byteLength(reqData, "utf8"),
                                "Cohere-Version": _this.COHERE_VERSION,
                                Authorization: "Bearer " + _this.COHERE_API_KEY,
                                "Request-Source": "node-sdk",
                            },
                            timeout: 5000,
                        }, function (res) {
                            var data = [];
                            res.on("data", function (chunk) { return data.push(chunk); });
                            res.on("end", function () {
                                if ("x-api-warning" in res.headers) {
                                    var warnHeader = res.headers["x-api-warning"];
                                    if (typeof warnHeader === "string") {
                                        console.warn("\x1b[33mWarning: %s\x1b[0m", warnHeader);
                                    }
                                    else {
                                        for (var warning in warnHeader) {
                                            console.warn("\x1b[33mWarning: %s\x1b[0m", warning);
                                        }
                                    }
                                }
                                resolve({
                                    statusCode: res.statusCode,
                                    body: JSON.parse(Buffer.concat(data).toString()),
                                });
                            });
                        });
                        req.on("error", function (error) {
                            return reject(error_service_1.default.handleError(error));
                        });
                        req.write(reqData, "utf8");
                        req.end();
                    })];
            });
        });
    };
    return APIImpl;
}());
var API = new APIImpl();
module.exports = API;


/***/ }),

/***/ 959:
/***/ ((module) => {


var errorImpl = /** @class */ (function () {
    function errorImpl() {
    }
    errorImpl.prototype.handleError = function (error) {
        var _a, _b, _c;
        var status = ((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) || 500;
        var message = ((_c = (_b = error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || error.message;
        return {
            statusCode: status,
            body: {
                message: message,
            },
        };
    };
    return errorImpl;
}());
var errors = new errorImpl();
module.exports = errors;


/***/ }),

/***/ 211:
/***/ ((module) => {

module.exports = require("https");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(828);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=cohere.js.map