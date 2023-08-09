(self["webpackChunkuccss_old_new"] = self["webpackChunkuccss_old_new"] || []).push([["vendors-2c8f807c"],{

/***/ 881:
/*!********************************************!*\
  !*** ./node_modules/fuelux/js/checkbox.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global jQuery:true */

/*
 * Fuel UX Checkbox
 * https://github.com/ExactTarget/fuelux
 *
 * Copyright (c) 2014 ExactTarget
 * Licensed under the BSD New license.
 */

// -- BEGIN UMD WRAPPER PREFACE --

// For more information on UMD visit:
// https://github.com/umdjs/umd/blob/master/jqueryPlugin.js

(function umdFactory (factory) {
	if (true) {
		// if AMD loader is available, register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ 5311)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}(function CheckboxWrapper ($) {
	// -- END UMD WRAPPER PREFACE --

	// -- BEGIN MODULE CODE HERE --

	var old = $.fn.checkbox;

	// CHECKBOX CONSTRUCTOR AND PROTOTYPE

	var logError = function logError (error) {
		if (window && window.console && window.console.error) {
			window.console.error(error);
		}
	};

	var Checkbox = function Checkbox (element, options) {
		this.options = $.extend({}, $.fn.checkbox.defaults, options);
		var $element = $(element);

		if (element.tagName.toLowerCase() !== 'label') {
			logError('Checkbox must be initialized on the `label` that wraps the `input` element. See https://github.com/ExactTarget/fuelux/blob/master/reference/markup/checkbox.html for example of proper markup. Call `.checkbox()` on the `<label>` not the `<input>`');
			return;
		}

		// cache elements
		this.$label = $element;
		this.$chk = this.$label.find('input[type="checkbox"]');
		this.$container = $element.parent('.checkbox'); // the container div

		if (!this.options.ignoreVisibilityCheck && this.$chk.css('visibility').match(/hidden|collapse/)) {
			logError('For accessibility reasons, in order for tab and space to function on checkbox, checkbox `<input />`\'s `visibility` must not be set to `hidden` or `collapse`. See https://github.com/ExactTarget/fuelux/pull/1996 for more details.');
		}

		// determine if a toggle container is specified
		var containerSelector = this.$chk.attr('data-toggle');
		this.$toggleContainer = $(containerSelector);

		// handle internal events
		this.$chk.on('change', $.proxy(this.itemchecked, this));

		// set default state
		this.setInitialState();
	};

	Checkbox.prototype = {

		constructor: Checkbox,

		setInitialState: function setInitialState () {
			var $chk = this.$chk;

			// get current state of input
			var checked = $chk.prop('checked');
			var disabled = $chk.prop('disabled');

			// sync label class with input state
			this.setCheckedState($chk, checked);
			this.setDisabledState($chk, disabled);
		},

		setCheckedState: function setCheckedState (element, checked) {
			var $chk = element;
			var $lbl = this.$label;
			var $containerToggle = this.$toggleContainer;

			if (checked) {
				$chk.prop('checked', true);
				$lbl.addClass('checked');
				$containerToggle.removeClass('hide hidden');
				$lbl.trigger('checked.fu.checkbox');
			} else {
				$chk.prop('checked', false);
				$lbl.removeClass('checked');
				$containerToggle.addClass('hidden');
				$lbl.trigger('unchecked.fu.checkbox');
			}

			$lbl.trigger('changed.fu.checkbox', checked);
		},

		setDisabledState: function setDisabledState (element, disabled) {
			var $chk = $(element);
			var $lbl = this.$label;

			if (disabled) {
				$chk.prop('disabled', true);
				$lbl.addClass('disabled');
				$lbl.trigger('disabled.fu.checkbox');
			} else {
				$chk.prop('disabled', false);
				$lbl.removeClass('disabled');
				$lbl.trigger('enabled.fu.checkbox');
			}

			return $chk;
		},

		itemchecked: function itemchecked (evt) {
			var $chk = $(evt.target);
			var checked = $chk.prop('checked');

			this.setCheckedState($chk, checked);
		},

		toggle: function toggle () {
			var checked = this.isChecked();

			if (checked) {
				this.uncheck();
			} else {
				this.check();
			}
		},

		check: function check () {
			this.setCheckedState(this.$chk, true);
		},

		uncheck: function uncheck () {
			this.setCheckedState(this.$chk, false);
		},

		isChecked: function isChecked () {
			var checked = this.$chk.prop('checked');
			return checked;
		},

		enable: function enable () {
			this.setDisabledState(this.$chk, false);
		},

		disable: function disable () {
			this.setDisabledState(this.$chk, true);
		},

		destroy: function destroy () {
			this.$label.remove();
			return this.$label[0].outerHTML;
		}
	};

	Checkbox.prototype.getValue = Checkbox.prototype.isChecked;

	// CHECKBOX PLUGIN DEFINITION

	$.fn.checkbox = function checkbox (option) {
		var args = Array.prototype.slice.call(arguments, 1);
		var methodReturn;

		var $set = this.each(function applyData () {
			var $this = $(this);
			var data = $this.data('fu.checkbox');
			var options = typeof option === 'object' && option;

			if (!data) {
				$this.data('fu.checkbox', (data = new Checkbox(this, options)));
			}

			if (typeof option === 'string') {
				methodReturn = data[option].apply(data, args);
			}
		});

		return (methodReturn === undefined) ? $set : methodReturn;
	};

	$.fn.checkbox.defaults = {
		ignoreVisibilityCheck: false
	};

	$.fn.checkbox.Constructor = Checkbox;

	$.fn.checkbox.noConflict = function noConflict () {
		$.fn.checkbox = old;
		return this;
	};

	// DATA-API

	$(document).on('mouseover.fu.checkbox.data-api', '[data-initialize=checkbox]', function initializeCheckboxes (e) {
		var $control = $(e.target);
		if (!$control.data('fu.checkbox')) {
			$control.checkbox($control.data());
		}
	});

	// Must be domReady for AMD compatibility
	$(function onReadyInitializeCheckboxes () {
		$('[data-initialize=checkbox]').each(function initializeCheckbox () {
			var $this = $(this);
			if (!$this.data('fu.checkbox')) {
				$this.checkbox($this.data());
			}
		});
	});

	// -- BEGIN UMD WRAPPER AFTERWORD --
}));
// -- END UMD WRAPPER AFTERWORD --


/***/ }),

/***/ 6214:
/*!********************************************!*\
  !*** ./node_modules/fuelux/js/combobox.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global jQuery:true */

/*
 * Fuel UX Combobox
 * https://github.com/ExactTarget/fuelux
 *
 * Copyright (c) 2014 ExactTarget
 * Licensed under the BSD New license.
 */

// -- BEGIN UMD WRAPPER PREFACE --

// For more information on UMD visit:
// https://github.com/umdjs/umd/blob/master/jqueryPlugin.js

(function umdFactory (factory) {
	if (true) {
		// if AMD loader is available, register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ 5311)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}(function ComboboxWrapper ($) {
	// -- END UMD WRAPPER PREFACE --

	// -- BEGIN MODULE CODE HERE --

	var old = $.fn.combobox;


	// COMBOBOX CONSTRUCTOR AND PROTOTYPE

	var Combobox = function (element, options) {
		this.$element = $(element);
		this.options = $.extend({}, $.fn.combobox.defaults, options);

		this.$dropMenu = this.$element.find('.dropdown-menu');
		this.$input = this.$element.find('input');
		this.$button = this.$element.find('.btn');
		this.$inputGroupBtn = this.$element.find('.input-group-btn');

		this.$element.on('click.fu.combobox', 'a', $.proxy(this.itemclicked, this));
		this.$element.on('change.fu.combobox', 'input', $.proxy(this.inputchanged, this));
		this.$element.on('shown.bs.dropdown', $.proxy(this.menuShown, this));
		this.$input.on('keyup.fu.combobox', $.proxy(this.keypress, this));

		// set default selection
		this.setDefaultSelection();

		// if dropdown is empty, disable it
		var items = this.$dropMenu.children('li');
		if( items.length === 0) {
			this.$button.addClass('disabled');
		}

		// filter on load in case the first thing they do is press navigational key to pop open the menu
		if (this.options.filterOnKeypress) {
			this.options.filter(this.$dropMenu.find('li'), this.$input.val(), this);
		}

	};

	Combobox.prototype = {

		constructor: Combobox,

		destroy: function () {
			this.$element.remove();
			// remove any external bindings
			// [none]

			// set input value attrbute in markup
			this.$element.find('input').each(function () {
				$(this).attr('value', $(this).val());
			});

			// empty elements to return to original markup
			// [none]

			return this.$element[0].outerHTML;
		},

		doSelect: function ($item) {

			if (typeof $item[0] !== 'undefined') {
				// remove selection from old item, may result in remove and
				// re-addition of class if item is the same
				this.$element.find('li.selected:first').removeClass('selected');

				// add selection to new item
				this.$selectedItem = $item;
				this.$selectedItem.addClass('selected');

				// update input
				this.$input.val(this.$selectedItem.text().trim());
			} else {
				// this is a custom input, not in the menu
				this.$selectedItem = null;
				this.$element.find('li.selected:first').removeClass('selected');
			}
		},

		clearSelection: function () {
			this.$selectedItem = null;
			this.$input.val('');
			this.$dropMenu.find('li').removeClass('selected');
		},

		menuShown: function () {
			if (this.options.autoResizeMenu) {
				this.resizeMenu();
			}
		},

		resizeMenu: function () {
			var width = this.$element.outerWidth();
			this.$dropMenu.outerWidth(width);
		},

		selectedItem: function () {
			var item = this.$selectedItem;
			var data = {};

			if (item) {
				var txt = this.$selectedItem.text().trim();
				data = $.extend({
					text: txt
				}, this.$selectedItem.data());
			} else {
				data = {
					text: this.$input.val().trim(),
					notFound: true
				};
			}

			return data;
		},

		selectByText: function (text) {
			var $item = $([]);
			this.$element.find('li').each(function () {
				if ((this.textContent || this.innerText || $(this).text() || '').trim().toLowerCase() === (text || '').trim().toLowerCase()) {
					$item = $(this);
					return false;
				}
			});

			this.doSelect($item);
		},

		selectByValue: function (value) {
			var selector = 'li[data-value="' + value + '"]';
			this.selectBySelector(selector);
		},

		selectByIndex: function (index) {
			// zero-based index
			var selector = 'li:eq(' + index + ')';
			this.selectBySelector(selector);
		},

		selectBySelector: function (selector) {
			var $item = this.$element.find(selector);
			this.doSelect($item);
		},

		setDefaultSelection: function () {
			var selector = 'li[data-selected=true]:first';
			var item = this.$element.find(selector);

			if (item.length > 0) {
				// select by data-attribute
				this.selectBySelector(selector);
				item.removeData('selected');
				item.removeAttr('data-selected');
			}
		},

		enable: function () {
			this.$element.removeClass('disabled');
			this.$input.removeAttr('disabled');
			this.$button.removeClass('disabled');
		},

		disable: function () {
			this.$element.addClass('disabled');
			this.$input.attr('disabled', true);
			this.$button.addClass('disabled');
		},

		itemclicked: function (e) {
			this.$selectedItem = $(e.target).parent();

			// set input text and trigger input change event marked as synthetic
			this.$input.val(this.$selectedItem.text().trim()).trigger('change', {
				synthetic: true
			});

			// pass object including text and any data-attributes
			// to onchange event
			var data = this.selectedItem();

			// trigger changed event
			this.$element.trigger('changed.fu.combobox', data);

			e.preventDefault();

			// return focus to control after selecting an option
			this.$element.find('.dropdown-toggle').focus();
		},

		keypress: function (e) {
			var ENTER = 13;
			//var TAB = 9;
			var ESC = 27;
			var LEFT = 37;
			var UP = 38;
			var RIGHT = 39;
			var DOWN = 40;

			var IS_NAVIGATIONAL = (
				e.which === UP ||
				e.which === DOWN ||
				e.which === LEFT ||
				e.which === RIGHT
			);

			if(this.options.showOptionsOnKeypress && !this.$inputGroupBtn.hasClass('open')){
				this.$button.dropdown('toggle');
				this.$input.focus();
			}

			if (e.which === ENTER) {
				e.preventDefault();

				var selected = this.$dropMenu.find('li.selected').text().trim();
				if(selected.length > 0){
					this.selectByText(selected);
				}else{
					this.selectByText(this.$input.val());
				}

				this.$inputGroupBtn.removeClass('open');
			} else if (e.which === ESC) {
				e.preventDefault();
				this.clearSelection();
				this.$inputGroupBtn.removeClass('open');
			} else if (this.options.showOptionsOnKeypress) {
				if (e.which === DOWN || e.which === UP) {
					e.preventDefault();
					var $selected = this.$dropMenu.find('li.selected');
					if ($selected.length > 0) {
						if (e.which === DOWN) {
							$selected = $selected.next(':not(.hidden)');
						} else {
							$selected = $selected.prev(':not(.hidden)');
						}
					}

					if ($selected.length === 0){
						if (e.which === DOWN) {
							$selected = this.$dropMenu.find('li:not(.hidden):first');
						} else {
							$selected = this.$dropMenu.find('li:not(.hidden):last');
						}
					}
					this.doSelect($selected);
				}
			}

			// Avoid filtering on navigation key presses
			if (this.options.filterOnKeypress && !IS_NAVIGATIONAL) {
				this.options.filter(this.$dropMenu.find('li'), this.$input.val(), this);
			}

			this.previousKeyPress = e.which;
		},

		inputchanged: function (e, extra) {
			var val = $(e.target).val();
			// skip processing for internally-generated synthetic event
			// to avoid double processing
			if (extra && extra.synthetic) {
				this.selectByText(val);
				return;
			}
			this.selectByText(val);

			// find match based on input
			// if no match, pass the input value
			var data = this.selectedItem();
			if (data.text.length === 0) {
				data = {
					text: val
				};
			}

			// trigger changed event
			this.$element.trigger('changed.fu.combobox', data);
		}
	};

	Combobox.prototype.getValue = Combobox.prototype.selectedItem;

	// COMBOBOX PLUGIN DEFINITION

	$.fn.combobox = function (option) {
		var args = Array.prototype.slice.call(arguments, 1);
		var methodReturn;

		var $set = this.each(function () {
			var $this = $(this);
			var data = $this.data('fu.combobox');
			var options = typeof option === 'object' && option;

			if (!data) {
				$this.data('fu.combobox', (data = new Combobox(this, options)));
			}

			if (typeof option === 'string') {
				methodReturn = data[option].apply(data, args);
			}
		});

		return (methodReturn === undefined) ? $set : methodReturn;
	};

	$.fn.combobox.defaults = {
		autoResizeMenu: true,
		filterOnKeypress: false,
		showOptionsOnKeypress: false,
		filter: function filter (list, predicate, self) {
			var visible = 0;
			self.$dropMenu.find('.empty-indicator').remove();

			list.each(function (i) {
				var $li = $(this);
				var text = $(this).text().trim();

				$li.removeClass();

				if (text === predicate) {
					$li.addClass('text-success');
					visible++;
				} else if (text.substr(0, predicate.length) === predicate) {
					$li.addClass('text-info');
					visible++;
				} else {
					$li.addClass('hidden');
				}
			});

			if (visible === 0) {
				self.$dropMenu.append('<li class="empty-indicator text-muted"><em>No Matches</em></li>');
			}
		}
	};

	$.fn.combobox.Constructor = Combobox;

	$.fn.combobox.noConflict = function () {
		$.fn.combobox = old;
		return this;
	};

	// DATA-API

	$(document).on('mousedown.fu.combobox.data-api', '[data-initialize=combobox]', function (e) {
		var $control = $(e.target).closest('.combobox');
		if (!$control.data('fu.combobox')) {
			$control.combobox($control.data());
		}
	});

	// Must be domReady for AMD compatibility
	$(function () {
		$('[data-initialize=combobox]').each(function () {
			var $this = $(this);
			if (!$this.data('fu.combobox')) {
				$this.combobox($this.data());
			}
		});
	});

	// -- BEGIN UMD WRAPPER AFTERWORD --
}));
// -- END UMD WRAPPER AFTERWORD --


/***/ }),

/***/ 3212:
/*!**********************************************!*\
  !*** ./node_modules/fuelux/js/datepicker.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global jQuery:true */

/*
 * Fuel UX Datepicker
 * https://github.com/ExactTarget/fuelux
 *
 * Copyright (c) 2014 ExactTarget
 * Licensed under the BSD New license.
 */

// -- BEGIN UMD WRAPPER PREFACE --

// For more information on UMD visit:
// https://github.com/umdjs/umd/blob/master/jqueryPlugin.js

(function umdFactory (factory) {
	if (true) {
		// if AMD loader is available, register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ 5311)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}(function DatepickerWrapper ($) {
	// -- END UMD WRAPPER PREFACE --

	// -- BEGIN MODULE CODE HERE --

	var INVALID_DATE = 'Invalid Date';
	var MOMENT_NOT_AVAILABLE = 'moment.js is not available so you cannot use this function';

	var datepickerStack = [];
	var moment = false;
	var old = $.fn.datepicker;
	var requestedMoment = false;

	var runStack = function () {
		var i, l;
		requestedMoment = true;
		for (i = 0, l = datepickerStack.length; i < l; i++) {
			datepickerStack[i].init.call(datepickerStack[i].scope);
		}
		datepickerStack = [];
	};

	//only load moment if it's there. otherwise we'll look for it in window.moment
	if (true) {//check if AMD is available
		Promise.resolve(/*! AMD require */).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(/*! moment */ 381)]; (function (amdMoment) {
			moment = amdMoment;
			runStack();
		}).apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__);})['catch'](function (err) {
				var failedId = err.requireModules && err.requireModules[0];
				if (failedId === 'moment') {
					runStack();
				}
			});
	} else {}

	// DATEPICKER CONSTRUCTOR AND PROTOTYPE

	var Datepicker = function (element, options) {
		this.$element = $(element);
		this.options = $.extend(true, {}, $.fn.datepicker.defaults, options);

		this.$calendar = this.$element.find('.datepicker-calendar');
		this.$days = this.$calendar.find('.datepicker-calendar-days');
		this.$header = this.$calendar.find('.datepicker-calendar-header');
		this.$headerTitle = this.$header.find('.title');
		this.$input = this.$element.find('input');
		this.$inputGroupBtn = this.$element.find('.input-group-btn');
		this.$wheels = this.$element.find('.datepicker-wheels');
		this.$wheelsMonth = this.$element.find('.datepicker-wheels-month');
		this.$wheelsYear = this.$element.find('.datepicker-wheels-year');

		this.artificialScrolling = false;
		this.formatDate = this.options.formatDate || this.formatDate;
		this.inputValue = null;
		this.moment = false;
		this.momentFormat = null;
		this.parseDate = this.options.parseDate || this.parseDate;
		this.preventBlurHide = false;
		this.restricted = this.options.restricted || [];
		this.restrictedParsed = [];
		this.restrictedText = this.options.restrictedText;
		this.sameYearOnly = this.options.sameYearOnly;
		this.selectedDate = null;
		this.yearRestriction = null;

		this.$calendar.find('.datepicker-today').on('click.fu.datepicker', $.proxy(this.todayClicked, this));
		this.$days.on('click.fu.datepicker', 'tr td button', $.proxy(this.dateClicked, this));
		this.$header.find('.next').on('click.fu.datepicker', $.proxy(this.next, this));
		this.$header.find('.prev').on('click.fu.datepicker', $.proxy(this.prev, this));
		this.$headerTitle.on('click.fu.datepicker', $.proxy(this.titleClicked, this));
		this.$input.on('change.fu.datepicker', $.proxy(this.inputChanged, this));
		this.$input.on('mousedown.fu.datepicker', $.proxy(this.showDropdown, this));
		this.$inputGroupBtn.on('hidden.bs.dropdown', $.proxy(this.hide, this));
		this.$inputGroupBtn.on('shown.bs.dropdown', $.proxy(this.show, this));
		this.$wheels.find('.datepicker-wheels-back').on('click.fu.datepicker', $.proxy(this.backClicked, this));
		this.$wheels.find('.datepicker-wheels-select').on('click.fu.datepicker', $.proxy(this.selectClicked, this));
		this.$wheelsMonth.on('click.fu.datepicker', 'ul button', $.proxy(this.monthClicked, this));
		this.$wheelsYear.on('click.fu.datepicker', 'ul button', $.proxy(this.yearClicked, this));
		this.$wheelsYear.find('ul').on('scroll.fu.datepicker', $.proxy(this.onYearScroll, this));

		var init = function () {
			if (this.checkForMomentJS()) {
				moment = moment || window.moment;// need to pull in the global moment if they didn't do it via require
				this.moment = true;
				this.momentFormat = this.options.momentConfig.format;
				this.setCulture(this.options.momentConfig.culture);

				// support moment with lang (< v2.8) or locale
				moment.locale = moment.locale || moment.lang;
			}

			this.setRestrictedDates(this.restricted);
			if (!this.setDate(this.options.date)) {
				this.$input.val('');
				this.inputValue = this.$input.val();
			}

			if (this.sameYearOnly) {
				this.yearRestriction = (this.selectedDate) ? this.selectedDate.getFullYear() : new Date().getFullYear();
			}
		};

		if (requestedMoment) {
			init.call(this);
		} else {
			datepickerStack.push({
				init: init,
				scope: this
			});
		}
	};

	Datepicker.prototype = {

		constructor: Datepicker,

		backClicked: function () {
			this.changeView('calendar');
		},

		changeView: function (view, date) {
			if (view === 'wheels') {
				this.$calendar.hide().attr('aria-hidden', 'true');
				this.$wheels.show().removeAttr('aria-hidden', '');
				if (date) {
					this.renderWheel(date);
				}

			} else {
				this.$wheels.hide().attr('aria-hidden', 'true');
				this.$calendar.show().removeAttr('aria-hidden', '');
				if (date) {
					this.renderMonth(date);
				}

			}
		},

		checkForMomentJS: function () {
			if (
			($.isFunction(window.moment) || (typeof moment !== 'undefined' && $.isFunction(moment))) &&
				$.isPlainObject(this.options.momentConfig) &&
				(typeof this.options.momentConfig.culture === 'string' && typeof this.options.momentConfig.format === 'string')
			) {
				return true;
			} else {
				return false;
			}
		},

		dateClicked: function (e) {
			var $td = $(e.currentTarget).parents('td:first');
			var date;

			if ($td.hasClass('restricted')) {
				return;
			}

			this.$days.find('td.selected').removeClass('selected');
			$td.addClass('selected');

			date = new Date($td.attr('data-year'), $td.attr('data-month'), $td.attr('data-date'));
			this.selectedDate = date;
			this.$input.val(this.formatDate(date));
			this.inputValue = this.$input.val();
			this.hide();
			this.$input.focus();
			this.$element.trigger('dateClicked.fu.datepicker', date);
		},

		destroy: function () {
			this.$element.remove();
			// any external bindings
			// [none]

			// empty elements to return to original markup
			this.$days.find('tbody').empty();
			this.$wheelsYear.find('ul').empty();

			return this.$element[0].outerHTML;
		},

		disable: function () {
			this.$element.addClass('disabled');
			this.$element.find('input, button').attr('disabled', 'disabled');
			this.$inputGroupBtn.removeClass('open');
		},

		enable: function () {
			this.$element.removeClass('disabled');
			this.$element.find('input, button').removeAttr('disabled');
		},

		formatDate: function (date) {
			var padTwo = function (value) {
				var s = '0' + value;
				return s.substr(s.length - 2);
			};

			if (this.moment) {
				return moment(date).format(this.momentFormat);
			} else {
				return padTwo(date.getMonth() + 1) + '/' + padTwo(date.getDate()) + '/' + date.getFullYear();
			}
		},

		getCulture: function () {
			if (this.moment) {
				return moment.locale();
			} else {
				throw MOMENT_NOT_AVAILABLE;
			}
		},

		getDate: function () {
			return (!this.selectedDate) ? new Date(NaN) : this.selectedDate;
		},

		getFormat: function () {
			if (this.moment) {
				return this.momentFormat;
			} else {
				throw MOMENT_NOT_AVAILABLE;
			}
		},

		getFormattedDate: function () {
			return (!this.selectedDate) ? INVALID_DATE : this.formatDate(this.selectedDate);
		},

		getRestrictedDates: function () {
			return this.restricted;
		},

		inputChanged: function () {
			var inputVal = this.$input.val();
			var date;
			if (inputVal !== this.inputValue) {
				date = this.setDate(inputVal);
				if (date === null) {
					this.$element.trigger('inputParsingFailed.fu.datepicker', inputVal);
				} else if (date === false) {
					this.$element.trigger('inputRestrictedDate.fu.datepicker', date);
				} else {
					this.$element.trigger('changed.fu.datepicker', date);
				}

			}
		},

		show: function () {
			var date = (this.selectedDate) ? this.selectedDate : new Date();
			this.changeView('calendar', date);
			this.$inputGroupBtn.addClass('open');
			this.$element.trigger('shown.fu.datepicker');
		},

		showDropdown: function (e) {	//input mousedown handler, name retained for legacy support of showDropdown
			if (!this.$input.is(':focus') && !this.$inputGroupBtn.hasClass('open')) {
				this.show();
			}
		},

		hide: function () {
			this.$inputGroupBtn.removeClass('open');
			this.$element.trigger('hidden.fu.datepicker');
		},

		hideDropdown: function () {		//for legacy support of hideDropdown
			this.hide();
		},

		isInvalidDate: function (date) {
			var dateString = date.toString();
			if (dateString === INVALID_DATE || dateString === 'NaN') {
				return true;
			}

			return false;
		},

		isRestricted: function (date, month, year) {
			var restricted = this.restrictedParsed;
			var i, from, l, to;

			if (this.sameYearOnly && this.yearRestriction !== null && year !== this.yearRestriction) {
				return true;
			}

			for (i = 0, l = restricted.length; i < l; i++) {
				from = restricted[i].from;
				to = restricted[i].to;
				if (
				(year > from.year || (year === from.year && month > from.month) || (year === from.year && month === from.month && date >= from.date)) &&
					(year < to.year || (year === to.year && month < to.month) || (year === to.year && month === to.month && date <= to.date))
				) {
					return true;
				}

			}

			return false;
		},

		monthClicked: function (e) {
			this.$wheelsMonth.find('.selected').removeClass('selected');
			$(e.currentTarget).parent().addClass('selected');
		},

		next: function () {
			var month = this.$headerTitle.attr('data-month');
			var year = this.$headerTitle.attr('data-year');
			month++;
			if (month > 11) {
				if (this.sameYearOnly) {
					return;
				}

				month = 0;
				year++;
			}

			this.renderMonth(new Date(year, month, 1));
		},

		onYearScroll: function (e) {
			if (this.artificialScrolling) {
				return;
			}

			var $yearUl = $(e.currentTarget);
			var height = ($yearUl.css('box-sizing') === 'border-box') ? $yearUl.outerHeight() : $yearUl.height();
			var scrollHeight = $yearUl.get(0).scrollHeight;
			var scrollTop = $yearUl.scrollTop();
			var bottomPercentage = (height / (scrollHeight - scrollTop)) * 100;
			var topPercentage = (scrollTop / scrollHeight) * 100;
			var i, start;

			if (topPercentage < 5) {
				start = parseInt($yearUl.find('li:first').attr('data-year'), 10);
				for (i = (start - 1); i > (start - 11); i--) {
					$yearUl.prepend('<li data-year="' + i + '"><button type="button">' + i + '</button></li>');
				}
				this.artificialScrolling = true;
				$yearUl.scrollTop(($yearUl.get(0).scrollHeight - scrollHeight) + scrollTop);
				this.artificialScrolling = false;
			} else if (bottomPercentage > 90) {
				start = parseInt($yearUl.find('li:last').attr('data-year'), 10);
				for (i = (start + 1); i < (start + 11); i++) {
					$yearUl.append('<li data-year="' + i + '"><button type="button">' + i + '</button></li>');
				}
			}
		},

		//some code ripped from http://stackoverflow.com/questions/2182246/javascript-dates-in-ie-nan-firefox-chrome-ok
		parseDate: function (date) {
			var self = this;
			var BAD_DATE = new Date(NaN);
			var dt, isoExp, momentParse, momentParseWithFormat, tryMomentParseAll, month, parts, use;

			if (date) {
				if (this.moment) {//if we have moment, use that to parse the dates
					momentParseWithFormat = function (d) {
						var md = moment(d, self.momentFormat);
						return (true === md.isValid()) ? md.toDate() : BAD_DATE;
					};
					momentParse = function (d) {
						var md = moment(new Date(d));
						return (true === md.isValid()) ? md.toDate() : BAD_DATE;
					};

					tryMomentParseAll = function (rawDateString, parseFunc1, parseFunc2) {
						var pd = parseFunc1(rawDateString);
						if (!self.isInvalidDate(pd)) {
							return pd;
						}

						pd = parseFunc2(rawDateString);
						if (!self.isInvalidDate(pd)) {
							return pd;
						}

						return BAD_DATE;
					};

					if ('string' === typeof (date)) {
						// Attempts to parse date strings using this.momentFormat, falling back on newing a date
						return tryMomentParseAll(date, momentParseWithFormat, momentParse);
					} else {
						// Attempts to parse date by newing a date object directly, falling back on parsing using this.momentFormat
						return tryMomentParseAll(date, momentParse, momentParseWithFormat);
					}

				} else {//if moment isn't present, use previous date parsing strategy
					if (typeof (date) === 'string') {
						dt = new Date(Date.parse(date));
						if (!this.isInvalidDate(dt)) {
							return dt;
						} else {
							date = date.split('T')[0];
							isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/;
							parts = isoExp.exec(date);
							if (parts) {
								month = parseInt(parts[2], 10);
								dt = new Date(parts[1], month - 1, parts[3]);
								if (month === (dt.getMonth() + 1)) {
									return dt;
								}

							}

						}

					} else {
						dt = new Date(date);
						if (!this.isInvalidDate(dt)) {
							return dt;
						}

					}

				}

			}

			return new Date(NaN);
		},

		prev: function () {
			var month = this.$headerTitle.attr('data-month');
			var year = this.$headerTitle.attr('data-year');
			month--;
			if (month < 0) {
				if (this.sameYearOnly) {
					return;
				}

				month = 11;
				year--;
			}

			this.renderMonth(new Date(year, month, 1));
		},

		renderMonth: function (date) {
			date = date || new Date();

			var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
			var lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
			var lastMonthDate = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
			var $month = this.$headerTitle.find('.month');
			var month = date.getMonth();
			var now = new Date();
			var nowDate = now.getDate();
			var nowMonth = now.getMonth();
			var nowYear = now.getFullYear();
			var selected = this.selectedDate;
			var $tbody = this.$days.find('tbody');
			var year = date.getFullYear();
			var curDate, curMonth, curYear, i, j, rows, stage, previousStage, lastStage, $td, $tr;

			if (selected) {
				selected = {
					date: selected.getDate(),
					month: selected.getMonth(),
					year: selected.getFullYear()
				};
			}

			$month.find('.current').removeClass('current');
			$month.find('span[data-month="' + month + '"]').addClass('current');
			this.$headerTitle.find('.year').text(year);
			this.$headerTitle.attr({
				'data-month': month,
				'data-year': year
			});


			$tbody.empty();
			if (firstDay !== 0) {
				curDate = lastMonthDate - firstDay + 1;
				stage = -1;
			} else {
				curDate = 1;
				stage = 0;
			}

			rows = (lastDate <= (35 - firstDay)) ? 5 : 6;
			for (i = 0; i < rows; i++) {
				$tr = $('<tr></tr>');
				for (j = 0; j < 7; j++) {
					$td = $('<td></td>');
					if (stage === -1) {
						$td.addClass('last-month');
						if (previousStage !== stage) {
							$td.addClass('first');
						}
					} else if (stage === 1) {
						$td.addClass('next-month');
						if (previousStage !== stage) {
							$td.addClass('first');
						}
					}

					curMonth = month + stage;
					curYear = year;
					if (curMonth < 0) {
						curMonth = 11;
						curYear--;
					} else if (curMonth > 11) {
						curMonth = 0;
						curYear++;
					}

					$td.attr({
						'data-date': curDate,
						'data-month': curMonth,
						'data-year': curYear
					});
					if (curYear === nowYear && curMonth === nowMonth && curDate === nowDate) {
						$td.addClass('current-day');
					} else if (curYear < nowYear || (curYear === nowYear && curMonth < nowMonth) ||
						(curYear === nowYear && curMonth === nowMonth && curDate < nowDate)) {
						$td.addClass('past');
						if (!this.options.allowPastDates) {
							$td.addClass('restricted').attr('title', this.restrictedText);
						}

					}

					if (this.isRestricted(curDate, curMonth, curYear)) {
						$td.addClass('restricted').attr('title', this.restrictedText);
					}

					if (selected && curYear === selected.year && curMonth === selected.month && curDate === selected.date) {
						$td.addClass('selected');
					}

					if ($td.hasClass('restricted')) {
						$td.html('<span><b class="datepicker-date">' + curDate + '</b></span>');
					} else {
						$td.html('<span><button type="button" class="datepicker-date">' + curDate + '</button></span>');
					}

					curDate++;
					lastStage = previousStage;
					previousStage = stage;
					if (stage === -1 && curDate > lastMonthDate) {
						curDate = 1;
						stage = 0;
						if (lastStage !== stage) {
							$td.addClass('last');
						}
					} else if (stage === 0 && curDate > lastDate) {
						curDate = 1;
						stage = 1;
						if (lastStage !== stage) {
							$td.addClass('last');
						}
					}
					if (i === (rows - 1) && j === 6) {
						$td.addClass('last');
					}

					$tr.append($td);
				}
				$tbody.append($tr);
			}
		},

		renderWheel: function (date) {
			var month = date.getMonth();
			var $monthUl = this.$wheelsMonth.find('ul');
			var year = date.getFullYear();
			var $yearUl = this.$wheelsYear.find('ul');
			var i, $monthSelected, $yearSelected;

			if (this.sameYearOnly) {
				this.$wheelsMonth.addClass('full');
				this.$wheelsYear.addClass('hidden');
			} else {
				this.$wheelsMonth.removeClass('full');
				this.$wheelsYear.removeClass('hide hidden');	// .hide is deprecated
			}

			$monthUl.find('.selected').removeClass('selected');
			$monthSelected = $monthUl.find('li[data-month="' + month + '"]');
			$monthSelected.addClass('selected');
			$monthUl.scrollTop($monthUl.scrollTop() + ($monthSelected.position().top - $monthUl.outerHeight() / 2 - $monthSelected.outerHeight(true) / 2));

			$yearUl.empty();
			for (i = (year - 10); i < (year + 11); i++) {
				$yearUl.append('<li data-year="' + i + '"><button type="button">' + i + '</button></li>');
			}
			$yearSelected = $yearUl.find('li[data-year="' + year + '"]');
			$yearSelected.addClass('selected');
			this.artificialScrolling = true;
			$yearUl.scrollTop($yearUl.scrollTop() + ($yearSelected.position().top - $yearUl.outerHeight() / 2 - $yearSelected.outerHeight(true) / 2));
			this.artificialScrolling = false;
			$monthSelected.find('button').focus();
		},

		selectClicked: function () {
			var month = this.$wheelsMonth.find('.selected').attr('data-month');
			var year = this.$wheelsYear.find('.selected').attr('data-year');
			this.changeView('calendar', new Date(year, month, 1));
		},

		setCulture: function (cultureCode) {
			if (!cultureCode) {
				return false;
			}

			if (this.moment) {
				moment.locale(cultureCode);
			} else {
				throw MOMENT_NOT_AVAILABLE;
			}
		},

		setDate: function (date) {
			var parsed = this.parseDate(date);
			if (!this.isInvalidDate(parsed)) {
				if (!this.isRestricted(parsed.getDate(), parsed.getMonth(), parsed.getFullYear())) {
					this.selectedDate = parsed;
					this.renderMonth(parsed);
					this.$input.val(this.formatDate(parsed));
				} else {
					this.selectedDate = false;
					this.renderMonth();
				}

			} else {
				this.selectedDate = null;
				this.renderMonth();
			}

			this.inputValue = this.$input.val();
			return this.selectedDate;
		},

		setFormat: function (format) {
			if (!format) {
				return false;
			}

			if (this.moment) {
				this.momentFormat = format;
			} else {
				throw MOMENT_NOT_AVAILABLE;
			}
		},

		setRestrictedDates: function (restricted) {
			var parsed = [];
			var self = this;
			var i, l;

			var parseItem = function (val) {
				if (val === -Infinity) {
					return {
						date: -Infinity,
						month: -Infinity,
						year: -Infinity
					};
				} else if (val === Infinity) {
					return {
						date: Infinity,
						month: Infinity,
						year: Infinity
					};
				} else {
					val = self.parseDate(val);
					return {
						date: val.getDate(),
						month: val.getMonth(),
						year: val.getFullYear()
					};
				}
			};

			this.restricted = restricted;
			for (i = 0, l = restricted.length; i < l; i++) {
				parsed.push({
					from: parseItem(restricted[i].from),
					to: parseItem(restricted[i].to)
				});
			}
			this.restrictedParsed = parsed;
		},

		titleClicked: function (e) {
			this.changeView('wheels', new Date(this.$headerTitle.attr('data-year'), this.$headerTitle.attr('data-month'), 1));
		},

		todayClicked: function (e) {
			var date = new Date();

			if ((date.getMonth() + '') !== this.$headerTitle.attr('data-month') || (date.getFullYear() + '') !== this.$headerTitle.attr('data-year')) {
				this.renderMonth(date);
			}
		},

		yearClicked: function (e) {
			this.$wheelsYear.find('.selected').removeClass('selected');
			$(e.currentTarget).parent().addClass('selected');
		}
	};
	//for control library consistency
	Datepicker.prototype.getValue = Datepicker.prototype.getDate;

	// DATEPICKER PLUGIN DEFINITION

	$.fn.datepicker = function (option) {
		var args = Array.prototype.slice.call(arguments, 1);
		var methodReturn;

		var $set = this.each(function () {
			var $this = $(this);
			var data = $this.data('fu.datepicker');
			var options = typeof option === 'object' && option;

			if (!data) {
				$this.data('fu.datepicker', (data = new Datepicker(this, options)));
			}

			if (typeof option === 'string') {
				methodReturn = data[option].apply(data, args);
			}
		});

		return (methodReturn === undefined) ? $set : methodReturn;
	};

	$.fn.datepicker.defaults = {
		allowPastDates: false,
		date: new Date(),
		formatDate: null,
		momentConfig: {
			culture: 'en',
			format: 'L'// more formats can be found here http://momentjs.com/docs/#/customization/long-date-formats/.
		},
		parseDate: null,
		restricted: [],//accepts an array of objects formatted as so: { from: {{date}}, to: {{date}} }  (ex: [ { from: new Date('12/11/2014'), to: new Date('03/31/2015') } ])
		restrictedText: 'Restricted',
		sameYearOnly: false
	};

	$.fn.datepicker.Constructor = Datepicker;

	$.fn.datepicker.noConflict = function () {
		$.fn.datepicker = old;
		return this;
	};

	// DATA-API

	$(document).on('mousedown.fu.datepicker.data-api', '[data-initialize=datepicker]', function (e) {
		var $control = $(e.target).closest('.datepicker');
		if (!$control.data('datepicker')) {
			$control.datepicker($control.data());
		}
	});

	//used to prevent the dropdown from closing when clicking within it's bounds
	$(document).on('click.fu.datepicker.data-api', '.datepicker .dropdown-menu', function (e) {
		var $target = $(e.target);
		if (!$target.is('.datepicker-date') || $target.closest('.restricted').length) {
			e.stopPropagation();
		}
	});

	//used to prevent the dropdown from closing when clicking on the input
	$(document).on('click.fu.datepicker.data-api', '.datepicker input', function (e) {
		e.stopPropagation();
	});

	$(function () {
		$('[data-initialize=datepicker]').each(function () {
			var $this = $(this);
			if ($this.data('datepicker')) {
				return;
			}

			$this.datepicker($this.data());
		});
	});

	// -- BEGIN UMD WRAPPER AFTERWORD --
}));
// -- END UMD WRAPPER AFTERWORD --


/***/ })

}]);
//# sourceMappingURL=vendors-2c8f807c.2384d3fce1a12a237460.bundle.js.map