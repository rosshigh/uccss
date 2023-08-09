(self["webpackChunkuccss_old_new"] = self["webpackChunkuccss_old_new"] || []).push([["vendors-da7e83e9"],{

/***/ "aurelia-testing":
/*!*****************************************************************************!*\
  !*** ./node_modules/aurelia-testing/dist/native-modules/aurelia-testing.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CompileSpy: function() { return /* binding */ CompileSpy; },
/* harmony export */   ComponentTester: function() { return /* binding */ ComponentTester; },
/* harmony export */   StageComponent: function() { return /* binding */ StageComponent; },
/* harmony export */   ViewSpy: function() { return /* binding */ ViewSpy; },
/* harmony export */   configure: function() { return /* binding */ configure; },
/* harmony export */   waitFor: function() { return /* binding */ waitFor; },
/* harmony export */   waitForDocumentElement: function() { return /* binding */ waitForDocumentElement; },
/* harmony export */   waitForDocumentElements: function() { return /* binding */ waitForDocumentElements; }
/* harmony export */ });
/* harmony import */ var aurelia_templating__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-templating */ 1781);
/* harmony import */ var aurelia_logging__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-logging */ 8099);
/* harmony import */ var aurelia_pal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! aurelia-pal */ 1015);




var CompileSpy = (function () {
    function CompileSpy(element, instruction) {
        (0,aurelia_logging__WEBPACK_IMPORTED_MODULE_1__.getLogger)('compile-spy').info(element.toString(), instruction);
    }
    Object.defineProperty(CompileSpy, "inject", {
        get: function () { return [aurelia_pal__WEBPACK_IMPORTED_MODULE_2__.DOM.Element, aurelia_templating__WEBPACK_IMPORTED_MODULE_0__.TargetInstruction]; },
        enumerable: false,
        configurable: true
    });
    CompileSpy.$resource = {
        type: 'attribute',
        name: 'compile-spy'
    };
    return CompileSpy;
}());

var ViewSpy = (function () {
    function ViewSpy() {
        this.logger = (0,aurelia_logging__WEBPACK_IMPORTED_MODULE_1__.getLogger)('view-spy');
    }
    ViewSpy.prototype._log = function (lifecycleName, context) {
        if (!this.value && lifecycleName === 'created') {
            this.logger.info(lifecycleName, this.view);
        }
        else if (this.value && this.value.indexOf(lifecycleName) !== -1) {
            this.logger.info(lifecycleName, this.view, context);
        }
    };
    ViewSpy.prototype.created = function (view) {
        this.view = view;
        this._log('created');
    };
    ViewSpy.prototype.bind = function (bindingContext) {
        this._log('bind', bindingContext);
    };
    ViewSpy.prototype.attached = function () {
        this._log('attached');
    };
    ViewSpy.prototype.detached = function () {
        this._log('detached');
    };
    ViewSpy.prototype.unbind = function () {
        this._log('unbind');
    };
    ViewSpy.$resource = {
        type: 'attribute',
        name: 'view-spy'
    };
    return ViewSpy;
}());

/******************************************************************************
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

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function waitFor(getter, options) {
    if (options === void 0) { options = { present: true, interval: 50, timeout: 5000 }; }
    var timedOut = false;
    options = __assign({ present: true, interval: 50, timeout: 5000 }, options);
    function wait() {
        var element = getter();
        var found = element !== null && (!(element instanceof NodeList) &&
            !element.jquery || element.length > 0);
        if (!options.present === !found || timedOut) {
            return Promise.resolve(element);
        }
        return new Promise(function (rs) { return setTimeout(rs, options.interval); }).then(wait);
    }
    return Promise.race([
        new Promise(function (_, rj) { return setTimeout(function () {
            timedOut = true;
            rj(new Error(options.present ? 'Element not found' : 'Element not removed'));
        }, options.timeout); }),
        wait()
    ]);
}
function waitForDocumentElement(selector, options) {
    return waitFor(function () { return document.querySelector(selector); }, options);
}
function waitForDocumentElements(selector, options) {
    return waitFor(function () { return document.querySelectorAll(selector); }, options);
}

var StageComponent = (function () {
    function StageComponent() {
    }
    StageComponent.withResources = function (resources) {
        if (resources === void 0) { resources = []; }
        return new ComponentTester().withResources(resources);
    };
    return StageComponent;
}());
var ComponentTester = (function () {
    function ComponentTester() {
        this.resources = [];
    }
    ComponentTester.prototype.configure = function (aurelia) {
        return aurelia.use.standardConfiguration();
    };
    ComponentTester.prototype.bootstrap = function (configure) {
        this.configure = configure;
    };
    ComponentTester.prototype.withResources = function (resources) {
        this.resources = resources;
        return this;
    };
    ComponentTester.prototype.inView = function (html) {
        this.html = html;
        return this;
    };
    ComponentTester.prototype.boundTo = function (bindingContext) {
        this.bindingContext = bindingContext;
        return this;
    };
    ComponentTester.prototype.manuallyHandleLifecycle = function () {
        this._prepareLifecycle();
        return this;
    };
    ComponentTester.prototype.create = function (bootstrap) {
        var _this = this;
        return bootstrap(function (aurelia) {
            return Promise.resolve(_this.configure(aurelia)).then(function () {
                if (_this.resources) {
                    aurelia.use.globalResources(_this.resources);
                }
                return aurelia.start().then(function () {
                    _this.host = document.createElement('div');
                    _this.host.innerHTML = _this.html;
                    document.body.appendChild(_this.host);
                    return aurelia.enhance(_this.bindingContext, _this.host).then(function () {
                        _this.rootView = aurelia.root;
                        _this.element = _this.host.firstElementChild;
                        if (aurelia.root.controllers.length) {
                            _this.viewModel = aurelia.root.controllers[0].viewModel;
                        }
                        return new Promise(function (resolve) { return setTimeout(function () { return resolve(); }, 0); });
                    });
                });
            });
        });
    };
    ComponentTester.prototype.dispose = function () {
        if (this.host === undefined || this.rootView === undefined) {
            throw new Error('Cannot call ComponentTester.dispose() before ComponentTester.create()');
        }
        this.rootView.detached();
        this.rootView.unbind();
        return this.host.parentNode.removeChild(this.host);
    };
    ComponentTester.prototype._prepareLifecycle = function () {
        var _this = this;
        var bindPrototype = aurelia_templating__WEBPACK_IMPORTED_MODULE_0__.View.prototype.bind;
        aurelia_templating__WEBPACK_IMPORTED_MODULE_0__.View.prototype.bind = function () { };
        this.bind = function (bindingContext) { return new Promise(function (resolve) {
            aurelia_templating__WEBPACK_IMPORTED_MODULE_0__.View.prototype.bind = bindPrototype;
            if (bindingContext !== undefined) {
                _this.bindingContext = bindingContext;
            }
            _this.rootView.bind(_this.bindingContext);
            setTimeout(function () { return resolve(); }, 0);
        }); };
        var attachedPrototype = aurelia_templating__WEBPACK_IMPORTED_MODULE_0__.View.prototype.attached;
        aurelia_templating__WEBPACK_IMPORTED_MODULE_0__.View.prototype.attached = function () { };
        this.attached = function () { return new Promise(function (resolve) {
            aurelia_templating__WEBPACK_IMPORTED_MODULE_0__.View.prototype.attached = attachedPrototype;
            _this.rootView.attached();
            setTimeout(function () { return resolve(); }, 0);
        }); };
        this.detached = function () { return new Promise(function (resolve) {
            _this.rootView.detached();
            setTimeout(function () { return resolve(); }, 0);
        }); };
        this.unbind = function () { return new Promise(function (resolve) {
            _this.rootView.unbind();
            setTimeout(function () { return resolve(); }, 0);
        }); };
    };
    ComponentTester.prototype.waitForElement = function (selector, options) {
        var _this = this;
        return waitFor(function () { return _this.element.querySelector(selector); }, options);
    };
    ComponentTester.prototype.waitForElements = function (selector, options) {
        var _this = this;
        return waitFor(function () { return _this.element.querySelectorAll(selector); }, options);
    };
    return ComponentTester;
}());

function configure(config) {
    config.globalResources([CompileSpy, ViewSpy]);
}


//# sourceMappingURL=aurelia-testing.js.map


/***/ }),

/***/ 4639:
/*!********************************************************************!*\
  !*** ./node_modules/aurelia-webpack-plugin/runtime/empty-entry.js ***!
  \********************************************************************/
/***/ (function() {

// This file contains an empty module that does nothing.
// It's meant to be added as an entry point to the main bundle
// and helps reliably adding some Aurelia dependencies that are attached 
// to no module in particular, such as `includeAll` results or `aureliaApp`.
//
// Trying to attach those dependencies to, for example, 'aurelia-bootstrapper' 
// is unreliable if 'aurelia-bootstrapper' is in a DLL outside the bundle.
//
// Trying to attach to 'aurelia-loader-webpack' works well, unless a user
// configures a customized loader instead (unlikely, but in theory supported).


/***/ }),

/***/ 3231:
/*!*************************************************************************!*\
  !*** ./node_modules/aurelia-webpack-plugin/runtime/pal-loader-entry.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var aurelia_pal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-pal */ 1015);
// With default aurelia-loader-webpack config, this module is added as an extra entry
// before any other code executes so that PAL.Loader is properly configured.
// There are several tricky points worth noticing.
// 
// We don't add aurelia-loader-webpack itself as an entry point (used to until 2.0 RC2)
// because it (transitively) brings too much bagage with itself, most notably polyfills.
// This made it super-hard to add other polyfills before Aurelia's and led to various bugs.
//
// We don't add custom code in aurelia-pal or aurelia-loader or aurelia-bootstrapper to detect
// the Webpack environment and configure the loader because they might live in a DLL.
// If they do, they would bring aurelia-loader-webpack along in the DLL and this is a special 
// library that *has to be in the main chunk.*
//
// The over-complicated design I've settled upon in the end is to use this special module
// as an entry point that configures aurelia-loader-webpack. It has minimal static imports:
// just aurelia-pal, which itself has no other dependencies and doesn't run much code.
// It hacks the loader field into a getter so that it can synchronously load aurelia-loader-webpack
// just in time when it is demanded by aurelia-bootstrapper.
// This enables users to load polyfills before aurelia-loader-webpack is actually loaded.



var Loader;

Object.defineProperty(aurelia_pal__WEBPACK_IMPORTED_MODULE_0__.PLATFORM, "Loader", {
  get: function() {
    return Loader || (Loader = (__webpack_require__(/*! aurelia-loader-webpack */ 8757).WebpackLoader));
  },
  set: function(value) {
    Loader = value;
  }
});


/***/ })

}]);
//# sourceMappingURL=vendors-da7e83e9.2384d3fce1a12a237460.bundle.js.map