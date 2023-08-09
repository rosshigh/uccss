"use strict";
(self["webpackChunkuccss_old_new"] = self["webpackChunkuccss_old_new"] || []).push([["vendors-46c71041"],{

/***/ "aurelia-mask/masked-input":
/*!********************************************************!*\
  !*** ./node_modules/aurelia-mask/dist/masked-input.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var aurelia_framework_1 = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
var masker_1 = __webpack_require__(/*! ./masker */ 3918);
function findFirstInputElement(elt) {
    var elts = elt.getElementsByTagName("input");
    if (elts.length == 0) {
        throw new Error("'masked' attribute is not on an input element");
    }
    return elts[0];
}
var MaskedInput = (function () {
    function MaskedInput(element) {
        var _this = this;
        this.isAttached = false;
        this.element = element;
        this.preventBackspace = false;
        this.keyDownHandler = function (e) { return _this.onKeyDown(e); };
        this.keyUpHandler = function (e) { return _this.onKeyUp(e); };
        this.clickHandler = function (e) { return _this.onClick(e); };
        this.inputHandler = function (e) { return _this.onInput(e); };
        this.focusHandler = function (e) { return _this.onFocus(e); };
        this.selectHandler = function (e) { return _this.onSelect(e); };
    }
    MaskedInput.prototype.bind = function () {
        if (this.mask == null) {
            throw new Error("mask needs to be defined");
        }
        this.makeMasker();
        this.oldValue = this.masker.maskValue(this.numberToString(this.value));
        this.oldValueUnmasked = this.masker.unmaskValue(this.oldValue);
    };
    MaskedInput.prototype.attached = function () {
        this.isAttached = true;
        this.findInputElement();
        this.inputElement.addEventListener("keydown", this.keyDownHandler);
        this.inputElement.addEventListener('keyup', this.keyUpHandler);
        this.inputElement.addEventListener('input', this.inputHandler);
        this.inputElement.addEventListener('mouseup', this.clickHandler);
        this.inputElement.addEventListener('focus', this.focusHandler);
        this.inputElement.addEventListener('select', this.selectHandler);
        this.caretPos = this.getCaretPosition();
        this.inputElement.value = this.oldValue;
        this.updateUIValue(this.oldValue, false, this.minCaretPos, this.minCaretPos);
    };
    MaskedInput.prototype.findInputElement = function () {
        if (this.element.tagName.toLowerCase() === "input") {
            this.inputElement = this.element;
        }
        else if (this.findInput != null) {
            this.inputElement = this.findInput(this.element);
        }
        else {
            this.inputElement = findFirstInputElement(this.element);
        }
    };
    MaskedInput.prototype.detached = function () {
        this.inputElement.removeEventListener("keydown", this.keyDownHandler);
        this.inputElement.removeEventListener('keyup', this.keyUpHandler);
        this.inputElement.removeEventListener('input', this.inputHandler);
        this.inputElement.removeEventListener('mouseup', this.clickHandler);
        this.inputElement.removeEventListener('focus', this.focusHandler);
        this.inputElement.removeEventListener('select', this.selectHandler);
    };
    Object.defineProperty(MaskedInput.prototype, "maxCaretPos", {
        get: function () {
            if (this.masker == null) {
                return 0;
            }
            var valUnmasked = this.unmaskedModelValue;
            var caretPosMax = this.masker.maxCaretPos(valUnmasked);
            return caretPosMax;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskedInput.prototype, "minCaretPos", {
        get: function () {
            if (this.masker == null) {
                return 0;
            }
            return this.masker.minCaretPos();
        },
        enumerable: true,
        configurable: true
    });
    MaskedInput.prototype.onSelect = function (e) {
        this.oldSelectionLength = this.getSelectionLength();
    };
    MaskedInput.prototype.onClick = function (e) {
        e = e || {};
        var valUnmasked = this.unmaskedUIValue;
        var caretPos = this.getCaretPosition() || 0;
        var caretPosOld = this.oldCaretPosition || 0;
        var caretPosDelta = caretPos - caretPosOld;
        var selectionLenOld = this.oldSelectionLength || 0;
        var isSelected = this.getSelectionLength() > 0;
        var wasSelected = selectionLenOld > 0;
        var isKeyBackspace = (this.isDeletion() && (caretPosDelta === -1));
        var isKeyDelete = (this.isDeletion() && (caretPosDelta === 0) && !wasSelected);
        var caretBumpBack = caretPos > this.minCaretPos;
        this.oldSelectionLength = 0;
        if (isSelected) {
            this.oldCaretPosition = -1;
            return;
        }
        if (isKeyBackspace && this.preventBackspace) {
            this.inputElement.value = this.oldValue;
            this.setCaretPosition(caretPosOld);
            return;
        }
        this.updateUIValue(valUnmasked, caretBumpBack, caretPos, caretPosOld);
    };
    Object.defineProperty(MaskedInput.prototype, "unmaskedUIValue", {
        get: function () {
            if (this.isAttached) {
                var val = this.inputElement.value;
                var unmasked = this.masker.unmaskValue(val);
                return unmasked;
            }
            else {
                return this.numberToString(this.value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskedInput.prototype, "unmaskedModelValue", {
        get: function () {
            return this.getUnmaskedValue(this.value);
        },
        enumerable: true,
        configurable: true
    });
    MaskedInput.prototype.getUnmaskedValue = function (_val) {
        var val = this.numberToString(_val);
        var unmasked = this.masker.unmaskValue(val);
        return unmasked;
    };
    MaskedInput.prototype.isAddition = function (doterriblethings) {
        if (doterriblethings === void 0) { doterriblethings = false; }
        var val = this.unmaskedUIValue;
        var maskedVal = this.inputElement.value;
        if (doterriblethings && (this.bindMasking || this.aspnetMasking)) {
            val = this.inputElement.value;
        }
        var valOld = this.oldValueUnmasked;
        var oldMaskedVal = this.oldValue;
        var selectionLenOld = this.oldSelectionLength || 0;
        var _isAddition = (val.length > valOld.length) || (selectionLenOld && maskedVal.length > oldMaskedVal.length - selectionLenOld);
        return _isAddition;
    };
    MaskedInput.prototype.isSingleAddition = function () {
        var val = this.inputElement.value;
        var valOld = this.oldValueUnmasked;
        var selectionLenOld = this.oldSelectionLength || 0;
        var _isAddition = (val.length == valOld.length + 1);
        return _isAddition;
    };
    MaskedInput.prototype.isDeletion = function () {
        var val = this.inputElement.value;
        var valOld = this.oldValue;
        var selectionLenOld = this.oldSelectionLength || 0;
        var _isDeletion = (val.length < valOld.length) || (selectionLenOld && val.length === valOld.length - selectionLenOld);
        return _isDeletion;
    };
    MaskedInput.prototype.onInput = function (e) {
        e = e || {};
        var valUnmasked = this.unmaskedUIValue;
        var valUnmaskedOld = this.oldValueUnmasked;
        var caretPos = this.getCaretPosition() || 0;
        var caretPosOld = this.oldCaretPosition || 0;
        if (caretPosOld === -1) {
            caretPosOld = caretPos - 1;
        }
        var caretPosDelta = caretPos - caretPosOld;
        var selectionLenOld = this.oldSelectionLength || 0;
        var wasSelected = selectionLenOld > 0;
        if (this.isSingleAddition() && this.editMode === "overtype") {
            valUnmasked = this.inputElement.value;
            if (this.isValidCaretPosition(caretPosOld)) {
                var newChar = valUnmasked.charAt(caretPosOld);
                if (this.masker.isValidAt(newChar, caretPosOld)) {
                    valUnmasked = valUnmasked.substr(0, caretPos) + valUnmasked.substr(caretPos + 1);
                    valUnmasked = this.masker.unmaskValue(valUnmasked);
                }
                else {
                    valUnmasked = valUnmasked.substr(0, caretPosOld) + valUnmasked.substr(caretPosOld + 1);
                    valUnmasked = this.masker.unmaskValue(valUnmasked);
                }
                caretPos = this.masker.getNextCaretPos(caretPosOld);
            }
            else {
                var newChar = this.inputElement.value.charAt(caretPosOld) || "";
                if (!this.isValidCaretPosition(caretPos)) {
                    caretPos = this.masker.getNextCaretPos(caretPos);
                }
                valUnmasked = this.oldValue.substr(0, caretPos) + newChar + this.oldValue.substr(caretPos + 1);
                valUnmasked = this.masker.unmaskValue(valUnmasked);
                caretPos = this.masker.getNextCaretPos(caretPos);
            }
        }
        var isKeyBackspace = (this.isDeletion() && (caretPosDelta === -1));
        var isKeyDelete = (this.isDeletion() && (caretPosDelta === 0) && !wasSelected);
        var caretBumpBack = (isKeyBackspace) && caretPos > this.minCaretPos;
        if (wasSelected && this.isAddition(true)) {
            var startCaretPos = Math.min(caretPos, caretPosOld);
            if (caretPos < caretPosOld) {
                startCaretPos--;
            }
            if (selectionLenOld == this.oldValue.length && this.editMode === "insert") {
                var maskedValue = this.masker.maskValue(this.inputElement.value);
                var newDelta = maskedValue.length - (this.oldValue.length - selectionLenOld);
                caretPos = startCaretPos + newDelta;
            }
            else {
                var oldSelectionStart = startCaretPos;
                var oldSuffix = this.oldValue.substr(oldSelectionStart + selectionLenOld);
                var oldPrefix = this.oldValue.substr(0, oldSelectionStart);
                var newPart = this.inputElement.value;
                if (newPart.startsWith(oldPrefix)) {
                    newPart = newPart.substr(oldPrefix.length);
                }
                if (newPart.endsWith(oldSuffix)) {
                    newPart = newPart.substr(0, newPart.length - oldSuffix.length);
                }
                if (!this.isValidCaretPosition(startCaretPos)) {
                    startCaretPos = this.masker.getNextCaretPos(startCaretPos);
                }
                if (this.inputElement.value.length === 1) {
                    caretPos = this.masker.getNextCaretPos(startCaretPos);
                }
                else {
                    var newDelta = this.inputElement.value.length - (this.oldValue.length - selectionLenOld);
                    caretPos = startCaretPos + newDelta;
                }
                var allPlaceholder = this.masker.maskValue("");
                if (newPart.length < selectionLenOld) {
                    var caretDiff = startCaretPos - oldSelectionStart;
                    var fill = allPlaceholder.substr(startCaretPos + newPart.length, selectionLenOld - newPart.length - caretDiff);
                    var fillPrefix = allPlaceholder.substr(oldSelectionStart, caretDiff);
                    valUnmasked = oldPrefix + fillPrefix + newPart + fill + oldSuffix;
                    valUnmasked = this.masker.unmaskValue(valUnmasked);
                }
            }
        }
        this.oldSelectionLength = this.getSelectionLength();
        if (isKeyBackspace && this.preventBackspace && !wasSelected) {
            this.inputElement.value = this.oldValue;
            this.setCaretPosition(caretPosOld);
            return;
        }
        if (this.isDeletion() && !wasSelected && !this.isValidCaretPosition(caretPos)) {
            caretPos = this.masker.getPreviousCaretPos(caretPos);
            valUnmasked = this.masker.unmaskValue(this.oldValue.substring(0, caretPos) + this.oldValue.substring(caretPos + 1));
        }
        else if (this.isDeletion() && !wasSelected && valUnmasked === valUnmaskedOld) {
            while (isKeyBackspace && caretPos > this.minCaretPos && !this.isValidCaretPosition(caretPos)) {
                caretPos--;
            }
            while (isKeyDelete && caretPos < this.maxCaretPos && this.masker.maskCaretMap.indexOf(caretPos) === -1) {
                caretPos++;
            }
            var charIndex = this.masker.maskCaretMap.indexOf(caretPos);
            if (charIndex != 0) {
                if (!this.aspnetMasking) {
                    valUnmasked = valUnmasked.substring(0, charIndex) + valUnmasked.substring(charIndex + 1);
                }
            }
        }
        this.updateUIValue(valUnmasked, caretBumpBack, caretPos, caretPosOld);
        this._setValue(valUnmasked);
    };
    MaskedInput.prototype._setValue = function (newValue) {
        if (masker_1.isNumeric(newValue) && masker_1.isString(this.value) && this.numberToString(newValue) === this.value) {
            return;
        }
        if (masker_1.isNumeric(this.value) && masker_1.isString(newValue) && this.numberToString(this.value) === newValue) {
            return;
        }
        if (!this.value && this.value !== 0 && !newValue && newValue !== 0) {
            return;
        }
        if (this.change != null && newValue !== this.value) {
            this.change({ newValue: newValue, oldValue: this.value });
        }
        this.value = newValue;
    };
    MaskedInput.prototype.numberToString = function (val) {
        if (val == null)
            val = "";
        return "" + val;
    };
    MaskedInput.prototype.stringToNumber = function (val) {
        if (masker_1.isNumeric(val)) {
            return val;
        }
        return parseFloat(val);
    };
    MaskedInput.prototype.onFocus = function (e) {
        e = e || {};
        var valUnmasked = this.unmaskedUIValue;
        var caretPos = this.getCaretPosition() || 0;
        var caretPosOld = this.oldCaretPosition || 0;
        var caretPosDelta = caretPos - caretPosOld;
        var selectionLenOld = this.oldSelectionLength || 0;
        var wasSelected = selectionLenOld > 0;
        var isKeyBackspace = (this.isDeletion() && (caretPosDelta === -1));
        var isKeyDelete = (this.isDeletion() && (caretPosDelta === 0) && !wasSelected);
        var caretBumpBack = (isKeyBackspace) && caretPos > this.minCaretPos;
        this.oldSelectionLength = 0;
        if (isKeyBackspace && this.preventBackspace) {
            this.inputElement.value = this.oldValue;
            this.setCaretPosition(caretPosOld);
            return;
        }
        this.updateUIValue(valUnmasked, caretBumpBack, caretPos, caretPosOld);
        this.inputElement.setSelectionRange(0, this.inputElement.value.length);
        this.oldSelectionLength = this.getSelectionLength();
    };
    MaskedInput.prototype.onKeyUp = function (e) {
        e = e || {};
        var eventType = e.type;
        if (e.which === 16 || e.which === 91) {
            return;
        }
        var valUnmasked = this.unmaskedUIValue;
        var caretPos = this.getCaretPosition() || 0;
        var caretPosOld = this.oldCaretPosition || 0;
        var caretPosDelta = caretPos - caretPosOld;
        var selectionLenOld = this.oldSelectionLength || 0;
        var isSelected = this.getSelectionLength() > 0;
        var isSelection = (e.which >= 37 && e.which <= 40) && e.shiftKey;
        var isKeyLeftArrow = e.which === 37;
        var isKeyBackspace = e.which === 8;
        var isKeyDelete = e.which === 46;
        var caretBumpBack = (isKeyLeftArrow || isKeyBackspace) && caretPos > this.minCaretPos;
        this.oldSelectionLength = this.getSelectionLength();
        if (isSelection || isSelected) {
            return;
        }
        if (isKeyBackspace && this.preventBackspace) {
            this.inputElement.value = this.oldValue;
            this.setCaretPosition(caretPosOld);
            return;
        }
        this.updateUIValue(valUnmasked, caretBumpBack, caretPos, caretPosOld);
        this._setValue(valUnmasked);
    };
    MaskedInput.prototype.updateUIValue = function (valUnmasked, caretBumpBack, caretPos, caretPosOld) {
        var isAddition = this.isAddition();
        var valMasked = this.masker.maskValue(valUnmasked);
        var caretPosMin = this.minCaretPos;
        var caretPosMax = this.masker.maxCaretPos(valUnmasked);
        this.oldValue = valMasked;
        this.oldValueUnmasked = valUnmasked;
        if (this.isAttached) {
            this.inputElement.value = valMasked;
        }
        if (isAddition && (caretPos <= caretPosMin)) {
            caretPos = caretPosMin + 1;
        }
        if (caretBumpBack) {
            caretPos--;
        }
        caretPos = caretPos > caretPosMax ? caretPosMax : caretPos < caretPosMin ? caretPosMin : caretPos;
        while (!this.isValidCaretPosition(caretPos) && caretPos > caretPosMin && caretPos < caretPosMax) {
            caretPos += caretBumpBack ? -1 : 1;
        }
        if ((caretBumpBack && caretPos < caretPosMax) || (isAddition && !this.isValidCaretPosition(caretPosOld))) {
            caretPos++;
        }
        this.oldCaretPosition = caretPos;
        this.caretPos = caretPos;
        this.setCaretPosition(this.caretPos);
    };
    MaskedInput.prototype.getSelectionLength = function () {
        if (!this.inputElement)
            return 0;
        if (this.inputElement.selectionStart !== undefined) {
            return (this.inputElement.selectionEnd - this.inputElement.selectionStart);
        }
        if (document.selection) {
            return (document.selection.createRange().text.length);
        }
        return 0;
    };
    MaskedInput.prototype.onKeyDown = function (e) {
        var isKeyBackspace = e.which === 8;
        var oldCaretPos = this.getCaretPosition();
        var newCaretPosOnBksp = oldCaretPos - 1 || 0;
        if (isKeyBackspace) {
            while (newCaretPosOnBksp >= 0) {
                if (this.isValidCaretPosition(newCaretPosOnBksp)) {
                    this.caretPos = newCaretPosOnBksp;
                    break;
                }
                newCaretPosOnBksp--;
            }
            this.preventBackspace = newCaretPosOnBksp === -1;
        }
    };
    MaskedInput.prototype.getCaretPosition = function () {
        if (!this.inputElement)
            return 0;
        if (this.inputElement.selectionStart !== undefined) {
            return this.inputElement.selectionStart;
        }
        else if (document.selection) {
            if (this.isFocused()) {
                this.inputElement.focus();
                var selection = document.selection.createRange();
                selection.moveStart('character', this.inputElement.value ? -this.inputElement.value.length : 0);
                return selection.text.length;
            }
        }
        return 0;
    };
    MaskedInput.prototype.isValidCaretPosition = function (pos) {
        return this.masker.maskCaretMap.indexOf(pos) > -1;
    };
    MaskedInput.prototype.setCaretPosition = function (pos) {
        if (!this.inputElement)
            return 0;
        if (this.isHidden()) {
            return;
        }
        if (this.inputElement.setSelectionRange) {
            if (this.isFocused()) {
                this.inputElement.focus();
                this.inputElement.setSelectionRange(pos, pos);
            }
        }
        else if (this.inputElement.createTextRange) {
            var range = this.inputElement.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    };
    MaskedInput.prototype.isFocused = function () {
        return this.inputElement === document.activeElement && (!document.hasFocus || document.hasFocus()) &&
            !!(this.inputElement.type || this.inputElement.href || ~this.inputElement.tabIndex);
    };
    MaskedInput.prototype.isHidden = function () {
        return (this.inputElement.offsetWidth === 0 || this.inputElement.offsetHeight === 0);
    };
    MaskedInput.prototype.maskChanged = function () {
        this.makeMasker();
        this.setValue(this.value);
    };
    MaskedInput.prototype.makeMasker = function () {
        this.masker = masker_1.getMasker({
            maskFormat: this.mask,
            bindMasking: this.bindMasking,
            placeholder: this.placeholder,
            aspnetMasking: this.aspnetMasking
        });
    };
    MaskedInput.prototype.setValue = function (newValue) {
        var valUnmasked = this.getUnmaskedValue(newValue);
        var caretPos = this.getCaretPosition() || 0;
        var caretPosOld = this.oldCaretPosition || 0;
        var caretPosDelta = caretPos - caretPosOld;
        var selectionLenOld = this.oldSelectionLength || 0;
        var isSelected = this.getSelectionLength() > 0;
        var caretBumpBack = caretPos > this.minCaretPos;
        this.oldSelectionLength = this.getSelectionLength();
        if (this.editMode === "overtype") {
            var strippedOld = this.masker.stripPlaceholders(this.value);
            var strippedNew = this.masker.stripPlaceholders(newValue);
            caretBumpBack = caretBumpBack && strippedNew.length < strippedOld.length;
        }
        this.updateUIValue(valUnmasked, caretBumpBack, caretPos, caretPosOld);
        this._setValue(valUnmasked);
    };
    __decorate([
        aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
        __metadata("design:type", Object)
    ], MaskedInput.prototype, "value", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], MaskedInput.prototype, "mask", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], MaskedInput.prototype, "inputId", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], MaskedInput.prototype, "inputClass", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Boolean)
    ], MaskedInput.prototype, "disabled", void 0);
    __decorate([
        aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneTime, defaultValue: false }),
        __metadata("design:type", Boolean)
    ], MaskedInput.prototype, "bindMasking", void 0);
    __decorate([
        aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneTime, defaultValue: false }),
        __metadata("design:type", Boolean)
    ], MaskedInput.prototype, "aspnetMasking", void 0);
    __decorate([
        aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneTime, defaultValue: null }),
        __metadata("design:type", String)
    ], MaskedInput.prototype, "placeholder", void 0);
    __decorate([
        aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneTime, defaultValue: "insert" }),
        __metadata("design:type", String)
    ], MaskedInput.prototype, "editMode", void 0);
    __decorate([
        aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneTime, defaultValue: null }),
        __metadata("design:type", Function)
    ], MaskedInput.prototype, "findInput", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Function)
    ], MaskedInput.prototype, "change", void 0);
    MaskedInput = __decorate([
        aurelia_framework_1.customAttribute('masked'),
        aurelia_framework_1.inject(Element),
        __metadata("design:paramtypes", [Element])
    ], MaskedInput);
    return MaskedInput;
}());
exports.MaskedInput = MaskedInput;
//# sourceMappingURL=masked-input.js.map

/***/ }),

/***/ 3918:
/*!**************************************************!*\
  !*** ./node_modules/aurelia-mask/dist/masker.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
function getMasker(options) {
    var maskers = _maskers;
    var key = new MaskOptions();
    key.maskFormat = options.maskFormat;
    key.placeholder = options.placeholder || "_";
    key.bindMasking = !!options.bindMasking;
    key.aspnetMasking = !!options.aspnetMasking;
    var strkey = JSON.stringify(key);
    if (!maskers[strkey]) {
        maskers[strkey] = new Masker(key);
    }
    return maskers[strkey];
}
exports.getMasker = getMasker;
var MaskOptions = (function () {
    function MaskOptions() {
    }
    return MaskOptions;
}());
exports.MaskOptions = MaskOptions;
var _maskers = new Map();
var maskDefinitions = {
    '9': /\d/,
    'A': /[a-zA-Z]/,
    '*': /[a-zA-Z0-9]/
};
function deleteChars(s, ch) {
    if (s == null) {
        s = "";
    }
    return s.split(ch).join("");
}
var Masker = (function () {
    function Masker(options) {
        this.maskFormat = options.maskFormat;
        this.bindMasking = options.bindMasking;
        this.aspnetMasking = options.aspnetMasking;
        this.maskCaretMap = [];
        this.maskPatterns = [];
        this.maskPlaceholder = '';
        this.minRequiredLength = 0;
        this.maskComponents = null;
        this.maskProcessed = false;
        this.placeholder = options.placeholder;
        this.processRawMask();
    }
    Masker.prototype.unmaskValue = function (value) {
        if (this.aspnetMasking) {
            var result = this._maskValue2(value);
            return result;
        }
        else if (this.bindMasking) {
            return this._maskValue(value, true);
        }
        return this._unmaskValue(value);
    };
    Masker.prototype.maskValue = function (unmaskedValue) {
        if (this.aspnetMasking) {
            var result = this._maskValue2(unmaskedValue);
            return result;
        }
        return this._maskValue(unmaskedValue, false);
    };
    Masker.prototype.maxCaretPos = function (value) {
        var valueLength = -1;
        valueLength = value.length;
        if (this.aspnetMasking) {
            var caretPosMax = this.maskCaretMap.slice().pop();
            return caretPosMax;
        }
        else if (this.bindMasking) {
            if (this.maskCaretMap.indexOf(valueLength) != -1 ||
                valueLength === this.maskFormat.length) {
                return valueLength;
            }
            else {
                for (var i = 0; i < this.maskCaretMap.length; i++) {
                    if (this.maskCaretMap[i] > valueLength) {
                        return this.maskCaretMap[i];
                    }
                }
                return this.maskCaretMap.slice().shift();
            }
        }
        else {
            var caretPosMax = this.maskCaretMap[valueLength] || this.maskCaretMap.slice().shift();
            return caretPosMax;
        }
    };
    Masker.prototype.minCaretPos = function () {
        return this.maskCaretMap[0];
    };
    Masker.prototype._unmaskValue = function (value) {
        var valueUnmasked = '', maskPatternsCopy = this.maskPatterns.slice();
        value = value.toString();
        this.maskComponents.forEach(function (component) {
            value = value.replace(component, '');
        });
        value.split('').forEach(function (chr) {
            if (maskPatternsCopy.length && maskPatternsCopy[0].test(chr)) {
                valueUnmasked += chr;
                maskPatternsCopy.shift();
            }
        });
        return valueUnmasked;
    };
    Masker.prototype._maskValue = function (unmaskedValue, keepMasking) {
        var input = unmaskedValue || '';
        var valueMasked = '', maskCaretMapCopy = this.maskCaretMap.slice(), maskPatternsCopy = this.maskPatterns.slice();
        if (keepMasking) {
            input = this._unmaskValue(input);
        }
        function putMaybe(chr) {
            if (!keepMasking || input.length > 0) {
                valueMasked += chr;
            }
        }
        function putNextInput() {
            valueMasked += input.charAt(0);
        }
        function nextCharMatches() {
            return maskPatternsCopy[0].test(input.charAt(0));
        }
        function advanceInput() {
            input = input.substr(1);
        }
        function advanceCaretMap() {
            maskCaretMapCopy.shift();
        }
        function advancePatterns() {
            maskPatternsCopy.shift();
        }
        this.maskPlaceholder.split('').forEach(function (chr, i) {
            if (input.length > 0 && i === maskCaretMapCopy[0]) {
                if (maskPatternsCopy.length) {
                    while (input.length > 0 && !nextCharMatches()) {
                        advanceInput();
                    }
                }
                if (maskPatternsCopy.length && nextCharMatches()) {
                    putNextInput();
                    advanceCaretMap();
                    advancePatterns();
                }
                else {
                    putMaybe(chr);
                    maskCaretMapCopy.shift();
                }
                advanceInput();
            }
            else {
                if (input.length > 0 && input.charAt(0) === chr) {
                    advanceInput();
                }
                putMaybe(chr);
            }
        });
        return valueMasked;
    };
    Masker.prototype._maskValue2 = function (unmaskedValue) {
        var input;
        input = unmaskedValue || "";
        var valueMasked = '', maskCaretMapCopy = this.maskCaretMap.slice(), maskPatternsCopy = this.maskPatterns.slice();
        maskCaretMapCopy.pop();
        var placeholder = this.placeholder;
        function putMaybe(chr) {
            valueMasked += chr;
        }
        function putNextInput() {
            valueMasked += input.charAt(0);
        }
        function nextCharMatches() {
            if (input.charAt(0) == placeholder)
                return true;
            return maskPatternsCopy[0].test(input.charAt(0));
        }
        function advanceInput() {
            input = input.substr(1);
        }
        function advanceCaretMap() {
            maskCaretMapCopy.shift();
        }
        function advancePatterns() {
            maskPatternsCopy.shift();
        }
        this.maskPlaceholder.split('').forEach(function (chr, i) {
            if (input.length > 0 && i === maskCaretMapCopy[0]) {
                if (maskPatternsCopy.length && nextCharMatches()) {
                    putNextInput();
                    advanceCaretMap();
                    advancePatterns();
                }
                else {
                    putMaybe(chr);
                    maskCaretMapCopy.shift();
                }
                advanceInput();
            }
            else {
                while (input.length > 0 && input.charAt(0) === placeholder) {
                    advanceInput();
                }
                if (input.length > 0 && input.charAt(0) === chr) {
                    advanceInput();
                }
                putMaybe(chr);
            }
        });
        return valueMasked;
    };
    Masker.prototype.stripPlaceholders = function (masked) {
        return deleteChars(masked, this.placeholder);
    };
    Masker.prototype.getNextCaretPos = function (caretPos) {
        if (this.maskCaretMap.length == 0) {
            return this.maskFormat.length;
        }
        var ix = 0;
        while (ix < this.maskCaretMap.length - 1 && this.maskCaretMap[ix] <= caretPos) {
            ix++;
        }
        return this.maskCaretMap[ix];
    };
    Masker.prototype.getPreviousCaretPos = function (caretPos) {
        if (this.maskCaretMap.length == 0) {
            return 0;
        }
        var ix = this.maskCaretMap.length - 1;
        while (ix > 0 && this.maskCaretMap[ix] >= caretPos) {
            ix--;
        }
        return this.maskCaretMap[ix];
    };
    Masker.prototype.processRawMask = function () {
        var _this = this;
        var characterCount = 0;
        if (isString(this.maskFormat)) {
            var isOptional = false, numberOfOptionalCharacters = 0, splitMask = this.maskFormat.split('');
            splitMask.forEach(function (chr, i) {
                if (maskDefinitions[chr]) {
                    _this.maskCaretMap.push(characterCount);
                    _this.maskPlaceholder += _this.getPlaceholderChar(i - numberOfOptionalCharacters);
                    _this.maskPatterns.push(maskDefinitions[chr]);
                    characterCount++;
                    if (!isOptional) {
                        _this.minRequiredLength++;
                    }
                    isOptional = false;
                }
                else if (chr === '?') {
                    isOptional = true;
                    numberOfOptionalCharacters++;
                }
                else {
                    _this.maskPlaceholder += chr;
                    characterCount++;
                }
            });
        }
        this.maskCaretMap.push(this.maskCaretMap.slice().pop() + 1);
        this.getMaskComponents();
        this.maskProcessed = this.maskCaretMap.length > 1 ? true : false;
    };
    Masker.prototype.getMaskComponents = function () {
        var maskPlaceholderChars = this.maskPlaceholder.split(''), maskPlaceholderCopy;
        if (this.maskCaretMap && !isNaN(this.maskCaretMap[0])) {
            this.maskCaretMap.forEach(function (value) {
                maskPlaceholderChars[value] = '_';
            });
        }
        maskPlaceholderCopy = maskPlaceholderChars.join('');
        this.maskComponents = maskPlaceholderCopy.replace(/[_]+/g, '_').split('_');
    };
    Masker.prototype.getPlaceholderChar = function (i) {
        var defaultPlaceholderChar = this.placeholder;
        return (defaultPlaceholderChar.toLowerCase() === 'space') ? ' ' : defaultPlaceholderChar[0];
    };
    Masker.prototype.isValidAt = function (chr, caretPos) {
        var ix = this.maskCaretMap.indexOf(caretPos);
        if (ix == -1 || ix >= this.maskPatterns.length)
            return false;
        var pattern = this.maskPatterns[ix];
        return pattern.test(chr);
    };
    return Masker;
}());
exports.Masker = Masker;
function isString(myVar) {
    return (typeof myVar === 'string' || myVar instanceof String);
}
exports.isString = isString;
function isNumeric(n) {
    return !isString(n) && !isNaN(parseFloat(n)) && isFinite(n);
}
exports.isNumeric = isNumeric;
//# sourceMappingURL=masker.js.map

/***/ })

}]);
//# sourceMappingURL=vendors-46c71041.2384d3fce1a12a237460.bundle.js.map