"use strict";
(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([["vendors-bff14f0d"],{

/***/ 8757:
/*!*******************************************************************************************!*\
  !*** ./node_modules/aurelia-loader-webpack/dist/native-modules/aurelia-loader-webpack.js ***!
  \*******************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TextTemplateLoader": function() { return /* binding */ TextTemplateLoader; },
/* harmony export */   "WebpackLoader": function() { return /* binding */ WebpackLoader; },
/* harmony export */   "ensureOriginOnExports": function() { return /* binding */ ensureOriginOnExports; }
/* harmony export */ });
/* harmony import */ var aurelia_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-loader */ 209);
/* harmony import */ var aurelia_metadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-metadata */ 1383);
/* harmony import */ var aurelia_pal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! aurelia-pal */ 1015);
/* module decorator */ module = __webpack_require__.hmd(module);




/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
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
}

/**
* An implementation of the TemplateLoader interface implemented with text-based loading.
*/
var TextTemplateLoader = /** @class */ (function () {
    function TextTemplateLoader() {
    }
    /**
    * Loads a template.
    * @param loader The loader that is requesting the template load.
    * @param entry The TemplateRegistryEntry to load and populate with a template.
    * @return A promise which resolves when the TemplateRegistryEntry is loaded with a template.
    */
    TextTemplateLoader.prototype.loadTemplate = function (loader, entry) {
        return __awaiter(this, void 0, void 0, function () {
            var text;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, loader.loadText(entry.address)];
                    case 1:
                        text = _a.sent();
                        entry.template = aurelia_pal__WEBPACK_IMPORTED_MODULE_2__.DOM.createTemplateFromMarkup(text);
                        return [2 /*return*/];
                }
            });
        });
    };
    return TextTemplateLoader;
}());
function ensureOriginOnExports(moduleExports, moduleId) {
    var target = moduleExports;
    var key;
    var exportedValue;
    if (target.__useDefault) {
        target = target.default;
    }
    aurelia_metadata__WEBPACK_IMPORTED_MODULE_1__.Origin.set(target, new aurelia_metadata__WEBPACK_IMPORTED_MODULE_1__.Origin(moduleId, 'default'));
    if (typeof target === 'object') {
        for (key in target) {
            exportedValue = target[key];
            if (typeof exportedValue === 'function') {
                aurelia_metadata__WEBPACK_IMPORTED_MODULE_1__.Origin.set(exportedValue, new aurelia_metadata__WEBPACK_IMPORTED_MODULE_1__.Origin(moduleId, key));
            }
        }
    }
    return moduleExports;
}
/**
* A default implementation of the Loader abstraction which works with webpack (extended common-js style).
*/
var WebpackLoader = /** @class */ (function (_super) {
    __extends(WebpackLoader, _super);
    function WebpackLoader() {
        var _this = _super.call(this) || this;
        _this.moduleRegistry = Object.create(null);
        _this.loaderPlugins = Object.create(null);
        _this.modulesBeingLoaded = new Map();
        _this.useTemplateLoader(new TextTemplateLoader());
        _this.addPlugin('template-registry-entry', {
            fetch: function (moduleId) { return __awaiter(_this, void 0, void 0, function () {
                var HmrContext, entry;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // HMR:
                            if (false) {}
                            entry = this.getOrCreateTemplateRegistryEntry(moduleId);
                            if (!!entry.templateIsLoaded) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.templateLoader.loadTemplate(this, entry)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/, entry];
                    }
                });
            }); }
        });
        aurelia_pal__WEBPACK_IMPORTED_MODULE_2__.PLATFORM.eachModule = function (callback) {
            var registry = __webpack_require__.c;
            var cachedModuleIds = Object.getOwnPropertyNames(registry);
            cachedModuleIds
                // Note: we use .some here like a .forEach that can be "break"ed out of.
                // It will stop iterating only when a truthy value is returned.
                // Even though the docs say "true" explicitly, loader-default also goes by truthy
                // and this is to keep it consistent with that.
                .some(function (moduleId) {
                var moduleExports = registry[moduleId].exports;
                if (typeof moduleExports === 'object') {
                    return callback(moduleId, moduleExports);
                }
                return false;
            });
        };
        return _this;
    }
    WebpackLoader.prototype._import = function (address, defaultHMR) {
        if (defaultHMR === void 0) { defaultHMR = true; }
        return __awaiter(this, void 0, void 0, function () {
            var addressParts, moduleId, loaderPlugin, plugin_1, asyncModuleId, callback;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        addressParts = address.split('!');
                        moduleId = addressParts.splice(addressParts.length - 1, 1)[0];
                        loaderPlugin = addressParts.length === 1 ? addressParts[0] : null;
                        if (!loaderPlugin) return [3 /*break*/, 2];
                        plugin_1 = this.loaderPlugins[loaderPlugin];
                        if (!plugin_1) {
                            throw new Error("Plugin " + loaderPlugin + " is not registered in the loader.");
                        }
                        if (false) {}
                        return [4 /*yield*/, plugin_1.fetch(moduleId)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        if (__webpack_require__.m[moduleId]) {
                            if (defaultHMR && module.hot && 0) {}
                            return [2 /*return*/, __webpack_require__(moduleId)];
                        }
                        asyncModuleId = "async!" + moduleId;
                        if (!__webpack_require__.m[asyncModuleId]) return [3 /*break*/, 4];
                        if (defaultHMR && module.hot && 0) {}
                        callback = __webpack_require__(asyncModuleId);
                        return [4 /*yield*/, new Promise(callback)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: throw new Error("Unable to find module with ID: " + moduleId);
                }
            });
        });
    };
    /**
    * Maps a module id to a source.
    * @param id The module id.
    * @param source The source to map the module to.
    */
    WebpackLoader.prototype.map = function (id, source) { };
    /**
    * Normalizes a module id.
    * @param moduleId The module id to normalize.
    * @param relativeTo What the module id should be normalized relative to.
    * @return The normalized module id.
    */
    WebpackLoader.prototype.normalizeSync = function (moduleId, relativeTo) {
        return moduleId;
    };
    /**
    * Normalizes a module id.
    * @param moduleId The module id to normalize.
    * @param relativeTo What the module id should be normalized relative to.
    * @return The normalized module id.
    */
    WebpackLoader.prototype.normalize = function (moduleId, relativeTo) {
        return Promise.resolve(moduleId);
    };
    /**
    * Instructs the loader to use a specific TemplateLoader instance for loading templates
    * @param templateLoader The instance of TemplateLoader to use for loading templates.
    */
    WebpackLoader.prototype.useTemplateLoader = function (templateLoader) {
        this.templateLoader = templateLoader;
    };
    /**
    * Loads a collection of modules.
    * @param ids The set of module ids to load.
    * @return A Promise for an array of loaded modules.
    */
    WebpackLoader.prototype.loadAllModules = function (ids) {
        var _this = this;
        return Promise.all(ids.map(function (id) { return _this.loadModule(id); }));
    };
    /**
    * Loads a module.
    * @param moduleId The module ID to load.
    * @return A Promise for the loaded module.
    */
    WebpackLoader.prototype.loadModule = function (moduleId, defaultHMR) {
        if (defaultHMR === void 0) { defaultHMR = true; }
        return __awaiter(this, void 0, void 0, function () {
            var existing, beingLoaded, moduleExports;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        existing = this.moduleRegistry[moduleId];
                        if (existing) {
                            return [2 /*return*/, existing];
                        }
                        beingLoaded = this.modulesBeingLoaded.get(moduleId);
                        if (beingLoaded) {
                            return [2 /*return*/, beingLoaded];
                        }
                        beingLoaded = this._import(moduleId, defaultHMR);
                        this.modulesBeingLoaded.set(moduleId, beingLoaded);
                        return [4 /*yield*/, beingLoaded];
                    case 1:
                        moduleExports = _a.sent();
                        this.moduleRegistry[moduleId] = ensureOriginOnExports(moduleExports, moduleId);
                        this.modulesBeingLoaded.delete(moduleId);
                        return [2 /*return*/, moduleExports];
                }
            });
        });
    };
    /**
    * Loads a template.
    * @param url The url of the template to load.
    * @return A Promise for a TemplateRegistryEntry containing the template.
    */
    WebpackLoader.prototype.loadTemplate = function (url) {
        return this.loadModule(this.applyPluginToUrl(url, 'template-registry-entry'), false);
    };
    /**
    * Loads a text-based resource.
    * @param url The url of the text file to load.
    * @return A Promise for text content.
    */
    WebpackLoader.prototype.loadText = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var result, defaultExport;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadModule(url, false)];
                    case 1:
                        result = _a.sent();
                        defaultExport = result && result.__esModule ? result.default : result;
                        if (defaultExport instanceof Array && defaultExport[0] instanceof Array && defaultExport.hasOwnProperty('toString')) {
                            // we're dealing with a file loaded using the css-loader:
                            return [2 /*return*/, defaultExport.toString()];
                        }
                        return [2 /*return*/, typeof result === "string" ? result : defaultExport];
                }
            });
        });
    };
    /**
    * Alters a module id so that it includes a plugin loader.
    * @param url The url of the module to load.
    * @param pluginName The plugin to apply to the module id.
    * @return The plugin-based module id.
    */
    WebpackLoader.prototype.applyPluginToUrl = function (url, pluginName) {
        return pluginName + "!" + url;
    };
    /**
    * Registers a plugin with the loader.
    * @param pluginName The name of the plugin.
    * @param implementation The plugin implementation.
    */
    WebpackLoader.prototype.addPlugin = function (pluginName, implementation) {
        this.loaderPlugins[pluginName] = implementation;
    };
    return WebpackLoader;
}(aurelia_loader__WEBPACK_IMPORTED_MODULE_0__.Loader));
aurelia_pal__WEBPACK_IMPORTED_MODULE_2__.PLATFORM.Loader = WebpackLoader;




/***/ }),

/***/ 209:
/*!***************************************************************************!*\
  !*** ./node_modules/aurelia-loader/dist/native-modules/aurelia-loader.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TemplateDependency": function() { return /* binding */ TemplateDependency; },
/* harmony export */   "TemplateRegistryEntry": function() { return /* binding */ TemplateRegistryEntry; },
/* harmony export */   "Loader": function() { return /* binding */ Loader; }
/* harmony export */ });
/* harmony import */ var aurelia_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-path */ 8627);
/* harmony import */ var aurelia_metadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-metadata */ 1383);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();






var TemplateDependency = function TemplateDependency(src, name) {
  

  this.src = src;
  this.name = name;
};

var TemplateRegistryEntry = function () {
  function TemplateRegistryEntry(address) {
    

    this.templateIsLoaded = false;
    this.factoryIsReady = false;
    this.resources = null;
    this.dependencies = null;

    this.address = address;
    this.onReady = null;
    this._template = null;
    this._factory = null;
  }

  TemplateRegistryEntry.prototype.addDependency = function addDependency(src, name) {
    var finalSrc = typeof src === 'string' ? (0,aurelia_path__WEBPACK_IMPORTED_MODULE_0__.relativeToFile)(src, this.address) : aurelia_metadata__WEBPACK_IMPORTED_MODULE_1__.Origin.get(src).moduleId;

    this.dependencies.push(new TemplateDependency(finalSrc, name));
  };

  _createClass(TemplateRegistryEntry, [{
    key: 'template',
    get: function get() {
      return this._template;
    },
    set: function set(value) {
      var address = this.address;
      var requires = void 0;
      var current = void 0;
      var src = void 0;
      var dependencies = void 0;

      this._template = value;
      this.templateIsLoaded = true;

      requires = value.content.querySelectorAll('require');
      dependencies = this.dependencies = new Array(requires.length);

      for (var i = 0, ii = requires.length; i < ii; ++i) {
        current = requires[i];
        src = current.getAttribute('from');

        if (!src) {
          throw new Error('<require> element in ' + address + ' has no "from" attribute.');
        }

        dependencies[i] = new TemplateDependency((0,aurelia_path__WEBPACK_IMPORTED_MODULE_0__.relativeToFile)(src, address), current.getAttribute('as'));

        if (current.parentNode) {
          current.parentNode.removeChild(current);
        }
      }
    }
  }, {
    key: 'factory',
    get: function get() {
      return this._factory;
    },
    set: function set(value) {
      this._factory = value;
      this.factoryIsReady = true;
    }
  }]);

  return TemplateRegistryEntry;
}();

var Loader = function () {
  function Loader() {
    

    this.templateRegistry = {};
  }

  Loader.prototype.map = function map(id, source) {
    throw new Error('Loaders must implement map(id, source).');
  };

  Loader.prototype.normalizeSync = function normalizeSync(moduleId, relativeTo) {
    throw new Error('Loaders must implement normalizeSync(moduleId, relativeTo).');
  };

  Loader.prototype.normalize = function normalize(moduleId, relativeTo) {
    throw new Error('Loaders must implement normalize(moduleId: string, relativeTo: string): Promise<string>.');
  };

  Loader.prototype.loadModule = function loadModule(id) {
    throw new Error('Loaders must implement loadModule(id).');
  };

  Loader.prototype.loadAllModules = function loadAllModules(ids) {
    throw new Error('Loader must implement loadAllModules(ids).');
  };

  Loader.prototype.loadTemplate = function loadTemplate(url) {
    throw new Error('Loader must implement loadTemplate(url).');
  };

  Loader.prototype.loadText = function loadText(url) {
    throw new Error('Loader must implement loadText(url).');
  };

  Loader.prototype.applyPluginToUrl = function applyPluginToUrl(url, pluginName) {
    throw new Error('Loader must implement applyPluginToUrl(url, pluginName).');
  };

  Loader.prototype.addPlugin = function addPlugin(pluginName, implementation) {
    throw new Error('Loader must implement addPlugin(pluginName, implementation).');
  };

  Loader.prototype.getOrCreateTemplateRegistryEntry = function getOrCreateTemplateRegistryEntry(address) {
    return this.templateRegistry[address] || (this.templateRegistry[address] = new TemplateRegistryEntry(address));
  };

  return Loader;
}();

/***/ }),

/***/ "aurelia-logging-console":
/*!*********************************************************************************************!*\
  !*** ./node_modules/aurelia-logging-console/dist/native-modules/aurelia-logging-console.js ***!
  \*********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConsoleAppender": function() { return /* binding */ ConsoleAppender; }
/* harmony export */ });


var ConsoleAppender = function () {
  function ConsoleAppender() {
    
  }

  ConsoleAppender.prototype.debug = function debug(logger) {
    var _console;

    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    (_console = console).debug.apply(_console, ["DEBUG [" + logger.id + "]"].concat(rest));
  };

  ConsoleAppender.prototype.info = function info(logger) {
    var _console2;

    for (var _len2 = arguments.length, rest = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      rest[_key2 - 1] = arguments[_key2];
    }

    (_console2 = console).info.apply(_console2, ["INFO [" + logger.id + "]"].concat(rest));
  };

  ConsoleAppender.prototype.warn = function warn(logger) {
    var _console3;

    for (var _len3 = arguments.length, rest = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      rest[_key3 - 1] = arguments[_key3];
    }

    (_console3 = console).warn.apply(_console3, ["WARN [" + logger.id + "]"].concat(rest));
  };

  ConsoleAppender.prototype.error = function error(logger) {
    var _console4;

    for (var _len4 = arguments.length, rest = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      rest[_key4 - 1] = arguments[_key4];
    }

    (_console4 = console).error.apply(_console4, ["ERROR [" + logger.id + "]"].concat(rest));
  };

  return ConsoleAppender;
}();

/***/ }),

/***/ 8099:
/*!*****************************************************************************!*\
  !*** ./node_modules/aurelia-logging/dist/native-modules/aurelia-logging.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "logLevel": function() { return /* binding */ logLevel; },
/* harmony export */   "getLogger": function() { return /* binding */ getLogger; },
/* harmony export */   "addAppender": function() { return /* binding */ addAppender; },
/* harmony export */   "removeAppender": function() { return /* binding */ removeAppender; },
/* harmony export */   "getAppenders": function() { return /* binding */ getAppenders; },
/* harmony export */   "clearAppenders": function() { return /* binding */ clearAppenders; },
/* harmony export */   "addCustomLevel": function() { return /* binding */ addCustomLevel; },
/* harmony export */   "removeCustomLevel": function() { return /* binding */ removeCustomLevel; },
/* harmony export */   "setLevel": function() { return /* binding */ setLevel; },
/* harmony export */   "getLevel": function() { return /* binding */ getLevel; },
/* harmony export */   "Logger": function() { return /* binding */ Logger; }
/* harmony export */ });


var logLevel = {
  none: 0,
  error: 10,
  warn: 20,
  info: 30,
  debug: 40
};

var loggers = {};
var appenders = [];
var globalDefaultLevel = logLevel.none;

var standardLevels = ['none', 'error', 'warn', 'info', 'debug'];
function isStandardLevel(level) {
  return standardLevels.filter(function (l) {
    return l === level;
  }).length > 0;
}

function appendArgs() {
  return [this].concat(Array.prototype.slice.call(arguments));
}

function logFactory(level) {
  var threshold = logLevel[level];
  return function () {
    if (this.level < threshold) {
      return;
    }

    var args = appendArgs.apply(this, arguments);
    var i = appenders.length;
    while (i--) {
      var _appenders$i;

      (_appenders$i = appenders[i])[level].apply(_appenders$i, args);
    }
  };
}

function logFactoryCustom(level) {
  var threshold = logLevel[level];
  return function () {
    if (this.level < threshold) {
      return;
    }

    var args = appendArgs.apply(this, arguments);
    var i = appenders.length;
    while (i--) {
      var appender = appenders[i];
      if (appender[level] !== undefined) {
        appender[level].apply(appender, args);
      }
    }
  };
}

function connectLoggers() {
  var proto = Logger.prototype;
  for (var _level in logLevel) {
    if (isStandardLevel(_level)) {
      if (_level !== 'none') {
        proto[_level] = logFactory(_level);
      }
    } else {
      proto[_level] = logFactoryCustom(_level);
    }
  }
}

function disconnectLoggers() {
  var proto = Logger.prototype;
  for (var _level2 in logLevel) {
    if (_level2 !== 'none') {
      proto[_level2] = function () {};
    }
  }
}

function getLogger(id) {
  return loggers[id] || new Logger(id);
}

function addAppender(appender) {
  if (appenders.push(appender) === 1) {
    connectLoggers();
  }
}

function removeAppender(appender) {
  appenders = appenders.filter(function (a) {
    return a !== appender;
  });
}

function getAppenders() {
  return [].concat(appenders);
}

function clearAppenders() {
  appenders = [];
  disconnectLoggers();
}

function addCustomLevel(name, value) {
  if (logLevel[name] !== undefined) {
    throw Error('Log level "' + name + '" already exists.');
  }

  if (isNaN(value)) {
    throw Error('Value must be a number.');
  }

  logLevel[name] = value;

  if (appenders.length > 0) {
    connectLoggers();
  } else {
    Logger.prototype[name] = function () {};
  }
}

function removeCustomLevel(name) {
  if (logLevel[name] === undefined) {
    return;
  }

  if (isStandardLevel(name)) {
    throw Error('Built-in log level "' + name + '" cannot be removed.');
  }

  delete logLevel[name];
  delete Logger.prototype[name];
}

function setLevel(level) {
  globalDefaultLevel = level;
  for (var key in loggers) {
    loggers[key].setLevel(level);
  }
}

function getLevel() {
  return globalDefaultLevel;
}

var Logger = function () {
  function Logger(id) {
    

    var cached = loggers[id];
    if (cached) {
      return cached;
    }

    loggers[id] = this;
    this.id = id;
    this.level = globalDefaultLevel;
  }

  Logger.prototype.debug = function debug(message) {};

  Logger.prototype.info = function info(message) {};

  Logger.prototype.warn = function warn(message) {};

  Logger.prototype.error = function error(message) {};

  Logger.prototype.setLevel = function setLevel(level) {
    this.level = level;
  };

  Logger.prototype.isDebugEnabled = function isDebugEnabled() {
    return this.level === logLevel.debug;
  };

  return Logger;
}();

/***/ }),

/***/ 1383:
/*!*******************************************************************************!*\
  !*** ./node_modules/aurelia-metadata/dist/native-modules/aurelia-metadata.js ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "metadata": function() { return /* binding */ metadata; },
/* harmony export */   "Origin": function() { return /* binding */ Origin; },
/* harmony export */   "decorators": function() { return /* binding */ decorators; },
/* harmony export */   "deprecated": function() { return /* binding */ deprecated; },
/* harmony export */   "mixin": function() { return /* binding */ mixin; },
/* harmony export */   "protocol": function() { return /* binding */ protocol; }
/* harmony export */ });
/* harmony import */ var aurelia_pal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-pal */ 1015);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };





function isObject(val) {
  return val && (typeof val === 'function' || (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object');
}

var metadata = {
  resource: 'aurelia:resource',
  paramTypes: 'design:paramtypes',
  propertyType: 'design:type',
  properties: 'design:properties',
  get: function get(metadataKey, target, targetKey) {
    if (!isObject(target)) {
      return undefined;
    }
    var result = metadata.getOwn(metadataKey, target, targetKey);
    return result === undefined ? metadata.get(metadataKey, Object.getPrototypeOf(target), targetKey) : result;
  },
  getOwn: function getOwn(metadataKey, target, targetKey) {
    if (!isObject(target)) {
      return undefined;
    }
    return Reflect.getOwnMetadata(metadataKey, target, targetKey);
  },
  define: function define(metadataKey, metadataValue, target, targetKey) {
    Reflect.defineMetadata(metadataKey, metadataValue, target, targetKey);
  },
  getOrCreateOwn: function getOrCreateOwn(metadataKey, Type, target, targetKey) {
    var result = metadata.getOwn(metadataKey, target, targetKey);

    if (result === undefined) {
      result = new Type();
      Reflect.defineMetadata(metadataKey, result, target, targetKey);
    }

    return result;
  }
};

var originStorage = new Map();
var unknownOrigin = Object.freeze({ moduleId: undefined, moduleMember: undefined });

var Origin = function () {
  function Origin(moduleId, moduleMember) {
    

    this.moduleId = moduleId;
    this.moduleMember = moduleMember;
  }

  Origin.get = function get(fn) {
    var origin = originStorage.get(fn);

    if (origin === undefined) {
      aurelia_pal__WEBPACK_IMPORTED_MODULE_0__.PLATFORM.eachModule(function (key, value) {
        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
          for (var name in value) {
            try {
              var exp = value[name];
              if (exp === fn) {
                originStorage.set(fn, origin = new Origin(key, name));
                return true;
              }
            } catch (e) {}
          }
        }

        if (value === fn) {
          originStorage.set(fn, origin = new Origin(key, 'default'));
          return true;
        }

        return false;
      });
    }

    return origin || unknownOrigin;
  };

  Origin.set = function set(fn, origin) {
    originStorage.set(fn, origin);
  };

  return Origin;
}();

function decorators() {
  for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
    rest[_key] = arguments[_key];
  }

  var applicator = function applicator(target, key, descriptor) {
    var i = rest.length;

    if (key) {
      descriptor = descriptor || {
        value: target[key],
        writable: true,
        configurable: true,
        enumerable: true
      };

      while (i--) {
        descriptor = rest[i](target, key, descriptor) || descriptor;
      }

      Object.defineProperty(target, key, descriptor);
    } else {
      while (i--) {
        target = rest[i](target) || target;
      }
    }

    return target;
  };

  applicator.on = applicator;
  return applicator;
}

function deprecated(optionsOrTarget, maybeKey, maybeDescriptor) {
  function decorator(target, key, descriptor) {
    var methodSignature = target.constructor.name + '#' + key;
    var options = maybeKey ? {} : optionsOrTarget || {};
    var message = 'DEPRECATION - ' + methodSignature;

    if (typeof descriptor.value !== 'function') {
      throw new SyntaxError('Only methods can be marked as deprecated.');
    }

    if (options.message) {
      message += ' - ' + options.message;
    }

    return _extends({}, descriptor, {
      value: function deprecationWrapper() {
        if (options.error) {
          throw new Error(message);
        } else {
          console.warn(message);
        }

        return descriptor.value.apply(this, arguments);
      }
    });
  }

  return maybeKey ? decorator(optionsOrTarget, maybeKey, maybeDescriptor) : decorator;
}

function mixin(behavior) {
  var instanceKeys = Object.keys(behavior);

  function _mixin(possible) {
    var decorator = function decorator(target) {
      var resolvedTarget = typeof target === 'function' ? target.prototype : target;

      var i = instanceKeys.length;
      while (i--) {
        var property = instanceKeys[i];
        Object.defineProperty(resolvedTarget, property, {
          value: behavior[property],
          writable: true
        });
      }
    };

    return possible ? decorator(possible) : decorator;
  }

  return _mixin;
}

function alwaysValid() {
  return true;
}
function noCompose() {}

function ensureProtocolOptions(options) {
  if (options === undefined) {
    options = {};
  } else if (typeof options === 'function') {
    options = {
      validate: options
    };
  }

  if (!options.validate) {
    options.validate = alwaysValid;
  }

  if (!options.compose) {
    options.compose = noCompose;
  }

  return options;
}

function createProtocolValidator(validate) {
  return function (target) {
    var result = validate(target);
    return result === true;
  };
}

function createProtocolAsserter(name, validate) {
  return function (target) {
    var result = validate(target);
    if (result !== true) {
      throw new Error(result || name + ' was not correctly implemented.');
    }
  };
}

function protocol(name, options) {
  options = ensureProtocolOptions(options);

  var result = function result(target) {
    var resolvedTarget = typeof target === 'function' ? target.prototype : target;

    options.compose(resolvedTarget);
    result.assert(resolvedTarget);

    Object.defineProperty(resolvedTarget, 'protocol:' + name, {
      enumerable: false,
      configurable: false,
      writable: false,
      value: true
    });
  };

  result.validate = createProtocolValidator(options.validate);
  result.assert = createProtocolAsserter(name, options.validate);

  return result;
}

protocol.create = function (name, options) {
  options = ensureProtocolOptions(options);
  var hidden = 'protocol:' + name;
  var result = function result(target) {
    var decorator = protocol(name, options);
    return target ? decorator(target) : decorator;
  };

  result.decorates = function (obj) {
    return obj[hidden] === true;
  };
  result.validate = createProtocolValidator(options.validate);
  result.assert = createProtocolAsserter(name, options.validate);

  return result;
};

/***/ }),

/***/ 4204:
/*!***************************************************************************************!*\
  !*** ./node_modules/aurelia-notification/dist/native-modules/aurelia-notification.js ***!
  \***************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



exports.__esModule = true;
exports.Notification = exports.Config = undefined;

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class2, _desc, _value, _class3;

exports.configure = configure;

var _extend = __webpack_require__(/*! extend */ 4470);

var _extend2 = _interopRequireDefault(_extend);

var _humaneJs = __webpack_require__(/*! humane-js */ 991);

var _humaneJs2 = _interopRequireDefault(_humaneJs);

var _aureliaDependencyInjection = __webpack_require__(/*! aurelia-dependency-injection */ 6158);

var _aureliaI18n = __webpack_require__(/*! aurelia-i18n */ 9480);

var _aureliaPal = __webpack_require__(/*! aurelia-pal */ 1015);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}



var Config = exports.Config = function () {
  function Config() {
    

    this.translate = true;
    this.defaults = {};
    this.notifications = {
      note: {},
      success: { addnCls: 'success' },
      error: { addnCls: 'error' },
      info: { addnCls: 'info' }
    };
  }

  Config.prototype.configure = function configure() {
    var incoming = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

    this.translate = 'translate' in incoming ? incoming.translate : base.translate;
    this.defaults = (0, _extend2.default)({}, base.defaults, incoming.defaults);
    this.notifications = (0, _extend2.default)({}, base.notifications, incoming.notifications);

    return this;
  };

  return Config;
}();

function configure(frameworkConfig, configOrConfigure) {
  var config = frameworkConfig.container.get(Config);

  if (typeof configOrConfigure === 'function') {
    configOrConfigure(config);

    return;
  }

  config.configure(configOrConfigure);
}

function readonly() {
  return function (key, target, descriptor) {
    descriptor.writable = false;

    return descriptor;
  };
}

var Notification = exports.Notification = (_dec = (0, _aureliaDependencyInjection.inject)(Config, _humaneJs2.default, _aureliaI18n.I18N), _dec2 = readonly(), _dec3 = readonly(), _dec4 = readonly(), _dec5 = readonly(), _dec6 = readonly(), _dec7 = readonly(), _dec8 = readonly(), _dec(_class2 = (_class3 = function () {
  Notification.prototype.note = function note(message) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var defaults = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.__config.defaults;
  };

  Notification.prototype.success = function success(message) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var defaults = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.__config.defaults;
  };

  Notification.prototype.error = function error(message) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var defaults = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.__config.defaults;
  };

  Notification.prototype.info = function info(message) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var defaults = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.__config.defaults;
  };

  function Notification(config, humane, i18n) {
    var _this = this;

    

    this.define('__config', config).define('__humane', humane).define('__i18n', i18n);

    this.setBaseCls();

    for (var key in config.notifications) {
      if (config.notifications.hasOwnProperty(key)) {
        this[key] = this.spawn(config.notifications[key]);
      }
    }

    if (!humane.container) {
      this.setContainer();
      var aureliaComposedListener = function aureliaComposedListener() {
        if (!humane.container) {
          _this.setContainer();
        }
        _aureliaPal.DOM.removeEventListener('aurelia-composed', aureliaComposedListener);
      };

      _aureliaPal.DOM.addEventListener('aurelia-composed', aureliaComposedListener);
    }
  }

  Notification.prototype.define = function define(property, value, writable) {
    Object.defineProperty(this, property, {
      value: value,
      writable: !!writable,
      enumerable: false
    });

    return this;
  };

  Notification.prototype.setContainer = function setContainer(container) {
    _aureliaPal.DOM.appendNode(this.__humane.el, container);
    this.__humane.container = this.__humane.el.parentNode;
  };

  Notification.prototype.setBaseCls = function setBaseCls() {
    var baseCls = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.__config.defaults.baseCls;

    this.__humane.baseCls = baseCls ? baseCls : this.__humane.baseCls;
  };

  Notification.prototype.translate = function translate() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var joined = (0, _extend2.default)({}, this.__config, defaults, options);

    return joined.translate;
  };

  Notification.prototype.log = function log(message) {
    var _this2 = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var defaults = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.__config.defaults;

    if (this.translate(options, defaults)) {
      if (message instanceof Array) {
        message = message.map(function (item) {
          return _this2.i18n.tr(item);
        });
      } else {
        message = this.__i18n.tr(message);
      }
    }

    return new Promise(function (resolve) {
      return _this2.__humane.log(message, options, resolve, defaults);
    });
  };

  Notification.prototype.spawn = function spawn(addnDefaults) {
    var _this3 = this;

    addnDefaults = typeof addnDefaults === 'string' ? { 'addnCls': addnDefaults } : addnDefaults;
    var defaults = (0, _extend2.default)({}, this.__config.defaults, addnDefaults);

    return function (message, options) {
      return _this3.log(message, options, defaults);
    };
  };

  Notification.prototype.remove = function remove() {
    var _this4 = this;

    return new Promise(function (resolve) {
      return _this4.__humane.remove(resolve);
    });
  };

  return Notification;
}(), (_applyDecoratedDescriptor(_class3.prototype, 'define', [_dec2], Object.getOwnPropertyDescriptor(_class3.prototype, 'define'), _class3.prototype), _applyDecoratedDescriptor(_class3.prototype, 'setContainer', [_dec3], Object.getOwnPropertyDescriptor(_class3.prototype, 'setContainer'), _class3.prototype), _applyDecoratedDescriptor(_class3.prototype, 'setBaseCls', [_dec4], Object.getOwnPropertyDescriptor(_class3.prototype, 'setBaseCls'), _class3.prototype), _applyDecoratedDescriptor(_class3.prototype, 'translate', [_dec5], Object.getOwnPropertyDescriptor(_class3.prototype, 'translate'), _class3.prototype), _applyDecoratedDescriptor(_class3.prototype, 'log', [_dec6], Object.getOwnPropertyDescriptor(_class3.prototype, 'log'), _class3.prototype), _applyDecoratedDescriptor(_class3.prototype, 'spawn', [_dec7], Object.getOwnPropertyDescriptor(_class3.prototype, 'spawn'), _class3.prototype), _applyDecoratedDescriptor(_class3.prototype, 'remove', [_dec8], Object.getOwnPropertyDescriptor(_class3.prototype, 'remove'), _class3.prototype)), _class3)) || _class2);

/***/ }),

/***/ "aurelia-pal-browser":
/*!*************************************************************************************!*\
  !*** ./node_modules/aurelia-pal-browser/dist/native-modules/aurelia-pal-browser.js ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_PLATFORM": function() { return /* binding */ _PLATFORM; },
/* harmony export */   "_FEATURE": function() { return /* binding */ _FEATURE; },
/* harmony export */   "_DOM": function() { return /* binding */ _DOM; },
/* harmony export */   "initialize": function() { return /* binding */ initialize; }
/* harmony export */ });
/* harmony import */ var aurelia_pal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-pal */ 1015);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };



var _PLATFORM = {
  location: window.location,
  history: window.history,
  addEventListener: function addEventListener(eventName, callback, capture) {
    this.global.addEventListener(eventName, callback, capture);
  },
  removeEventListener: function removeEventListener(eventName, callback, capture) {
    this.global.removeEventListener(eventName, callback, capture);
  },

  performance: window.performance,
  requestAnimationFrame: function requestAnimationFrame(callback) {
    return this.global.requestAnimationFrame(callback);
  }
};

if (typeof FEATURE_NO_IE === 'undefined') {
  var test = function test() {};

  if (test.name === undefined) {
    Object.defineProperty(Function.prototype, 'name', {
      get: function get() {
        var name = this.toString().match(/^\s*function\s*(\S*)\s*\(/)[1];

        Object.defineProperty(this, 'name', { value: name });
        return name;
      }
    });
  }
}

if (typeof FEATURE_NO_IE === 'undefined') {
  if (!('classList' in document.createElement('_')) || document.createElementNS && !('classList' in document.createElementNS('http://www.w3.org/2000/svg', 'g'))) {
    var protoProp = 'prototype';
    var strTrim = String.prototype.trim;
    var arrIndexOf = Array.prototype.indexOf;
    var emptyArray = [];

    var DOMEx = function DOMEx(type, message) {
      this.name = type;
      this.code = DOMException[type];
      this.message = message;
    };

    var checkTokenAndGetIndex = function checkTokenAndGetIndex(classList, token) {
      if (token === '') {
        throw new DOMEx('SYNTAX_ERR', 'An invalid or illegal string was specified');
      }

      if (/\s/.test(token)) {
        throw new DOMEx('INVALID_CHARACTER_ERR', 'String contains an invalid character');
      }

      return arrIndexOf.call(classList, token);
    };

    var ClassList = function ClassList(elem) {
      var trimmedClasses = strTrim.call(elem.getAttribute('class') || '');
      var classes = trimmedClasses ? trimmedClasses.split(/\s+/) : emptyArray;

      for (var i = 0, ii = classes.length; i < ii; ++i) {
        this.push(classes[i]);
      }

      this._updateClassName = function () {
        elem.setAttribute('class', this.toString());
      };
    };

    var classListProto = ClassList[protoProp] = [];

    DOMEx[protoProp] = Error[protoProp];

    classListProto.item = function (i) {
      return this[i] || null;
    };

    classListProto.contains = function (token) {
      token += '';
      return checkTokenAndGetIndex(this, token) !== -1;
    };

    classListProto.add = function () {
      var tokens = arguments;
      var i = 0;
      var ii = tokens.length;
      var token = void 0;
      var updated = false;

      do {
        token = tokens[i] + '';
        if (checkTokenAndGetIndex(this, token) === -1) {
          this.push(token);
          updated = true;
        }
      } while (++i < ii);

      if (updated) {
        this._updateClassName();
      }
    };

    classListProto.remove = function () {
      var tokens = arguments;
      var i = 0;
      var ii = tokens.length;
      var token = void 0;
      var updated = false;
      var index = void 0;

      do {
        token = tokens[i] + '';
        index = checkTokenAndGetIndex(this, token);
        while (index !== -1) {
          this.splice(index, 1);
          updated = true;
          index = checkTokenAndGetIndex(this, token);
        }
      } while (++i < ii);

      if (updated) {
        this._updateClassName();
      }
    };

    classListProto.toggle = function (token, force) {
      token += '';

      var result = this.contains(token);
      var method = result ? force !== true && 'remove' : force !== false && 'add';

      if (method) {
        this[method](token);
      }

      if (force === true || force === false) {
        return force;
      }

      return !result;
    };

    classListProto.toString = function () {
      return this.join(' ');
    };

    Object.defineProperty(Element.prototype, 'classList', {
      get: function get() {
        return new ClassList(this);
      },
      enumerable: true,
      configurable: true
    });
  } else {
    var testElement = document.createElement('_');
    testElement.classList.add('c1', 'c2');

    if (!testElement.classList.contains('c2')) {
      var createMethod = function createMethod(method) {
        var original = DOMTokenList.prototype[method];

        DOMTokenList.prototype[method] = function (token) {
          for (var i = 0, ii = arguments.length; i < ii; ++i) {
            token = arguments[i];
            original.call(this, token);
          }
        };
      };

      createMethod('add');
      createMethod('remove');
    }

    testElement.classList.toggle('c3', false);

    if (testElement.classList.contains('c3')) {
      var _toggle = DOMTokenList.prototype.toggle;

      DOMTokenList.prototype.toggle = function (token, force) {
        if (1 in arguments && !this.contains(token) === !force) {
          return force;
        }

        return _toggle.call(this, token);
      };
    }

    testElement = null;
  }
}

if (typeof FEATURE_NO_IE === 'undefined') {
  var _filterEntries = function _filterEntries(key, value) {
    var i = 0,
        n = _entries.length,
        result = [];
    for (; i < n; i++) {
      if (_entries[i][key] == value) {
        result.push(_entries[i]);
      }
    }
    return result;
  };

  var _clearEntries = function _clearEntries(type, name) {
    var i = _entries.length,
        entry;
    while (i--) {
      entry = _entries[i];
      if (entry.entryType == type && (name === void 0 || entry.name == name)) {
        _entries.splice(i, 1);
      }
    }
  };

  // @license http://opensource.org/licenses/MIT
  if ('performance' in window === false) {
    window.performance = {};
  }

  if ('now' in window.performance === false) {
    var nowOffset = Date.now();

    if (performance.timing && performance.timing.navigationStart) {
      nowOffset = performance.timing.navigationStart;
    }

    window.performance.now = function now() {
      return Date.now() - nowOffset;
    };
  }

  var startOffset = Date.now ? Date.now() : +new Date();
  var _entries = [];
  var _marksIndex = {};

  ;

  if (!window.performance.mark) {
    window.performance.mark = window.performance.webkitMark || function (name) {
      var mark = {
        name: name,
        entryType: "mark",
        startTime: window.performance.now(),
        duration: 0
      };

      _entries.push(mark);
      _marksIndex[name] = mark;
    };
  }

  if (!window.performance.measure) {
    window.performance.measure = window.performance.webkitMeasure || function (name, startMark, endMark) {
      startMark = _marksIndex[startMark].startTime;
      endMark = _marksIndex[endMark].startTime;

      _entries.push({
        name: name,
        entryType: "measure",
        startTime: startMark,
        duration: endMark - startMark
      });
    };
  }

  if (!window.performance.getEntriesByType) {
    window.performance.getEntriesByType = window.performance.webkitGetEntriesByType || function (type) {
      return _filterEntries("entryType", type);
    };
  }

  if (!window.performance.getEntriesByName) {
    window.performance.getEntriesByName = window.performance.webkitGetEntriesByName || function (name) {
      return _filterEntries("name", name);
    };
  }

  if (!window.performance.clearMarks) {
    window.performance.clearMarks = window.performance.webkitClearMarks || function (name) {
      _clearEntries("mark", name);
    };
  }

  if (!window.performance.clearMeasures) {
    window.performance.clearMeasures = window.performance.webkitClearMeasures || function (name) {
      _clearEntries("measure", name);
    };
  }

  _PLATFORM.performance = window.performance;
}

if (typeof FEATURE_NO_IE === 'undefined') {
  var con = window.console = window.console || {};
  var nop = function nop() {};

  if (!con.memory) con.memory = {};
  ('assert,clear,count,debug,dir,dirxml,error,exception,group,' + 'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' + 'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',').forEach(function (m) {
    if (!con[m]) con[m] = nop;
  });

  if (_typeof(con.log) === 'object') {
    'log,info,warn,error,assert,dir,clear,profile,profileEnd'.split(',').forEach(function (method) {
      console[method] = this.bind(console[method], console);
    }, Function.prototype.call);
  }
}

if (typeof FEATURE_NO_IE === 'undefined') {
  if (!window.CustomEvent || typeof window.CustomEvent !== 'function') {
    var _CustomEvent = function _CustomEvent(event, params) {
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined
      };

      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    };

    _CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = _CustomEvent;
  }
}

if (Element && !Element.prototype.matches) {
  var proto = Element.prototype;
  proto.matches = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector;
}

var _FEATURE = {
  shadowDOM: !!HTMLElement.prototype.attachShadow,
  scopedCSS: 'scoped' in document.createElement('style'),
  htmlTemplateElement: function () {
    var d = document.createElement('div');
    d.innerHTML = '<template></template>';
    return 'content' in d.children[0];
  }(),
  mutationObserver: !!(window.MutationObserver || window.WebKitMutationObserver),
  ensureHTMLTemplateElement: function ensureHTMLTemplateElement(t) {
    return t;
  }
};

if (typeof FEATURE_NO_IE === 'undefined') {
  var isSVGTemplate = function isSVGTemplate(el) {
    return el.tagName === 'template' && el.namespaceURI === 'http://www.w3.org/2000/svg';
  };

  var fixSVGTemplateElement = function fixSVGTemplateElement(el) {
    var template = el.ownerDocument.createElement('template');
    var attrs = el.attributes;
    var length = attrs.length;
    var attr = void 0;

    el.parentNode.insertBefore(template, el);

    while (length-- > 0) {
      attr = attrs[length];
      template.setAttribute(attr.name, attr.value);
      el.removeAttribute(attr.name);
    }

    el.parentNode.removeChild(el);

    return fixHTMLTemplateElement(template);
  };

  var fixHTMLTemplateElement = function fixHTMLTemplateElement(template) {
    var content = template.content = document.createDocumentFragment();
    var child = void 0;

    while (child = template.firstChild) {
      content.appendChild(child);
    }

    return template;
  };

  var fixHTMLTemplateElementRoot = function fixHTMLTemplateElementRoot(template) {
    var content = fixHTMLTemplateElement(template).content;
    var childTemplates = content.querySelectorAll('template');

    for (var i = 0, ii = childTemplates.length; i < ii; ++i) {
      var child = childTemplates[i];

      if (isSVGTemplate(child)) {
        fixSVGTemplateElement(child);
      } else {
        fixHTMLTemplateElement(child);
      }
    }

    return template;
  };

  if (!_FEATURE.htmlTemplateElement) {
    _FEATURE.ensureHTMLTemplateElement = fixHTMLTemplateElementRoot;
  }
}

var shadowPoly = window.ShadowDOMPolyfill || null;

var _DOM = {
  Element: Element,
  NodeList: NodeList,
  SVGElement: SVGElement,
  boundary: 'aurelia-dom-boundary',
  addEventListener: function addEventListener(eventName, callback, capture) {
    document.addEventListener(eventName, callback, capture);
  },
  removeEventListener: function removeEventListener(eventName, callback, capture) {
    document.removeEventListener(eventName, callback, capture);
  },
  adoptNode: function adoptNode(node) {
    return document.adoptNode(node);
  },
  createAttribute: function createAttribute(name) {
    return document.createAttribute(name);
  },
  createElement: function createElement(tagName) {
    return document.createElement(tagName);
  },
  createTextNode: function createTextNode(text) {
    return document.createTextNode(text);
  },
  createComment: function createComment(text) {
    return document.createComment(text);
  },
  createDocumentFragment: function createDocumentFragment() {
    return document.createDocumentFragment();
  },
  createTemplateElement: function createTemplateElement() {
    var template = document.createElement('template');
    return _FEATURE.ensureHTMLTemplateElement(template);
  },
  createMutationObserver: function createMutationObserver(callback) {
    return new (window.MutationObserver || window.WebKitMutationObserver)(callback);
  },
  createCustomEvent: function createCustomEvent(eventType, options) {
    return new window.CustomEvent(eventType, options);
  },
  dispatchEvent: function dispatchEvent(evt) {
    document.dispatchEvent(evt);
  },
  getComputedStyle: function getComputedStyle(element) {
    return window.getComputedStyle(element);
  },
  getElementById: function getElementById(id) {
    return document.getElementById(id);
  },
  querySelector: function querySelector(query) {
    return document.querySelector(query);
  },
  querySelectorAll: function querySelectorAll(query) {
    return document.querySelectorAll(query);
  },
  nextElementSibling: function nextElementSibling(element) {
    if (element.nextElementSibling) {
      return element.nextElementSibling;
    }
    do {
      element = element.nextSibling;
    } while (element && element.nodeType !== 1);
    return element;
  },
  createTemplateFromMarkup: function createTemplateFromMarkup(markup) {
    var parser = document.createElement('div');
    parser.innerHTML = markup;

    var temp = parser.firstElementChild;
    if (!temp || temp.nodeName !== 'TEMPLATE') {
      throw new Error('Template markup must be wrapped in a <template> element e.g. <template> <!-- markup here --> </template>');
    }

    return _FEATURE.ensureHTMLTemplateElement(temp);
  },
  appendNode: function appendNode(newNode, parentNode) {
    (parentNode || document.body).appendChild(newNode);
  },
  replaceNode: function replaceNode(newNode, node, parentNode) {
    if (node.parentNode) {
      node.parentNode.replaceChild(newNode, node);
    } else if (shadowPoly !== null) {
      shadowPoly.unwrap(parentNode).replaceChild(shadowPoly.unwrap(newNode), shadowPoly.unwrap(node));
    } else {
      parentNode.replaceChild(newNode, node);
    }
  },
  removeNode: function removeNode(node, parentNode) {
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    } else if (parentNode) {
      if (shadowPoly !== null) {
        shadowPoly.unwrap(parentNode).removeChild(shadowPoly.unwrap(node));
      } else {
        parentNode.removeChild(node);
      }
    }
  },
  injectStyles: function injectStyles(styles, destination, prepend, id) {
    if (id) {
      var oldStyle = document.getElementById(id);
      if (oldStyle) {
        var isStyleTag = oldStyle.tagName.toLowerCase() === 'style';

        if (isStyleTag) {
          oldStyle.innerHTML = styles;
          return;
        }

        throw new Error('The provided id does not indicate a style tag.');
      }
    }

    var node = document.createElement('style');
    node.innerHTML = styles;
    node.type = 'text/css';

    if (id) {
      node.id = id;
    }

    destination = destination || document.head;

    if (prepend && destination.childNodes.length > 0) {
      destination.insertBefore(node, destination.childNodes[0]);
    } else {
      destination.appendChild(node);
    }

    return node;
  }
};

function initialize() {
  if (aurelia_pal__WEBPACK_IMPORTED_MODULE_0__.isInitialized) {
    return;
  }

  (0,aurelia_pal__WEBPACK_IMPORTED_MODULE_0__.initializePAL)(function (platform, feature, dom) {
    Object.assign(platform, _PLATFORM);
    Object.assign(feature, _FEATURE);
    Object.assign(dom, _DOM);

    Object.defineProperty(dom, 'title', {
      get: function get() {
        return document.title;
      },
      set: function set(value) {
        document.title = value;
      }
    });

    Object.defineProperty(dom, 'activeElement', {
      get: function get() {
        return document.activeElement;
      }
    });

    Object.defineProperty(platform, 'XMLHttpRequest', {
      get: function get() {
        return platform.global.XMLHttpRequest;
      }
    });
  });
}

/***/ }),

/***/ 1015:
/*!*********************************************************************!*\
  !*** ./node_modules/aurelia-pal/dist/native-modules/aurelia-pal.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AggregateError": function() { return /* binding */ AggregateError; },
/* harmony export */   "FEATURE": function() { return /* binding */ FEATURE; },
/* harmony export */   "PLATFORM": function() { return /* binding */ PLATFORM; },
/* harmony export */   "DOM": function() { return /* binding */ DOM; },
/* harmony export */   "isInitialized": function() { return /* binding */ isInitialized; },
/* harmony export */   "initializePAL": function() { return /* binding */ initializePAL; },
/* harmony export */   "reset": function() { return /* binding */ reset; }
/* harmony export */ });

function AggregateError(message, innerError, skipIfAlreadyAggregate) {
  if (innerError) {
    if (innerError.innerError && skipIfAlreadyAggregate) {
      return innerError;
    }

    var separator = '\n------------------------------------------------\n';

    message += separator + 'Inner Error:\n';

    if (typeof innerError === 'string') {
      message += 'Message: ' + innerError;
    } else {
      if (innerError.message) {
        message += 'Message: ' + innerError.message;
      } else {
        message += 'Unknown Inner Error Type. Displaying Inner Error as JSON:\n ' + JSON.stringify(innerError, null, '  ');
      }

      if (innerError.stack) {
        message += '\nInner Error Stack:\n' + innerError.stack;
        message += '\nEnd Inner Error Stack';
      }
    }

    message += separator;
  }

  var e = new Error(message);
  if (innerError) {
    e.innerError = innerError;
  }

  return e;
}

var FEATURE = {};

var PLATFORM = {
  noop: function noop() {},
  eachModule: function eachModule() {},
  moduleName: function (_moduleName) {
    function moduleName(_x) {
      return _moduleName.apply(this, arguments);
    }

    moduleName.toString = function () {
      return _moduleName.toString();
    };

    return moduleName;
  }(function (moduleName) {
    return moduleName;
  })
};

PLATFORM.global = function () {
  if (typeof self !== 'undefined') {
    return self;
  }

  if (typeof __webpack_require__.g !== 'undefined') {
    return __webpack_require__.g;
  }

  return new Function('return this')();
}();

var DOM = {};
var isInitialized = false;

function initializePAL(callback) {
  if (isInitialized) {
    return;
  }
  isInitialized = true;
  if (typeof Object.getPropertyDescriptor !== 'function') {
    Object.getPropertyDescriptor = function (subject, name) {
      var pd = Object.getOwnPropertyDescriptor(subject, name);
      var proto = Object.getPrototypeOf(subject);
      while (typeof pd === 'undefined' && proto !== null) {
        pd = Object.getOwnPropertyDescriptor(proto, name);
        proto = Object.getPrototypeOf(proto);
      }
      return pd;
    };
  }

  callback(PLATFORM, FEATURE, DOM);
}
function reset() {
  isInitialized = false;
}

/***/ }),

/***/ 8627:
/*!***********************************************************************!*\
  !*** ./node_modules/aurelia-path/dist/native-modules/aurelia-path.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "buildQueryString": function() { return /* binding */ buildQueryString; },
/* harmony export */   "join": function() { return /* binding */ join; },
/* harmony export */   "parseQueryString": function() { return /* binding */ parseQueryString; },
/* harmony export */   "relativeToFile": function() { return /* binding */ relativeToFile; }
/* harmony export */ });
function trimDots(ary) {
    for (var i = 0; i < ary.length; ++i) {
        var part = ary[i];
        if (part === '.') {
            ary.splice(i, 1);
            i -= 1;
        }
        else if (part === '..') {
            if (i === 0 || (i === 1 && ary[2] === '..') || ary[i - 1] === '..') {
                continue;
            }
            else if (i > 0) {
                ary.splice(i - 1, 2);
                i -= 2;
            }
        }
    }
}
function relativeToFile(name, file) {
    var fileParts = file && file.split('/');
    var nameParts = name.trim().split('/');
    if (nameParts[0].charAt(0) === '.' && fileParts) {
        var normalizedBaseParts = fileParts.slice(0, fileParts.length - 1);
        nameParts.unshift.apply(nameParts, normalizedBaseParts);
    }
    trimDots(nameParts);
    return nameParts.join('/');
}
function join(path1, path2) {
    if (!path1) {
        return path2;
    }
    if (!path2) {
        return path1;
    }
    var schemeMatch = path1.match(/^([^/]*?:)\//);
    var scheme = (schemeMatch && schemeMatch.length > 0) ? schemeMatch[1] : '';
    path1 = path1.substr(scheme.length);
    var urlPrefix;
    if (path1.indexOf('///') === 0 && scheme === 'file:') {
        urlPrefix = '///';
    }
    else if (path1.indexOf('//') === 0) {
        urlPrefix = '//';
    }
    else if (path1.indexOf('/') === 0) {
        urlPrefix = '/';
    }
    else {
        urlPrefix = '';
    }
    var trailingSlash = path2.slice(-1) === '/' ? '/' : '';
    var url1 = path1.split('/');
    var url2 = path2.split('/');
    var url3 = [];
    for (var i = 0, ii = url1.length; i < ii; ++i) {
        if (url1[i] === '..') {
            if (url3.length && url3[url3.length - 1] !== '..') {
                url3.pop();
            }
            else {
                url3.push(url1[i]);
            }
        }
        else if (url1[i] === '.' || url1[i] === '') {
            continue;
        }
        else {
            url3.push(url1[i]);
        }
    }
    for (var i = 0, ii = url2.length; i < ii; ++i) {
        if (url2[i] === '..') {
            if (url3.length && url3[url3.length - 1] !== '..') {
                url3.pop();
            }
            else {
                url3.push(url2[i]);
            }
        }
        else if (url2[i] === '.' || url2[i] === '') {
            continue;
        }
        else {
            url3.push(url2[i]);
        }
    }
    return scheme + urlPrefix + url3.join('/') + trailingSlash;
}
var encode = encodeURIComponent;
var encodeKey = function (k) { return encode(k).replace('%24', '$'); };
function buildParam(key, value, traditional) {
    var result = [];
    if (value === null || value === undefined) {
        return result;
    }
    if (Array.isArray(value)) {
        for (var i = 0, l = value.length; i < l; i++) {
            if (traditional) {
                result.push(encodeKey(key) + "=" + encode(value[i]));
            }
            else {
                var arrayKey = key + '[' + (typeof value[i] === 'object' && value[i] !== null ? i : '') + ']';
                result = result.concat(buildParam(arrayKey, value[i]));
            }
        }
    }
    else if (typeof (value) === 'object' && !traditional) {
        for (var propertyName in value) {
            result = result.concat(buildParam(key + '[' + propertyName + ']', value[propertyName]));
        }
    }
    else {
        result.push(encodeKey(key) + "=" + encode(value));
    }
    return result;
}
function buildQueryString(params, traditional) {
    var pairs = [];
    var keys = Object.keys(params || {}).sort();
    for (var i = 0, len = keys.length; i < len; i++) {
        var key = keys[i];
        pairs = pairs.concat(buildParam(key, params[key], traditional));
    }
    if (pairs.length === 0) {
        return '';
    }
    return pairs.join('&');
}
function processScalarParam(existedParam, value) {
    if (Array.isArray(existedParam)) {
        existedParam.push(value);
        return existedParam;
    }
    if (existedParam !== undefined) {
        return [existedParam, value];
    }
    return value;
}
function parseComplexParam(queryParams, keys, value) {
    var currentParams = queryParams;
    var keysLastIndex = keys.length - 1;
    for (var j = 0; j <= keysLastIndex; j++) {
        var key = keys[j] === '' ? currentParams.length : keys[j];
        preventPollution(key);
        if (j < keysLastIndex) {
            var prevValue = !currentParams[key] || typeof currentParams[key] === 'object' ? currentParams[key] : [currentParams[key]];
            currentParams = currentParams[key] = prevValue || (isNaN(keys[j + 1]) ? {} : []);
        }
        else {
            currentParams = currentParams[key] = value;
        }
    }
}
function parseQueryString(queryString) {
    var queryParams = {};
    if (!queryString || typeof queryString !== 'string') {
        return queryParams;
    }
    var query = queryString;
    if (query.charAt(0) === '?') {
        query = query.substr(1);
    }
    var pairs = query.replace(/\+/g, ' ').split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        var key = decodeURIComponent(pair[0]);
        if (!key) {
            continue;
        }
        var keys = key.split('][');
        var keysLastIndex = keys.length - 1;
        if (/\[/.test(keys[0]) && /\]$/.test(keys[keysLastIndex])) {
            keys[keysLastIndex] = keys[keysLastIndex].replace(/\]$/, '');
            keys = keys.shift().split('[').concat(keys);
            keysLastIndex = keys.length - 1;
        }
        else {
            keysLastIndex = 0;
        }
        if (pair.length >= 2) {
            var value = pair[1] ? decodeURIComponent(pair[1]) : '';
            if (keysLastIndex) {
                parseComplexParam(queryParams, keys, value);
            }
            else {
                preventPollution(key);
                queryParams[key] = processScalarParam(queryParams[key], value);
            }
        }
        else {
            queryParams[key] = true;
        }
    }
    return queryParams;
}
function preventPollution(key) {
    if (key === '__proto__') {
        throw new Error('Prototype pollution detected.');
    }
}


//# sourceMappingURL=aurelia-path.js.map


/***/ })

}]);
//# sourceMappingURL=vendors-bff14f0d.ee17626ecdf4fddfd304.bundle.js.map