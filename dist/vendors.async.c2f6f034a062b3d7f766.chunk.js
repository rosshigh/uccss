"use strict";
(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([["vendors.async"],{

/***/ 1990:
/*!*************************************************************************!*\
  !*** ./node_modules/aurelia-dialog/dist/native-modules/attach-focus.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AttachFocus": function() { return /* binding */ AttachFocus; }
/* harmony export */ });
/* harmony import */ var aurelia_pal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-pal */ 1015);


var AttachFocus = (function () {
    function AttachFocus(element) {
        this.element = element;
        this.value = true;
    }
    AttachFocus.inject = function () {
        return [aurelia_pal__WEBPACK_IMPORTED_MODULE_0__.DOM.Element];
    };
    AttachFocus.prototype.attached = function () {
        if (this.value === '' || (this.value && this.value !== 'false')) {
            this.element.focus();
        }
    };
    AttachFocus.$resource = {
        type: 'attribute',
        name: 'attach-focus'
    };
    return AttachFocus;
}());


//# sourceMappingURL=attach-focus.js.map


/***/ }),

/***/ 2010:
/*!***************************************************************************!*\
  !*** ./node_modules/aurelia-dialog/dist/native-modules/default-styles.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var css = "ux-dialog-overlay{bottom:0;left:0;position:fixed;top:0;right:0;opacity:0}ux-dialog-overlay.active{opacity:1}ux-dialog-container{display:block;transition:opacity .2s linear;opacity:0;overflow-x:hidden;overflow-y:auto;position:fixed;top:0;right:0;bottom:0;left:0;-webkit-overflow-scrolling:touch}ux-dialog-container.active{opacity:1}ux-dialog-container>div{padding:30px}ux-dialog-container>div>div{width:100%;display:block;min-width:300px;width:-moz-fit-content;width:-webkit-fit-content;width:fit-content;height:-moz-fit-content;height:-webkit-fit-content;height:fit-content;margin:auto}ux-dialog-container,ux-dialog-container>div,ux-dialog-container>div>div{outline:0}ux-dialog{width:100%;display:table;box-shadow:0 5px 15px rgba(0,0,0,.5);border:1px solid rgba(0,0,0,.2);border-radius:5px;padding:3;min-width:300px;width:-moz-fit-content;width:-webkit-fit-content;width:fit-content;height:-moz-fit-content;height:-webkit-fit-content;height:fit-content;margin:auto;border-image-source:none;border-image-slice:100%;border-image-width:1;border-image-outset:0;border-image-repeat:initial;background:#fff}ux-dialog>ux-dialog-header{display:block;padding:16px;border-bottom:1px solid #e5e5e5}ux-dialog>ux-dialog-header>button{float:right;border:none;display:block;width:32px;height:32px;background:none;font-size:22px;line-height:16px;margin:-14px -16px 0 0;padding:0;cursor:pointer}ux-dialog>ux-dialog-body{display:block;padding:16px}ux-dialog>ux-dialog-footer{display:block;padding:6px;border-top:1px solid #e5e5e5;text-align:right}ux-dialog>ux-dialog-footer button{color:#333;background-color:#fff;padding:6px 12px;font-size:14px;text-align:center;white-space:nowrap;vertical-align:middle;-ms-touch-action:manipulation;touch-action:manipulation;cursor:pointer;background-image:none;border:1px solid #ccc;border-radius:4px;margin:5px 0 5px 5px}ux-dialog>ux-dialog-footer button:disabled{cursor:default;opacity:.45}ux-dialog>ux-dialog-footer button:hover:enabled{color:#333;background-color:#e6e6e6;border-color:#adadad}.ux-dialog-open{overflow:hidden}";

/* harmony default export */ __webpack_exports__["default"] = (css);
//# sourceMappingURL=default-styles.js.map


/***/ }),

/***/ 1472:
/*!***********************************************************************************!*\
  !*** ./node_modules/aurelia-dialog/dist/native-modules/native-dialog-renderer.js ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NativeDialogRenderer": function() { return /* binding */ NativeDialogRenderer; }
/* harmony export */ });
/* harmony import */ var aurelia_pal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-pal */ 1015);
/* harmony import */ var aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-dependency-injection */ 6158);
/* harmony import */ var _ux_dialog_renderer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ux-dialog-renderer.js */ 2440);




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

var containerTagName = 'dialog';
var body;
var NativeDialogRenderer = (function () {
    function NativeDialogRenderer() {
    }
    NativeDialogRenderer_1 = NativeDialogRenderer;
    NativeDialogRenderer.keyboardEventHandler = function (e) {
        var key = (e.code || e.key) === 'Enter' || e.keyCode === 13
            ? 'Enter'
            : undefined;
        if (!key) {
            return;
        }
        var top = NativeDialogRenderer_1.dialogControllers[NativeDialogRenderer_1.dialogControllers.length - 1];
        if (!top || !top.settings.keyboard) {
            return;
        }
        var keyboard = top.settings.keyboard;
        if (key === 'Enter' && (keyboard === key || (Array.isArray(keyboard) && keyboard.indexOf(key) > -1))) {
            top.ok();
        }
    };
    NativeDialogRenderer.trackController = function (dialogController) {
        if (!NativeDialogRenderer_1.dialogControllers.length) {
            aurelia_pal__WEBPACK_IMPORTED_MODULE_0__.DOM.addEventListener('keyup', NativeDialogRenderer_1.keyboardEventHandler, false);
        }
        NativeDialogRenderer_1.dialogControllers.push(dialogController);
    };
    NativeDialogRenderer.untrackController = function (dialogController) {
        var i = NativeDialogRenderer_1.dialogControllers.indexOf(dialogController);
        if (i !== -1) {
            NativeDialogRenderer_1.dialogControllers.splice(i, 1);
        }
        if (!NativeDialogRenderer_1.dialogControllers.length) {
            aurelia_pal__WEBPACK_IMPORTED_MODULE_0__.DOM.removeEventListener('keyup', NativeDialogRenderer_1.keyboardEventHandler, false);
        }
    };
    NativeDialogRenderer.prototype.getOwnElements = function (parent, selector) {
        var elements = parent.querySelectorAll(selector);
        var own = [];
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].parentElement === parent) {
                own.push(elements[i]);
            }
        }
        return own;
    };
    NativeDialogRenderer.prototype.attach = function (dialogController) {
        if (dialogController.settings.restoreFocus) {
            this.lastActiveElement = aurelia_pal__WEBPACK_IMPORTED_MODULE_0__.DOM.activeElement;
        }
        var spacingWrapper = aurelia_pal__WEBPACK_IMPORTED_MODULE_0__.DOM.createElement('div');
        spacingWrapper.appendChild(this.anchor);
        this.dialogContainer = aurelia_pal__WEBPACK_IMPORTED_MODULE_0__.DOM.createElement(containerTagName);
        if (window.dialogPolyfill) {
            window.dialogPolyfill.registerDialog(this.dialogContainer);
        }
        this.dialogContainer.appendChild(spacingWrapper);
        var lastContainer = this.getOwnElements(this.host, containerTagName).pop();
        if (lastContainer && lastContainer.parentElement) {
            this.host.insertBefore(this.dialogContainer, lastContainer.nextSibling);
        }
        else {
            this.host.insertBefore(this.dialogContainer, this.host.firstChild);
        }
        dialogController.controller.attached();
        this.host.classList.add('ux-dialog-open');
    };
    NativeDialogRenderer.prototype.detach = function (dialogController) {
        if (this.dialogContainer.hasAttribute('open')) {
            this.dialogContainer.close();
        }
        this.host.removeChild(this.dialogContainer);
        dialogController.controller.detached();
        if (!NativeDialogRenderer_1.dialogControllers.length) {
            this.host.classList.remove('ux-dialog-open');
        }
        if (dialogController.settings.restoreFocus) {
            dialogController.settings.restoreFocus(this.lastActiveElement);
        }
    };
    NativeDialogRenderer.prototype.setAsActive = function () {
        this.dialogContainer.showModal();
        this.dialogContainer.classList.add('active');
    };
    NativeDialogRenderer.prototype.setAsInactive = function () {
        this.dialogContainer.classList.remove('active');
    };
    NativeDialogRenderer.prototype.setupEventHandling = function (dialogController) {
        this.stopPropagation = function (e) { e._aureliaDialogHostClicked = true; };
        this.closeDialogClick = function (e) {
            if (dialogController.settings.overlayDismiss && !e._aureliaDialogHostClicked) {
                dialogController.cancel();
            }
        };
        this.dialogCancel = function (e) {
            var keyboard = dialogController.settings.keyboard;
            var key = 'Escape';
            if (keyboard === true || keyboard === key || (Array.isArray(keyboard) && keyboard.indexOf(key) > -1)) {
                dialogController.cancel();
            }
            else {
                e.preventDefault();
            }
        };
        var mouseEvent = dialogController.settings.mouseEvent || 'click';
        this.dialogContainer.addEventListener(mouseEvent, this.closeDialogClick);
        this.dialogContainer.addEventListener('cancel', this.dialogCancel);
        this.anchor.addEventListener(mouseEvent, this.stopPropagation);
    };
    NativeDialogRenderer.prototype.clearEventHandling = function (dialogController) {
        var mouseEvent = dialogController.settings.mouseEvent || 'click';
        this.dialogContainer.removeEventListener(mouseEvent, this.closeDialogClick);
        this.dialogContainer.removeEventListener('cancel', this.dialogCancel);
        this.anchor.removeEventListener(mouseEvent, this.stopPropagation);
    };
    NativeDialogRenderer.prototype.awaitTransition = function (setActiveInactive, ignore) {
        var _this = this;
        return new Promise(function (resolve) {
            var renderer = _this;
            var eventName = (0,_ux_dialog_renderer_js__WEBPACK_IMPORTED_MODULE_2__.transitionEvent)();
            function onTransitionEnd(e) {
                if (e.target !== renderer.dialogContainer) {
                    return;
                }
                renderer.dialogContainer.removeEventListener(eventName, onTransitionEnd);
                resolve();
            }
            if (ignore || !(0,_ux_dialog_renderer_js__WEBPACK_IMPORTED_MODULE_2__.hasTransition)(_this.dialogContainer)) {
                resolve();
            }
            else {
                _this.dialogContainer.addEventListener(eventName, onTransitionEnd);
            }
            setActiveInactive();
        });
    };
    NativeDialogRenderer.prototype.getDialogContainer = function () {
        return this.anchor || (this.anchor = aurelia_pal__WEBPACK_IMPORTED_MODULE_0__.DOM.createElement('div'));
    };
    NativeDialogRenderer.prototype.showDialog = function (dialogController) {
        var _this = this;
        if (!body) {
            body = aurelia_pal__WEBPACK_IMPORTED_MODULE_0__.DOM.querySelector('body');
        }
        if (dialogController.settings.host) {
            this.host = dialogController.settings.host;
        }
        else {
            this.host = body;
        }
        var settings = dialogController.settings;
        this.attach(dialogController);
        if (typeof settings.position === 'function') {
            settings.position(this.dialogContainer);
        }
        NativeDialogRenderer_1.trackController(dialogController);
        this.setupEventHandling(dialogController);
        return this.awaitTransition(function () { return _this.setAsActive(); }, dialogController.settings.ignoreTransitions);
    };
    NativeDialogRenderer.prototype.hideDialog = function (dialogController) {
        var _this = this;
        this.clearEventHandling(dialogController);
        NativeDialogRenderer_1.untrackController(dialogController);
        return this.awaitTransition(function () { return _this.setAsInactive(); }, dialogController.settings.ignoreTransitions)
            .then(function () { _this.detach(dialogController); });
    };
    var NativeDialogRenderer_1;
    NativeDialogRenderer.dialogControllers = [];
    NativeDialogRenderer = NativeDialogRenderer_1 = __decorate([
        (0,aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_1__.transient)()
    ], NativeDialogRenderer);
    return NativeDialogRenderer;
}());


//# sourceMappingURL=native-dialog-renderer.js.map


/***/ }),

/***/ 778:
/*!***************************************************************************!*\
  !*** ./node_modules/aurelia-dialog/dist/native-modules/ux-dialog-body.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UxDialogBody": function() { return /* binding */ UxDialogBody; }
/* harmony export */ });
var UxDialogBody = (function () {
    function UxDialogBody() {
    }
    UxDialogBody.$view = "<template><slot></slot></template>";
    UxDialogBody.$resource = 'ux-dialog-body';
    return UxDialogBody;
}());


//# sourceMappingURL=ux-dialog-body.js.map


/***/ }),

/***/ 7007:
/*!*****************************************************************************!*\
  !*** ./node_modules/aurelia-dialog/dist/native-modules/ux-dialog-footer.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UxDialogFooter": function() { return /* binding */ UxDialogFooter; }
/* harmony export */ });
/* harmony import */ var _chunk_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunk.js */ 6885);


var UxDialogFooter = (function () {
    function UxDialogFooter(controller) {
        this.controller = controller;
        this.buttons = [];
        this.useDefaultButtons = false;
    }
    UxDialogFooter.isCancelButton = function (value) {
        return value === 'Cancel';
    };
    UxDialogFooter.prototype.close = function (buttonValue) {
        if (UxDialogFooter.isCancelButton(buttonValue)) {
            this.controller.cancel(buttonValue);
        }
        else {
            this.controller.ok(buttonValue);
        }
    };
    UxDialogFooter.prototype.useDefaultButtonsChanged = function (newValue) {
        if (newValue) {
            this.buttons = ['Cancel', 'Ok'];
        }
    };
    UxDialogFooter.inject = [_chunk_js__WEBPACK_IMPORTED_MODULE_0__.d];
    UxDialogFooter.$view = "<template>\n  <slot></slot>\n  <template if.bind=\"buttons.length > 0\">\n    <button type=\"button\"\n      class=\"btn btn-default\"\n      repeat.for=\"button of buttons\"\n      click.trigger=\"close(button)\">\n      ${button}\n    </button>\n  </template>\n</template>";
    UxDialogFooter.$resource = {
        name: 'ux-dialog-footer',
        bindables: ['buttons', 'useDefaultButtons']
    };
    return UxDialogFooter;
}());


//# sourceMappingURL=ux-dialog-footer.js.map


/***/ }),

/***/ 1287:
/*!*****************************************************************************!*\
  !*** ./node_modules/aurelia-dialog/dist/native-modules/ux-dialog-header.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UxDialogHeader": function() { return /* binding */ UxDialogHeader; }
/* harmony export */ });
/* harmony import */ var _chunk_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunk.js */ 6885);


var UxDialogHeader = (function () {
    function UxDialogHeader(controller) {
        this.controller = controller;
    }
    UxDialogHeader.prototype.bind = function () {
        if (typeof this.showCloseButton !== 'boolean') {
            this.showCloseButton = !this.controller.settings.lock;
        }
    };
    UxDialogHeader.inject = [_chunk_js__WEBPACK_IMPORTED_MODULE_0__.d];
    UxDialogHeader.$view = "<template>\n  <button\n    type=\"button\"\n    class=\"dialog-close\"\n    aria-label=\"Close\"\n    if.bind=\"showCloseButton\"\n    click.trigger=\"controller.cancel()\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n\n  <div class=\"dialog-header-content\">\n    <slot></slot>\n  </div>\n</template>";
    UxDialogHeader.$resource = {
        name: 'ux-dialog-header',
        bindables: ['showCloseButton']
    };
    return UxDialogHeader;
}());


//# sourceMappingURL=ux-dialog-header.js.map


/***/ }),

/***/ 2440:
/*!*******************************************************************************!*\
  !*** ./node_modules/aurelia-dialog/dist/native-modules/ux-dialog-renderer.js ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DialogRenderer": function() { return /* binding */ DialogRenderer; },
/* harmony export */   "UxDialogRenderer": function() { return /* binding */ DialogRenderer; },
/* harmony export */   "hasTransition": function() { return /* binding */ hasTransition; },
/* harmony export */   "transitionEvent": function() { return /* binding */ transitionEvent; }
/* harmony export */ });
/* harmony import */ var aurelia_pal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-pal */ 1015);
/* harmony import */ var aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-dependency-injection */ 6158);



var containerTagName = 'ux-dialog-container';
var overlayTagName = 'ux-dialog-overlay';
var transitionEvent = (function () {
    var transition;
    return function () {
        if (transition) {
            return transition;
        }
        var el = aurelia_pal__WEBPACK_IMPORTED_MODULE_0__.DOM.createElement('fakeelement');
        var transitions = {
            transition: 'transitionend',
            OTransition: 'oTransitionEnd',
            MozTransition: 'transitionend',
            WebkitTransition: 'webkitTransitionEnd'
        };
        for (var t in transitions) {
            if (el.style[t] !== undefined) {
                transition = transitions[t];
                return transition;
            }
        }
        return '';
    };
})();
var hasTransition = (function () {
    var unprefixedName = 'transitionDuration';
    var prefixedNames = ['webkitTransitionDuration', 'oTransitionDuration'];
    var el;
    var transitionDurationName;
    return function (element) {
        if (!el) {
            el = aurelia_pal__WEBPACK_IMPORTED_MODULE_0__.DOM.createElement('fakeelement');
            if (unprefixedName in el.style) {
                transitionDurationName = unprefixedName;
            }
            else {
                transitionDurationName = prefixedNames.find(function (prefixed) { return (prefixed in el.style); });
            }
        }
        return !!transitionDurationName && !!(aurelia_pal__WEBPACK_IMPORTED_MODULE_0__.DOM.getComputedStyle(element)[transitionDurationName]
            .split(',')
            .find(function (duration) { return !!parseFloat(duration); }));
    };
})();
var body;
function getActionKey(e) {
    if ((e.code || e.key) === 'Escape' || e.keyCode === 27) {
        return 'Escape';
    }
    if ((e.code || e.key) === 'Enter' || e.keyCode === 13) {
        return 'Enter';
    }
    return undefined;
}
var DialogRenderer = (function () {
    function DialogRenderer() {
    }
    DialogRenderer.keyboardEventHandler = function (e) {
        var key = getActionKey(e);
        if (!key) {
            return;
        }
        var top = DialogRenderer.dialogControllers[DialogRenderer.dialogControllers.length - 1];
        if (!top || !top.settings.keyboard) {
            return;
        }
        var keyboard = top.settings.keyboard;
        if (key === 'Escape'
            && (keyboard === true || keyboard === key || (Array.isArray(keyboard) && keyboard.indexOf(key) > -1))) {
            top.cancel();
        }
        else if (key === 'Enter' && (keyboard === key || (Array.isArray(keyboard) && keyboard.indexOf(key) > -1))) {
            top.ok();
        }
    };
    DialogRenderer.trackController = function (dialogController) {
        var trackedDialogControllers = DialogRenderer.dialogControllers;
        if (!trackedDialogControllers.length) {
            aurelia_pal__WEBPACK_IMPORTED_MODULE_0__.DOM.addEventListener(dialogController.settings.keyEvent || 'keyup', DialogRenderer.keyboardEventHandler, false);
        }
        trackedDialogControllers.push(dialogController);
    };
    DialogRenderer.untrackController = function (dialogController) {
        var trackedDialogControllers = DialogRenderer.dialogControllers;
        var i = trackedDialogControllers.indexOf(dialogController);
        if (i !== -1) {
            trackedDialogControllers.splice(i, 1);
        }
        if (!trackedDialogControllers.length) {
            aurelia_pal__WEBPACK_IMPORTED_MODULE_0__.DOM.removeEventListener(dialogController.settings.keyEvent || 'keyup', DialogRenderer.keyboardEventHandler, false);
        }
    };
    DialogRenderer.prototype.getOwnElements = function (parent, selector) {
        var elements = parent.querySelectorAll(selector);
        var own = [];
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].parentElement === parent) {
                own.push(elements[i]);
            }
        }
        return own;
    };
    DialogRenderer.prototype.attach = function (dialogController) {
        if (dialogController.settings.restoreFocus) {
            this.lastActiveElement = aurelia_pal__WEBPACK_IMPORTED_MODULE_0__.DOM.activeElement;
        }
        var spacingWrapper = aurelia_pal__WEBPACK_IMPORTED_MODULE_0__.DOM.createElement('div');
        spacingWrapper.appendChild(this.anchor);
        var dialogContainer = this.dialogContainer = aurelia_pal__WEBPACK_IMPORTED_MODULE_0__.DOM.createElement(containerTagName);
        dialogContainer.appendChild(spacingWrapper);
        var dialogOverlay = this.dialogOverlay = aurelia_pal__WEBPACK_IMPORTED_MODULE_0__.DOM.createElement(overlayTagName);
        var zIndex = typeof dialogController.settings.startingZIndex === 'number'
            ? dialogController.settings.startingZIndex + ''
            : 'auto';
        dialogOverlay.style.zIndex = zIndex;
        dialogContainer.style.zIndex = zIndex;
        var host = this.host;
        var lastContainer = this.getOwnElements(host, containerTagName).pop();
        if (lastContainer && lastContainer.parentElement) {
            host.insertBefore(dialogContainer, lastContainer.nextSibling);
            host.insertBefore(dialogOverlay, lastContainer.nextSibling);
        }
        else {
            host.insertBefore(dialogContainer, host.firstChild);
            host.insertBefore(dialogOverlay, host.firstChild);
        }
        dialogController.controller.attached();
        host.classList.add('ux-dialog-open');
    };
    DialogRenderer.prototype.detach = function (dialogController) {
        var host = this.host;
        host.removeChild(this.dialogOverlay);
        host.removeChild(this.dialogContainer);
        dialogController.controller.detached();
        if (!DialogRenderer.dialogControllers.length) {
            host.classList.remove('ux-dialog-open');
        }
        if (dialogController.settings.restoreFocus) {
            dialogController.settings.restoreFocus(this.lastActiveElement);
        }
    };
    DialogRenderer.prototype.setAsActive = function () {
        this.dialogOverlay.classList.add('active');
        this.dialogContainer.classList.add('active');
    };
    DialogRenderer.prototype.setAsInactive = function () {
        this.dialogOverlay.classList.remove('active');
        this.dialogContainer.classList.remove('active');
    };
    DialogRenderer.prototype.setupEventHandling = function (dialogController) {
        this.stopPropagation = function (e) { e._aureliaDialogHostClicked = true; };
        this.closeDialogClick = function (e) {
            if (dialogController.settings.overlayDismiss && !e._aureliaDialogHostClicked) {
                dialogController.cancel();
            }
        };
        var mouseEvent = dialogController.settings.mouseEvent || 'click';
        this.dialogContainer.addEventListener(mouseEvent, this.closeDialogClick);
        this.anchor.addEventListener(mouseEvent, this.stopPropagation);
    };
    DialogRenderer.prototype.clearEventHandling = function (dialogController) {
        var mouseEvent = dialogController.settings.mouseEvent || 'click';
        this.dialogContainer.removeEventListener(mouseEvent, this.closeDialogClick);
        this.anchor.removeEventListener(mouseEvent, this.stopPropagation);
    };
    DialogRenderer.prototype.centerDialog = function () {
        var child = this.dialogContainer.children[0];
        var vh = Math.max(aurelia_pal__WEBPACK_IMPORTED_MODULE_0__.DOM.querySelectorAll('html')[0].clientHeight, window.innerHeight || 0);
        child.style.marginTop = Math.max((vh - child.offsetHeight) / 2, 30) + 'px';
        child.style.marginBottom = Math.max((vh - child.offsetHeight) / 2, 30) + 'px';
    };
    DialogRenderer.prototype.awaitTransition = function (setActiveInactive, ignore) {
        var _this = this;
        return new Promise(function (resolve) {
            var renderer = _this;
            var eventName = transitionEvent();
            function onTransitionEnd(e) {
                if (e.target !== renderer.dialogContainer) {
                    return;
                }
                renderer.dialogContainer.removeEventListener(eventName, onTransitionEnd);
                resolve();
            }
            if (ignore || !hasTransition(_this.dialogContainer)) {
                resolve();
            }
            else {
                _this.dialogContainer.addEventListener(eventName, onTransitionEnd);
            }
            setActiveInactive();
        });
    };
    DialogRenderer.prototype.getDialogContainer = function () {
        return this.anchor || (this.anchor = aurelia_pal__WEBPACK_IMPORTED_MODULE_0__.DOM.createElement('div'));
    };
    DialogRenderer.prototype.showDialog = function (dialogController) {
        var _this = this;
        if (!body) {
            body = aurelia_pal__WEBPACK_IMPORTED_MODULE_0__.DOM.querySelector('body');
        }
        if (dialogController.settings.host) {
            this.host = dialogController.settings.host;
        }
        else {
            this.host = body;
        }
        var settings = dialogController.settings;
        this.attach(dialogController);
        if (typeof settings.position === 'function') {
            settings.position(this.dialogContainer, this.dialogOverlay);
        }
        else if (!settings.centerHorizontalOnly) {
            this.centerDialog();
        }
        DialogRenderer.trackController(dialogController);
        this.setupEventHandling(dialogController);
        return this.awaitTransition(function () { return _this.setAsActive(); }, dialogController.settings.ignoreTransitions);
    };
    DialogRenderer.prototype.hideDialog = function (dialogController) {
        var _this = this;
        this.clearEventHandling(dialogController);
        DialogRenderer.untrackController(dialogController);
        return this.awaitTransition(function () { return _this.setAsInactive(); }, dialogController.settings.ignoreTransitions)
            .then(function () { _this.detach(dialogController); });
    };
    DialogRenderer.dialogControllers = [];
    return DialogRenderer;
}());
(0,aurelia_dependency_injection__WEBPACK_IMPORTED_MODULE_1__.transient)()(DialogRenderer);


//# sourceMappingURL=ux-dialog-renderer.js.map


/***/ }),

/***/ 843:
/*!**********************************************************************!*\
  !*** ./node_modules/aurelia-dialog/dist/native-modules/ux-dialog.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UxDialog": function() { return /* binding */ UxDialog; }
/* harmony export */ });
var UxDialog = (function () {
    function UxDialog() {
    }
    UxDialog.$view = "<template><slot></slot></template>";
    UxDialog.$resource = 'ux-dialog';
    return UxDialog;
}());


//# sourceMappingURL=ux-dialog.js.map


/***/ })

}]);
//# sourceMappingURL=vendors.async.c2f6f034a062b3d7f766.chunk.js.map