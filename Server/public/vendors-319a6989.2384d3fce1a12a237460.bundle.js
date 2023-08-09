"use strict";
(self["webpackChunkuccss_old_new"] = self["webpackChunkuccss_old_new"] || []).push([["vendors-319a6989"],{

/***/ 7062:
/*!***************************************************************************************!*\
  !*** ./node_modules/aurelia-bootstrapper/dist/native-modules/aurelia-bootstrapper.js ***!
  \***************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bootstrap: function() { return /* binding */ bootstrap; },
/* harmony export */   starting: function() { return /* binding */ starting; }
/* harmony export */ });
/* harmony import */ var aurelia_polyfills__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-polyfills */ 2727);
/* harmony import */ var aurelia_pal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-pal */ 1015);



var bootstrapPromises = [];
var startResolve;
var startPromise = new Promise(function (resolve) { return startResolve = resolve; });
var host = aurelia_pal__WEBPACK_IMPORTED_MODULE_1__.PLATFORM.global;
var isNodeLike = typeof process !== 'undefined' && !process.browser;
function ready() {
    if (!host.document || host.document.readyState === 'complete') {
        return Promise.resolve();
    }
    return new Promise(function (resolve) {
        host.document.addEventListener('DOMContentLoaded', completed);
        host.addEventListener('load', completed);
        function completed() {
            host.document.removeEventListener('DOMContentLoaded', completed);
            host.removeEventListener('load', completed);
            resolve();
        }
    });
}
function createLoader() {
    if (aurelia_pal__WEBPACK_IMPORTED_MODULE_1__.PLATFORM.Loader) {
        return Promise.resolve(new aurelia_pal__WEBPACK_IMPORTED_MODULE_1__.PLATFORM.Loader());
    }
    if (false) { var m; }
    return Promise.reject('No PLATFORM.Loader is defined and there is neither a System API (ES6) or a Require API (AMD) globally available to load your app.');
}
function initializePal(loader) {
    if (aurelia_pal__WEBPACK_IMPORTED_MODULE_1__.isInitialized)
        return Promise.resolve();
    var type;
    var isRenderer = isNodeLike && (process.type === 'renderer' || process.versions['node-webkit']);
    if (isNodeLike && !isRenderer) {
        type = 'nodejs';
    }
    else if (typeof window !== 'undefined') {
        type = 'browser';
    }
    else if (typeof self !== 'undefined') {
        type = 'worker';
    }
    else {
        throw new Error('Could not determine platform implementation to load.');
    }
    return loader.loadModule('aurelia-pal-' + type)
        .then(function (palModule) { return type === 'nodejs' && !aurelia_pal__WEBPACK_IMPORTED_MODULE_1__.isInitialized && palModule.globalize() || palModule.initialize(); });
}
function preparePlatform(loader) {
    var map = function (moduleId, relativeTo) {
        return loader.normalize(moduleId, relativeTo)
            .then(function (normalized) {
            loader.map(moduleId, normalized);
            return normalized;
        });
    };
    return initializePal(loader)
        .then(function () { return loader.normalize('aurelia-bootstrapper'); })
        .then(function (bootstrapperName) {
        var frameworkPromise = map('aurelia-framework', bootstrapperName);
        return Promise.all([
            frameworkPromise,
            frameworkPromise.then(function (frameworkName) { return map('aurelia-dependency-injection', frameworkName); }),
            map('aurelia-router', bootstrapperName),
            map('aurelia-logging-console', bootstrapperName)
        ]);
    })
        .then(function (_a) {
        var frameworkName = _a[0];
        return loader.loadModule(frameworkName);
    })
        .then(function (fx) { return startResolve(function () { return new fx.Aurelia(loader); }); });
}
function config(appHost, configModuleId, aurelia) {
    aurelia.host = appHost;
    aurelia.configModuleId = configModuleId || null;
    if (configModuleId) {
        return aurelia.loader
            .loadModule(configModuleId)
            .then(function (customConfig) {
            if (!customConfig.configure) {
                throw new Error("Cannot initialize module '".concat(configModuleId, "' without a configure function."));
            }
            return customConfig.configure(aurelia);
        });
    }
    aurelia.use
        .standardConfiguration()
        .developmentLogging();
    return aurelia.start().then(function () { return aurelia.setRoot(); });
}
function run() {
    return ready()
        .then(createLoader)
        .then(preparePlatform)
        .then(function () {
        var appHosts = host.document.querySelectorAll('[aurelia-app],[data-aurelia-app]');
        for (var i = 0, ii = appHosts.length; i < ii; ++i) {
            var appHost = appHosts[i];
            var mainModuleId = appHost.getAttribute('aurelia-app') || appHost.getAttribute('data-aurelia-app');
            bootstrap(config.bind(null, appHost, mainModuleId));
        }
        var toConsole = console.error.bind(console);
        var bootstraps = bootstrapPromises.map(function (p) { return p.catch(toConsole); });
        bootstrapPromises = null;
        return Promise.all(bootstraps);
    });
}
function bootstrap(configure) {
    var p = startPromise.then(function (factory) { return configure(factory()); });
    if (bootstrapPromises)
        bootstrapPromises.push(p);
    return p;
}
var starting = run();


//# sourceMappingURL=aurelia-bootstrapper.js.map


/***/ }),

/***/ 6158:
/*!*******************************************************************************************************!*\
  !*** ./node_modules/aurelia-dependency-injection/dist/native-modules/aurelia-dependency-injection.js ***!
  \*******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   All: function() { return /* binding */ All; },
/* harmony export */   Container: function() { return /* binding */ Container; },
/* harmony export */   Factory: function() { return /* binding */ Factory; },
/* harmony export */   FactoryInvoker: function() { return /* binding */ FactoryInvoker; },
/* harmony export */   InvocationHandler: function() { return /* binding */ InvocationHandler; },
/* harmony export */   Lazy: function() { return /* binding */ Lazy; },
/* harmony export */   NewInstance: function() { return /* binding */ NewInstance; },
/* harmony export */   Optional: function() { return /* binding */ Optional; },
/* harmony export */   Parent: function() { return /* binding */ Parent; },
/* harmony export */   SingletonRegistration: function() { return /* binding */ SingletonRegistration; },
/* harmony export */   Strategy: function() { return /* binding */ Strategy; },
/* harmony export */   StrategyResolver: function() { return /* binding */ StrategyResolver; },
/* harmony export */   TransientRegistration: function() { return /* binding */ TransientRegistration; },
/* harmony export */   _emptyParameters: function() { return /* binding */ _emptyParameters; },
/* harmony export */   all: function() { return /* binding */ all; },
/* harmony export */   autoinject: function() { return /* binding */ autoinject; },
/* harmony export */   factory: function() { return /* binding */ factory; },
/* harmony export */   getDecoratorDependencies: function() { return /* binding */ getDecoratorDependencies; },
/* harmony export */   inject: function() { return /* binding */ inject; },
/* harmony export */   invokeAsFactory: function() { return /* binding */ invokeAsFactory; },
/* harmony export */   invoker: function() { return /* binding */ invoker; },
/* harmony export */   lazy: function() { return /* binding */ lazy; },
/* harmony export */   newInstance: function() { return /* binding */ newInstance; },
/* harmony export */   optional: function() { return /* binding */ optional; },
/* harmony export */   parent: function() { return /* binding */ parent; },
/* harmony export */   registration: function() { return /* binding */ registration; },
/* harmony export */   resolver: function() { return /* binding */ resolver; },
/* harmony export */   singleton: function() { return /* binding */ singleton; },
/* harmony export */   transient: function() { return /* binding */ transient; }
/* harmony export */ });
/* harmony import */ var aurelia_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-metadata */ 1383);
/* harmony import */ var aurelia_pal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-pal */ 1015);



/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function isInjectable(potentialTarget) {
    return !!potentialTarget;
}
function autoinject(potentialTarget) {
    var deco = function (target) {
        if (!target.hasOwnProperty('inject')) {
            target.inject = (aurelia_metadata__WEBPACK_IMPORTED_MODULE_0__.metadata.getOwn(aurelia_metadata__WEBPACK_IMPORTED_MODULE_0__.metadata.paramTypes, target) ||
                _emptyParameters).slice();
            if (target.inject && target.inject.length > 0) {
                if (target.inject[target.inject.length - 1] === Object) {
                    target.inject.splice(-1, 1);
                }
            }
        }
    };
    if (isInjectable(potentialTarget)) {
        return deco(potentialTarget);
    }
    return deco;
}
function inject() {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
    return function (target, _key, descriptor) {
        if (typeof descriptor === 'number') {
            autoinject(target);
            if (rest.length === 1) {
                target.inject[descriptor] = rest[0];
            }
            return;
        }
        if (descriptor) {
            var fn = descriptor.value;
            fn.inject = rest;
        }
        else {
            target.inject = rest;
        }
    };
}

var resolver = aurelia_metadata__WEBPACK_IMPORTED_MODULE_0__.protocol.create('aurelia:resolver', function (target) {
    if (!(typeof target.get === 'function')) {
        return 'Resolvers must implement: get(container: Container, key: any): any';
    }
    return true;
});
var Strategy;
(function (Strategy) {
    Strategy[Strategy["instance"] = 0] = "instance";
    Strategy[Strategy["singleton"] = 1] = "singleton";
    Strategy[Strategy["transient"] = 2] = "transient";
    Strategy[Strategy["function"] = 3] = "function";
    Strategy[Strategy["array"] = 4] = "array";
    Strategy[Strategy["alias"] = 5] = "alias";
})(Strategy || (Strategy = {}));
function isStrategy(actual, expected, state) {
    return actual === expected;
}
var StrategyResolver = (function () {
    function StrategyResolver(strategy, state) {
        this.strategy = strategy;
        this.state = state;
    }
    StrategyResolver.prototype.get = function (container, key) {
        if (isStrategy(this.strategy, Strategy.instance, this.state)) {
            return this.state;
        }
        if (isStrategy(this.strategy, Strategy.singleton, this.state)) {
            var singleton = container.invoke(this.state);
            this.state = singleton;
            this.strategy = 0;
            return singleton;
        }
        if (isStrategy(this.strategy, Strategy.transient, this.state)) {
            return container.invoke(this.state);
        }
        if (isStrategy(this.strategy, Strategy.function, this.state)) {
            return this.state(container, key, this);
        }
        if (isStrategy(this.strategy, Strategy.array, this.state)) {
            return this.state[0].get(container, key);
        }
        if (isStrategy(this.strategy, Strategy.alias, this.state)) {
            return container.get(this.state);
        }
        throw new Error('Invalid strategy: ' + this.strategy);
    };
    StrategyResolver = __decorate([
        resolver(),
        __metadata("design:paramtypes", [Number, Object])
    ], StrategyResolver);
    return StrategyResolver;
}());
var Lazy = (function () {
    function Lazy(key) {
        this._key = key;
    }
    Lazy_1 = Lazy;
    Lazy.prototype.get = function (container) {
        var _this = this;
        return function () { return container.get(_this._key); };
    };
    Lazy.of = function (key) {
        return new Lazy_1(key);
    };
    var Lazy_1;
    Lazy = Lazy_1 = __decorate([
        resolver(),
        __metadata("design:paramtypes", [Object])
    ], Lazy);
    return Lazy;
}());
var All = (function () {
    function All(key) {
        this._key = key;
    }
    All_1 = All;
    All.prototype.get = function (container) {
        return container.getAll(this._key);
    };
    All.of = function (key) {
        return new All_1(key);
    };
    var All_1;
    All = All_1 = __decorate([
        resolver(),
        __metadata("design:paramtypes", [Object])
    ], All);
    return All;
}());
var Optional = (function () {
    function Optional(key, checkParent) {
        if (checkParent === void 0) { checkParent = true; }
        this._key = key;
        this._checkParent = checkParent;
    }
    Optional_1 = Optional;
    Optional.prototype.get = function (container) {
        if (container.hasResolver(this._key, this._checkParent)) {
            return container.get(this._key);
        }
        return null;
    };
    Optional.of = function (key, checkParent) {
        if (checkParent === void 0) { checkParent = true; }
        return new Optional_1(key, checkParent);
    };
    var Optional_1;
    Optional = Optional_1 = __decorate([
        resolver(),
        __metadata("design:paramtypes", [Object, Boolean])
    ], Optional);
    return Optional;
}());
var Parent = (function () {
    function Parent(key) {
        this._key = key;
    }
    Parent_1 = Parent;
    Parent.prototype.get = function (container) {
        return container.parent ? container.parent.get(this._key) : null;
    };
    Parent.of = function (key) {
        return new Parent_1(key);
    };
    var Parent_1;
    Parent = Parent_1 = __decorate([
        resolver(),
        __metadata("design:paramtypes", [Object])
    ], Parent);
    return Parent;
}());
var Factory = (function () {
    function Factory(key) {
        this._key = key;
    }
    Factory_1 = Factory;
    Factory.prototype.get = function (container) {
        var fn = this._key;
        var resolver = container.getResolver(fn);
        if (resolver && resolver.strategy === Strategy.function) {
            fn = resolver.state;
        }
        return function () {
            var rest = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                rest[_i] = arguments[_i];
            }
            return container.invoke(fn, rest);
        };
    };
    Factory.of = function (key) {
        return new Factory_1(key);
    };
    var Factory_1;
    Factory = Factory_1 = __decorate([
        resolver(),
        __metadata("design:paramtypes", [Object])
    ], Factory);
    return Factory;
}());
var NewInstance = (function () {
    function NewInstance(key) {
        var dynamicDependencies = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            dynamicDependencies[_i - 1] = arguments[_i];
        }
        this.key = key;
        this.asKey = key;
        this.dynamicDependencies = dynamicDependencies;
    }
    NewInstance_1 = NewInstance;
    NewInstance.prototype.get = function (container) {
        var dynamicDependencies = this.dynamicDependencies.length > 0
            ? this.dynamicDependencies.map(function (dependency) {
                return dependency['protocol:aurelia:resolver']
                    ? dependency.get(container)
                    : container.get(dependency);
            })
            : undefined;
        var fn = this.key;
        var resolver = container.getResolver(fn);
        if (resolver && resolver.strategy === 3) {
            fn = resolver.state;
        }
        var instance = container.invoke(fn, dynamicDependencies);
        container.registerInstance(this.asKey, instance);
        return instance;
    };
    NewInstance.prototype.as = function (key) {
        this.asKey = key;
        return this;
    };
    NewInstance.of = function (key) {
        var dynamicDependencies = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            dynamicDependencies[_i - 1] = arguments[_i];
        }
        return new (NewInstance_1.bind.apply(NewInstance_1, [void 0, key].concat(dynamicDependencies)))();
    };
    var NewInstance_1;
    NewInstance = NewInstance_1 = __decorate([
        resolver(),
        __metadata("design:paramtypes", [Object, Object])
    ], NewInstance);
    return NewInstance;
}());
function getDecoratorDependencies(target) {
    autoinject(target);
    return target.inject;
}
function lazy(keyValue) {
    return function (target, _key, index) {
        var inject$$1 = getDecoratorDependencies(target);
        inject$$1[index] = Lazy.of(keyValue);
    };
}
function all(keyValue) {
    return function (target, _key, index) {
        var inject$$1 = getDecoratorDependencies(target);
        inject$$1[index] = All.of(keyValue);
    };
}
function optional(checkParentOrTarget) {
    if (checkParentOrTarget === void 0) { checkParentOrTarget = true; }
    var deco = function (checkParent) {
        return function (target, _key, index) {
            var inject$$1 = getDecoratorDependencies(target);
            inject$$1[index] = Optional.of(inject$$1[index], checkParent);
        };
    };
    if (typeof checkParentOrTarget === 'boolean') {
        return deco(checkParentOrTarget);
    }
    return deco(true);
}
function parent(target, _key, index) {
    var inject$$1 = getDecoratorDependencies(target);
    inject$$1[index] = Parent.of(inject$$1[index]);
}
function factory(keyValue) {
    return function (target, _key, index) {
        var inject$$1 = getDecoratorDependencies(target);
        inject$$1[index] = Factory.of(keyValue);
    };
}
function newInstance(asKeyOrTarget) {
    var dynamicDependencies = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        dynamicDependencies[_i - 1] = arguments[_i];
    }
    var deco = function (asKey) {
        return function (target, _key, index) {
            var inject$$1 = getDecoratorDependencies(target);
            inject$$1[index] = NewInstance.of.apply(NewInstance, [inject$$1[index]].concat(dynamicDependencies));
            if (!!asKey) {
                inject$$1[index].as(asKey);
            }
        };
    };
    if (arguments.length >= 1) {
        return deco(asKeyOrTarget);
    }
    return deco();
}

function validateKey(key) {
    if (key === null || key === undefined) {
        throw new Error('key/value cannot be null or undefined. Are you trying to inject/register something that doesn\'t exist with DI?');
    }
}
var _emptyParameters = Object.freeze([]);
aurelia_metadata__WEBPACK_IMPORTED_MODULE_0__.metadata.registration = 'aurelia:registration';
aurelia_metadata__WEBPACK_IMPORTED_MODULE_0__.metadata.invoker = 'aurelia:invoker';
var resolverDecorates = resolver.decorates;
var InvocationHandler = (function () {
    function InvocationHandler(fn, invoker, dependencies) {
        this.fn = fn;
        this.invoker = invoker;
        this.dependencies = dependencies;
    }
    InvocationHandler.prototype.invoke = function (container, dynamicDependencies) {
        return dynamicDependencies !== undefined
            ? this.invoker.invokeWithDynamicDependencies(container, this.fn, this.dependencies, dynamicDependencies)
            : this.invoker.invoke(container, this.fn, this.dependencies);
    };
    return InvocationHandler;
}());
function invokeWithDynamicDependencies(container, fn, staticDependencies, dynamicDependencies) {
    var i = staticDependencies.length;
    var args = new Array(i);
    var lookup;
    while (i--) {
        lookup = staticDependencies[i];
        if (lookup === null || lookup === undefined) {
            throw new Error('Constructor Parameter with index ' +
                i +
                ' cannot be null or undefined. Are you trying to inject/register something that doesn\'t exist with DI?');
        }
        else {
            args[i] = container.get(lookup);
        }
    }
    if (dynamicDependencies !== undefined) {
        args = args.concat(dynamicDependencies);
    }
    return Reflect.construct(fn, args);
}
var classInvoker = {
    invoke: function (container, Type, deps) {
        var instances = deps.map(function (dep) { return container.get(dep); });
        return Reflect.construct(Type, instances);
    },
    invokeWithDynamicDependencies: invokeWithDynamicDependencies
};
function getDependencies(f) {
    if (!f.hasOwnProperty('inject')) {
        return [];
    }
    if (typeof f.inject === 'function') {
        return f.inject();
    }
    return f.inject;
}
var Container = (function () {
    function Container(configuration) {
        if (configuration === undefined) {
            configuration = {};
        }
        this._configuration = configuration;
        this._onHandlerCreated = configuration.onHandlerCreated;
        this._handlers =
            configuration.handlers || (configuration.handlers = new Map());
        this._resolvers = new Map();
        this.root = this;
        this.parent = null;
    }
    Container.prototype.makeGlobal = function () {
        Container.instance = this;
        return this;
    };
    Container.prototype.setHandlerCreatedCallback = function (onHandlerCreated) {
        this._onHandlerCreated = onHandlerCreated;
        this._configuration.onHandlerCreated = onHandlerCreated;
    };
    Container.prototype.registerInstance = function (key, instance) {
        return this.registerResolver(key, new StrategyResolver(0, instance === undefined ? key : instance));
    };
    Container.prototype.registerSingleton = function (key, fn) {
        return this.registerResolver(key, new StrategyResolver(1, fn === undefined ? key : fn));
    };
    Container.prototype.registerTransient = function (key, fn) {
        return this.registerResolver(key, new StrategyResolver(2, fn === undefined ? key : fn));
    };
    Container.prototype.registerHandler = function (key, handler) {
        return this.registerResolver(key, new StrategyResolver(3, handler));
    };
    Container.prototype.registerAlias = function (originalKey, aliasKey) {
        return this.registerResolver(aliasKey, new StrategyResolver(5, originalKey));
    };
    Container.prototype.registerResolver = function (key, resolver$$1) {
        validateKey(key);
        var allResolvers = this._resolvers;
        var result = allResolvers.get(key);
        if (result === undefined) {
            allResolvers.set(key, resolver$$1);
        }
        else if (result.strategy === 4) {
            result.state.push(resolver$$1);
        }
        else {
            allResolvers.set(key, new StrategyResolver(4, [result, resolver$$1]));
        }
        return resolver$$1;
    };
    Container.prototype.autoRegister = function (key, fn) {
        fn = fn === undefined ? key : fn;
        if (typeof fn === 'function') {
            var registration = aurelia_metadata__WEBPACK_IMPORTED_MODULE_0__.metadata.get(aurelia_metadata__WEBPACK_IMPORTED_MODULE_0__.metadata.registration, fn);
            if (registration === undefined) {
                return this.registerResolver(key, new StrategyResolver(1, fn));
            }
            return registration.registerResolver(this, key, fn);
        }
        return this.registerResolver(key, new StrategyResolver(0, fn));
    };
    Container.prototype.autoRegisterAll = function (fns) {
        var i = fns.length;
        while (i--) {
            this.autoRegister(fns[i]);
        }
    };
    Container.prototype.unregister = function (key) {
        this._resolvers.delete(key);
    };
    Container.prototype.hasResolver = function (key, checkParent) {
        if (checkParent === void 0) { checkParent = false; }
        validateKey(key);
        return (this._resolvers.has(key) ||
            (checkParent &&
                this.parent !== null &&
                this.parent.hasResolver(key, checkParent)));
    };
    Container.prototype.getResolver = function (key) {
        return this._resolvers.get(key);
    };
    Container.prototype.get = function (key) {
        validateKey(key);
        if (key === Container) {
            return this;
        }
        if (resolverDecorates(key)) {
            return key.get(this, key);
        }
        var resolver$$1 = this._resolvers.get(key);
        if (resolver$$1 === undefined) {
            if (this.parent === null) {
                return this.autoRegister(key).get(this, key);
            }
            var registration = aurelia_metadata__WEBPACK_IMPORTED_MODULE_0__.metadata.get(aurelia_metadata__WEBPACK_IMPORTED_MODULE_0__.metadata.registration, key);
            if (registration === undefined) {
                return this.parent._get(key);
            }
            return registration.registerResolver(this, key, key).get(this, key);
        }
        return resolver$$1.get(this, key);
    };
    Container.prototype._get = function (key) {
        var resolver$$1 = this._resolvers.get(key);
        if (resolver$$1 === undefined) {
            if (this.parent === null) {
                return this.autoRegister(key).get(this, key);
            }
            return this.parent._get(key);
        }
        return resolver$$1.get(this, key);
    };
    Container.prototype.getAll = function (key) {
        validateKey(key);
        var resolver$$1 = this._resolvers.get(key);
        if (resolver$$1 === undefined) {
            if (this.parent === null) {
                return _emptyParameters;
            }
            return this.parent.getAll(key);
        }
        if (resolver$$1.strategy === 4) {
            var state = resolver$$1.state;
            var i = state.length;
            var results = new Array(i);
            while (i--) {
                results[i] = state[i].get(this, key);
            }
            return results;
        }
        return [resolver$$1.get(this, key)];
    };
    Container.prototype.createChild = function () {
        var child = new Container(this._configuration);
        child.root = this.root;
        child.parent = this;
        return child;
    };
    Container.prototype.invoke = function (fn, dynamicDependencies) {
        try {
            var handler = this._handlers.get(fn);
            if (handler === undefined) {
                handler = this._createInvocationHandler(fn);
                this._handlers.set(fn, handler);
            }
            return handler.invoke(this, dynamicDependencies);
        }
        catch (e) {
            throw new aurelia_pal__WEBPACK_IMPORTED_MODULE_1__.AggregateError("Error invoking " + fn.name + ". Check the inner error for details.", e, true);
        }
    };
    Container.prototype._createInvocationHandler = function (fn) {
        var dependencies;
        if (fn.inject === undefined) {
            dependencies =
                aurelia_metadata__WEBPACK_IMPORTED_MODULE_0__.metadata.getOwn(aurelia_metadata__WEBPACK_IMPORTED_MODULE_0__.metadata.paramTypes, fn) || _emptyParameters;
        }
        else {
            dependencies = [];
            var ctor = fn;
            while (typeof ctor === 'function') {
                dependencies.push.apply(dependencies, getDependencies(ctor));
                ctor = Object.getPrototypeOf(ctor);
            }
        }
        var invoker = aurelia_metadata__WEBPACK_IMPORTED_MODULE_0__.metadata.getOwn(aurelia_metadata__WEBPACK_IMPORTED_MODULE_0__.metadata.invoker, fn) || classInvoker;
        var handler = new InvocationHandler(fn, invoker, dependencies);
        return this._onHandlerCreated !== undefined
            ? this._onHandlerCreated(handler)
            : handler;
    };
    return Container;
}());

function invoker(value) {
    return function (target) {
        aurelia_metadata__WEBPACK_IMPORTED_MODULE_0__.metadata.define(aurelia_metadata__WEBPACK_IMPORTED_MODULE_0__.metadata.invoker, value, target);
    };
}
function invokeAsFactory(potentialTarget) {
    var deco = function (target) {
        aurelia_metadata__WEBPACK_IMPORTED_MODULE_0__.metadata.define(aurelia_metadata__WEBPACK_IMPORTED_MODULE_0__.metadata.invoker, FactoryInvoker.instance, target);
    };
    return potentialTarget ? deco(potentialTarget) : deco;
}
var FactoryInvoker = (function () {
    function FactoryInvoker() {
    }
    FactoryInvoker.prototype.invoke = function (container, fn, dependencies) {
        var i = dependencies.length;
        var args = new Array(i);
        while (i--) {
            args[i] = container.get(dependencies[i]);
        }
        return fn.apply(undefined, args);
    };
    FactoryInvoker.prototype.invokeWithDynamicDependencies = function (container, fn, staticDependencies, dynamicDependencies) {
        var i = staticDependencies.length;
        var args = new Array(i);
        while (i--) {
            args[i] = container.get(staticDependencies[i]);
        }
        if (dynamicDependencies !== undefined) {
            args = args.concat(dynamicDependencies);
        }
        return fn.apply(undefined, args);
    };
    return FactoryInvoker;
}());
FactoryInvoker.instance = new FactoryInvoker();

function registration(value) {
    return function (target) {
        aurelia_metadata__WEBPACK_IMPORTED_MODULE_0__.metadata.define(aurelia_metadata__WEBPACK_IMPORTED_MODULE_0__.metadata.registration, value, target);
    };
}
function transient(key) {
    return registration(new TransientRegistration(key));
}
function singleton(keyOrRegisterInChild, registerInChild) {
    if (registerInChild === void 0) { registerInChild = false; }
    return registration(new SingletonRegistration(keyOrRegisterInChild, registerInChild));
}
var TransientRegistration = (function () {
    function TransientRegistration(key) {
        this._key = key;
    }
    TransientRegistration.prototype.registerResolver = function (container, key, fn) {
        var existingResolver = container.getResolver(this._key || key);
        return existingResolver === undefined
            ? container.registerTransient((this._key || key), fn)
            : existingResolver;
    };
    return TransientRegistration;
}());
var SingletonRegistration = (function () {
    function SingletonRegistration(keyOrRegisterInChild, registerInChild) {
        if (registerInChild === void 0) { registerInChild = false; }
        if (typeof keyOrRegisterInChild === 'boolean') {
            this._registerInChild = keyOrRegisterInChild;
        }
        else {
            this._key = keyOrRegisterInChild;
            this._registerInChild = registerInChild;
        }
    }
    SingletonRegistration.prototype.registerResolver = function (container, key, fn) {
        var targetContainer = this._registerInChild ? container : container.root;
        var existingResolver = targetContainer.getResolver(this._key || key);
        return existingResolver === undefined
            ? targetContainer.registerSingleton(this._key || key, fn)
            : existingResolver;
    };
    return SingletonRegistration;
}());




/***/ }),

/***/ "aurelia-dialog":
/*!***************************************************************************!*\
  !*** ./node_modules/aurelia-dialog/dist/native-modules/aurelia-dialog.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DefaultDialogSettings: function() { return /* binding */ DefaultDialogSettings; },
/* harmony export */   DialogConfiguration: function() { return /* binding */ DialogConfiguration; },
/* harmony export */   DialogController: function() { return /* reexport safe */ _chunk_js__WEBPACK_IMPORTED_MODULE_0__.d; },
/* harmony export */   DialogService: function() { return /* binding */ DialogService; },
/* harmony export */   Renderer: function() { return /* reexport safe */ _chunk_js__WEBPACK_IMPORTED_MODULE_0__.a; },
/* harmony export */   configure: function() { return /* binding */ configure; },
/* harmony export */   createDialogCancelError: function() { return /* reexport safe */ _chunk_js__WEBPACK_IMPORTED_MODULE_0__.b; },
/* harmony export */   createDialogCloseError: function() { return /* reexport safe */ _chunk_js__WEBPACK_IMPORTED_MODULE_0__.e; }
/* harmony export */ });
/* harmony import */ var _chunk_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunk.js */ 6885);
/* harmony import */ var aurelia_pal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-pal */ 1015);
/* harmony import */ var aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! aurelia-dependency-injection */ 6158);
/* harmony import */ var aurelia_templating__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! aurelia-templating */ 1781);






var DefaultDialogSettings = (function () {
    function DefaultDialogSettings() {
        this.lock = true;
        this.startingZIndex = 1000;
        this.centerHorizontalOnly = false;
        this.rejectOnCancel = false;
        this.ignoreTransitions = false;
        this.restoreFocus = function (lastActiveElement) { return lastActiveElement.focus(); };
    }
    return DefaultDialogSettings;
}());

var RENDERRERS = {
    ux: function () { return __webpack_require__.e(/*! import() */ "vendors.async").then(__webpack_require__.bind(__webpack_require__, /*! ./ux-dialog-renderer.js */ 2440)).then(function (m) { return m.DialogRenderer; }); },
    native: function () { return __webpack_require__.e(/*! import() */ "vendors.async").then(__webpack_require__.bind(__webpack_require__, /*! ./native-dialog-renderer.js */ 1472)).then(function (m) { return m.NativeDialogRenderer; }); }
};
var DEFAULT_RESOURCES = {
    'ux-dialog': function () { return __webpack_require__.e(/*! import() */ "vendors.async").then(__webpack_require__.bind(__webpack_require__, /*! ./ux-dialog.js */ 843)).then(function (m) { return m.UxDialog; }); },
    'ux-dialog-header': function () { return __webpack_require__.e(/*! import() */ "vendors.async").then(__webpack_require__.bind(__webpack_require__, /*! ./ux-dialog-header.js */ 1287)).then(function (m) { return m.UxDialogHeader; }); },
    'ux-dialog-body': function () { return __webpack_require__.e(/*! import() */ "vendors.async").then(__webpack_require__.bind(__webpack_require__, /*! ./ux-dialog-body.js */ 778)).then(function (m) { return m.UxDialogBody; }); },
    'ux-dialog-footer': function () { return __webpack_require__.e(/*! import() */ "vendors.async").then(__webpack_require__.bind(__webpack_require__, /*! ./ux-dialog-footer.js */ 7007)).then(function (m) { return m.UxDialogFooter; }); },
    'attach-focus': function () { return __webpack_require__.e(/*! import() */ "vendors.async").then(__webpack_require__.bind(__webpack_require__, /*! ./attach-focus.js */ 1990)).then(function (m) { return m.AttachFocus; }); }
};
var DEFAULT_CSS_TEXT = function () { return __webpack_require__.e(/*! import() */ "vendors.async").then(__webpack_require__.bind(__webpack_require__, /*! ./default-styles.js */ 2010)).then(function (cssM) { return cssM['default']; }); };
var DialogConfiguration = (function () {
    function DialogConfiguration(frameworkConfiguration, applySetter) {
        var _this = this;
        this.renderer = 'ux';
        this.cssText = DEFAULT_CSS_TEXT;
        this.resources = [];
        this.fwConfig = frameworkConfiguration;
        this.settings = frameworkConfiguration.container.get(DefaultDialogSettings);
        applySetter(function () { return _this._apply(); });
    }
    DialogConfiguration.prototype._apply = function () {
        var _this = this;
        var renderer = this.renderer;
        var cssText = this.cssText;
        return Promise
            .all([
            typeof renderer === 'string' ? RENDERRERS[renderer]() : renderer,
            cssText
                ? typeof cssText === 'string'
                    ? cssText
                    : cssText()
                : ''
        ])
            .then(function (_a) {
            var rendererImpl = _a[0], $cssText = _a[1];
            var fwConfig = _this.fwConfig;
            fwConfig.transient(_chunk_js__WEBPACK_IMPORTED_MODULE_0__.a, rendererImpl);
            if ($cssText) {
                aurelia_pal__WEBPACK_IMPORTED_MODULE_1__.DOM.injectStyles($cssText);
            }
            return Promise
                .all(_this.resources.map(function (name) { return DEFAULT_RESOURCES[name](); }))
                .then(function (modules) {
                fwConfig.globalResources(modules);
            });
        });
    };
    DialogConfiguration.prototype.useDefaults = function () {
        return this
            .useRenderer('ux')
            .useCSS(DEFAULT_CSS_TEXT)
            .useStandardResources();
    };
    DialogConfiguration.prototype.useStandardResources = function () {
        Object.keys(DEFAULT_RESOURCES).forEach(this.useResource, this);
        return this;
    };
    DialogConfiguration.prototype.useResource = function (resourceName) {
        this.resources.push(resourceName);
        return this;
    };
    DialogConfiguration.prototype.useRenderer = function (renderer, settings) {
        this.renderer = renderer;
        if (settings) {
            Object.assign(this.settings, settings);
        }
        return this;
    };
    DialogConfiguration.prototype.useCSS = function (cssText) {
        this.cssText = cssText;
        return this;
    };
    return DialogConfiguration;
}());

function whenClosed(onfulfilled, onrejected) {
    return this.then(function (r) { return r.wasCancelled ? r : r.closeResult; }).then(onfulfilled, onrejected);
}
function asDialogOpenPromise(promise) {
    promise.whenClosed = whenClosed;
    return promise;
}
var DialogService = (function () {
    function DialogService(container, compositionEngine, defaultSettings) {
        this.controllers = [];
        this.hasOpenDialog = false;
        this.hasActiveDialog = false;
        this.container = container;
        this.compositionEngine = compositionEngine;
        this.defaultSettings = defaultSettings;
    }
    DialogService.prototype.validateSettings = function (settings) {
        if (!settings.viewModel && !settings.view) {
            throw new Error('Invalid Dialog Settings. You must provide "viewModel", "view" or both.');
        }
    };
    DialogService.prototype.createCompositionContext = function (childContainer, host, settings) {
        return {
            container: childContainer.parent,
            childContainer: childContainer,
            bindingContext: null,
            viewResources: null,
            model: settings.model,
            view: settings.view,
            viewModel: settings.viewModel,
            viewSlot: new aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.ViewSlot(host, true),
            host: host
        };
    };
    DialogService.prototype.ensureViewModel = function (compositionContext) {
        if (typeof compositionContext.viewModel === 'object') {
            return Promise.resolve(compositionContext);
        }
        return this.compositionEngine.ensureViewModel(compositionContext);
    };
    DialogService.prototype._cancelOperation = function (rejectOnCancel) {
        if (!rejectOnCancel) {
            return { wasCancelled: true };
        }
        throw (0,_chunk_js__WEBPACK_IMPORTED_MODULE_0__.b)();
    };
    DialogService.prototype.composeAndShowDialog = function (compositionContext, dialogController) {
        var _this = this;
        if (!compositionContext.viewModel) {
            compositionContext.bindingContext = { controller: dialogController };
        }
        return this.compositionEngine
            .compose(compositionContext)
            .then(function (controller) {
            dialogController.controller = controller;
            return dialogController.renderer
                .showDialog(dialogController)
                .then(function () {
                _this.controllers.push(dialogController);
                _this.hasActiveDialog = _this.hasOpenDialog = !!_this.controllers.length;
            }, function (reason) {
                if (controller.viewModel) {
                    (0,_chunk_js__WEBPACK_IMPORTED_MODULE_0__.c)(controller.viewModel, 'deactivate');
                }
                return Promise.reject(reason);
            });
        });
    };
    DialogService.prototype.createSettings = function (settings) {
        settings = Object.assign({}, this.defaultSettings, settings);
        if (typeof settings.keyboard !== 'boolean' && !settings.keyboard) {
            settings.keyboard = !settings.lock;
        }
        if (typeof settings.overlayDismiss !== 'boolean') {
            settings.overlayDismiss = !settings.lock;
        }
        Object.defineProperty(settings, 'rejectOnCancel', {
            writable: false,
            configurable: true,
            enumerable: true
        });
        this.validateSettings(settings);
        return settings;
    };
    DialogService.prototype.open = function (settings) {
        var _this = this;
        if (settings === void 0) { settings = {}; }
        settings = this.createSettings(settings);
        var childContainer = settings.childContainer || this.container.createChild();
        var resolveCloseResult;
        var rejectCloseResult;
        var closeResult = new Promise(function (resolve, reject) {
            resolveCloseResult = resolve;
            rejectCloseResult = reject;
        });
        var dialogController = childContainer.invoke(_chunk_js__WEBPACK_IMPORTED_MODULE_0__.d, [settings, resolveCloseResult, rejectCloseResult]);
        childContainer.registerInstance(_chunk_js__WEBPACK_IMPORTED_MODULE_0__.d, dialogController);
        closeResult.then(function () {
            removeController(_this, dialogController);
        }, function () {
            removeController(_this, dialogController);
        });
        var compositionContext = this.createCompositionContext(childContainer, dialogController.renderer.getDialogContainer(), dialogController.settings);
        var openResult = this.ensureViewModel(compositionContext).then(function (compositionContext) {
            if (!compositionContext.viewModel) {
                return true;
            }
            return (0,_chunk_js__WEBPACK_IMPORTED_MODULE_0__.c)(compositionContext.viewModel, 'canActivate', dialogController.settings.model);
        }).then(function (canActivate) {
            if (!canActivate) {
                return _this._cancelOperation(dialogController.settings.rejectOnCancel);
            }
            return _this.composeAndShowDialog(compositionContext, dialogController)
                .then(function () { return ({ controller: dialogController, closeResult: closeResult, wasCancelled: false }); });
        });
        return asDialogOpenPromise(openResult);
    };
    DialogService.prototype.closeAll = function () {
        return Promise.all(this.controllers.slice(0).map(function (controller) {
            if (!controller.settings.rejectOnCancel) {
                return controller.cancel().then(function (result) {
                    if (result.wasCancelled) {
                        return controller;
                    }
                    return null;
                });
            }
            return controller.cancel().then(function () { return null; }).catch(function (reason) {
                if (reason.wasCancelled) {
                    return controller;
                }
                throw reason;
            });
        })).then(function (unclosedControllers) { return unclosedControllers.filter(function (unclosed) { return !!unclosed; }); });
    };
    DialogService.inject = [aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_2__.Container, aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.CompositionEngine, DefaultDialogSettings];
    return DialogService;
}());
function removeController(service, dialogController) {
    var i = service.controllers.indexOf(dialogController);
    if (i !== -1) {
        service.controllers.splice(i, 1);
        service.hasActiveDialog = service.hasOpenDialog = !!service.controllers.length;
    }
}

function configure(frameworkConfig, callback) {
    var applyConfig = null;
    var config = new DialogConfiguration(frameworkConfig, function (apply) { applyConfig = apply; });
    if (typeof callback === 'function') {
        callback(config);
    }
    else {
        config.useDefaults();
    }
    return applyConfig();
}


//# sourceMappingURL=aurelia-dialog.js.map


/***/ }),

/***/ 6885:
/*!******************************************************************!*\
  !*** ./node_modules/aurelia-dialog/dist/native-modules/chunk.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: function() { return /* binding */ Renderer; },
/* harmony export */   b: function() { return /* binding */ createDialogCancelError; },
/* harmony export */   c: function() { return /* binding */ invokeLifecycle; },
/* harmony export */   d: function() { return /* binding */ DialogController; },
/* harmony export */   e: function() { return /* binding */ createDialogCloseError; }
/* harmony export */ });
var Renderer = (function () {
    function Renderer() {
    }
    Renderer.prototype.getDialogContainer = function () {
        throw new Error('DialogRenderer must implement getDialogContainer().');
    };
    Renderer.prototype.showDialog = function (dialogController) {
        throw new Error('DialogRenderer must implement showDialog().');
    };
    Renderer.prototype.hideDialog = function (dialogController) {
        throw new Error('DialogRenderer must implement hideDialog().');
    };
    return Renderer;
}());

function createDialogCancelError(output) {
    var error = new Error('Operation cancelled.');
    error.wasCancelled = true;
    error.output = output;
    return error;
}

function createDialogCloseError(output) {
    var error = new Error();
    error.wasCancelled = false;
    error.output = output;
    return error;
}

function invokeLifecycle(instance, name, model) {
    if (typeof instance[name] === 'function') {
        return new Promise(function (resolve) {
            resolve(instance[name](model));
        }).then(function (result) {
            if (result !== null && result !== undefined) {
                return result;
            }
            return true;
        });
    }
    return Promise.resolve(true);
}

var DialogController = (function () {
    function DialogController(renderer, settings, resolve, reject) {
        this.resolve = resolve;
        this.reject = reject;
        this.settings = settings;
        this.renderer = renderer;
    }
    DialogController.prototype.releaseResources = function (result) {
        var _this = this;
        return invokeLifecycle(this.controller.viewModel || {}, 'deactivate', result)
            .then(function () { return _this.renderer.hideDialog(_this); })
            .then(function () {
            _this.controller.unbind();
        });
    };
    DialogController.prototype.cancelOperation = function () {
        if (!this.settings.rejectOnCancel) {
            return { wasCancelled: true };
        }
        throw createDialogCancelError();
    };
    DialogController.prototype.ok = function (output) {
        return this.close(true, output);
    };
    DialogController.prototype.cancel = function (output) {
        return this.close(false, output);
    };
    DialogController.prototype.error = function (output) {
        var _this = this;
        var closeError = createDialogCloseError(output);
        return this.releaseResources(closeError).then(function () { _this.reject(closeError); });
    };
    DialogController.prototype.close = function (ok, output) {
        var _this = this;
        if (this.closePromise) {
            return this.closePromise;
        }
        var dialogResult = { wasCancelled: !ok, output: output };
        return this.closePromise = invokeLifecycle(this.controller.viewModel || {}, 'canDeactivate', dialogResult)
            .catch(function (reason) {
            _this.closePromise = undefined;
            return Promise.reject(reason);
        }).then(function (canDeactivate) {
            if (!canDeactivate) {
                _this.closePromise = undefined;
                return _this.cancelOperation();
            }
            return _this.releaseResources(dialogResult).then(function () {
                if (!_this.settings.rejectOnCancel || ok) {
                    _this.resolve(dialogResult);
                }
                else {
                    _this.reject(createDialogCancelError(output));
                }
                return { wasCancelled: false };
            }).catch(function (reason) {
                _this.closePromise = undefined;
                return Promise.reject(reason);
            });
        });
    };
    DialogController.inject = [Renderer];
    return DialogController;
}());


//# sourceMappingURL=chunk.js.map


/***/ }),

/***/ "aurelia-event-aggregator":
/*!***********************************************************************************************!*\
  !*** ./node_modules/aurelia-event-aggregator/dist/native-modules/aurelia-event-aggregator.js ***!
  \***********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventAggregator: function() { return /* binding */ EventAggregator; },
/* harmony export */   configure: function() { return /* binding */ configure; },
/* harmony export */   includeEventsIn: function() { return /* binding */ includeEventsIn; }
/* harmony export */ });
/* harmony import */ var aurelia_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-logging */ 8099);




var logger = aurelia_logging__WEBPACK_IMPORTED_MODULE_0__.getLogger('event-aggregator');

var Handler = function () {
  function Handler(messageType, callback) {
    

    this.messageType = messageType;
    this.callback = callback;
  }

  Handler.prototype.handle = function handle(message) {
    if (message instanceof this.messageType) {
      this.callback.call(null, message);
    }
  };

  return Handler;
}();

function invokeCallback(callback, data, event) {
  try {
    callback(data, event);
  } catch (e) {
    logger.error(e);
  }
}

function invokeHandler(handler, data) {
  try {
    handler.handle(data);
  } catch (e) {
    logger.error(e);
  }
}

var EventAggregator = function () {
  function EventAggregator() {
    

    this.eventLookup = {};
    this.messageHandlers = [];
  }

  EventAggregator.prototype.publish = function publish(event, data) {
    var subscribers = void 0;
    var i = void 0;

    if (!event) {
      throw new Error('Event was invalid.');
    }

    if (typeof event === 'string') {
      subscribers = this.eventLookup[event];
      if (subscribers) {
        subscribers = subscribers.slice();
        i = subscribers.length;

        while (i--) {
          invokeCallback(subscribers[i], data, event);
        }
      }
    } else {
      subscribers = this.messageHandlers.slice();
      i = subscribers.length;

      while (i--) {
        invokeHandler(subscribers[i], event);
      }
    }
  };

  EventAggregator.prototype.subscribe = function subscribe(event, callback) {
    var handler = void 0;
    var subscribers = void 0;

    if (!event) {
      throw new Error('Event channel/type was invalid.');
    }

    if (typeof event === 'string') {
      handler = callback;
      subscribers = this.eventLookup[event] || (this.eventLookup[event] = []);
    } else {
      handler = new Handler(event, callback);
      subscribers = this.messageHandlers;
    }

    subscribers.push(handler);

    return {
      dispose: function dispose() {
        var idx = subscribers.indexOf(handler);
        if (idx !== -1) {
          subscribers.splice(idx, 1);
        }
      }
    };
  };

  EventAggregator.prototype.subscribeOnce = function subscribeOnce(event, callback) {
    var sub = this.subscribe(event, function (a, b) {
      sub.dispose();
      return callback(a, b);
    });

    return sub;
  };

  return EventAggregator;
}();

function includeEventsIn(obj) {
  var ea = new EventAggregator();

  obj.subscribeOnce = function (event, callback) {
    return ea.subscribeOnce(event, callback);
  };

  obj.subscribe = function (event, callback) {
    return ea.subscribe(event, callback);
  };

  obj.publish = function (event, data) {
    ea.publish(event, data);
  };

  return ea;
}

function configure(config) {
  config.instance(EventAggregator, includeEventsIn(config.aurelia));
}

/***/ }),

/***/ "aurelia-framework":
/*!*********************************************************************************!*\
  !*** ./node_modules/aurelia-framework/dist/native-modules/aurelia-framework.js ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AccessKeyed: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.AccessKeyed; },
/* harmony export */   AccessMember: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.AccessMember; },
/* harmony export */   AccessScope: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.AccessScope; },
/* harmony export */   AccessThis: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.AccessThis; },
/* harmony export */   AggregateError: function() { return /* reexport safe */ aurelia_pal__WEBPACK_IMPORTED_MODULE_7__.AggregateError; },
/* harmony export */   All: function() { return /* reexport safe */ aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_0__.All; },
/* harmony export */   Animator: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.Animator; },
/* harmony export */   Assign: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.Assign; },
/* harmony export */   Aurelia: function() { return /* binding */ Aurelia; },
/* harmony export */   BehaviorInstruction: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.BehaviorInstruction; },
/* harmony export */   BehaviorPropertyObserver: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.BehaviorPropertyObserver; },
/* harmony export */   Binary: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.Binary; },
/* harmony export */   BindableProperty: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.BindableProperty; },
/* harmony export */   Binding: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.Binding; },
/* harmony export */   BindingBehavior: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.BindingBehavior; },
/* harmony export */   BindingBehaviorResource: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.BindingBehaviorResource; },
/* harmony export */   BindingEngine: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.BindingEngine; },
/* harmony export */   BindingExpression: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.BindingExpression; },
/* harmony export */   BindingLanguage: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.BindingLanguage; },
/* harmony export */   BoundViewFactory: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.BoundViewFactory; },
/* harmony export */   Call: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.Call; },
/* harmony export */   CallExpression: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.CallExpression; },
/* harmony export */   CallFunction: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.CallFunction; },
/* harmony export */   CallMember: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.CallMember; },
/* harmony export */   CallScope: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.CallScope; },
/* harmony export */   CheckedObserver: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.CheckedObserver; },
/* harmony export */   ClassObserver: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.ClassObserver; },
/* harmony export */   CollectionLengthObserver: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.CollectionLengthObserver; },
/* harmony export */   CompositionEngine: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.CompositionEngine; },
/* harmony export */   CompositionTransaction: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.CompositionTransaction; },
/* harmony export */   CompositionTransactionNotifier: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.CompositionTransactionNotifier; },
/* harmony export */   CompositionTransactionOwnershipToken: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.CompositionTransactionOwnershipToken; },
/* harmony export */   ComputedExpression: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.ComputedExpression; },
/* harmony export */   Conditional: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.Conditional; },
/* harmony export */   Container: function() { return /* reexport safe */ aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_0__.Container; },
/* harmony export */   Controller: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.Controller; },
/* harmony export */   ConventionalViewStrategy: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.ConventionalViewStrategy; },
/* harmony export */   DOM: function() { return /* reexport safe */ aurelia_pal__WEBPACK_IMPORTED_MODULE_7__.DOM; },
/* harmony export */   DataAttributeObserver: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.DataAttributeObserver; },
/* harmony export */   DirtyCheckProperty: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.DirtyCheckProperty; },
/* harmony export */   DirtyChecker: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.DirtyChecker; },
/* harmony export */   ElementConfigResource: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.ElementConfigResource; },
/* harmony export */   ElementEvents: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.ElementEvents; },
/* harmony export */   EventManager: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.EventManager; },
/* harmony export */   EventSubscriber: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.EventSubscriber; },
/* harmony export */   Expression: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.Expression; },
/* harmony export */   ExpressionCloner: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.ExpressionCloner; },
/* harmony export */   ExpressionObserver: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.ExpressionObserver; },
/* harmony export */   FEATURE: function() { return /* reexport safe */ aurelia_pal__WEBPACK_IMPORTED_MODULE_7__.FEATURE; },
/* harmony export */   Factory: function() { return /* reexport safe */ aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_0__.Factory; },
/* harmony export */   FactoryInvoker: function() { return /* reexport safe */ aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_0__.FactoryInvoker; },
/* harmony export */   FrameworkConfiguration: function() { return /* binding */ FrameworkConfiguration; },
/* harmony export */   HtmlBehaviorResource: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.HtmlBehaviorResource; },
/* harmony export */   InlineViewStrategy: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.InlineViewStrategy; },
/* harmony export */   InvocationHandler: function() { return /* reexport safe */ aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_0__.InvocationHandler; },
/* harmony export */   Lazy: function() { return /* reexport safe */ aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_0__.Lazy; },
/* harmony export */   Listener: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.Listener; },
/* harmony export */   ListenerExpression: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.ListenerExpression; },
/* harmony export */   LiteralArray: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.LiteralArray; },
/* harmony export */   LiteralObject: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.LiteralObject; },
/* harmony export */   LiteralPrimitive: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.LiteralPrimitive; },
/* harmony export */   LiteralString: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.LiteralString; },
/* harmony export */   LiteralTemplate: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.LiteralTemplate; },
/* harmony export */   Loader: function() { return /* reexport safe */ aurelia_loader__WEBPACK_IMPORTED_MODULE_4__.Loader; },
/* harmony export */   LogManager: function() { return /* reexport module object */ aurelia_logging__WEBPACK_IMPORTED_MODULE_8__; },
/* harmony export */   ModifyCollectionObserver: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.ModifyCollectionObserver; },
/* harmony export */   ModuleAnalyzer: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.ModuleAnalyzer; },
/* harmony export */   NameExpression: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.NameExpression; },
/* harmony export */   NewInstance: function() { return /* reexport safe */ aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_0__.NewInstance; },
/* harmony export */   NoViewStrategy: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.NoViewStrategy; },
/* harmony export */   ObjectObservationAdapter: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.ObjectObservationAdapter; },
/* harmony export */   ObserverLocator: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.ObserverLocator; },
/* harmony export */   Optional: function() { return /* reexport safe */ aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_0__.Optional; },
/* harmony export */   Origin: function() { return /* reexport safe */ aurelia_metadata__WEBPACK_IMPORTED_MODULE_2__.Origin; },
/* harmony export */   PLATFORM: function() { return /* reexport safe */ aurelia_pal__WEBPACK_IMPORTED_MODULE_7__.PLATFORM; },
/* harmony export */   Parent: function() { return /* reexport safe */ aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_0__.Parent; },
/* harmony export */   Parser: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.Parser; },
/* harmony export */   ParserImplementation: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.ParserImplementation; },
/* harmony export */   PassThroughSlot: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.PassThroughSlot; },
/* harmony export */   PrimitiveObserver: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.PrimitiveObserver; },
/* harmony export */   RelativeViewStrategy: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.RelativeViewStrategy; },
/* harmony export */   ResourceDescription: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.ResourceDescription; },
/* harmony export */   ResourceLoadContext: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.ResourceLoadContext; },
/* harmony export */   ResourceModule: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.ResourceModule; },
/* harmony export */   SVGAnalyzer: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.SVGAnalyzer; },
/* harmony export */   SelectValueObserver: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.SelectValueObserver; },
/* harmony export */   SetterObserver: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.SetterObserver; },
/* harmony export */   ShadowDOM: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.ShadowDOM; },
/* harmony export */   ShadowSlot: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.ShadowSlot; },
/* harmony export */   SingletonRegistration: function() { return /* reexport safe */ aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_0__.SingletonRegistration; },
/* harmony export */   SlotCustomAttribute: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.SlotCustomAttribute; },
/* harmony export */   StaticViewStrategy: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.StaticViewStrategy; },
/* harmony export */   Strategy: function() { return /* reexport safe */ aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_0__.Strategy; },
/* harmony export */   StrategyResolver: function() { return /* reexport safe */ aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_0__.StrategyResolver; },
/* harmony export */   StyleObserver: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.StyleObserver; },
/* harmony export */   SwapStrategies: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.SwapStrategies; },
/* harmony export */   TargetInstruction: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.TargetInstruction; },
/* harmony export */   TaskQueue: function() { return /* reexport safe */ aurelia_task_queue__WEBPACK_IMPORTED_MODULE_5__.TaskQueue; },
/* harmony export */   TemplateDependency: function() { return /* reexport safe */ aurelia_loader__WEBPACK_IMPORTED_MODULE_4__.TemplateDependency; },
/* harmony export */   TemplateRegistryEntry: function() { return /* reexport safe */ aurelia_loader__WEBPACK_IMPORTED_MODULE_4__.TemplateRegistryEntry; },
/* harmony export */   TemplateRegistryViewStrategy: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.TemplateRegistryViewStrategy; },
/* harmony export */   TemplatingEngine: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.TemplatingEngine; },
/* harmony export */   TransientRegistration: function() { return /* reexport safe */ aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_0__.TransientRegistration; },
/* harmony export */   Unary: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.Unary; },
/* harmony export */   Unparser: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.Unparser; },
/* harmony export */   ValueAttributeObserver: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.ValueAttributeObserver; },
/* harmony export */   ValueConverter: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.ValueConverter; },
/* harmony export */   ValueConverterResource: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.ValueConverterResource; },
/* harmony export */   View: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.View; },
/* harmony export */   ViewCompileInstruction: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.ViewCompileInstruction; },
/* harmony export */   ViewCompiler: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.ViewCompiler; },
/* harmony export */   ViewEngine: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.ViewEngine; },
/* harmony export */   ViewEngineHooksResource: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.ViewEngineHooksResource; },
/* harmony export */   ViewFactory: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.ViewFactory; },
/* harmony export */   ViewLocator: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.ViewLocator; },
/* harmony export */   ViewResources: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.ViewResources; },
/* harmony export */   ViewSlot: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.ViewSlot; },
/* harmony export */   XLinkAttributeObserver: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.XLinkAttributeObserver; },
/* harmony export */   _emptyParameters: function() { return /* reexport safe */ aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_0__._emptyParameters; },
/* harmony export */   _hyphenate: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__._hyphenate; },
/* harmony export */   _isAllWhitespace: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__._isAllWhitespace; },
/* harmony export */   all: function() { return /* reexport safe */ aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_0__.all; },
/* harmony export */   animationEvent: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.animationEvent; },
/* harmony export */   autoinject: function() { return /* reexport safe */ aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_0__.autoinject; },
/* harmony export */   behavior: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.behavior; },
/* harmony export */   bindable: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.bindable; },
/* harmony export */   bindingBehavior: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.bindingBehavior; },
/* harmony export */   bindingMode: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.bindingMode; },
/* harmony export */   buildQueryString: function() { return /* reexport safe */ aurelia_path__WEBPACK_IMPORTED_MODULE_6__.buildQueryString; },
/* harmony export */   calcSplices: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.calcSplices; },
/* harmony export */   camelCase: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.camelCase; },
/* harmony export */   child: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.child; },
/* harmony export */   children: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.children; },
/* harmony export */   cloneExpression: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.cloneExpression; },
/* harmony export */   computedFrom: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.computedFrom; },
/* harmony export */   connectBindingToSignal: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.connectBindingToSignal; },
/* harmony export */   connectable: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.connectable; },
/* harmony export */   containerless: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.containerless; },
/* harmony export */   createComputedObserver: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.createComputedObserver; },
/* harmony export */   createOverrideContext: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.createOverrideContext; },
/* harmony export */   createScopeForTest: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.createScopeForTest; },
/* harmony export */   customAttribute: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.customAttribute; },
/* harmony export */   customElement: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.customElement; },
/* harmony export */   dataAttributeAccessor: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.dataAttributeAccessor; },
/* harmony export */   declarePropertyDependencies: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.declarePropertyDependencies; },
/* harmony export */   decorators: function() { return /* reexport safe */ aurelia_metadata__WEBPACK_IMPORTED_MODULE_2__.decorators; },
/* harmony export */   delegationStrategy: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.delegationStrategy; },
/* harmony export */   deprecated: function() { return /* reexport safe */ aurelia_metadata__WEBPACK_IMPORTED_MODULE_2__.deprecated; },
/* harmony export */   disableConnectQueue: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.disableConnectQueue; },
/* harmony export */   dynamicOptions: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.dynamicOptions; },
/* harmony export */   elementConfig: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.elementConfig; },
/* harmony export */   elements: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.elements; },
/* harmony export */   enableConnectQueue: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.enableConnectQueue; },
/* harmony export */   enqueueBindingConnect: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.enqueueBindingConnect; },
/* harmony export */   factory: function() { return /* reexport safe */ aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_0__.factory; },
/* harmony export */   getArrayObserver: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.getArrayObserver; },
/* harmony export */   getChangeRecords: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.getChangeRecords; },
/* harmony export */   getConnectQueueSize: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.getConnectQueueSize; },
/* harmony export */   getContextFor: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.getContextFor; },
/* harmony export */   getDecoratorDependencies: function() { return /* reexport safe */ aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_0__.getDecoratorDependencies; },
/* harmony export */   getMapObserver: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.getMapObserver; },
/* harmony export */   getSetObserver: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.getSetObserver; },
/* harmony export */   hasDeclaredDependencies: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.hasDeclaredDependencies; },
/* harmony export */   initializePAL: function() { return /* reexport safe */ aurelia_pal__WEBPACK_IMPORTED_MODULE_7__.initializePAL; },
/* harmony export */   inject: function() { return /* reexport safe */ aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_0__.inject; },
/* harmony export */   inlineView: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.inlineView; },
/* harmony export */   invokeAsFactory: function() { return /* reexport safe */ aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_0__.invokeAsFactory; },
/* harmony export */   invoker: function() { return /* reexport safe */ aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_0__.invoker; },
/* harmony export */   isInitialized: function() { return /* reexport safe */ aurelia_pal__WEBPACK_IMPORTED_MODULE_7__.isInitialized; },
/* harmony export */   join: function() { return /* reexport safe */ aurelia_path__WEBPACK_IMPORTED_MODULE_6__.join; },
/* harmony export */   lazy: function() { return /* reexport safe */ aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_0__.lazy; },
/* harmony export */   mergeSplice: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.mergeSplice; },
/* harmony export */   metadata: function() { return /* reexport safe */ aurelia_metadata__WEBPACK_IMPORTED_MODULE_2__.metadata; },
/* harmony export */   mixin: function() { return /* reexport safe */ aurelia_metadata__WEBPACK_IMPORTED_MODULE_2__.mixin; },
/* harmony export */   newInstance: function() { return /* reexport safe */ aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_0__.newInstance; },
/* harmony export */   noView: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.noView; },
/* harmony export */   observable: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.observable; },
/* harmony export */   optional: function() { return /* reexport safe */ aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_0__.optional; },
/* harmony export */   parent: function() { return /* reexport safe */ aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_0__.parent; },
/* harmony export */   parseQueryString: function() { return /* reexport safe */ aurelia_path__WEBPACK_IMPORTED_MODULE_6__.parseQueryString; },
/* harmony export */   presentationAttributes: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.presentationAttributes; },
/* harmony export */   presentationElements: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.presentationElements; },
/* harmony export */   processAttributes: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.processAttributes; },
/* harmony export */   processContent: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.processContent; },
/* harmony export */   projectArraySplices: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.projectArraySplices; },
/* harmony export */   propertyAccessor: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.propertyAccessor; },
/* harmony export */   protocol: function() { return /* reexport safe */ aurelia_metadata__WEBPACK_IMPORTED_MODULE_2__.protocol; },
/* harmony export */   registration: function() { return /* reexport safe */ aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_0__.registration; },
/* harmony export */   relativeToFile: function() { return /* reexport safe */ aurelia_path__WEBPACK_IMPORTED_MODULE_6__.relativeToFile; },
/* harmony export */   reset: function() { return /* reexport safe */ aurelia_pal__WEBPACK_IMPORTED_MODULE_7__.reset; },
/* harmony export */   resolver: function() { return /* reexport safe */ aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_0__.resolver; },
/* harmony export */   resource: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.resource; },
/* harmony export */   setConnectQueueThreshold: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.setConnectQueueThreshold; },
/* harmony export */   signalBindings: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.signalBindings; },
/* harmony export */   singleton: function() { return /* reexport safe */ aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_0__.singleton; },
/* harmony export */   sourceContext: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.sourceContext; },
/* harmony export */   subscriberCollection: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.subscriberCollection; },
/* harmony export */   targetContext: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.targetContext; },
/* harmony export */   templateController: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.templateController; },
/* harmony export */   transient: function() { return /* reexport safe */ aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_0__.transient; },
/* harmony export */   useShadowDOM: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.useShadowDOM; },
/* harmony export */   useView: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.useView; },
/* harmony export */   useViewStrategy: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.useViewStrategy; },
/* harmony export */   validateBehaviorName: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.validateBehaviorName; },
/* harmony export */   valueConverter: function() { return /* reexport safe */ aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.valueConverter; },
/* harmony export */   view: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.view; },
/* harmony export */   viewEngineHooks: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.viewEngineHooks; },
/* harmony export */   viewResources: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.viewResources; },
/* harmony export */   viewStrategy: function() { return /* reexport safe */ aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.viewStrategy; }
/* harmony export */ });
/* harmony import */ var aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-dependency-injection */ 6158);
/* harmony import */ var aurelia_binding__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-binding */ 6778);
/* harmony import */ var aurelia_metadata__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! aurelia-metadata */ 1383);
/* harmony import */ var aurelia_templating__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! aurelia-templating */ 1781);
/* harmony import */ var aurelia_loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! aurelia-loader */ 209);
/* harmony import */ var aurelia_task_queue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! aurelia-task-queue */ 8318);
/* harmony import */ var aurelia_path__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! aurelia-path */ 8627);
/* harmony import */ var aurelia_pal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! aurelia-pal */ 1015);
/* harmony import */ var aurelia_logging__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! aurelia-logging */ 8099);
















var logger = aurelia_logging__WEBPACK_IMPORTED_MODULE_8__.getLogger('aurelia');
var extPattern = /\.[^/.]+$/;
function runTasks(config, tasks) {
    var current;
    var next = function () {
        current = tasks.shift();
        if (current) {
            return Promise.resolve(current(config)).then(next);
        }
        return Promise.resolve();
    };
    return next();
}
function loadPlugin(fwConfig, loader, info) {
    logger.debug("Loading plugin ".concat(info.moduleId, "."));
    if (typeof info.moduleId === 'string') {
        fwConfig.resourcesRelativeTo = info.resourcesRelativeTo;
        var id = info.moduleId;
        if (info.resourcesRelativeTo.length > 1) {
            return loader.normalize(info.moduleId, info.resourcesRelativeTo[1])
                .then(function (normalizedId) { return _loadPlugin(normalizedId); });
        }
        return _loadPlugin(id);
    }
    else if (typeof info.configure === 'function') {
        if (fwConfig.configuredPlugins.indexOf(info.configure) !== -1) {
            return Promise.resolve();
        }
        fwConfig.configuredPlugins.push(info.configure);
        return Promise.resolve(info.configure.call(null, fwConfig, info.config || {}));
    }
    throw new Error(invalidConfigMsg(info.moduleId || info.configure, 'plugin'));
    function _loadPlugin(moduleId) {
        return loader.loadModule(moduleId).then(function (m) {
            if ('configure' in m) {
                if (fwConfig.configuredPlugins.indexOf(m.configure) !== -1) {
                    return Promise.resolve();
                }
                return Promise.resolve(m.configure(fwConfig, info.config || {})).then(function () {
                    fwConfig.configuredPlugins.push(m.configure);
                    fwConfig.resourcesRelativeTo = null;
                    logger.debug("Configured plugin ".concat(info.moduleId, "."));
                });
            }
            fwConfig.resourcesRelativeTo = null;
            logger.debug("Loaded plugin ".concat(info.moduleId, "."));
        });
    }
}
function loadResources(aurelia, resourcesToLoad, appResources) {
    if (Object.keys(resourcesToLoad).length === 0) {
        return Promise.resolve();
    }
    var viewEngine = aurelia.container.get(aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.ViewEngine);
    return Promise.all(Object.keys(resourcesToLoad).map(function (n) { return _normalize(resourcesToLoad[n]); }))
        .then(function (loads) {
        var names = [];
        var importIds = [];
        loads.forEach(function (l) {
            names.push(undefined);
            importIds.push(l.importId);
        });
        return viewEngine.importViewResources(importIds, names, appResources);
    });
    function _normalize(load) {
        var moduleId = load.moduleId;
        var ext = getExt(moduleId);
        if (isOtherResource(moduleId)) {
            moduleId = removeExt(moduleId);
        }
        return aurelia.loader.normalize(moduleId, load.relativeTo)
            .then(function (normalized) {
            return {
                name: load.moduleId,
                importId: isOtherResource(load.moduleId) ? addOriginalExt(normalized, ext) : normalized
            };
        });
    }
    function isOtherResource(name) {
        var ext = getExt(name);
        if (!ext)
            return false;
        if (ext === '')
            return false;
        if (ext === '.js' || ext === '.ts')
            return false;
        return true;
    }
    function removeExt(name) {
        return name.replace(extPattern, '');
    }
    function addOriginalExt(normalized, ext) {
        return removeExt(normalized) + '.' + ext;
    }
}
function getExt(name) {
    var match = name.match(extPattern);
    if (match && match.length > 0) {
        return (match[0].split('.'))[1];
    }
}
function loadBehaviors(config) {
    return Promise.all(config.behaviorsToLoad.map(function (m) { return m.load(config.container, m.target); })).then(function () {
        config.behaviorsToLoad = null;
    });
}
function assertProcessed(plugins) {
    if (plugins.processed) {
        throw new Error('This config instance has already been applied. To load more plugins or global resources, create a new FrameworkConfiguration instance.');
    }
}
function invalidConfigMsg(cfg, type) {
    return "Invalid ".concat(type, " [").concat(cfg, "], ").concat(type, " must be specified as functions or relative module IDs.");
}
var FrameworkConfiguration = (function () {
    function FrameworkConfiguration(aurelia) {
        var _this = this;
        this.aurelia = aurelia;
        this.container = aurelia.container;
        this.info = [];
        this.processed = false;
        this.preTasks = [];
        this.postTasks = [];
        this.behaviorsToLoad = [];
        this.configuredPlugins = [];
        this.resourcesToLoad = {};
        this.preTask(function () { return aurelia.loader.normalize('aurelia-bootstrapper', undefined)
            .then(function (name) { return _this.bootstrapperName = name; }); });
        this.postTask(function () { return loadResources(aurelia, _this.resourcesToLoad, aurelia.resources); });
    }
    FrameworkConfiguration.prototype.instance = function (type, instance) {
        this.container.registerInstance(type, instance);
        return this;
    };
    FrameworkConfiguration.prototype.singleton = function (type, implementation) {
        this.container.registerSingleton(type, implementation);
        return this;
    };
    FrameworkConfiguration.prototype.transient = function (type, implementation) {
        this.container.registerTransient(type, implementation);
        return this;
    };
    FrameworkConfiguration.prototype.preTask = function (task) {
        assertProcessed(this);
        this.preTasks.push(task);
        return this;
    };
    FrameworkConfiguration.prototype.postTask = function (task) {
        assertProcessed(this);
        this.postTasks.push(task);
        return this;
    };
    FrameworkConfiguration.prototype.feature = function (plugin, config) {
        if (config === void 0) { config = {}; }
        switch (typeof plugin) {
            case 'string':
                var hasIndex = /\/index$/i.test(plugin);
                var moduleId = hasIndex || getExt(plugin) ? plugin : plugin + '/index';
                var root = hasIndex ? plugin.slice(0, -6) : plugin;
                this.info.push({ moduleId: moduleId, resourcesRelativeTo: [root, ''], config: config });
                break;
            case 'function':
                this.info.push({ configure: plugin, config: config || {} });
                break;
            default:
                throw new Error(invalidConfigMsg(plugin, 'feature'));
        }
        return this;
    };
    FrameworkConfiguration.prototype.globalResources = function (resources) {
        var _this = this;
        assertProcessed(this);
        var toAdd = Array.isArray(resources) ? resources : arguments;
        var resource;
        var resourcesRelativeTo = this.resourcesRelativeTo || ['', ''];
        for (var i = 0, ii = toAdd.length; i < ii; ++i) {
            resource = toAdd[i];
            switch (typeof resource) {
                case 'string':
                    var parent_1 = resourcesRelativeTo[0];
                    var grandParent = resourcesRelativeTo[1];
                    var name_1 = resource;
                    if ((resource.startsWith('./') || resource.startsWith('../')) && parent_1 !== '') {
                        name_1 = (0,aurelia_path__WEBPACK_IMPORTED_MODULE_6__.join)(parent_1, resource);
                    }
                    this.resourcesToLoad[name_1] = { moduleId: name_1, relativeTo: grandParent };
                    break;
                case 'function':
                    var meta = this.aurelia.resources.autoRegister(this.container, resource);
                    if (meta instanceof aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.HtmlBehaviorResource && meta.elementName !== null) {
                        if (this.behaviorsToLoad.push(meta) === 1) {
                            this.postTask(function () { return loadBehaviors(_this); });
                        }
                    }
                    break;
                default:
                    throw new Error(invalidConfigMsg(resource, 'resource'));
            }
        }
        return this;
    };
    FrameworkConfiguration.prototype.globalName = function (resourcePath, newName) {
        assertProcessed(this);
        this.resourcesToLoad[resourcePath] = { moduleId: newName, relativeTo: '' };
        return this;
    };
    FrameworkConfiguration.prototype.plugin = function (plugin, pluginConfig) {
        assertProcessed(this);
        var info;
        switch (typeof plugin) {
            case 'string':
                info = { moduleId: plugin, resourcesRelativeTo: [plugin, ''], config: pluginConfig || {} };
                break;
            case 'function':
                info = { configure: plugin, config: pluginConfig || {} };
                break;
            default:
                throw new Error(invalidConfigMsg(plugin, 'plugin'));
        }
        this.info.push(info);
        return this;
    };
    FrameworkConfiguration.prototype._addNormalizedPlugin = function (name, config) {
        var _this = this;
        var plugin = { moduleId: name, resourcesRelativeTo: [name, ''], config: config || {} };
        this.info.push(plugin);
        this.preTask(function () {
            var relativeTo = [name, _this.bootstrapperName];
            plugin.moduleId = name;
            plugin.resourcesRelativeTo = relativeTo;
            return Promise.resolve();
        });
        return this;
    };
    FrameworkConfiguration.prototype.defaultBindingLanguage = function () {
        return this._addNormalizedPlugin('aurelia-templating-binding');
    };
    FrameworkConfiguration.prototype.router = function () {
        return this._addNormalizedPlugin('aurelia-templating-router');
    };
    FrameworkConfiguration.prototype.history = function () {
        return this._addNormalizedPlugin('aurelia-history-browser');
    };
    FrameworkConfiguration.prototype.defaultResources = function () {
        return this._addNormalizedPlugin('aurelia-templating-resources');
    };
    FrameworkConfiguration.prototype.eventAggregator = function () {
        return this._addNormalizedPlugin('aurelia-event-aggregator');
    };
    FrameworkConfiguration.prototype.basicConfiguration = function () {
        return this.defaultBindingLanguage().defaultResources().eventAggregator();
    };
    FrameworkConfiguration.prototype.standardConfiguration = function () {
        return this.basicConfiguration().history().router();
    };
    FrameworkConfiguration.prototype.developmentLogging = function (level) {
        var _this = this;
        var logLevel = level ? aurelia_logging__WEBPACK_IMPORTED_MODULE_8__.logLevel[level] : undefined;
        if (logLevel === undefined) {
            logLevel = aurelia_logging__WEBPACK_IMPORTED_MODULE_8__.logLevel.debug;
        }
        this.preTask(function () {
            return _this.aurelia.loader.normalize('aurelia-logging-console', _this.bootstrapperName).then(function (name) {
                return _this.aurelia.loader.loadModule(name).then(function (m) {
                    aurelia_logging__WEBPACK_IMPORTED_MODULE_8__.addAppender(new m.ConsoleAppender());
                    aurelia_logging__WEBPACK_IMPORTED_MODULE_8__.setLevel(logLevel);
                });
            });
        });
        return this;
    };
    FrameworkConfiguration.prototype.apply = function () {
        var _this = this;
        if (this.processed) {
            return Promise.resolve();
        }
        return runTasks(this, this.preTasks).then(function () {
            var loader = _this.aurelia.loader;
            var info = _this.info;
            var current;
            var next = function () {
                current = info.shift();
                if (current) {
                    return loadPlugin(_this, loader, current).then(next);
                }
                _this.processed = true;
                _this.configuredPlugins = null;
                return Promise.resolve();
            };
            return next().then(function () { return runTasks(_this, _this.postTasks); });
        });
    };
    return FrameworkConfiguration;
}());

function preventActionlessFormSubmit() {
    aurelia_pal__WEBPACK_IMPORTED_MODULE_7__.DOM.addEventListener('submit', function (evt) {
        var target = evt.target;
        var action = target.action;
        if (target.tagName.toLowerCase() === 'form' && !action) {
            evt.preventDefault();
        }
    }, false);
}
var Aurelia = (function () {
    function Aurelia(loader, container, resources) {
        this.loader = loader || new aurelia_pal__WEBPACK_IMPORTED_MODULE_7__.PLATFORM.Loader();
        this.container = container || (new aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_0__.Container()).makeGlobal();
        this.resources = resources || new aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.ViewResources();
        this.use = new FrameworkConfiguration(this);
        this.logger = aurelia_logging__WEBPACK_IMPORTED_MODULE_8__.getLogger('aurelia');
        this.hostConfigured = false;
        this.host = null;
        this.use.instance(Aurelia, this);
        this.use.instance(aurelia_loader__WEBPACK_IMPORTED_MODULE_4__.Loader, this.loader);
        this.use.instance(aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.ViewResources, this.resources);
    }
    Aurelia.prototype.start = function () {
        var _this = this;
        if (this._started) {
            return this._started;
        }
        this.logger.info('Aurelia Starting');
        return this._started = this.use.apply().then(function () {
            preventActionlessFormSubmit();
            if (!_this.container.hasResolver(aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.BindingLanguage)) {
                var message = 'You must configure Aurelia with a BindingLanguage implementation.';
                _this.logger.error(message);
                throw new Error(message);
            }
            _this.logger.info('Aurelia Started');
            var evt = aurelia_pal__WEBPACK_IMPORTED_MODULE_7__.DOM.createCustomEvent('aurelia-started', { bubbles: true, cancelable: true });
            aurelia_pal__WEBPACK_IMPORTED_MODULE_7__.DOM.dispatchEvent(evt);
            return _this;
        });
    };
    Aurelia.prototype.enhance = function (bindingContext, applicationHost) {
        var _this = this;
        if (bindingContext === void 0) { bindingContext = {}; }
        if (applicationHost === void 0) { applicationHost = null; }
        this._configureHost(applicationHost || aurelia_pal__WEBPACK_IMPORTED_MODULE_7__.DOM.querySelectorAll('body')[0]);
        return new Promise(function (resolve) {
            var engine = _this.container.get(aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.TemplatingEngine);
            _this.root = engine.enhance({ container: _this.container, element: _this.host, resources: _this.resources, bindingContext: bindingContext });
            _this.root.attached();
            _this._onAureliaComposed();
            resolve(_this);
        });
    };
    Aurelia.prototype.setRoot = function (root, applicationHost) {
        var _this = this;
        if (root === void 0) { root = null; }
        if (applicationHost === void 0) { applicationHost = null; }
        var instruction = {};
        if (this.root && this.root.viewModel && this.root.viewModel.router) {
            this.root.viewModel.router.deactivate();
            this.root.viewModel.router.reset();
        }
        this._configureHost(applicationHost);
        var engine = this.container.get(aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.TemplatingEngine);
        var transaction = this.container.get(aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.CompositionTransaction);
        delete transaction.initialComposition;
        if (!root) {
            if (this.configModuleId) {
                root = (0,aurelia_path__WEBPACK_IMPORTED_MODULE_6__.relativeToFile)('./app', this.configModuleId);
            }
            else {
                root = 'app';
            }
        }
        instruction.viewModel = root;
        instruction.container = instruction.childContainer = this.container;
        instruction.viewSlot = this.hostSlot;
        instruction.host = this.host;
        return engine.compose(instruction).then(function (r) {
            _this.root = r;
            instruction.viewSlot.attached();
            _this._onAureliaComposed();
            return _this;
        });
    };
    Aurelia.prototype._configureHost = function (applicationHost) {
        if (this.hostConfigured) {
            return;
        }
        applicationHost = applicationHost || this.host;
        if (!applicationHost || typeof applicationHost === 'string') {
            this.host = aurelia_pal__WEBPACK_IMPORTED_MODULE_7__.DOM.getElementById(applicationHost || 'applicationHost');
        }
        else {
            this.host = applicationHost;
        }
        if (!this.host) {
            throw new Error('No applicationHost was specified.');
        }
        this.hostConfigured = true;
        this.host.aurelia = this;
        this.hostSlot = new aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.ViewSlot(this.host, true);
        this.hostSlot.transformChildNodesIntoView();
        this.container.registerInstance(aurelia_pal__WEBPACK_IMPORTED_MODULE_7__.DOM.boundary, this.host);
    };
    Aurelia.prototype._onAureliaComposed = function () {
        var evt = aurelia_pal__WEBPACK_IMPORTED_MODULE_7__.DOM.createCustomEvent('aurelia-composed', { bubbles: true, cancelable: true });
        setTimeout(function () { return aurelia_pal__WEBPACK_IMPORTED_MODULE_7__.DOM.dispatchEvent(evt); }, 1);
    };
    return Aurelia;
}());


//# sourceMappingURL=aurelia-framework.js.map


/***/ }),

/***/ "aurelia-history-browser":
/*!*********************************************************************************************!*\
  !*** ./node_modules/aurelia-history-browser/dist/native-modules/aurelia-history-browser.js ***!
  \*********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BrowserHistory: function() { return /* binding */ BrowserHistory; },
/* harmony export */   DefaultLinkHandler: function() { return /* binding */ DefaultLinkHandler; },
/* harmony export */   LinkHandler: function() { return /* binding */ LinkHandler; },
/* harmony export */   configure: function() { return /* binding */ configure; }
/* harmony export */ });
/* harmony import */ var aurelia_history__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-history */ 1149);
/* harmony import */ var aurelia_pal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-pal */ 1015);



/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var LinkHandler = (function () {
    function LinkHandler() {
    }
    LinkHandler.prototype.activate = function (history) { };
    LinkHandler.prototype.deactivate = function () { };
    return LinkHandler;
}());
var DefaultLinkHandler = (function (_super) {
    __extends(DefaultLinkHandler, _super);
    function DefaultLinkHandler() {
        var _this = _super.call(this) || this;
        _this.handler = function (e) {
            var _a = DefaultLinkHandler.getEventInfo(e), shouldHandleEvent = _a.shouldHandleEvent, href = _a.href;
            if (shouldHandleEvent) {
                e.preventDefault();
                _this.history.navigate(href);
            }
        };
        return _this;
    }
    DefaultLinkHandler.prototype.activate = function (history) {
        if (history._hasPushState) {
            this.history = history;
            aurelia_pal__WEBPACK_IMPORTED_MODULE_1__.DOM.addEventListener('click', this.handler, true);
        }
    };
    DefaultLinkHandler.prototype.deactivate = function () {
        aurelia_pal__WEBPACK_IMPORTED_MODULE_1__.DOM.removeEventListener('click', this.handler, true);
    };
    DefaultLinkHandler.getEventInfo = function (event) {
        var $event = event;
        var info = {
            shouldHandleEvent: false,
            href: null,
            anchor: null
        };
        var target = DefaultLinkHandler.findClosestAnchor($event.target);
        if (!target || !DefaultLinkHandler.targetIsThisWindow(target)) {
            return info;
        }
        if (hasAttribute(target, 'download')
            || hasAttribute(target, 'router-ignore')
            || hasAttribute(target, 'data-router-ignore')) {
            return info;
        }
        if ($event.altKey || $event.ctrlKey || $event.metaKey || $event.shiftKey) {
            return info;
        }
        var href = target.getAttribute('href');
        info.anchor = target;
        info.href = href;
        var leftButtonClicked = $event.which === 1;
        var isRelative = href && !(href.charAt(0) === '#' || (/^[a-z]+:/i).test(href));
        info.shouldHandleEvent = leftButtonClicked && isRelative;
        return info;
    };
    DefaultLinkHandler.findClosestAnchor = function (el) {
        while (el) {
            if (el.tagName === 'A') {
                return el;
            }
            el = el.parentNode;
        }
    };
    DefaultLinkHandler.targetIsThisWindow = function (target) {
        var targetWindow = target.getAttribute('target');
        var win = aurelia_pal__WEBPACK_IMPORTED_MODULE_1__.PLATFORM.global;
        return !targetWindow ||
            targetWindow === win.name ||
            targetWindow === '_self';
    };
    return DefaultLinkHandler;
}(LinkHandler));
var hasAttribute = function (el, attr) { return el.hasAttribute(attr); };

var BrowserHistory = (function (_super) {
    __extends(BrowserHistory, _super);
    function BrowserHistory(linkHandler) {
        var _this = _super.call(this) || this;
        _this._isActive = false;
        _this._checkUrlCallback = _this._checkUrl.bind(_this);
        _this.location = aurelia_pal__WEBPACK_IMPORTED_MODULE_1__.PLATFORM.location;
        _this.history = aurelia_pal__WEBPACK_IMPORTED_MODULE_1__.PLATFORM.history;
        _this.linkHandler = linkHandler;
        return _this;
    }
    BrowserHistory.prototype.activate = function (options) {
        if (this._isActive) {
            throw new Error('History has already been activated.');
        }
        var $history = this.history;
        var wantsPushState = !!options.pushState;
        this._isActive = true;
        var normalizedOptions = this.options = Object.assign({}, { root: '/' }, this.options, options);
        var rootUrl = this.root = ('/' + normalizedOptions.root + '/').replace(rootStripper, '/');
        var wantsHashChange = this._wantsHashChange = normalizedOptions.hashChange !== false;
        var hasPushState = this._hasPushState = !!(normalizedOptions.pushState && $history && $history.pushState);
        var eventName;
        if (hasPushState) {
            eventName = 'popstate';
        }
        else if (wantsHashChange) {
            eventName = 'hashchange';
        }
        aurelia_pal__WEBPACK_IMPORTED_MODULE_1__.PLATFORM.addEventListener(eventName, this._checkUrlCallback);
        if (wantsHashChange && wantsPushState) {
            var $location = this.location;
            var atRoot = $location.pathname.replace(/[^\/]$/, '$&/') === rootUrl;
            if (!hasPushState && !atRoot) {
                var fragment = this.fragment = this._getFragment(null, true);
                $location.replace(rootUrl + $location.search + '#' + fragment);
                return true;
            }
            else if (hasPushState && atRoot && $location.hash) {
                var fragment = this.fragment = this._getHash().replace(routeStripper, '');
                $history.replaceState({}, aurelia_pal__WEBPACK_IMPORTED_MODULE_1__.DOM.title, rootUrl + fragment + $location.search);
            }
        }
        if (!this.fragment) {
            this.fragment = this._getFragment('');
        }
        this.linkHandler.activate(this);
        if (!normalizedOptions.silent) {
            return this._loadUrl('');
        }
    };
    BrowserHistory.prototype.deactivate = function () {
        var handler = this._checkUrlCallback;
        aurelia_pal__WEBPACK_IMPORTED_MODULE_1__.PLATFORM.removeEventListener('popstate', handler);
        aurelia_pal__WEBPACK_IMPORTED_MODULE_1__.PLATFORM.removeEventListener('hashchange', handler);
        this._isActive = false;
        this.linkHandler.deactivate();
    };
    BrowserHistory.prototype.getAbsoluteRoot = function () {
        var $location = this.location;
        var origin = createOrigin($location.protocol, $location.hostname, $location.port);
        return "" + origin + this.root;
    };
    BrowserHistory.prototype.navigate = function (fragment, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.trigger, trigger = _c === void 0 ? true : _c, _d = _b.replace, replace = _d === void 0 ? false : _d;
        var location = this.location;
        if (fragment && absoluteUrl.test(fragment)) {
            location.href = fragment;
            return true;
        }
        if (!this._isActive) {
            return false;
        }
        fragment = this._getFragment(fragment || '');
        if (this.fragment === fragment && !replace) {
            return false;
        }
        this.fragment = fragment;
        var url = this.root + fragment;
        if (fragment === '' && url !== '/') {
            url = url.slice(0, -1);
        }
        if (this._hasPushState) {
            url = url.replace('//', '/');
            this.history[replace ? 'replaceState' : 'pushState']({}, aurelia_pal__WEBPACK_IMPORTED_MODULE_1__.DOM.title, url);
        }
        else if (this._wantsHashChange) {
            updateHash(location, fragment, replace);
        }
        else {
            location.assign(url);
        }
        if (trigger) {
            return this._loadUrl(fragment);
        }
        return true;
    };
    BrowserHistory.prototype.navigateBack = function () {
        this.history.back();
    };
    BrowserHistory.prototype.setTitle = function (title) {
        aurelia_pal__WEBPACK_IMPORTED_MODULE_1__.DOM.title = title;
    };
    BrowserHistory.prototype.setState = function (key, value) {
        var $history = this.history;
        var state = Object.assign({}, $history.state);
        var _a = this.location, pathname = _a.pathname, search = _a.search, hash = _a.hash;
        state[key] = value;
        $history.replaceState(state, null, "" + pathname + search + hash);
    };
    BrowserHistory.prototype.getState = function (key) {
        var state = Object.assign({}, this.history.state);
        return state[key];
    };
    BrowserHistory.prototype.getHistoryIndex = function () {
        var historyIndex = this.getState('HistoryIndex');
        if (historyIndex === undefined) {
            historyIndex = this.history.length - 1;
            this.setState('HistoryIndex', historyIndex);
        }
        return historyIndex;
    };
    BrowserHistory.prototype.go = function (movement) {
        this.history.go(movement);
    };
    BrowserHistory.prototype._getHash = function () {
        return this.location.hash.substr(1);
    };
    BrowserHistory.prototype._getFragment = function (fragment, forcePushState) {
        var rootUrl;
        if (!fragment) {
            if (this._hasPushState || !this._wantsHashChange || forcePushState) {
                var location_1 = this.location;
                fragment = location_1.pathname + location_1.search;
                rootUrl = this.root.replace(trailingSlash, '');
                if (!fragment.indexOf(rootUrl)) {
                    fragment = fragment.substr(rootUrl.length);
                }
            }
            else {
                fragment = this._getHash();
            }
        }
        return '/' + fragment.replace(routeStripper, '');
    };
    BrowserHistory.prototype._checkUrl = function () {
        var current = this._getFragment('');
        if (current !== this.fragment) {
            this._loadUrl('');
        }
    };
    BrowserHistory.prototype._loadUrl = function (fragmentOverride) {
        var fragment = this.fragment = this._getFragment(fragmentOverride);
        return this.options.routeHandler ?
            this.options.routeHandler(fragment) :
            false;
    };
    BrowserHistory.inject = [LinkHandler];
    return BrowserHistory;
}(aurelia_history__WEBPACK_IMPORTED_MODULE_0__.History));
var routeStripper = /^#?\/*|\s+$/g;
var rootStripper = /^\/+|\/+$/g;
var trailingSlash = /\/$/;
var absoluteUrl = /^([a-z][a-z0-9+\-.]*:)?\/\//i;
function updateHash($location, fragment, replace) {
    if (replace) {
        var href = $location.href.replace(/(javascript:|#).*$/, '');
        $location.replace(href + '#' + fragment);
    }
    else {
        $location.hash = '#' + fragment;
    }
}
function createOrigin(protocol, hostname, port) {
    return protocol + "//" + hostname + (port ? ':' + port : '');
}

function configure(config) {
    var $config = config;
    $config.singleton(aurelia_history__WEBPACK_IMPORTED_MODULE_0__.History, BrowserHistory);
    $config.transient(LinkHandler, DefaultLinkHandler);
}


//# sourceMappingURL=aurelia-history-browser.js.map


/***/ }),

/***/ 1149:
/*!*****************************************************************************!*\
  !*** ./node_modules/aurelia-history/dist/native-modules/aurelia-history.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   History: function() { return /* binding */ History; }
/* harmony export */ });


function mi(name) {
  throw new Error('History must implement ' + name + '().');
}

var History = function () {
  function History() {
    
  }

  History.prototype.activate = function activate(options) {
    mi('activate');
  };

  History.prototype.deactivate = function deactivate() {
    mi('deactivate');
  };

  History.prototype.getAbsoluteRoot = function getAbsoluteRoot() {
    mi('getAbsoluteRoot');
  };

  History.prototype.navigate = function navigate(fragment, options) {
    mi('navigate');
  };

  History.prototype.navigateBack = function navigateBack() {
    mi('navigateBack');
  };

  History.prototype.setTitle = function setTitle(title) {
    mi('setTitle');
  };

  History.prototype.setState = function setState(key, value) {
    mi('setState');
  };

  History.prototype.getState = function getState(key) {
    mi('getState');
  };

  History.prototype.getHistoryIndex = function getHistoryIndex() {
    mi('getHistoryIndex');
  };

  History.prototype.go = function go(movement) {
    mi('go');
  };

  return History;
}();

/***/ }),

/***/ 3139:
/*!*************************************************************************************!*\
  !*** ./node_modules/aurelia-http-client/dist/native-modules/aurelia-http-client.js ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ErrorHttpResponseMessage: function() { return /* binding */ ErrorHttpResponseMessage; },
/* harmony export */   Headers: function() { return /* binding */ Headers; },
/* harmony export */   HttpClient: function() { return /* binding */ HttpClient; },
/* harmony export */   HttpRequestMessage: function() { return /* binding */ HttpRequestMessage; },
/* harmony export */   HttpResponseMessage: function() { return /* binding */ HttpResponseMessage; },
/* harmony export */   JSONPRequestMessage: function() { return /* binding */ JSONPRequestMessage; },
/* harmony export */   RequestBuilder: function() { return /* binding */ RequestBuilder; },
/* harmony export */   RequestMessage: function() { return /* binding */ RequestMessage; },
/* harmony export */   RequestMessageProcessor: function() { return /* binding */ RequestMessageProcessor; },
/* harmony export */   callbackParameterNameTransformer: function() { return /* binding */ callbackParameterNameTransformer; },
/* harmony export */   contentTransformer: function() { return /* binding */ contentTransformer; },
/* harmony export */   createHttpRequestMessageProcessor: function() { return /* binding */ createHttpRequestMessageProcessor; },
/* harmony export */   createJSONPRequestMessageProcessor: function() { return /* binding */ createJSONPRequestMessageProcessor; },
/* harmony export */   credentialsTransformer: function() { return /* binding */ credentialsTransformer; },
/* harmony export */   downloadProgressTransformer: function() { return /* binding */ downloadProgressTransformer; },
/* harmony export */   headerTransformer: function() { return /* binding */ headerTransformer; },
/* harmony export */   mimeTypes: function() { return /* binding */ mimeTypes; },
/* harmony export */   progressTransformer: function() { return /* binding */ progressTransformer; },
/* harmony export */   responseTypeTransformer: function() { return /* binding */ responseTypeTransformer; },
/* harmony export */   timeoutTransformer: function() { return /* binding */ timeoutTransformer; }
/* harmony export */ });
/* harmony import */ var aurelia_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-path */ 8627);
/* harmony import */ var aurelia_pal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-pal */ 1015);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var Headers = function () {
  function Headers() {
    var headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    

    this.headers = {};

    for (var _key in headers) {
      this.headers[_key.toLowerCase()] = { key: _key, value: headers[_key] };
    }
  }

  Headers.prototype.add = function add(key, value) {
    this.headers[key.toLowerCase()] = { key: key, value: value };
  };

  Headers.prototype.get = function get(key) {
    var header = this.headers[key.toLowerCase()];
    return header ? header.value : undefined;
  };

  Headers.prototype.clear = function clear() {
    this.headers = {};
  };

  Headers.prototype.has = function has(header) {
    return this.headers.hasOwnProperty(header.toLowerCase());
  };

  Headers.prototype.configureXHR = function configureXHR(xhr) {
    for (var name in this.headers) {
      if (this.headers.hasOwnProperty(name)) {
        xhr.setRequestHeader(this.headers[name].key, this.headers[name].value);
      }
    }
  };

  Headers.parse = function parse(headerStr) {
    var headers = new Headers();
    if (!headerStr) {
      return headers;
    }

    var headerPairs = headerStr.split('\r\n');
    for (var i = 0; i < headerPairs.length; i++) {
      var headerPair = headerPairs[i];

      var index = headerPair.indexOf(': ');
      if (index > 0) {
        var _key2 = headerPair.substring(0, index);
        var val = headerPair.substring(index + 2);
        headers.add(_key2, val);
      }
    }

    return headers;
  };

  return Headers;
}();

var RequestMessage = function () {
  function RequestMessage(method, url, content, headers) {
    

    this.method = method;
    this.url = url;
    this.content = content;
    this.headers = headers || new Headers();
    this.baseUrl = '';
  }

  RequestMessage.prototype.buildFullUrl = function buildFullUrl() {
    var absoluteUrl = /^([a-z][a-z0-9+\-.]*:)?\/\//i;
    var url = absoluteUrl.test(this.url) ? this.url : (0,aurelia_path__WEBPACK_IMPORTED_MODULE_0__.join)(this.baseUrl, this.url);

    if (this.params) {
      var qs = (0,aurelia_path__WEBPACK_IMPORTED_MODULE_0__.buildQueryString)(this.params, this.traditional);
      url = qs ? url + (this.url.indexOf('?') < 0 ? '?' : '&') + qs : url;
    }

    return url;
  };

  return RequestMessage;
}();

var HttpResponseMessage = function () {
  function HttpResponseMessage(requestMessage, xhr, responseType, reviver) {
    

    this.requestMessage = requestMessage;
    this.statusCode = xhr.status;
    this.response = xhr.response || xhr.responseText;
    this.isSuccess = xhr.status >= 200 && xhr.status < 400;
    this.statusText = xhr.statusText;
    this.reviver = reviver;
    this.mimeType = null;

    if (xhr.getAllResponseHeaders) {
      this.headers = Headers.parse(xhr.getAllResponseHeaders());
    } else {
      this.headers = new Headers();
    }

    var contentType = void 0;

    if (this.headers && this.headers.headers) {
      contentType = this.headers.get('Content-Type');
    }

    if (contentType) {
      this.mimeType = responseType = contentType.split(';')[0].trim();
      if (mimeTypes.hasOwnProperty(this.mimeType)) responseType = mimeTypes[this.mimeType];
    }

    this.responseType = responseType;
  }

  _createClass(HttpResponseMessage, [{
    key: 'content',
    get: function get() {
      try {
        if (this._content !== undefined) {
          return this._content;
        }

        if (this.response === undefined || this.response === null || this.response === '') {
          this._content = this.response;
          return this._content;
        }

        if (this.responseType === 'json') {
          this._content = JSON.parse(this.response, this.reviver);
          return this._content;
        }

        if (this.reviver) {
          this._content = this.reviver(this.response);
          return this._content;
        }

        this._content = this.response;
        return this._content;
      } catch (e) {
        if (this.isSuccess) {
          throw e;
        }

        this._content = null;
        return this._content;
      }
    }
  }]);

  return HttpResponseMessage;
}();

var mimeTypes = {
  'text/html': 'html',
  'text/javascript': 'js',
  'application/javascript': 'js',
  'text/json': 'json',
  'application/json': 'json',
  'application/rss+xml': 'rss',
  'application/atom+xml': 'atom',
  'application/xhtml+xml': 'xhtml',
  'text/markdown': 'md',
  'text/xml': 'xml',
  'text/mathml': 'mml',
  'application/xml': 'xml',
  'text/yml': 'yml',
  'text/csv': 'csv',
  'text/css': 'css',
  'text/less': 'less',
  'text/stylus': 'styl',
  'text/scss': 'scss',
  'text/sass': 'sass',
  'text/plain': 'txt'
};

function applyXhrTransformers(xhrTransformers, client, processor, message, xhr) {
  var i = void 0;
  var ii = void 0;

  for (i = 0, ii = xhrTransformers.length; i < ii; ++i) {
    xhrTransformers[i](client, processor, message, xhr);
  }
}

var RequestMessageProcessor = function () {
  function RequestMessageProcessor(xhrType, xhrTransformers) {
    

    this.XHRType = xhrType;
    this.xhrTransformers = xhrTransformers;
    this.isAborted = false;
  }

  RequestMessageProcessor.prototype.abort = function abort() {
    if (this.xhr && this.xhr.readyState !== aurelia_pal__WEBPACK_IMPORTED_MODULE_1__.PLATFORM.XMLHttpRequest.UNSENT) {
      this.xhr.abort();
    }

    this.isAborted = true;
  };

  RequestMessageProcessor.prototype.process = function process(client, requestMessage) {
    var _this = this;

    var promise = new Promise(function (resolve, reject) {
      var rejectResponse = void 0;
      if (client.rejectPromiseWithErrorObject) {
        rejectResponse = function rejectResponse(resp) {
          var errorResp = new ErrorHttpResponseMessage(resp);
          reject(errorResp);
        };
      } else {
        rejectResponse = function rejectResponse(resp) {
          reject(resp);
        };
      }

      var xhr = _this.xhr = new _this.XHRType();
      xhr.onload = function (e) {
        var response = new HttpResponseMessage(requestMessage, xhr, requestMessage.responseType, requestMessage.reviver);
        if (response.isSuccess) {
          resolve(response);
        } else {
          rejectResponse(response);
        }
      };

      xhr.ontimeout = function (e) {
        rejectResponse(new HttpResponseMessage(requestMessage, {
          response: e,
          status: xhr.status,
          statusText: xhr.statusText
        }, 'timeout'));
      };

      xhr.onerror = function (e) {
        rejectResponse(new HttpResponseMessage(requestMessage, {
          response: e,
          status: xhr.status,
          statusText: xhr.statusText
        }, 'error'));
      };

      xhr.onabort = function (e) {
        rejectResponse(new HttpResponseMessage(requestMessage, {
          response: e,
          status: xhr.status,
          statusText: xhr.statusText
        }, 'abort'));
      };
    });

    return Promise.resolve(requestMessage).then(function (message) {
      var processRequest = function processRequest() {
        if (_this.isAborted) {
          _this.xhr.abort();
        } else {
          _this.xhr.open(message.method, message.buildFullUrl(), true, message.user, message.password);
          applyXhrTransformers(_this.xhrTransformers, client, _this, message, _this.xhr);
          if (typeof message.content === 'undefined') {
            _this.xhr.send();
          } else {
            _this.xhr.send(message.content);
          }
        }

        return promise;
      };

      var chain = [[processRequest, undefined]];

      var interceptors = message.interceptors || [];
      interceptors.forEach(function (interceptor) {
        if (interceptor.request || interceptor.requestError) {
          chain.unshift([interceptor.request ? interceptor.request.bind(interceptor) : undefined, interceptor.requestError ? interceptor.requestError.bind(interceptor) : undefined]);
        }

        if (interceptor.response || interceptor.responseError) {
          chain.push([interceptor.response ? interceptor.response.bind(interceptor) : undefined, interceptor.responseError ? interceptor.responseError.bind(interceptor) : undefined]);
        }
      });

      var interceptorsPromise = Promise.resolve(message);

      while (chain.length) {
        var _interceptorsPromise;

        interceptorsPromise = (_interceptorsPromise = interceptorsPromise).then.apply(_interceptorsPromise, chain.shift());
      }

      return interceptorsPromise;
    });
  };

  return RequestMessageProcessor;
}();

function timeoutTransformer(client, processor, message, xhr) {
  if (message.timeout !== undefined) {
    xhr.timeout = message.timeout;
  }
}

function callbackParameterNameTransformer(client, processor, message, xhr) {
  if (message.callbackParameterName !== undefined) {
    xhr.callbackParameterName = message.callbackParameterName;
  }
}

function credentialsTransformer(client, processor, message, xhr) {
  if (message.withCredentials !== undefined) {
    xhr.withCredentials = message.withCredentials;
  }
}

function progressTransformer(client, processor, message, xhr) {
  if (message.progressCallback) {
    xhr.upload.onprogress = message.progressCallback;
  }
}

function downloadProgressTransformer(client, processor, message, xhr) {
  if (message.downloadProgressCallback) {
    xhr.onprogress = message.downloadProgressCallback;
  }
}

function responseTypeTransformer(client, processor, message, xhr) {
  var responseType = message.responseType;

  if (responseType === 'json') {
    responseType = 'text';
  }

  xhr.responseType = responseType;
}

function headerTransformer(client, processor, message, xhr) {
  message.headers.configureXHR(xhr);
}

function contentTransformer(client, processor, message, xhr) {
  if (message.skipContentProcessing) {
    return;
  }

  if (aurelia_pal__WEBPACK_IMPORTED_MODULE_1__.PLATFORM.global.FormData && message.content instanceof FormData) {
    return;
  }

  if (aurelia_pal__WEBPACK_IMPORTED_MODULE_1__.PLATFORM.global.Blob && message.content instanceof Blob) {
    return;
  }

  if (aurelia_pal__WEBPACK_IMPORTED_MODULE_1__.PLATFORM.global.ArrayBuffer && message.content instanceof ArrayBuffer) {
    return;
  }

  if (message.content instanceof Document) {
    return;
  }

  if (typeof message.content === 'string') {
    return;
  }

  if (message.content === null || message.content === undefined) {
    return;
  }

  message.content = JSON.stringify(message.content, message.replacer);

  if (!message.headers.has('Content-Type')) {
    message.headers.add('Content-Type', 'application/json');
  }
}

var JSONPRequestMessage = function (_RequestMessage) {
  _inherits(JSONPRequestMessage, _RequestMessage);

  function JSONPRequestMessage(url, callbackParameterName) {
    

    var _this2 = _possibleConstructorReturn(this, _RequestMessage.call(this, 'JSONP', url));

    _this2.responseType = 'jsonp';
    _this2.callbackParameterName = callbackParameterName;
    return _this2;
  }

  return JSONPRequestMessage;
}(RequestMessage);

var JSONPXHR = function () {
  function JSONPXHR() {
    
  }

  JSONPXHR.prototype.open = function open(method, url) {
    this.method = method;
    this.url = url;
    this.callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
  };

  JSONPXHR.prototype.send = function send() {
    var _this3 = this;

    var url = this.url + (this.url.indexOf('?') >= 0 ? '&' : '?') + encodeURIComponent(this.callbackParameterName) + '=' + this.callbackName;
    var script = aurelia_pal__WEBPACK_IMPORTED_MODULE_1__.DOM.createElement('script');

    script.src = url;
    script.onerror = function (e) {
      cleanUp();

      _this3.status = 0;
      _this3.onerror(new Error('error'));
    };

    var cleanUp = function cleanUp() {
      delete aurelia_pal__WEBPACK_IMPORTED_MODULE_1__.PLATFORM.global[_this3.callbackName];
      aurelia_pal__WEBPACK_IMPORTED_MODULE_1__.DOM.removeNode(script);
    };

    aurelia_pal__WEBPACK_IMPORTED_MODULE_1__.PLATFORM.global[this.callbackName] = function (data) {
      cleanUp();

      if (_this3.status === undefined) {
        _this3.status = 200;
        _this3.statusText = 'OK';
        _this3.response = data;
        _this3.onload(_this3);
      }
    };

    aurelia_pal__WEBPACK_IMPORTED_MODULE_1__.DOM.appendNode(script);

    if (this.timeout !== undefined) {
      setTimeout(function () {
        if (_this3.status === undefined) {
          _this3.status = 0;
          _this3.ontimeout(new Error('timeout'));
        }
      }, this.timeout);
    }
  };

  JSONPXHR.prototype.abort = function abort() {
    if (this.status === undefined) {
      this.status = 0;
      this.onabort(new Error('abort'));
    }
  };

  JSONPXHR.prototype.setRequestHeader = function setRequestHeader() {};

  return JSONPXHR;
}();

function createJSONPRequestMessageProcessor() {
  return new RequestMessageProcessor(JSONPXHR, [timeoutTransformer, callbackParameterNameTransformer]);
}

var HttpRequestMessage = function (_RequestMessage2) {
  _inherits(HttpRequestMessage, _RequestMessage2);

  function HttpRequestMessage(method, url, content, headers) {
    

    var _this4 = _possibleConstructorReturn(this, _RequestMessage2.call(this, method, url, content, headers));

    _this4.responseType = 'json';return _this4;
  }

  return HttpRequestMessage;
}(RequestMessage);

function createHttpRequestMessageProcessor() {
  return new RequestMessageProcessor(aurelia_pal__WEBPACK_IMPORTED_MODULE_1__.PLATFORM.XMLHttpRequest, [timeoutTransformer, credentialsTransformer, progressTransformer, downloadProgressTransformer, responseTypeTransformer, contentTransformer, headerTransformer]);
}

var ErrorHttpResponseMessage = function (_HttpResponseMessage) {
  _inherits(ErrorHttpResponseMessage, _HttpResponseMessage);

  function ErrorHttpResponseMessage(responseMessage) {
    

    var _this5 = _possibleConstructorReturn(this, _HttpResponseMessage.call(this, responseMessage.requestMessage, {
      response: responseMessage.response,
      status: responseMessage.statusCode,
      statusText: responseMessage.statusText
    }, responseMessage.responseType));

    _this5.name = responseMessage.responseType;
    _this5.message = 'Error: ' + responseMessage.statusCode + ' Status: ' + responseMessage.statusText;
    return _this5;
  }

  return ErrorHttpResponseMessage;
}(HttpResponseMessage);

var RequestBuilder = function () {
  function RequestBuilder(client) {
    

    this.client = client;
    this.transformers = client.requestTransformers.slice(0);
    this.useJsonp = false;
  }

  RequestBuilder.prototype.asDelete = function asDelete() {
    return this._addTransformer(function (client, processor, message) {
      message.method = 'DELETE';
    });
  };

  RequestBuilder.prototype.asGet = function asGet() {
    return this._addTransformer(function (client, processor, message) {
      message.method = 'GET';
    });
  };

  RequestBuilder.prototype.asHead = function asHead() {
    return this._addTransformer(function (client, processor, message) {
      message.method = 'HEAD';
    });
  };

  RequestBuilder.prototype.asOptions = function asOptions() {
    return this._addTransformer(function (client, processor, message) {
      message.method = 'OPTIONS';
    });
  };

  RequestBuilder.prototype.asPatch = function asPatch() {
    return this._addTransformer(function (client, processor, message) {
      message.method = 'PATCH';
    });
  };

  RequestBuilder.prototype.asPost = function asPost() {
    return this._addTransformer(function (client, processor, message) {
      message.method = 'POST';
    });
  };

  RequestBuilder.prototype.asPut = function asPut() {
    return this._addTransformer(function (client, processor, message) {
      message.method = 'PUT';
    });
  };

  RequestBuilder.prototype.asJsonp = function asJsonp(callbackParameterName) {
    this.useJsonp = true;
    return this._addTransformer(function (client, processor, message) {
      message.callbackParameterName = callbackParameterName;
    });
  };

  RequestBuilder.prototype.withUrl = function withUrl(url) {
    return this._addTransformer(function (client, processor, message) {
      message.url = url;
    });
  };

  RequestBuilder.prototype.withContent = function withContent(content) {
    return this._addTransformer(function (client, processor, message) {
      message.content = content;
    });
  };

  RequestBuilder.prototype.withBaseUrl = function withBaseUrl(baseUrl) {
    return this._addTransformer(function (client, processor, message) {
      message.baseUrl = baseUrl;
    });
  };

  RequestBuilder.prototype.withParams = function withParams(params, traditional) {
    return this._addTransformer(function (client, processor, message) {
      message.traditional = traditional;
      message.params = params;
    });
  };

  RequestBuilder.prototype.withResponseType = function withResponseType(responseType) {
    return this._addTransformer(function (client, processor, message) {
      message.responseType = responseType;
    });
  };

  RequestBuilder.prototype.withTimeout = function withTimeout(timeout) {
    return this._addTransformer(function (client, processor, message) {
      message.timeout = timeout;
    });
  };

  RequestBuilder.prototype.withHeader = function withHeader(key, value) {
    return this._addTransformer(function (client, processor, message) {
      message.headers.add(key, value);
    });
  };

  RequestBuilder.prototype.withCredentials = function withCredentials(value) {
    return this._addTransformer(function (client, processor, message) {
      message.withCredentials = value;
    });
  };

  RequestBuilder.prototype.withLogin = function withLogin(user, password) {
    return this._addTransformer(function (client, processor, message) {
      message.user = user;message.password = password;
    });
  };

  RequestBuilder.prototype.withReviver = function withReviver(reviver) {
    return this._addTransformer(function (client, processor, message) {
      message.reviver = reviver;
    });
  };

  RequestBuilder.prototype.withReplacer = function withReplacer(replacer) {
    return this._addTransformer(function (client, processor, message) {
      message.replacer = replacer;
    });
  };

  RequestBuilder.prototype.withProgressCallback = function withProgressCallback(progressCallback) {
    return this._addTransformer(function (client, processor, message) {
      message.progressCallback = progressCallback;
    });
  };

  RequestBuilder.prototype.withDownloadProgressCallback = function withDownloadProgressCallback(downloadProgressCallback) {
    return this._addTransformer(function (client, processor, message) {
      message.downloadProgressCallback = downloadProgressCallback;
    });
  };

  RequestBuilder.prototype.withCallbackParameterName = function withCallbackParameterName(callbackParameterName) {
    return this._addTransformer(function (client, processor, message) {
      message.callbackParameterName = callbackParameterName;
    });
  };

  RequestBuilder.prototype.withInterceptor = function withInterceptor(interceptor) {
    return this._addTransformer(function (client, processor, message) {
      message.interceptors = message.interceptors || [];
      message.interceptors.unshift(interceptor);
    });
  };

  RequestBuilder.prototype.skipContentProcessing = function skipContentProcessing() {
    return this._addTransformer(function (client, processor, message) {
      message.skipContentProcessing = true;
    });
  };

  RequestBuilder.prototype._addTransformer = function _addTransformer(fn) {
    this.transformers.push(fn);
    return this;
  };

  RequestBuilder.addHelper = function addHelper(name, fn) {
    RequestBuilder.prototype[name] = function () {
      return this._addTransformer(fn.apply(this, arguments));
    };
  };

  RequestBuilder.prototype.send = function send() {
    var message = this.useJsonp ? new JSONPRequestMessage() : new HttpRequestMessage();
    return this.client.send(message, this.transformers);
  };

  return RequestBuilder;
}();

function trackRequestStart(client, processor) {
  client.pendingRequests.push(processor);
  client.isRequesting = true;
}

function trackRequestEnd(client, processor) {
  var index = client.pendingRequests.indexOf(processor);

  client.pendingRequests.splice(index, 1);
  client.isRequesting = client.pendingRequests.length > 0;

  if (!client.isRequesting) {
    var evt = aurelia_pal__WEBPACK_IMPORTED_MODULE_1__.DOM.createCustomEvent('aurelia-http-client-requests-drained', { bubbles: true, cancelable: true });
    setTimeout(function () {
      return aurelia_pal__WEBPACK_IMPORTED_MODULE_1__.DOM.dispatchEvent(evt);
    }, 1);
  }
}

var HttpClient = function () {
  function HttpClient() {
    

    this.isRequesting = false;

    this.rejectPromiseWithErrorObject = false;
    this.requestTransformers = [];
    this.requestProcessorFactories = new Map();
    this.requestProcessorFactories.set(HttpRequestMessage, createHttpRequestMessageProcessor);
    this.requestProcessorFactories.set(JSONPRequestMessage, createJSONPRequestMessageProcessor);
    this.pendingRequests = [];
  }

  HttpClient.prototype.configure = function configure(fn) {
    var builder = new RequestBuilder(this);
    fn(builder);
    this.requestTransformers = builder.transformers;
    return this;
  };

  HttpClient.prototype.createRequest = function createRequest(url) {
    var builder = new RequestBuilder(this);

    if (url) {
      builder.withUrl(url);
    }

    return builder;
  };

  HttpClient.prototype.send = function send(requestMessage, transformers) {
    var _this6 = this;

    var createProcessor = this.requestProcessorFactories.get(requestMessage.constructor);
    var processor = void 0;
    var promise = void 0;
    var i = void 0;
    var ii = void 0;

    if (!createProcessor) {
      throw new Error('No request message processor factory for ' + requestMessage.constructor + '.');
    }

    processor = createProcessor();
    trackRequestStart(this, processor);

    transformers = transformers || this.requestTransformers;

    promise = Promise.resolve(requestMessage).then(function (message) {
      for (i = 0, ii = transformers.length; i < ii; ++i) {
        transformers[i](_this6, processor, message);
      }

      return processor.process(_this6, message).then(function (response) {
        trackRequestEnd(_this6, processor);
        return response;
      }).catch(function (response) {
        trackRequestEnd(_this6, processor);
        throw response;
      });
    });

    promise.abort = promise.cancel = function () {
      processor.abort();
    };

    return promise;
  };

  HttpClient.prototype.delete = function _delete(url) {
    return this.createRequest(url).asDelete().send();
  };

  HttpClient.prototype.get = function get(url, params, traditional) {
    var req = this.createRequest(url).asGet();

    if (params) {
      return req.withParams(params, traditional).send();
    }

    return req.send();
  };

  HttpClient.prototype.head = function head(url) {
    return this.createRequest(url).asHead().send();
  };

  HttpClient.prototype.jsonp = function jsonp(url) {
    var callbackParameterName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'jsoncallback';

    return this.createRequest(url).asJsonp(callbackParameterName).send();
  };

  HttpClient.prototype.options = function options(url) {
    return this.createRequest(url).asOptions().send();
  };

  HttpClient.prototype.put = function put(url, content) {
    return this.createRequest(url).asPut().withContent(content).send();
  };

  HttpClient.prototype.patch = function patch(url, content) {
    return this.createRequest(url).asPatch().withContent(content).send();
  };

  HttpClient.prototype.post = function post(url, content) {
    return this.createRequest(url).asPost().withContent(content).send();
  };

  return HttpClient;
}();

/***/ }),

/***/ 516:
/*!******************************************************************************!*\
  !*** ./node_modules/aurelia-i18n/dist/native-modules/aurelia-i18n-loader.js ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Backend: function() { return /* binding */ Backend; }
/* harmony export */ });
var _class, _temp;



var Backend = (_temp = _class = function () {
  Backend.with = function _with(loader) {
    this.loader = loader;
    return this;
  };

  function Backend(services) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    

    this.init(services, options);
    this.type = 'backend';
  }

  Backend.prototype.init = function init(services) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    this.services = services;
    this.options = defaults(options, this.options || {}, getDefaults());
  };

  Backend.prototype.readMulti = function readMulti(languages, namespaces, callback) {
    var loadPath = this.options.loadPath;

    if (typeof this.options.loadPath === 'function') {
      loadPath = this.options.loadPath(languages, namespaces);
    }

    var url = this.services.interpolator.interpolate(loadPath, { lng: languages.join('+'), ns: namespaces.join('+') });

    this.loadUrl(url, callback);
  };

  Backend.prototype.read = function read(language, namespace, callback) {
    var loadPath = this.options.loadPath;

    if (typeof this.options.loadPath === 'function') {
      loadPath = this.options.loadPath([language], [namespace]);
    }

    var url = this.services.interpolator.interpolate(loadPath, { lng: language, ns: namespace });

    this.loadUrl(url, callback);
  };

  Backend.prototype.loadUrl = function loadUrl(url, callback) {
    var _this = this;

    this.constructor.loader.loadText(url).then(function (response) {
      var ret = void 0;
      var err = void 0;
      try {
        ret = response instanceof Object ? response : _this.options.parse(response, url);
      } catch (e) {
        err = 'failed parsing ' + url + ' to json';
      }
      if (err) return callback(err, false);
      callback(null, ret);
    }, function (response) {
      return callback('failed loading ' + url, false);
    });
  };

  Backend.prototype.create = function create(languages, namespace, key, fallbackValue) {};

  return Backend;
}(), _class.loader = null, _temp);

Backend.type = 'backend';
/* harmony default export */ __webpack_exports__["default"] = (Backend);

var arr = [];
var each = arr.forEach;
var slice = arr.slice;

function getDefaults() {
  return {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
    addPath: 'locales/add/{{lng}}/{{ns}}',
    allowMultiLoading: false,
    parse: JSON.parse
  };
}

function defaults(obj) {
  each.call(slice.call(arguments, 1), function (source) {
    if (source) {
      for (var prop in source) {
        if (obj[prop] === undefined) obj[prop] = source[prop];
      }
    }
  });
  return obj;
}

/***/ }),

/***/ 9480:
/*!***********************************************************************!*\
  !*** ./node_modules/aurelia-i18n/dist/native-modules/aurelia-i18n.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Backend: function() { return /* reexport safe */ _aurelia_i18n_loader__WEBPACK_IMPORTED_MODULE_13__.Backend; },
/* harmony export */   BaseI18N: function() { return /* reexport safe */ _base_i18n__WEBPACK_IMPORTED_MODULE_12__.BaseI18N; },
/* harmony export */   DfBindingBehavior: function() { return /* reexport safe */ _df__WEBPACK_IMPORTED_MODULE_8__.DfBindingBehavior; },
/* harmony export */   DfValueConverter: function() { return /* reexport safe */ _df__WEBPACK_IMPORTED_MODULE_8__.DfValueConverter; },
/* harmony export */   EventAggregator: function() { return /* reexport safe */ aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_1__.EventAggregator; },
/* harmony export */   I18N: function() { return /* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_6__.I18N; },
/* harmony export */   NfBindingBehavior: function() { return /* reexport safe */ _nf__WEBPACK_IMPORTED_MODULE_9__.NfBindingBehavior; },
/* harmony export */   NfValueConverter: function() { return /* reexport safe */ _nf__WEBPACK_IMPORTED_MODULE_9__.NfValueConverter; },
/* harmony export */   RelativeTime: function() { return /* reexport safe */ _relativeTime__WEBPACK_IMPORTED_MODULE_7__.RelativeTime; },
/* harmony export */   RtBindingBehavior: function() { return /* reexport safe */ _rt__WEBPACK_IMPORTED_MODULE_10__.RtBindingBehavior; },
/* harmony export */   RtValueConverter: function() { return /* reexport safe */ _rt__WEBPACK_IMPORTED_MODULE_10__.RtValueConverter; },
/* harmony export */   TBindingBehavior: function() { return /* reexport safe */ _t__WEBPACK_IMPORTED_MODULE_11__.TBindingBehavior; },
/* harmony export */   TCustomAttribute: function() { return /* reexport safe */ _t__WEBPACK_IMPORTED_MODULE_11__.TCustomAttribute; },
/* harmony export */   TParamsCustomAttribute: function() { return /* reexport safe */ _t__WEBPACK_IMPORTED_MODULE_11__.TParamsCustomAttribute; },
/* harmony export */   TValueConverter: function() { return /* reexport safe */ _t__WEBPACK_IMPORTED_MODULE_11__.TValueConverter; },
/* harmony export */   configure: function() { return /* binding */ configure; }
/* harmony export */ });
/* harmony import */ var aurelia_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-logging */ 8099);
/* harmony import */ var aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-event-aggregator */ "aurelia-event-aggregator");
/* harmony import */ var aurelia_templating__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! aurelia-templating */ 1781);
/* harmony import */ var aurelia_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! aurelia-loader */ 209);
/* harmony import */ var aurelia_templating_resources__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! aurelia-templating-resources */ "aurelia-templating-resources");
/* harmony import */ var aurelia_pal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! aurelia-pal */ 1015);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./i18n */ 1441);
/* harmony import */ var _relativeTime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./relativeTime */ 2210);
/* harmony import */ var _df__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./df */ "aurelia-i18n/df");
/* harmony import */ var _nf__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./nf */ "aurelia-i18n/nf");
/* harmony import */ var _rt__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./rt */ "aurelia-i18n/rt");
/* harmony import */ var _t__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./t */ "aurelia-i18n/t");
/* harmony import */ var _base_i18n__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./base-i18n */ 2875);
/* harmony import */ var _aurelia_i18n_loader__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./aurelia-i18n-loader */ 516);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

















function registerI18N(frameworkConfig, cb) {
  var instance = new _i18n__WEBPACK_IMPORTED_MODULE_6__.I18N(frameworkConfig.container.get(aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_1__.EventAggregator), frameworkConfig.container.get(aurelia_templating_resources__WEBPACK_IMPORTED_MODULE_4__.BindingSignaler));
  frameworkConfig.container.registerInstance(_i18n__WEBPACK_IMPORTED_MODULE_6__.I18N, instance);

  var ret = cb(instance);

  frameworkConfig.postTask(function () {
    var resources = frameworkConfig.container.get(aurelia_templating__WEBPACK_IMPORTED_MODULE_2__.ViewResources);
    var htmlBehaviorResource = resources.getAttribute('t');
    var htmlParamsResource = resources.getAttribute('t-params');
    var attributes = instance.i18next.options.attributes;

    if (!attributes) {
      attributes = ['t', 'i18n'];
    }

    attributes.forEach(function (alias) {
      return resources.registerAttribute(alias, htmlBehaviorResource, 't');
    });
    attributes.forEach(function (alias) {
      return resources.registerAttribute(alias + '-params', htmlParamsResource, 't-params');
    });
  });

  return ret;
}

function configure(frameworkConfig, cb) {
  if (cb === undefined || typeof cb !== 'function') {
    var errorMsg = 'You need to provide a callback method to properly configure the library';
    throw errorMsg;
  }

  frameworkConfig.globalResources('./t');
  frameworkConfig.globalResources('./nf');
  frameworkConfig.globalResources('./df');
  frameworkConfig.globalResources('./rt');

  if (window.Intl === undefined) {
    var _ret = function () {
      var i18nLogger = aurelia_logging__WEBPACK_IMPORTED_MODULE_0__.getLogger('i18n');
      i18nLogger.warn('Intl API is not available. Trying to load the polyfill.');
      var loader = frameworkConfig.container.get(aurelia_loader__WEBPACK_IMPORTED_MODULE_3__.Loader);
      var normalizeErrorMessage = 'Failed to normalize {module} while loading the Intl polyfill.';

      return {
        v: loader.normalize('aurelia-i18n').then(function (i18nName) {
          return loader.normalize('intl', i18nName).then(function (intlName) {
            return loader.loadModule(intlName).then(function (poly) {
              window.Intl = poly;
              return registerI18N(frameworkConfig, cb);
            }, function () {
              return i18nLogger.warn('Failed to load the Intl polyfill.');
            });
          }, function () {
            return i18nLogger.warn(normalizeErrorMessage.replace('{module}', 'intl'));
          });
        }, function () {
          return i18nLogger.warn(normalizeErrorMessage.replace('{module}', 'aurelia-i18n'));
        })
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }

  return Promise.resolve(registerI18N(frameworkConfig, cb));
}



/***/ }),

/***/ 2875:
/*!********************************************************************!*\
  !*** ./node_modules/aurelia-i18n/dist/native-modules/base-i18n.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseI18N: function() { return /* binding */ BaseI18N; }
/* harmony export */ });
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./i18n */ 1441);
/* harmony import */ var aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-event-aggregator */ "aurelia-event-aggregator");
var _class, _temp;






var BaseI18N = (_temp = _class = function () {
  function BaseI18N(i18n, element, ea) {
    var _this = this;

    

    this.i18n = i18n;
    this.element = element;

    this.__i18nDisposer = ea.subscribe('i18n:locale:changed', function () {
      _this.i18n.updateTranslations(_this.element);
    });
  }

  BaseI18N.prototype.attached = function attached() {
    this.i18n.updateTranslations(this.element);
  };

  BaseI18N.prototype.detached = function detached() {
    this.__i18nDisposer.dispose();
  };

  return BaseI18N;
}(), _class.inject = [_i18n__WEBPACK_IMPORTED_MODULE_0__.I18N, Element, aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_1__.EventAggregator], _temp);

/***/ }),

/***/ 3492:
/*!********************************************************************************************!*\
  !*** ./node_modules/aurelia-i18n/dist/native-modules/defaultTranslations/relative.time.js ***!
  \********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   translations: function() { return /* binding */ translations; }
/* harmony export */ });

var translations = {
  ar: {
    translation: {
      'now': 'الآن',
      'second_ago': 'منذ __count__ ثانية',
      'second_ago_plural': 'منذ __count__ ثواني',
      'second_in': 'في __count__ ثانية',
      'second_in_plural': 'في __count__ ثواني',
      'minute_ago': 'منذ __count__ دقيقة',
      'minute_ago_plural': 'منذ __count__ دقائق',
      'minute_in': 'في __count__ دقيقة',
      'minute_in_plural': 'في __count__ دقائق',
      'hour_ago': 'منذ __count__ ساعة',
      'hour_ago_plural': 'منذ __count__ ساعات',
      'hour_in': 'في __count__ ساعة',
      'hour_in_plural': 'في __count__ ساعات',
      'day_ago': 'منذ __count__ يوم',
      'day_ago_plural': 'منذ __count__ أيام',
      'day_in': 'في __count__ يوم',
      'day_in_plural': 'في __count__ أيام'
    }
  },
  en: {
    translation: {
      'now': 'just now',
      'second_ago': '__count__ second ago',
      'second_ago_plural': '__count__ seconds ago',
      'second_in': 'in __count__ second',
      'second_in_plural': 'in __count__ seconds',
      'minute_ago': '__count__ minute ago',
      'minute_ago_plural': '__count__ minutes ago',
      'minute_in': 'in __count__ minute',
      'minute_in_plural': 'in __count__ minutes',
      'hour_ago': '__count__ hour ago',
      'hour_ago_plural': '__count__ hours ago',
      'hour_in': 'in __count__ hour',
      'hour_in_plural': 'in __count__ hours',
      'day_ago': '__count__ day ago',
      'day_ago_plural': '__count__ days ago',
      'day_in': 'in __count__ day',
      'day_in_plural': 'in __count__ days',
      'month_ago': '__count__ month ago',
      'month_ago_plural': '__count__ months ago',
      'month_in': 'in __count__ month',
      'month_in_plural': 'in __count__ months',
      'year_ago': '__count__ year ago',
      'year_ago_plural': '__count__ years ago',
      'year_in': 'in __count__ year',
      'year_in_plural': 'in __count__ years'
    }
  },
  it: {
    translation: {
      'now': 'adesso',
      'second_ago': '__count__ secondo fa',
      'second_ago_plural': '__count__ secondi fa',
      'second_in': 'in __count__ secondo',
      'second_in_plural': 'in __count__ secondi',
      'minute_ago': '__count__ minuto fa',
      'minute_ago_plural': '__count__ minuti fa',
      'minute_in': 'in __count__ minuto',
      'minute_in_plural': 'in __count__ minuti',
      'hour_ago': '__count__ ora fa',
      'hour_ago_plural': '__count__ ore fa',
      'hour_in': 'in __count__ ora',
      'hour_in_plural': 'in __count__ ore',
      'day_ago': '__count__ giorno fa',
      'day_ago_plural': '__count__ giorni fa',
      'day_in': 'in __count__ giorno',
      'day_in_plural': 'in __count__ giorni',
      'month_ago': '__count__ mese fa',
      'month_ago_plural': '__count__ mesi fa',
      'month_in': 'in __count__ mese',
      'month_in_plural': 'in __count__ mesi',
      'year_ago': '__count__ anno fa',
      'year_ago_plural': '__count__ anni fa',
      'year_in': 'in __count__ anno',
      'year_in_plural': 'in __count__ anni'
    }
  },
  de: {
    translation: {
      'now': 'jetzt gerade',
      'second_ago': 'vor __count__ Sekunde',
      'second_ago_plural': 'vor __count__ Sekunden',
      'second_in': 'in __count__ Sekunde',
      'second_in_plural': 'in __count__ Sekunden',
      'minute_ago': 'vor __count__ Minute',
      'minute_ago_plural': 'vor __count__ Minuten',
      'minute_in': 'in __count__ Minute',
      'minute_in_plural': 'in __count__ Minuten',
      'hour_ago': 'vor __count__ Stunde',
      'hour_ago_plural': 'vor __count__ Stunden',
      'hour_in': 'in __count__ Stunde',
      'hour_in_plural': 'in __count__ Stunden',
      'day_ago': 'vor __count__ Tag',
      'day_ago_plural': 'vor __count__ Tagen',
      'day_in': 'in __count__ Tag',
      'day_in_plural': 'in __count__ Tagen',
      'month_ago': 'vor __count__ Monat',
      'month_ago_plural': 'vor __count__ Monaten',
      'month_in': 'in __count__ Monat',
      'month_in_plural': 'in __count__ Monaten',
      'year_ago': 'vor __count__ Jahr',
      'year_ago_plural': 'vor __count__ Jahren',
      'year_in': 'in __count__ Jahr',
      'year_in_plural': 'in __count__ Jahren'
    }
  },
  nl: {
    translation: {
      'now': 'zonet',
      'second_ago': '__count__ seconde geleden',
      'second_ago_plural': '__count__ seconden geleden',
      'second_in': 'in __count__ seconde',
      'second_in_plural': 'in __count__ seconden',
      'minute_ago': '__count__ minuut geleden',
      'minute_ago_plural': '__count__ minuten geleden',
      'minute_in': 'in __count__ minuut',
      'minute_in_plural': 'in __count__ minuten',
      'hour_ago': '__count__ uur geleden',
      'hour_ago_plural': '__count__ uren geleden',
      'hour_in': 'in __count__ uur',
      'hour_in_plural': 'in __count__ uren',
      'day_ago': '__count__ dag geleden',
      'day_ago_plural': '__count__ dagen geleden',
      'day_in': 'in __count__ dag',
      'day_in_plural': 'in __count__ dagen',
      'month_ago': '__count__ maand geleden',
      'month_ago_plural': '__count__ maanden geleden',
      'month_in': 'in __count__ maand',
      'month_in_plural': 'in __count__ maanden',
      'year_ago': '__count__ jaar geleden',
      'year_ago_plural': '__count__ jaren geleden',
      'year_in': 'in __count__ jaar',
      'year_in_plural': 'in __count__ jaren'
    }
  },
  fr: {
    translation: {
      'now': 'maintenant',
      'second_ago': '__count__ seconde plus tôt',
      'second_ago_plural': '__count__ secondes plus tôt',
      'second_in': 'en __count__ seconde',
      'second_in_plural': 'en __count__ secondes',
      'minute_ago': '__count__ minute plus tôt',
      'minute_ago_plural': '__count__ minutes plus tôt',
      'minute_in': 'en __count__ minute',
      'minute_in_plural': 'en __count__ minutes',
      'hour_ago': '__count__ heure plus tôt',
      'hour_ago_plural': '__count__ heures plus tôt',
      'hour_in': 'en __count__ heure',
      'hour_in_plural': 'en __count__ heures',
      'day_ago': '__count__ jour plus tôt',
      'day_ago_plural': '__count__ jours plus tôt',
      'day_in': 'en __count__ jour',
      'day_in_plural': 'en __count__ jours'
    }
  },
  th: {
    translation: {
      'now': 'เมื่อกี้',
      'second_ago': '__count__ วินาที ที่ผ่านมา',
      'second_ago_plural': '__count__ วินาที ที่ผ่านมา',
      'second_in': 'อีก __count__ วินาที',
      'second_in_plural': 'อีก __count__ วินาที',
      'minute_ago': '__count__ นาที ที่ผ่านมา',
      'minute_ago_plural': '__count__ นาที ที่ผ่านมา',
      'minute_in': 'อีก __count__ นาที',
      'minute_in_plural': 'อีก __count__ นาที',
      'hour_ago': '__count__ ชั่วโมง ที่ผ่านมา',
      'hour_ago_plural': '__count__ ชั่วโมง ที่ผ่านมา',
      'hour_in': 'อีก __count__ ชั่วโมง',
      'hour_in_plural': 'อีก __count__ ชั่วโมง',
      'day_ago': '__count__ วัน ที่ผ่านมา',
      'day_ago_plural': '__count__ วัน ที่ผ่านมา',
      'day_in': 'อีก __count__ วัน',
      'day_in_plural': 'อีก __count__ วัน'
    }
  },
  sv: {
    translation: {
      'now': 'just nu',
      'second_ago': '__count__ sekund sedan',
      'second_ago_plural': '__count__ sekunder sedan',
      'second_in': 'om __count__ sekund',
      'second_in_plural': 'om __count__ sekunder',
      'minute_ago': '__count__ minut sedan',
      'minute_ago_plural': '__count__ minuter sedan',
      'minute_in': 'om __count__ minut',
      'minute_in_plural': 'om __count__ minuter',
      'hour_ago': '__count__ timme sedan',
      'hour_ago_plural': '__count__ timmar sedan',
      'hour_in': 'om __count__ timme',
      'hour_in_plural': 'om __count__ timmar',
      'day_ago': '__count__ dag sedan',
      'day_ago_plural': '__count__ dagar sedan',
      'day_in': 'om __count__ dag',
      'day_in_plural': 'om __count__ dagar'
    }
  },
  da: {
    translation: {
      'now': 'lige nu',
      'second_ago': '__count__ sekunder siden',
      'second_ago_plural': '__count__ sekunder siden',
      'second_in': 'om __count__ sekund',
      'second_in_plural': 'om __count__ sekunder',
      'minute_ago': '__count__ minut siden',
      'minute_ago_plural': '__count__ minutter siden',
      'minute_in': 'om __count__ minut',
      'minute_in_plural': 'om __count__ minutter',
      'hour_ago': '__count__ time siden',
      'hour_ago_plural': '__count__ timer siden',
      'hour_in': 'om __count__ time',
      'hour_in_plural': 'om __count__ timer',
      'day_ago': '__count__ dag siden',
      'day_ago_plural': '__count__ dage siden',
      'day_in': 'om __count__ dag',
      'day_in_plural': 'om __count__ dage'
    }
  },
  no: {
    translation: {
      'now': 'akkurat nå',
      'second_ago': '__count__ sekund siden',
      'second_ago_plural': '__count__ sekunder siden',
      'second_in': 'om __count__ sekund',
      'second_in_plural': 'om __count__ sekunder',
      'minute_ago': '__count__ minutt siden',
      'minute_ago_plural': '__count__ minutter siden',
      'minute_in': 'om __count__ minutt',
      'minute_in_plural': 'om __count__ minutter',
      'hour_ago': '__count__ time siden',
      'hour_ago_plural': '__count__ timer siden',
      'hour_in': 'om __count__ time',
      'hour_in_plural': 'om __count__ timer',
      'day_ago': '__count__ dag siden',
      'day_ago_plural': '__count__ dager siden',
      'day_in': 'om __count__ dag',
      'day_in_plural': 'om __count__ dager'
    }
  },
  jp: {
    translation: {
      'now': 'たった今',
      'second_ago': '__count__ 秒前',
      'second_ago_plural': '__count__ 秒前',
      'second_in': 'あと __count__ 秒',
      'second_in_plural': 'あと __count__ 秒',
      'minute_ago': '__count__ 分前',
      'minute_ago_plural': '__count__ 分前',
      'minute_in': 'あと __count__ 分',
      'minute_in_plural': 'あと __count__ 分',
      'hour_ago': '__count__ 時間前',
      'hour_ago_plural': '__count__ 時間前',
      'hour_in': 'あと __count__ 時間',
      'hour_in_plural': 'あと __count__ 時間',
      'day_ago': '__count__ 日間前',
      'day_ago_plural': '__count__ 日間前',
      'day_in': 'あと __count__ 日間',
      'day_in_plural': 'あと __count__ 日間'
    }
  },
  pt: {
    translation: {
      'now': 'neste exato momento',
      'second_ago': '__count__ segundo atrás',
      'second_ago_plural': '__count__ segundos atrás',
      'second_in': 'em __count__ segundo',
      'second_in_plural': 'em __count__ segundos',
      'minute_ago': '__count__ minuto atrás',
      'minute_ago_plural': '__count__ minutos atrás',
      'minute_in': 'em __count__ minuto',
      'minute_in_plural': 'em __count__ minutos',
      'hour_ago': '__count__ hora atrás',
      'hour_ago_plural': '__count__ horas atrás',
      'hour_in': 'em __count__ hora',
      'hour_in_plural': 'em __count__ horas',
      'day_ago': '__count__ dia atrás',
      'day_ago_plural': '__count__ dias atrás',
      'day_in': 'em __count__ dia',
      'day_in_plural': 'em __count__ dias',
      'month_ago': '__count__ mês atrás',
      'month_ago_plural': '__count__ meses atrás',
      'month_in': 'em __count__ mês',
      'month_in_plural': 'em __count__ meses',
      'year_ago': '__count__ ano atrás',
      'year_ago_plural': '__count__ anos atrás',
      'year_in': 'em __count__ ano',
      'year_in_plural': 'em __count__ anos'
    }
  },
  zh: {
    translation: {
      'now': '刚才',
      'second_ago': '__count__ 秒钟前',
      'second_ago_plural': '__count__ 秒钟前',
      'second_in': '__count__ 秒内',
      'second_in_plural': '__count__ 秒内',
      'minute_ago': '__count__ 分钟前',
      'minute_ago_plural': '__count__ 分钟前',
      'minute_in': '__count__ 分钟内',
      'minute_in_plural': '__count__ 分钟内',
      'hour_ago': '__count__ 小时前',
      'hour_ago_plural': '__count__ 小时前',
      'hour_in': '__count__ 小时内',
      'hour_in_plural': '__count__ 小时内',
      'day_ago': '__count__ 天前',
      'day_ago_plural': '__count__ 天前',
      'day_in': '__count__ 天内',
      'day_in_plural': '__count__ 天内',
      'month_ago': '__count__ 月前',
      'month_ago_plural': '__count__ 月前',
      'month_in': '__count__ 月内',
      'month_in_plural': '__count__ 月内',
      'year_ago': '__count__ 年前',
      'year_ago_plural': '__count__ 年前',
      'year_in': '__count__ 年内',
      'year_in_plural': '__count__ 年内'
    }
  },
  'zh-CN': {
    translation: {
      'now': '刚才',
      'second_ago': '__count__ 秒钟前',
      'second_ago_plural': '__count__ 秒钟前',
      'second_in': '__count__ 秒内',
      'second_in_plural': '__count__ 秒内',
      'minute_ago': '__count__ 分钟前',
      'minute_ago_plural': '__count__ 分钟前',
      'minute_in': '__count__ 分钟内',
      'minute_in_plural': '__count__ 分钟内',
      'hour_ago': '__count__ 小时前',
      'hour_ago_plural': '__count__ 小时前',
      'hour_in': '__count__ 小时内',
      'hour_in_plural': '__count__ 小时内',
      'day_ago': '__count__ 天前',
      'day_ago_plural': '__count__ 天前',
      'day_in': '__count__ 天内',
      'day_in_plural': '__count__ 天内',
      'month_ago': '__count__ 月前',
      'month_ago_plural': '__count__ 月前',
      'month_in': '__count__ 月内',
      'month_in_plural': '__count__ 月内',
      'year_ago': '__count__ 年前',
      'year_ago_plural': '__count__ 年前',
      'year_in': '__count__ 年内',
      'year_in_plural': '__count__ 年内'
    }
  },
  'zh-HK': {
    translation: {
      'now': '剛才',
      'second_ago': '__count__ 秒鐘前',
      'second_ago_plural': '__count__ 秒鐘前',
      'second_in': '__count__ 秒內',
      'second_in_plural': '__count__ 秒內',
      'minute_ago': '__count__ 分鐘前',
      'minute_ago_plural': '__count__ 分鐘前',
      'minute_in': '__count__ 分鐘內',
      'minute_in_plural': '__count__ 分鐘內',
      'hour_ago': '__count__ 小時前',
      'hour_ago_plural': '__count__ 小時前',
      'hour_in': '__count__ 小時內',
      'hour_in_plural': '__count__ 小時內',
      'day_ago': '__count__ 天前',
      'day_ago_plural': '__count__ 天前',
      'day_in': '__count__ 天內',
      'day_in_plural': '__count__ 天內',
      'month_ago': '__count__ 月前',
      'month_ago_plural': '__count__ 月前',
      'month_in': '__count__ 月內',
      'month_in_plural': '__count__ 月內',
      'year_ago': '__count__ 年前',
      'year_ago_plural': '__count__ 年前',
      'year_in': '__count__ 年內',
      'year_in_plural': '__count__ 年內'
    }
  },
  'zh-TW': {
    translation: {
      'now': '剛才',
      'second_ago': '__count__ 秒鐘前',
      'second_ago_plural': '__count__ 秒鐘前',
      'second_in': '__count__ 秒內',
      'second_in_plural': '__count__ 秒內',
      'minute_ago': '__count__ 分鐘前',
      'minute_ago_plural': '__count__ 分鐘前',
      'minute_in': '__count__ 分鐘內',
      'minute_in_plural': '__count__ 分鐘內',
      'hour_ago': '__count__ 小時前',
      'hour_ago_plural': '__count__ 小時前',
      'hour_in': '__count__ 小時內',
      'hour_in_plural': '__count__ 小時內',
      'day_ago': '__count__ 天前',
      'day_ago_plural': '__count__ 天前',
      'day_in': '__count__ 天內',
      'day_in_plural': '__count__ 天內',
      'month_ago': '__count__ 月前',
      'month_ago_plural': '__count__ 月前',
      'month_in': '__count__ 月內',
      'month_in_plural': '__count__ 月內',
      'year_ago': '__count__ 年前',
      'year_ago_plural': '__count__ 年前',
      'year_in': '__count__ 年內',
      'year_in_plural': '__count__ 年內'
    }
  }
};

/***/ }),

/***/ "aurelia-i18n/df":
/*!*************************************************************!*\
  !*** ./node_modules/aurelia-i18n/dist/native-modules/df.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DfBindingBehavior: function() { return /* binding */ DfBindingBehavior; },
/* harmony export */   DfValueConverter: function() { return /* binding */ DfValueConverter; }
/* harmony export */ });
/* harmony import */ var aurelia_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-logging */ 8099);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./i18n */ 1441);
/* harmony import */ var aurelia_templating_resources__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! aurelia-templating-resources */ "aurelia-templating-resources");
/* harmony import */ var aurelia_binding__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! aurelia-binding */ 6778);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ 5537);








var DfValueConverter = function () {
  DfValueConverter.inject = function inject() {
    return [_i18n__WEBPACK_IMPORTED_MODULE_1__.I18N];
  };

  function DfValueConverter(i18n) {
    

    this.service = i18n;
  }

  DfValueConverter.prototype.toView = function toView(value, dfOrOptions, locale, df) {
    if (value === null || typeof value === 'undefined' || typeof value === 'string' && value.trim() === '') {
      return value;
    }

    if (dfOrOptions && typeof dfOrOptions.format === 'function') {
      return dfOrOptions.format(value);
    } else if (df) {
      var i18nLogger = aurelia_logging__WEBPACK_IMPORTED_MODULE_0__.getLogger('i18n');
      i18nLogger.warn('This ValueConverter signature is depcrecated and will be removed in future releases. Please use the signature [dfOrOptions, locale]');
    } else {
      df = this.service.df(dfOrOptions, locale || this.service.getLocale());
    }

    if (typeof value === 'string' && isNaN(value) && !(0,_utils__WEBPACK_IMPORTED_MODULE_4__.isInteger)(value)) {
      value = new Date(value);
    }

    return df.format(value);
  };

  return DfValueConverter;
}();

var DfBindingBehavior = function () {
  DfBindingBehavior.inject = function inject() {
    return [aurelia_templating_resources__WEBPACK_IMPORTED_MODULE_2__.SignalBindingBehavior];
  };

  function DfBindingBehavior(signalBindingBehavior) {
    

    this.signalBindingBehavior = signalBindingBehavior;
  }

  DfBindingBehavior.prototype.bind = function bind(binding, source) {
    this.signalBindingBehavior.bind(binding, source, 'aurelia-translation-signal');

    var sourceExpression = binding.sourceExpression;

    if (sourceExpression.rewritten) {
      return;
    }
    sourceExpression.rewritten = true;

    var expression = sourceExpression.expression;
    sourceExpression.expression = new aurelia_binding__WEBPACK_IMPORTED_MODULE_3__.ValueConverter(expression, 'df', sourceExpression.args, [expression].concat(sourceExpression.args));
  };

  DfBindingBehavior.prototype.unbind = function unbind(binding, source) {
    this.signalBindingBehavior.unbind(binding, source);
  };

  return DfBindingBehavior;
}();

/***/ }),

/***/ 1441:
/*!***************************************************************!*\
  !*** ./node_modules/aurelia-i18n/dist/native-modules/i18n.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I18N: function() { return /* binding */ I18N; }
/* harmony export */ });
/* harmony import */ var aurelia_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-logging */ 8099);
/* harmony import */ var i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! i18next */ 8908);
/* harmony import */ var i18next__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(i18next__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var aurelia_pal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! aurelia-pal */ 1015);
/* harmony import */ var aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! aurelia-event-aggregator */ "aurelia-event-aggregator");
/* harmony import */ var aurelia_templating_resources__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! aurelia-templating-resources */ "aurelia-templating-resources");
var _class, _temp;









var I18N = (_temp = _class = function () {
  function I18N(ea, signaler) {
    var _this = this;

    

    this.globalVars = {};
    this.params = {};
    this.i18nextDefered = {
      resolve: null,
      promise: null
    };

    this.i18next = (i18next__WEBPACK_IMPORTED_MODULE_1___default());
    this.ea = ea;
    this.Intl = window.Intl;
    this.signaler = signaler;
    this.i18nextDefered.promise = new Promise(function (resolve) {
      return _this.i18nextDefered.resolve = resolve;
    });
  }

  I18N.prototype.setup = function setup(options) {
    var _this2 = this;

    var defaultOptions = {
      compatibilityAPI: 'v1',
      compatibilityJSON: 'v1',
      lng: 'en',
      attributes: ['t', 'i18n'],
      fallbackLng: 'en',
      debug: false
    };

    i18next__WEBPACK_IMPORTED_MODULE_1___default().init(options || defaultOptions, function (err, t) {
      if ((i18next__WEBPACK_IMPORTED_MODULE_1___default().options).attributes instanceof String) {
        (i18next__WEBPACK_IMPORTED_MODULE_1___default().options).attributes = [(i18next__WEBPACK_IMPORTED_MODULE_1___default().options).attributes];
      }

      _this2.i18nextDefered.resolve(_this2.i18next);
    });

    return this.i18nextDefered.promise;
  };

  I18N.prototype.i18nextReady = function i18nextReady() {
    return this.i18nextDefered.promise;
  };

  I18N.prototype.setLocale = function setLocale(locale) {
    var _this3 = this;

    return new Promise(function (resolve) {
      var oldLocale = _this3.getLocale();
      _this3.i18next.changeLanguage(locale, function (err, tr) {
        _this3.ea.publish('i18n:locale:changed', { oldValue: oldLocale, newValue: locale });
        _this3.signaler.signal('aurelia-translation-signal');
        resolve(tr);
      });
    });
  };

  I18N.prototype.getLocale = function getLocale() {
    return this.i18next.language;
  };

  I18N.prototype.nf = function nf(options, locales) {
    return new this.Intl.NumberFormat(locales || this.getLocale(), options || {});
  };

  I18N.prototype.uf = function uf(number, locale) {
    var nf = this.nf({}, locale || this.getLocale());
    var comparer = nf.format(10000 / 3);

    var thousandSeparator = comparer[1];
    var decimalSeparator = comparer[5];

    if (thousandSeparator === '.') {
      thousandSeparator = '\\.';
    }

    var result = number.replace(new RegExp(thousandSeparator, 'g'), '').replace(/[^\d.,-]/g, '').replace(decimalSeparator, '.');

    return Number(result);
  };

  I18N.prototype.df = function df(options, locales) {
    return new this.Intl.DateTimeFormat(locales || this.getLocale(), options);
  };

  I18N.prototype.tr = function tr(key, options) {
    var fullOptions = this.globalVars;

    if (options !== undefined) {
      fullOptions = Object.assign(Object.assign({}, this.globalVars), options);
    }

    return this.i18next.t(key, fullOptions);
  };

  I18N.prototype.registerGlobalVariable = function registerGlobalVariable(key, value) {
    this.globalVars[key] = value;
  };

  I18N.prototype.unregisterGlobalVariable = function unregisterGlobalVariable(key) {
    delete this.globalVars[key];
  };

  I18N.prototype.updateTranslations = function updateTranslations(el) {
    if (!el || !el.querySelectorAll) {
      return;
    }

    var i = void 0;
    var l = void 0;

    var selector = [].concat(this.i18next.options.attributes);
    for (i = 0, l = selector.length; i < l; i++) {
      selector[i] = '[' + selector[i] + ']';
    }selector = selector.join(',');

    var nodes = el.querySelectorAll(selector);
    for (i = 0, l = nodes.length; i < l; i++) {
      var node = nodes[i];
      var keys = void 0;

      for (var i2 = 0, l2 = this.i18next.options.attributes.length; i2 < l2; i2++) {
        keys = node.getAttribute(this.i18next.options.attributes[i2]);
        if (keys) break;
      }

      if (!keys) continue;

      this.updateValue(node, keys);
    }
  };

  I18N.prototype.updateValue = function updateValue(node, value, params) {
    if (value === null || value === undefined) {
      return;
    }

    var keys = value.split(';');
    var i = keys.length;

    while (i--) {
      var key = keys[i];

      var re = /\[([a-z\-]*)\]/ig;

      var m = void 0;
      var attr = 'text';

      if (node.nodeName === 'IMG') attr = 'src';

      while ((m = re.exec(key)) !== null) {
        if (m.index === re.lastIndex) {
          re.lastIndex++;
        }
        if (m) {
          key = key.replace(m[0], '');
          attr = m[1];
        }
      }

      if (!node._textContent) node._textContent = node.textContent;
      if (!node._innerHTML) node._innerHTML = node.innerHTML;

      var attrCC = attr.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
      });
      var reservedNames = ['prepend', 'append', 'text', 'html'];
      if (reservedNames.indexOf(attr) > -1 && node.au && node.au.controller && node.au.controller.viewModel && attrCC in node.au.controller.viewModel) {
        var i18nLogger = aurelia_logging__WEBPACK_IMPORTED_MODULE_0__.getLogger('i18n');
        i18nLogger.warn('Aurelia I18N reserved attribute name\n\n[' + reservedNames.join(', ') + ']\n\nYour custom element has a bindable named ' + attr + ' which is a reserved word.\n\nIf you\'d like Aurelia I18N to translate your bindable instead, please consider giving it another name.');
      }

      switch (attr) {
        case 'text':
          var newChild = aurelia_pal__WEBPACK_IMPORTED_MODULE_2__.DOM.createTextNode(this.tr(key, params));
          if (node._newChild) {
            node.removeChild(node._newChild);
          }

          node._newChild = newChild;
          while (node.firstChild) {
            node.removeChild(node.firstChild);
          }
          node.appendChild(node._newChild);
          break;
        case 'prepend':
          var prependParser = aurelia_pal__WEBPACK_IMPORTED_MODULE_2__.DOM.createElement('div');
          prependParser.innerHTML = this.tr(key, params);
          for (var ni = node.childNodes.length - 1; ni >= 0; ni--) {
            if (node.childNodes[ni]._prepended) {
              node.removeChild(node.childNodes[ni]);
            }
          }

          for (var pi = prependParser.childNodes.length - 1; pi >= 0; pi--) {
            prependParser.childNodes[pi]._prepended = true;
            if (node.firstChild) {
              node.insertBefore(prependParser.childNodes[pi], node.firstChild);
            } else {
              node.appendChild(prependParser.childNodes[pi]);
            }
          }
          break;
        case 'append':
          var appendParser = aurelia_pal__WEBPACK_IMPORTED_MODULE_2__.DOM.createElement('div');
          appendParser.innerHTML = this.tr(key, params);
          for (var _ni = node.childNodes.length - 1; _ni >= 0; _ni--) {
            if (node.childNodes[_ni]._appended) {
              node.removeChild(node.childNodes[_ni]);
            }
          }

          while (appendParser.firstChild) {
            appendParser.firstChild._appended = true;
            node.appendChild(appendParser.firstChild);
          }
          break;
        case 'html':
          node.innerHTML = this.tr(key, params);
          break;
        default:
          if (node.au && node.au.controller && node.au.controller.viewModel && attrCC in node.au.controller.viewModel) {
            node.au.controller.viewModel[attrCC] = this.tr(key, params);
          } else {
            node.setAttribute(attr, this.tr(key, params));
          }

          break;
      }
    }
  };

  return I18N;
}(), _class.inject = [aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_3__.EventAggregator, aurelia_templating_resources__WEBPACK_IMPORTED_MODULE_4__.BindingSignaler], _temp);

/***/ }),

/***/ "aurelia-i18n/nf":
/*!*************************************************************!*\
  !*** ./node_modules/aurelia-i18n/dist/native-modules/nf.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NfBindingBehavior: function() { return /* binding */ NfBindingBehavior; },
/* harmony export */   NfValueConverter: function() { return /* binding */ NfValueConverter; }
/* harmony export */ });
/* harmony import */ var aurelia_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-logging */ 8099);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./i18n */ 1441);
/* harmony import */ var aurelia_templating_resources__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! aurelia-templating-resources */ "aurelia-templating-resources");
/* harmony import */ var aurelia_binding__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! aurelia-binding */ 6778);







var NfValueConverter = function () {
  NfValueConverter.inject = function inject() {
    return [_i18n__WEBPACK_IMPORTED_MODULE_1__.I18N];
  };

  function NfValueConverter(i18n) {
    

    this.service = i18n;
  }

  NfValueConverter.prototype.toView = function toView(value, nfOrOptions, locale, nf) {
    if (value === null || typeof value === 'undefined' || typeof value === 'string' && value.trim() === '') {
      return value;
    }

    if (nfOrOptions && typeof nfOrOptions.format === 'function') {
      return nfOrOptions.format(value);
    } else if (nf) {
      var i18nLogger = aurelia_logging__WEBPACK_IMPORTED_MODULE_0__.getLogger('i18n');
      i18nLogger.warn('This ValueConverter signature is depcrecated and will be removed in future releases. Please use the signature [nfOrOptions, locale]');
    } else {
      nf = this.service.nf(nfOrOptions, locale || this.service.getLocale());
    }

    return nf.format(value);
  };

  return NfValueConverter;
}();

var NfBindingBehavior = function () {
  NfBindingBehavior.inject = function inject() {
    return [aurelia_templating_resources__WEBPACK_IMPORTED_MODULE_2__.SignalBindingBehavior];
  };

  function NfBindingBehavior(signalBindingBehavior) {
    

    this.signalBindingBehavior = signalBindingBehavior;
  }

  NfBindingBehavior.prototype.bind = function bind(binding, source) {
    this.signalBindingBehavior.bind(binding, source, 'aurelia-translation-signal');

    var sourceExpression = binding.sourceExpression;

    if (sourceExpression.rewritten) {
      return;
    }
    sourceExpression.rewritten = true;

    var expression = sourceExpression.expression;
    sourceExpression.expression = new aurelia_binding__WEBPACK_IMPORTED_MODULE_3__.ValueConverter(expression, 'nf', sourceExpression.args, [expression].concat(sourceExpression.args));
  };

  NfBindingBehavior.prototype.unbind = function unbind(binding, source) {
    this.signalBindingBehavior.unbind(binding, source);
  };

  return NfBindingBehavior;
}();

/***/ }),

/***/ 2210:
/*!***********************************************************************!*\
  !*** ./node_modules/aurelia-i18n/dist/native-modules/relativeTime.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RelativeTime: function() { return /* binding */ RelativeTime; }
/* harmony export */ });
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./i18n */ 1441);
/* harmony import */ var _defaultTranslations_relative_time__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaultTranslations/relative.time */ 3492);
/* harmony import */ var aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! aurelia-event-aggregator */ "aurelia-event-aggregator");






var RelativeTime = function () {
  RelativeTime.inject = function inject() {
    return [_i18n__WEBPACK_IMPORTED_MODULE_0__.I18N, aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_2__.EventAggregator];
  };

  function RelativeTime(i18n, ea) {
    var _this = this;

    

    this.service = i18n;
    this.ea = ea;

    this.service.i18nextReady().then(function () {
      _this.setup();
    });
    this.ea.subscribe('i18n:locale:changed', function (locales) {
      _this.setup(locales);
    });
  }

  RelativeTime.prototype.setup = function setup(locales) {
    var trans = _defaultTranslations_relative_time__WEBPACK_IMPORTED_MODULE_1__.translations.default || _defaultTranslations_relative_time__WEBPACK_IMPORTED_MODULE_1__.translations;
    var key = locales && locales.newValue ? locales.newValue : this.service.getLocale();
    var fallbackLng = this.service.i18next.fallbackLng;
    var index = 0;

    if ((index = key.indexOf('-')) >= 0) {
      var baseLocale = key.substring(0, index);

      if (trans[baseLocale]) {
        this.addTranslationResource(baseLocale, trans[baseLocale].translation);
      }
    }

    if (trans[key]) {
      this.addTranslationResource(key, trans[key].translation);
    }
    if (trans[fallbackLng]) {
      this.addTranslationResource(key, trans[fallbackLng].translation);
    }
  };

  RelativeTime.prototype.addTranslationResource = function addTranslationResource(key, translation) {
    var options = this.service.i18next.options;

    if (options.interpolation && options.interpolation.prefix !== '__' || options.interpolation.suffix !== '__') {
      for (var subkey in translation) {
        translation[subkey] = translation[subkey].replace('__count__', (options.interpolation.prefix || '{{') + 'count' + (options.interpolation.suffix || '}}'));
      }
    }

    this.service.i18next.addResources(key, options.defaultNS, translation);
  };

  RelativeTime.prototype.getRelativeTime = function getRelativeTime(time) {
    var now = new Date();
    var diff = now.getTime() - time.getTime();

    var timeDiff = this.getTimeDiffDescription(diff, 'year', 31104000000);
    if (!timeDiff) {
      timeDiff = this.getTimeDiffDescription(diff, 'month', 2592000000);
      if (!timeDiff) {
        timeDiff = this.getTimeDiffDescription(diff, 'day', 86400000);
        if (!timeDiff) {
          timeDiff = this.getTimeDiffDescription(diff, 'hour', 3600000);
          if (!timeDiff) {
            timeDiff = this.getTimeDiffDescription(diff, 'minute', 60000);
            if (!timeDiff) {
              timeDiff = this.getTimeDiffDescription(diff, 'second', 1000);
              if (!timeDiff) {
                timeDiff = this.service.tr('now');
              }
            }
          }
        }
      }
    }

    return timeDiff;
  };

  RelativeTime.prototype.getTimeDiffDescription = function getTimeDiffDescription(diff, unit, timeDivisor) {
    var unitAmount = (diff / timeDivisor).toFixed(0);
    if (unitAmount > 0) {
      return this.service.tr(unit, { count: parseInt(unitAmount, 10), context: 'ago' });
    } else if (unitAmount < 0) {
      var abs = Math.abs(unitAmount);
      return this.service.tr(unit, { count: abs, context: 'in' });
    }

    return null;
  };

  return RelativeTime;
}();

/***/ }),

/***/ "aurelia-i18n/rt":
/*!*************************************************************!*\
  !*** ./node_modules/aurelia-i18n/dist/native-modules/rt.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RtBindingBehavior: function() { return /* binding */ RtBindingBehavior; },
/* harmony export */   RtValueConverter: function() { return /* binding */ RtValueConverter; }
/* harmony export */ });
/* harmony import */ var _relativeTime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./relativeTime */ 2210);
/* harmony import */ var aurelia_templating_resources__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-templating-resources */ "aurelia-templating-resources");
/* harmony import */ var aurelia_binding__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! aurelia-binding */ 6778);






var RtValueConverter = function () {
  RtValueConverter.inject = function inject() {
    return [_relativeTime__WEBPACK_IMPORTED_MODULE_0__.RelativeTime];
  };

  function RtValueConverter(relativeTime) {
    

    this.service = relativeTime;
  }

  RtValueConverter.prototype.toView = function toView(value) {
    if (value === null || typeof value === 'undefined' || typeof value === 'string' && value.trim() === '') {
      return value;
    }

    if (typeof value === 'string' && isNaN(value) && !Number.isInteger(value)) {
      value = new Date(value);
    }

    return this.service.getRelativeTime(value);
  };

  return RtValueConverter;
}();

var RtBindingBehavior = function () {
  RtBindingBehavior.inject = function inject() {
    return [aurelia_templating_resources__WEBPACK_IMPORTED_MODULE_1__.SignalBindingBehavior];
  };

  function RtBindingBehavior(signalBindingBehavior) {
    

    this.signalBindingBehavior = signalBindingBehavior;
  }

  RtBindingBehavior.prototype.bind = function bind(binding, source) {
    this.signalBindingBehavior.bind(binding, source, 'aurelia-translation-signal');

    var sourceExpression = binding.sourceExpression;

    if (sourceExpression.rewritten) {
      return;
    }
    sourceExpression.rewritten = true;

    var expression = sourceExpression.expression;
    sourceExpression.expression = new aurelia_binding__WEBPACK_IMPORTED_MODULE_2__.ValueConverter(expression, 'rt', sourceExpression.args, [expression].concat(sourceExpression.args));
  };

  RtBindingBehavior.prototype.unbind = function unbind(binding, source) {
    this.signalBindingBehavior.unbind(binding, source);
  };

  return RtBindingBehavior;
}();

/***/ }),

/***/ "aurelia-i18n/t":
/*!************************************************************!*\
  !*** ./node_modules/aurelia-i18n/dist/native-modules/t.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TBindingBehavior: function() { return /* binding */ TBindingBehavior; },
/* harmony export */   TCustomAttribute: function() { return /* binding */ TCustomAttribute; },
/* harmony export */   TParamsCustomAttribute: function() { return /* binding */ TParamsCustomAttribute; },
/* harmony export */   TValueConverter: function() { return /* binding */ TValueConverter; }
/* harmony export */ });
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./i18n */ 1441);
/* harmony import */ var aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-event-aggregator */ "aurelia-event-aggregator");
/* harmony import */ var aurelia_metadata__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! aurelia-metadata */ 1383);
/* harmony import */ var aurelia_templating__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! aurelia-templating */ 1781);
/* harmony import */ var aurelia_templating_resources__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! aurelia-templating-resources */ "aurelia-templating-resources");
/* harmony import */ var aurelia_binding__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! aurelia-binding */ 6778);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils */ 5537);
var _dec, _class, _class2, _temp, _dec2, _class3, _class4, _temp2, _class5, _temp3;











var TValueConverter = function () {
  TValueConverter.inject = function inject() {
    return [_i18n__WEBPACK_IMPORTED_MODULE_0__.I18N];
  };

  function TValueConverter(i18n) {
    

    this.service = i18n;
  }

  TValueConverter.prototype.toView = function toView(value, options) {
    return this.service.tr(value, options);
  };

  return TValueConverter;
}();

var TParamsCustomAttribute = (_dec = (0,aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.customAttribute)('t-params'), _dec(_class = (_temp = _class2 = function () {
  TParamsCustomAttribute.configureAliases = function configureAliases(aliases) {
    var r = aurelia_metadata__WEBPACK_IMPORTED_MODULE_2__.metadata.getOrCreateOwn(aurelia_metadata__WEBPACK_IMPORTED_MODULE_2__.metadata.resource, aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.HtmlBehaviorResource, TParamsCustomAttribute);
    r.aliases = aliases;
  };

  function TParamsCustomAttribute(element) {
    

    this.element = element;
  }

  TParamsCustomAttribute.prototype.valueChanged = function valueChanged() {};

  return TParamsCustomAttribute;
}(), _class2.inject = [Element], _temp)) || _class);

var TCustomAttribute = (_dec2 = (0,aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.customAttribute)('t'), _dec2(_class3 = (_temp2 = _class4 = function () {
  TCustomAttribute.configureAliases = function configureAliases(aliases) {
    var r = aurelia_metadata__WEBPACK_IMPORTED_MODULE_2__.metadata.getOrCreateOwn(aurelia_metadata__WEBPACK_IMPORTED_MODULE_2__.metadata.resource, aurelia_templating__WEBPACK_IMPORTED_MODULE_3__.HtmlBehaviorResource, TCustomAttribute);
    r.aliases = aliases;
  };

  function TCustomAttribute(element, i18n, ea, tparams) {
    

    this.element = element;
    this.service = i18n;
    this.ea = ea;
    this.lazyParams = tparams;
  }

  TCustomAttribute.prototype.bind = function bind() {
    var _this = this;

    this.params = this.lazyParams();

    if (this.params) {
      this.params.valueChanged = function (newParams, oldParams) {
        _this.paramsChanged(_this.value, newParams, oldParams);
      };
    }

    var p = this.params !== null ? this.params.value : undefined;
    this.subscription = this.ea.subscribe('i18n:locale:changed', function () {
      _this.service.updateValue(_this.element, _this.value, _this.params !== null ? _this.params.value : undefined);
    });

    this.service.updateValue(this.element, this.value, p);
  };

  TCustomAttribute.prototype.paramsChanged = function paramsChanged(newValue, newParams) {
    this.service.updateValue(this.element, newValue, newParams);
  };

  TCustomAttribute.prototype.valueChanged = function valueChanged(newValue) {
    var p = this.params !== null ? this.params.value : undefined;
    this.service.updateValue(this.element, newValue, p);
  };

  TCustomAttribute.prototype.unbind = function unbind() {
    if (this.subscription) {
      this.subscription.dispose();
    }
  };

  return TCustomAttribute;
}(), _class4.inject = [Element, _i18n__WEBPACK_IMPORTED_MODULE_0__.I18N, aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_1__.EventAggregator, _utils__WEBPACK_IMPORTED_MODULE_6__.LazyOptional.of(TParamsCustomAttribute)], _temp2)) || _class3);

var TBindingBehavior = (_temp3 = _class5 = function () {
  function TBindingBehavior(signalBindingBehavior) {
    

    this.signalBindingBehavior = signalBindingBehavior;
  }

  TBindingBehavior.prototype.bind = function bind(binding, source) {
    this.signalBindingBehavior.bind(binding, source, 'aurelia-translation-signal');

    var sourceExpression = binding.sourceExpression;

    if (sourceExpression.rewritten) {
      return;
    }
    sourceExpression.rewritten = true;

    var expression = sourceExpression.expression;
    sourceExpression.expression = new aurelia_binding__WEBPACK_IMPORTED_MODULE_5__.ValueConverter(expression, 't', sourceExpression.args, [expression].concat(sourceExpression.args));
  };

  TBindingBehavior.prototype.unbind = function unbind(binding, source) {
    this.signalBindingBehavior.unbind(binding, source);
  };

  return TBindingBehavior;
}(), _class5.inject = [aurelia_templating_resources__WEBPACK_IMPORTED_MODULE_4__.SignalBindingBehavior], _temp3);

/***/ }),

/***/ 5537:
/*!****************************************************************!*\
  !*** ./node_modules/aurelia-i18n/dist/native-modules/utils.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LazyOptional: function() { return /* binding */ LazyOptional; },
/* harmony export */   assignObjectToKeys: function() { return /* binding */ assignObjectToKeys; },
/* harmony export */   extend: function() { return /* binding */ extend; },
/* harmony export */   isInteger: function() { return /* binding */ isInteger; }
/* harmony export */ });
/* harmony import */ var aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-dependency-injection */ 6158);
var _dec, _class;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };





var extend = function extend(destination, source) {
  for (var property in source) {
    destination[property] = source[property];
  }

  return destination;
};

var isInteger = Number.isInteger || function (value) {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
};

var assignObjectToKeys = function assignObjectToKeys(root, obj) {
  if (obj === undefined || obj === null) {
    return obj;
  }

  var opts = {};

  Object.keys(obj).map(function (key) {
    if (_typeof(obj[key]) === 'object') {
      extend(opts, assignObjectToKeys(key, obj[key]));
    } else {
      opts[root !== '' ? root + '.' + key : key] = obj[key];
    }
  });

  return opts;
};

var LazyOptional = (_dec = (0,aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_0__.resolver)(), _dec(_class = function () {
  function LazyOptional(key) {
    

    this.key = key;
  }

  LazyOptional.prototype.get = function get(container) {
    var _this = this;

    return function () {
      if (container.hasResolver(_this.key, false)) {
        return container.get(_this.key);
      }
      return null;
    };
  };

  LazyOptional.of = function of(key) {
    return new LazyOptional(key);
  };

  return LazyOptional;
}()) || _class);

/***/ })

}]);
//# sourceMappingURL=vendors-319a6989.2384d3fce1a12a237460.bundle.js.map