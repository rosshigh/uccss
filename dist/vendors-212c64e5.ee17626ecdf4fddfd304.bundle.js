"use strict";
(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([["vendors-212c64e5"],{

/***/ "au-table/au-table-pagination":
/*!********************************************************************!*\
  !*** ./node_modules/au-table/dist/commonjs/au-table-pagination.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.AutPaginationCustomElement = undefined;

var _dec, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11;

var _aureliaFramework = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var AutPaginationCustomElement = exports.AutPaginationCustomElement = (_dec = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), (_class = function () {
  function AutPaginationCustomElement() {
    _classCallCheck(this, AutPaginationCustomElement);

    _initDefineProp(this, 'currentPage', _descriptor, this);

    _initDefineProp(this, 'pageSize', _descriptor2, this);

    _initDefineProp(this, 'totalItems', _descriptor3, this);

    _initDefineProp(this, 'hideSinglePage', _descriptor4, this);

    _initDefineProp(this, 'paginationSize', _descriptor5, this);

    _initDefineProp(this, 'boundaryLinks', _descriptor6, this);

    _initDefineProp(this, 'firstText', _descriptor7, this);

    _initDefineProp(this, 'lastText', _descriptor8, this);

    _initDefineProp(this, 'directionLinks', _descriptor9, this);

    _initDefineProp(this, 'previousText', _descriptor10, this);

    _initDefineProp(this, 'nextText', _descriptor11, this);

    this.totalPages = 1;
    this.displayPages = [];
  }

  AutPaginationCustomElement.prototype.bind = function bind() {
    if (this.currentPage === undefined || this.currentPage === null || this.currentPage < 1) {
      this.currentPage = 1;
    }

    if (this.pageSize === undefined || this.pageSize === null || this.pageSize < 1) {
      this.pageSize = 5;
    }
  };

  AutPaginationCustomElement.prototype.totalItemsChanged = function totalItemsChanged() {
    this.currentPage = 1;
    this.calculatePages();
  };

  AutPaginationCustomElement.prototype.pageSizeChanged = function pageSizeChanged() {
    this.currentPage = 1;
    this.calculatePages();
  };

  AutPaginationCustomElement.prototype.currentPageChanged = function currentPageChanged() {
    this.calculatePages();
  };

  AutPaginationCustomElement.prototype.calculatePages = function calculatePages() {
    if (this.pageSize === 0) {
      this.totalPages = 1;
    } else {
      this.totalPages = this.totalItems <= this.pageSize ? 1 : Math.ceil(this.totalItems / this.pageSize);
    }

    if (isNaN(this.paginationSize) || this.paginationSize <= 0) {
      this.displayAllPages();
    } else {
      this.limitVisiblePages();
    }
  };

  AutPaginationCustomElement.prototype.displayAllPages = function displayAllPages() {
    var displayPages = [];

    for (var i = 1; i <= this.totalPages; i++) {
      displayPages.push({
        title: i.toString(),
        value: i
      });
    }
    this.displayPages = displayPages;
  };

  AutPaginationCustomElement.prototype.limitVisiblePages = function limitVisiblePages() {
    var displayPages = [];

    var totalTiers = Math.ceil(this.totalPages / this.paginationSize);

    var activeTier = Math.ceil(this.currentPage / this.paginationSize);

    var start = (activeTier - 1) * this.paginationSize + 1;
    var end = start + this.paginationSize;

    if (activeTier > 1) {
      displayPages.push({
        title: '...',
        value: start - 1
      });
    }

    for (var i = start; i < end; i++) {
      if (i > this.totalPages) {
        break;
      }

      displayPages.push({
        title: i.toString(),
        value: i
      });
    }

    if (activeTier < totalTiers) {
      displayPages.push({
        title: '...',
        value: end
      });
    }

    this.displayPages = displayPages;
  };

  AutPaginationCustomElement.prototype.selectPage = function selectPage(page) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }

    this.currentPage = page;
  };

  AutPaginationCustomElement.prototype.nextPage = function nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  };

  AutPaginationCustomElement.prototype.previousPage = function previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  };

  AutPaginationCustomElement.prototype.firstPage = function firstPage() {
    this.currentPage = 1;
  };

  AutPaginationCustomElement.prototype.lastPage = function lastPage() {
    this.currentPage = this.totalPages;
  };

  return AutPaginationCustomElement;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'currentPage', [_dec], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'pageSize', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'totalItems', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'hideSinglePage', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'paginationSize', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, 'boundaryLinks', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, 'firstText', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return 'First';
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, 'lastText', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return 'Last';
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, 'directionLinks', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, 'previousText', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return '<';
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class.prototype, 'nextText', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return '>';
  }
})), _class));

/***/ }),

/***/ "au-table/au-table-select":
/*!****************************************************************!*\
  !*** ./node_modules/au-table/dist/commonjs/au-table-select.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.AutSelectCustomAttribute = undefined;

var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

var _aureliaFramework = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");

var _auTable = __webpack_require__(/*! ./au-table */ "au-table/au-table");

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var AutSelectCustomAttribute = exports.AutSelectCustomAttribute = (_dec = (0, _aureliaFramework.inject)(_auTable.AureliaTableCustomAttribute, Element, _aureliaFramework.BindingEngine), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
  function AutSelectCustomAttribute(auTable, element, bindingEngine) {
    var _this = this;

    _classCallCheck(this, AutSelectCustomAttribute);

    _initDefineProp(this, 'row', _descriptor, this);

    _initDefineProp(this, 'mode', _descriptor2, this);

    _initDefineProp(this, 'selectedClass', _descriptor3, this);

    _initDefineProp(this, 'custom', _descriptor4, this);

    this.auTable = auTable;
    this.element = element;
    this.bindingEngine = bindingEngine;

    this.rowSelectedListener = function (event) {
      _this.handleRowSelected(event);
    };
  }

  AutSelectCustomAttribute.prototype.attached = function attached() {
    var _this2 = this;

    if (!this.custom) {
      this.element.style.cursor = 'pointer';
      this.element.addEventListener('click', this.rowSelectedListener);
    }

    this.selectedSubscription = this.bindingEngine.propertyObserver(this.row, '$isSelected').subscribe(function () {
      return _this2.isSelectedChanged();
    });

    this.setClass();
  };

  AutSelectCustomAttribute.prototype.detached = function detached() {
    if (!this.custom) {
      this.element.removeEventListener('click', this.rowSelectedListener);
    }

    this.selectedSubscription.dispose();
  };

  AutSelectCustomAttribute.prototype.setClass = function setClass() {
    if (this.row.$isSelected) {
      this.element.classList.add(this.selectedClass);
    } else {
      this.element.classList.remove(this.selectedClass);
    }
  };

  AutSelectCustomAttribute.prototype.handleRowSelected = function handleRowSelected(event) {
    var source = event.target || event.srcElement;
    if (source.tagName.toLowerCase() !== 'td') {
      return;
    }
    this.row.$isSelected = this.row.$isSelected ? false : true;
  };

  AutSelectCustomAttribute.prototype.dispatchSelectedEvent = function dispatchSelectedEvent() {
    var selectedEvent = void 0;
    if (window.CustomEvent) {
      selectedEvent = new CustomEvent('select', {
        detail: { row: this.row },
        bubbles: true
      });
    } else {
      selectedEvent = document.createEvent('CustomEvent');
      selectedEvent.initCustomEvent('select', true, true, {
        detail: { row: this.row }
      });
    }
    this.element.dispatchEvent(selectedEvent);
  };

  AutSelectCustomAttribute.prototype.isSelectedChanged = function isSelectedChanged() {
    this.setClass();

    if (this.row.$isSelected) {
      if (this.mode === 'single') {
        this.deselectAll();
      }

      this.dispatchSelectedEvent();
    }
  };

  AutSelectCustomAttribute.prototype.deselectAll = function deselectAll() {
    var _this3 = this;

    this.auTable.data.forEach(function (item) {
      if (item !== _this3.row) {
        item.$isSelected = false;
      }
    });
  };

  return AutSelectCustomAttribute;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'row', [_dec2], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'mode', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return 'single';
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'selectedClass', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return 'aut-row-selected';
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'custom', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
})), _class2)) || _class);

/***/ }),

/***/ "au-table/au-table-sort":
/*!**************************************************************!*\
  !*** ./node_modules/au-table/dist/commonjs/au-table-sort.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.AutSortCustomAttribute = undefined;

var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

var _aureliaFramework = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");

var _auTable = __webpack_require__(/*! ./au-table */ "au-table/au-table");

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var AutSortCustomAttribute = exports.AutSortCustomAttribute = (_dec = (0, _aureliaFramework.inject)(_auTable.AureliaTableCustomAttribute, Element), _dec(_class = (_class2 = function () {
  function AutSortCustomAttribute(auTable, element) {
    var _this = this;

    _classCallCheck(this, AutSortCustomAttribute);

    _initDefineProp(this, 'key', _descriptor, this);

    _initDefineProp(this, 'custom', _descriptor2, this);

    _initDefineProp(this, 'default', _descriptor3, this);

    this.order = 0;
    this.orderClasses = ['aut-desc', 'aut-sortable', 'aut-asc'];
    this.ignoreEvent = false;

    this.auTable = auTable;
    this.element = element;

    this.rowSelectedListener = function () {
      _this.handleHeaderClicked();
    };

    this.sortChangedListener = function () {
      _this.handleSortChanged();
    };
  }

  AutSortCustomAttribute.prototype.handleSortChanged = function handleSortChanged() {
    if (!this.ignoreEvent) {
      this.order = 0;
      this.setClass();
    } else {
      this.ignoreEvent = false;
    }
  };

  AutSortCustomAttribute.prototype.attached = function attached() {
    if (this.key || this.custom) {
      this.element.style.cursor = 'pointer';
      this.element.classList.add('aut-sort');

      this.element.addEventListener('click', this.rowSelectedListener);
      this.auTable.addSortChangedListener(this.sortChangedListener);

      this.handleDefault();
      this.setClass();
    }
  };

  AutSortCustomAttribute.prototype.detached = function detached() {
    this.element.removeEventListener('click', this.rowSelectedListener);
    this.auTable.removeSortChangedListener(this.sortChangedListener);
  };

  AutSortCustomAttribute.prototype.handleDefault = function handleDefault() {
    if (this.default) {
      this.order = this.default === 'desc' ? -1 : 1;
      this.doSort();
    }
  };

  AutSortCustomAttribute.prototype.doSort = function doSort() {
    this.ignoreEvent = true;
    this.auTable.sortChanged(this.key, this.custom, this.order);
  };

  AutSortCustomAttribute.prototype.setClass = function setClass() {
    var _this2 = this;

    this.orderClasses.forEach(function (next) {
      return _this2.element.classList.remove(next);
    });
    this.element.classList.add(this.orderClasses[this.order + 1]);
  };

  AutSortCustomAttribute.prototype.handleHeaderClicked = function handleHeaderClicked() {
    this.order = this.order === 0 || this.order === -1 ? this.order + 1 : -1;
    this.setClass();
    this.doSort();
  };

  return AutSortCustomAttribute;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'key', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'custom', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'default', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
})), _class2)) || _class);

/***/ }),

/***/ "au-table/au-table":
/*!*********************************************************!*\
  !*** ./node_modules/au-table/dist/commonjs/au-table.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.AureliaTableCustomAttribute = undefined;

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;

var _aureliaFramework = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var AureliaTableCustomAttribute = exports.AureliaTableCustomAttribute = (_dec = (0, _aureliaFramework.inject)(_aureliaFramework.BindingEngine), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec3 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec4 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec5 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
  function AureliaTableCustomAttribute(bindingEngine) {
    _classCallCheck(this, AureliaTableCustomAttribute);

    _initDefineProp(this, 'data', _descriptor, this);

    _initDefineProp(this, 'displayData', _descriptor2, this);

    _initDefineProp(this, 'filters', _descriptor3, this);

    _initDefineProp(this, 'currentPage', _descriptor4, this);

    _initDefineProp(this, 'pageSize', _descriptor5, this);

    _initDefineProp(this, 'totalItems', _descriptor6, this);

    _initDefineProp(this, 'api', _descriptor7, this);

    this.isAttached = false;
    this.sortChangedListeners = [];
    this.beforePagination = [];
    this.filterObservers = [];

    this.bindingEngine = bindingEngine;
  }

  AureliaTableCustomAttribute.prototype.bind = function bind() {
    var _this = this;

    if (Array.isArray(this.data)) {
      this.dataObserver = this.bindingEngine.collectionObserver(this.data).subscribe(function () {
        return _this.applyPlugins();
      });
    }

    if (Array.isArray(this.filters)) {
      for (var _iterator = this.filters, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var filter = _ref;

        var observer = this.bindingEngine.propertyObserver(filter, 'value').subscribe(function () {
          return _this.filterChanged();
        });
        this.filterObservers.push(observer);
      }
    }

    this.api = {
      revealItem: function revealItem(item) {
        return _this.revealItem(item);
      }
    };
  };

  AureliaTableCustomAttribute.prototype.attached = function attached() {
    this.isAttached = true;
    this.applyPlugins();
  };

  AureliaTableCustomAttribute.prototype.detached = function detached() {
    if (this.dataObserver) {
      this.dataObserver.dispose();
    }

    for (var _iterator2 = this.filterObservers, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var observer = _ref2;

      observer.dispose();
    }
  };

  AureliaTableCustomAttribute.prototype.filterChanged = function filterChanged() {
    if (this.hasPagination()) {
      this.currentPage = 1;
    }
    this.applyPlugins();
  };

  AureliaTableCustomAttribute.prototype.currentPageChanged = function currentPageChanged() {
    this.applyPlugins();
  };

  AureliaTableCustomAttribute.prototype.pageSizeChanged = function pageSizeChanged() {
    this.applyPlugins();
  };

  AureliaTableCustomAttribute.prototype.getDataCopy = function getDataCopy() {
    return [].concat(this.data);
  };

  AureliaTableCustomAttribute.prototype.applyPlugins = function applyPlugins() {
    if (!this.isAttached || !this.data) {
      return;
    }

    var localData = this.getDataCopy();

    if (this.hasFilter()) {
      localData = this.doFilter(localData);
    }

    if ((this.sortKey || this.customSort) && this.sortOrder !== 0) {
      this.doSort(localData);
    }

    this.totalItems = localData.length;

    if (this.hasPagination()) {
      this.beforePagination = [].concat(localData);
      localData = this.doPaginate(localData);
    }

    this.displayData = localData;
  };

  AureliaTableCustomAttribute.prototype.doFilter = function doFilter(toFilter) {
    var filteredData = [];

    for (var _iterator3 = toFilter, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
      var _ref3;

      if (_isArray3) {
        if (_i3 >= _iterator3.length) break;
        _ref3 = _iterator3[_i3++];
      } else {
        _i3 = _iterator3.next();
        if (_i3.done) break;
        _ref3 = _i3.value;
      }

      var item = _ref3;

      var passed = true;

      for (var _iterator4 = this.filters, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
        var _ref4;

        if (_isArray4) {
          if (_i4 >= _iterator4.length) break;
          _ref4 = _iterator4[_i4++];
        } else {
          _i4 = _iterator4.next();
          if (_i4.done) break;
          _ref4 = _i4.value;
        }

        var filter = _ref4;

        if (!this.passFilter(item, filter)) {
          passed = false;
          break;
        }
      }

      if (passed) {
        filteredData.push(item);
      }
    }

    return filteredData;
  };

  AureliaTableCustomAttribute.prototype.passFilter = function passFilter(item, filter) {
    if (typeof filter.custom === 'function' && !filter.custom(filter.value, item)) {
      return false;
    }

    if (filter.value === null || filter.value === undefined || !Array.isArray(filter.keys)) {
      return true;
    }

    for (var _iterator5 = filter.keys, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
      var _ref5;

      if (_isArray5) {
        if (_i5 >= _iterator5.length) break;
        _ref5 = _iterator5[_i5++];
      } else {
        _i5 = _iterator5.next();
        if (_i5.done) break;
        _ref5 = _i5.value;
      }

      var key = _ref5;

      var value = this.getPropertyValue(item, key);

      if (value !== null && value !== undefined) {
        value = value.toString().toLowerCase();

        if (value.indexOf(filter.value.toString().toLowerCase()) > -1) {
          return true;
        }
      }
    }
    return false;
  };

  AureliaTableCustomAttribute.prototype.doSort = function doSort(toSort) {
    var _this2 = this;

    toSort.sort(function (a, b) {
      if (typeof _this2.customSort === 'function') {
        return _this2.customSort(a, b, _this2.sortOrder);
      }

      var val1 = void 0;
      var val2 = void 0;

      if (typeof _this2.sortKey === 'function') {
        val1 = _this2.sortKey(a, _this2.sortOrder);
        val2 = _this2.sortKey(b, _this2.sortOrder);
      } else {
        val1 = _this2.getPropertyValue(a, _this2.sortKey);
        val2 = _this2.getPropertyValue(b, _this2.sortKey);
      }

      if (val1 === null || val1 === undefined) val1 = '';
      if (val2 === null || val2 === undefined) val2 = '';

      if (_this2.isNumeric(val1) && _this2.isNumeric(val2)) {
        return (val1 - val2) * _this2.sortOrder;
      }

      var str1 = val1.toString();
      var str2 = val2.toString();

      return str1.localeCompare(str2) * _this2.sortOrder;
    });
  };

  AureliaTableCustomAttribute.prototype.getPropertyValue = function getPropertyValue(object, keyPath) {
    keyPath = keyPath.replace(/\[(\w+)\]/g, '.$1');
    keyPath = keyPath.replace(/^\./, '');
    var a = keyPath.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
      var k = a[i];
      if (k in object) {
        object = object[k];
      } else {
        return;
      }
    }
    return object;
  };

  AureliaTableCustomAttribute.prototype.isNumeric = function isNumeric(toCheck) {
    return !isNaN(parseFloat(toCheck)) && isFinite(toCheck);
  };

  AureliaTableCustomAttribute.prototype.doPaginate = function doPaginate(toPaginate) {
    if (toPaginate.length <= this.pageSize) {
      return toPaginate;
    }

    var start = (this.currentPage - 1) * this.pageSize;

    var end = start + this.pageSize;

    return toPaginate.slice(start, end);
  };

  AureliaTableCustomAttribute.prototype.hasFilter = function hasFilter() {
    return Array.isArray(this.filters) && this.filters.length > 0;
  };

  AureliaTableCustomAttribute.prototype.hasPagination = function hasPagination() {
    return this.currentPage > 0 && this.pageSize > 0;
  };

  AureliaTableCustomAttribute.prototype.dataChanged = function dataChanged() {
    var _this3 = this;

    if (this.dataObserver) {
      this.dataObserver.dispose();
    }

    this.dataObserver = this.bindingEngine.collectionObserver(this.data).subscribe(function () {
      return _this3.applyPlugins();
    });

    this.applyPlugins();
  };

  AureliaTableCustomAttribute.prototype.sortChanged = function sortChanged(key, custom, order) {
    this.sortKey = key;
    this.customSort = custom;
    this.sortOrder = order;
    this.applyPlugins();
    this.emitSortChanged();
  };

  AureliaTableCustomAttribute.prototype.addSortChangedListener = function addSortChangedListener(callback) {
    this.sortChangedListeners.push(callback);
  };

  AureliaTableCustomAttribute.prototype.removeSortChangedListener = function removeSortChangedListener(callback) {
    this.removeListener(callback, this.sortChangedListeners);
  };

  AureliaTableCustomAttribute.prototype.emitSortChanged = function emitSortChanged() {
    for (var _iterator6 = this.sortChangedListeners, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
      var _ref6;

      if (_isArray6) {
        if (_i6 >= _iterator6.length) break;
        _ref6 = _iterator6[_i6++];
      } else {
        _i6 = _iterator6.next();
        if (_i6.done) break;
        _ref6 = _i6.value;
      }

      var listener = _ref6;

      listener();
    }
  };

  AureliaTableCustomAttribute.prototype.removeListener = function removeListener(callback, listeners) {
    var index = listeners.indexOf(callback);

    if (index > -1) {
      listeners.splice(index, 1);
    }
  };

  AureliaTableCustomAttribute.prototype.revealItem = function revealItem(item) {
    if (!this.hasPagination()) {
      return true;
    }

    var index = this.beforePagination.indexOf(item);

    if (index === -1) {
      return false;
    }

    this.currentPage = Math.ceil((index + 1) / this.pageSize);

    return true;
  };

  return AureliaTableCustomAttribute;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'data', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'displayData', [_dec2], {
  enumerable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'filters', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'currentPage', [_dec3], {
  enumerable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'pageSize', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'totalItems', [_dec4], {
  enumerable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'api', [_dec5], {
  enumerable: true,
  initializer: null
})), _class2)) || _class);

/***/ }),

/***/ "au-table":
/*!******************************************************!*\
  !*** ./node_modules/au-table/dist/commonjs/index.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.AutSortCustomAttribute = exports.AutSelectCustomAttribute = exports.AutPaginationCustomElement = exports.AureliaTableCustomAttribute = undefined;
exports.configure = configure;

var _aureliaPal = __webpack_require__(/*! aurelia-pal */ 1015);

var _auTable = __webpack_require__(/*! ./au-table */ "au-table/au-table");

var _auTablePagination = __webpack_require__(/*! ./au-table-pagination */ "au-table/au-table-pagination");

var _auTableSelect = __webpack_require__(/*! ./au-table-select */ "au-table/au-table-select");

var _auTableSort = __webpack_require__(/*! ./au-table-sort */ "au-table/au-table-sort");

function configure(config) {
  config.globalResources('./au-table');
  config.globalResources('./au-table-pagination');
  config.globalResources('./au-table-select');
  config.globalResources('./au-table-sort');
}

exports.AureliaTableCustomAttribute = _auTable.AureliaTableCustomAttribute;
exports.AutPaginationCustomElement = _auTablePagination.AutPaginationCustomElement;
exports.AutSelectCustomAttribute = _auTableSelect.AutSelectCustomAttribute;
exports.AutSortCustomAttribute = _auTableSort.AutSortCustomAttribute;

/***/ }),

/***/ "au-table/au-table-pagination.html":
/*!**********************************************************************!*\
  !*** ./node_modules/au-table/dist/commonjs/au-table-pagination.html ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\n    <template replaceable part=\"pagination\">\n        <nav hide.bind=\"hideSinglePage && totalPages === 1\">\n            <ul class=\"pagination\">\n\n                <li class-name.bind=\"currentPage === 1 ? 'disabled' : ''\" if.bind=\"boundaryLinks\">\n                    <a aria-label=\"Previous\" click.delegate=\"firstPage()\">\n                        <span aria-hidden=\"true\" innerhtml.bind=\"firstText\"></span>\n                    </a>\n                </li>\n\n                <li class-name.bind=\"currentPage === 1 ? 'disabled' : ''\" if.bind=\"directionLinks\">\n                    <a aria-label=\"Previous\" click.delegate=\"previousPage()\">\n                        <span aria-hidden=\"true\" innerhtml.bind=\"previousText\"></span>\n                    </a>\n                </li>\n\n                <li repeat.for=\"page of displayPages\" class-name.bind=\"currentPage === page.value ? 'active' : ''\">\n                    <a click.delegate=\"selectPage(page.value)\">${page.title}</a>\n                </li>\n\n                <li class-name.bind=\"currentPage === totalPages ? 'disabled' : ''\" if.bind=\"directionLinks\">\n                    <a aria-label=\"Next\" click.delegate=\"nextPage()\">\n                        <span aria-hidden=\"true\" innerhtml.bind=\"nextText\"></span>\n                    </a>\n                </li>\n\n                <li class-name.bind=\"currentPage === totalPages ? 'disabled' : ''\" if.bind=\"boundaryLinks\">\n                    <a aria-label=\"Previous\" click.delegate=\"lastPage()\">\n                        <span aria-hidden=\"true\" innerhtml.bind=\"lastText\"></span>\n                    </a>\n                </li>\n            </ul>\n        </nav>\n    </template>\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ })

}]);
//# sourceMappingURL=vendors-212c64e5.ee17626ecdf4fddfd304.bundle.js.map