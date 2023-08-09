(self["webpackChunkuccss_old_new"] = self["webpackChunkuccss_old_new"] || []).push([["vendors-86f4a106"],{

/***/ 7184:
/*!*****************************************!*\
  !*** ./node_modules/fuelux/js/radio.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global jQuery:true */

/*
 * Fuel UX Radio
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
}(function RadioWrapper ($) {
	// -- END UMD WRAPPER PREFACE --

	// -- BEGIN MODULE CODE HERE --

	var old = $.fn.radio;

	// RADIO CONSTRUCTOR AND PROTOTYPE
	var logError = function logError (error) {
		if (window && window.console && window.console.error) {
			window.console.error(error);
		}
	};

	var Radio = function Radio (element, options) {
		this.options = $.extend({}, $.fn.radio.defaults, options);

		if (element.tagName.toLowerCase() !== 'label') {
			logError('Radio must be initialized on the `label` that wraps the `input` element. See https://github.com/ExactTarget/fuelux/blob/master/reference/markup/radio.html for example of proper markup. Call `.radio()` on the `<label>` not the `<input>`');
			return;
		}

		// cache elements
		this.$label = $(element);
		this.$radio = this.$label.find('input[type="radio"]');
		this.groupName = this.$radio.attr('name'); // don't cache group itself since items can be added programmatically

		if (!this.options.ignoreVisibilityCheck && this.$radio.css('visibility').match(/hidden|collapse/)) {
			logError('For accessibility reasons, in order for tab and space to function on radio, `visibility` must not be set to `hidden` or `collapse`. See https://github.com/ExactTarget/fuelux/pull/1996 for more details.');
		}

		// determine if a toggle container is specified
		var containerSelector = this.$radio.attr('data-toggle');
		this.$toggleContainer = $(containerSelector);

		// handle internal events
		this.$radio.on('change', $.proxy(this.itemchecked, this));

		// set default state
		this.setInitialState();
	};

	Radio.prototype = {

		constructor: Radio,

		setInitialState: function setInitialState () {
			var $radio = this.$radio;

			// get current state of input
			var checked = $radio.prop('checked');
			var disabled = $radio.prop('disabled');

			// sync label class with input state
			this.setCheckedState($radio, checked);
			this.setDisabledState($radio, disabled);
		},

		resetGroup: function resetGroup () {
			var $radios = $('input[name="' + this.groupName + '"]');
			$radios.each(function resetRadio (index, item) {
				var $radio = $(item);
				var $lbl = $radio.parent();
				var containerSelector = $radio.attr('data-toggle');
				var $containerToggle = $(containerSelector);


				$lbl.removeClass('checked');
				$containerToggle.addClass('hidden');
			});
		},

		setCheckedState: function setCheckedState (element, checked) {
			var $radio = element;
			var $lbl = $radio.parent();
			var containerSelector = $radio.attr('data-toggle');
			var $containerToggle = $(containerSelector);

			if (checked) {
				// reset all items in group
				this.resetGroup();

				$radio.prop('checked', true);
				$lbl.addClass('checked');
				$containerToggle.removeClass('hide hidden');
				$lbl.trigger('checked.fu.radio');
			} else {
				$radio.prop('checked', false);
				$lbl.removeClass('checked');
				$containerToggle.addClass('hidden');
				$lbl.trigger('unchecked.fu.radio');
			}

			$lbl.trigger('changed.fu.radio', checked);
		},

		setDisabledState: function setDisabledState (element, disabled) {
			var $radio = $(element);
			var $lbl = this.$label;

			if (disabled) {
				$radio.prop('disabled', true);
				$lbl.addClass('disabled');
				$lbl.trigger('disabled.fu.radio');
			} else {
				$radio.prop('disabled', false);
				$lbl.removeClass('disabled');
				$lbl.trigger('enabled.fu.radio');
			}

			return $radio;
		},

		itemchecked: function itemchecked (evt) {
			var $radio = $(evt.target);
			this.setCheckedState($radio, true);
		},

		check: function check () {
			this.setCheckedState(this.$radio, true);
		},

		uncheck: function uncheck () {
			this.setCheckedState(this.$radio, false);
		},

		isChecked: function isChecked () {
			var checked = this.$radio.prop('checked');
			return checked;
		},

		enable: function enable () {
			this.setDisabledState(this.$radio, false);
		},

		disable: function disable () {
			this.setDisabledState(this.$radio, true);
		},

		destroy: function destroy () {
			this.$label.remove();
			return this.$label[0].outerHTML;
		}
	};

	Radio.prototype.getValue = Radio.prototype.isChecked;

	// RADIO PLUGIN DEFINITION

	$.fn.radio = function radio (option) {
		var args = Array.prototype.slice.call(arguments, 1);
		var methodReturn;

		var $set = this.each(function applyData () {
			var $this = $(this);
			var data = $this.data('fu.radio');
			var options = typeof option === 'object' && option;

			if (!data) {
				$this.data('fu.radio', (data = new Radio(this, options)));
			}

			if (typeof option === 'string') {
				methodReturn = data[option].apply(data, args);
			}
		});

		return (methodReturn === undefined) ? $set : methodReturn;
	};

	$.fn.radio.defaults = {
		ignoreVisibilityCheck: false
	};

	$.fn.radio.Constructor = Radio;

	$.fn.radio.noConflict = function noConflict () {
		$.fn.radio = old;
		return this;
	};


	// DATA-API

	$(document).on('mouseover.fu.radio.data-api', '[data-initialize=radio]', function initializeRadios (e) {
		var $control = $(e.target);
		if (!$control.data('fu.radio')) {
			$control.radio($control.data());
		}
	});

	// Must be domReady for AMD compatibility
	$(function onReadyInitializeRadios () {
		$('[data-initialize=radio]').each(function initializeRadio () {
			var $this = $(this);
			if (!$this.data('fu.radio')) {
				$this.radio($this.data());
			}
		});
	});

	// -- BEGIN UMD WRAPPER AFTERWORD --
}));
// -- END UMD WRAPPER AFTERWORD --


/***/ }),

/***/ 2841:
/*!*************************************************!*\
  !*** ./node_modules/fuelux/js/repeater-list.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global jQuery:true */

/*
 * Fuel UX Repeater - List View Plugin
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
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ 5311), __webpack_require__(/*! fuelux/repeater */ 890), __webpack_require__(/*! fuelux/checkbox */ 881)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}(function repeaterListWrapper ($) {
	// -- END UMD WRAPPER PREFACE --

	// -- BEGIN MODULE CODE HERE --

	if ($.fn.repeater) {
		// ADDITIONAL METHODS
		$.fn.repeater.Constructor.prototype.list_clearSelectedItems = function listClearSelectedItems () {
			this.$canvas.find('.repeater-list-check').remove();
			this.$canvas.find('.repeater-list table tbody tr.selected').removeClass('selected');
		};

		$.fn.repeater.Constructor.prototype.list_highlightColumn = function listHighlightColumn (index, force) {
			var tbody = this.$canvas.find('.repeater-list-wrapper > table tbody');
			if (this.viewOptions.list_highlightSortedColumn || force) {
				tbody.find('td.sorted').removeClass('sorted');
				tbody.find('tr').each(function eachTR () {
					var col = $(this).find('td:nth-child(' + (index + 1) + ')').filter(function filterChildren () { return !$(this).parent().hasClass('empty'); });
					col.addClass('sorted');
				});
			}
		};

		$.fn.repeater.Constructor.prototype.list_getSelectedItems = function listGetSelectedItems () {
			var selected = [];
			this.$canvas.find('.repeater-list .repeater-list-wrapper > table tbody tr.selected').each(function eachSelectedTR () {
				var $item = $(this);
				selected.push({
					data: $item.data('item_data'),
					element: $item
				});
			});
			return selected;
		};

		$.fn.repeater.Constructor.prototype.getValue = $.fn.repeater.Constructor.prototype.list_getSelectedItems;

		$.fn.repeater.Constructor.prototype.list_positionHeadings = function listPositionHeadings () {
			var $wrapper = this.$element.find('.repeater-list-wrapper');
			var offsetLeft = $wrapper.offset().left;
			var scrollLeft = $wrapper.scrollLeft();
			if (scrollLeft > 0) {
				$wrapper.find('.repeater-list-heading').each(function eachListHeading () {
					var $heading = $(this);
					var left = ($heading.parents('th:first').offset().left - offsetLeft) + 'px';
					$heading.addClass('shifted').css('left', left);
				});
			} else {
				$wrapper.find('.repeater-list-heading').each(function eachListHeading () {
					$(this).removeClass('shifted').css('left', '');
				});
			}
		};

		$.fn.repeater.Constructor.prototype.list_setSelectedItems = function listSetSelectedItems (itms, force) {
			var selectable = this.viewOptions.list_selectable;
			var self = this;
			var data;
			var i;
			var $item;
			var length;

			var items = itms;
			if (!$.isArray(items)) {
				items = [items];
			}

			// this function is necessary because lint yells when a function is in a loop
			var checkIfItemMatchesValue = function checkIfItemMatchesValue (rowIndex) {
				$item = $(this);

				data = $item.data('item_data') || {};
				if (data[items[i].property] === items[i].value) {
					selectItem($item, items[i].selected, rowIndex);
				}
			};

			var selectItem = function selectItem ($itm, slct, index) {
				var $frozenCols;

				var select = (slct !== undefined) ? slct : true;
				if (select) {
					if (!force && selectable !== 'multi') {
						self.list_clearSelectedItems();
					}

					if (!$itm.hasClass('selected')) {
						$itm.addClass('selected');

						if (self.viewOptions.list_frozenColumns || self.viewOptions.list_selectable === 'multi') {
							$frozenCols = self.$element.find('.frozen-column-wrapper tr:nth-child(' + (index + 1) + ')');

							$frozenCols.addClass('selected');
							$frozenCols.find('.repeater-select-checkbox').addClass('checked');
						}

						if (self.viewOptions.list_actions) {
							self.$element.find('.actions-column-wrapper tr:nth-child(' + (index + 1) + ')').addClass('selected');
						}

						$itm.find('td:first').prepend('<div class="repeater-list-check"><span class="glyphicon glyphicon-ok"></span></div>');
					}
				} else {
					if (self.viewOptions.list_frozenColumns) {
						$frozenCols = self.$element.find('.frozen-column-wrapper tr:nth-child(' + (index + 1) + ')');

						$frozenCols.addClass('selected');
						$frozenCols.find('.repeater-select-checkbox').removeClass('checked');
					}

					if (self.viewOptions.list_actions) {
						self.$element.find('.actions-column-wrapper tr:nth-child(' + (index + 1) + ')').removeClass('selected');
					}

					$itm.find('.repeater-list-check').remove();
					$itm.removeClass('selected');
				}
			};

			if (force === true || selectable === 'multi') {
				length = items.length;
			} else if (selectable) {
				length = (items.length > 0) ? 1 : 0;
			} else {
				length = 0;
			}

			for (i = 0; i < length; i++) {
				if (items[i].index !== undefined) {
					$item = this.$canvas.find('.repeater-list .repeater-list-wrapper > table tbody tr:nth-child(' + (items[i].index + 1) + ')');
					if ($item.length > 0) {
						selectItem($item, items[i].selected, items[i].index);
					}
				} else if (items[i].property !== undefined && items[i].value !== undefined) {
					this.$canvas.find('.repeater-list .repeater-list-wrapper > table tbody tr').each(checkIfItemMatchesValue);
				}
			}
		};

		$.fn.repeater.Constructor.prototype.list_sizeHeadings = function listSizeHeadings () {
			var $table = this.$element.find('.repeater-list table');
			$table.find('thead th').each(function eachTH () {
				var $th = $(this);
				var $heading = $th.find('.repeater-list-heading');
				$heading.css({ height: $th.outerHeight() });
				$heading.outerWidth($heading.data('forced-width') || $th.outerWidth());
			});
		};

		$.fn.repeater.Constructor.prototype.list_setFrozenColumns = function listSetFrozenColumns () {
			var frozenTable = this.$canvas.find('.table-frozen');
			var $wrapper = this.$element.find('.repeater-canvas');
			var $table = this.$element.find('.repeater-list .repeater-list-wrapper > table');
			var repeaterWrapper = this.$element.find('.repeater-list');
			var numFrozenColumns = this.viewOptions.list_frozenColumns;
			var self = this;

			if (this.viewOptions.list_selectable === 'multi') {
				numFrozenColumns = numFrozenColumns + 1;
				$wrapper.addClass('multi-select-enabled');
			}

			if (frozenTable.length < 1) {
				// setup frozen column markup
				// main wrapper and remove unneeded columns
				var $frozenColumnWrapper = $('<div class="frozen-column-wrapper"></div>').insertBefore($table);
				var $frozenColumn = $table.clone().addClass('table-frozen');
				$frozenColumn.find('th:not(:lt(' + numFrozenColumns + '))').remove();
				$frozenColumn.find('td:not(:nth-child(n+0):nth-child(-n+' + numFrozenColumns + '))').remove();

				// need to set absolute heading for vertical scrolling
				var $frozenThead = $frozenColumn.clone().removeClass('table-frozen');
				$frozenThead.find('tbody').remove();
				var $frozenTheadWrapper = $('<div class="frozen-thead-wrapper"></div>').append($frozenThead);

				// this gets a little messy with all the cloning. We need to make sure the ID and FOR
				// attribs are unique for the 'top most' cloned checkbox
				var $checkboxLabel = $frozenTheadWrapper.find('th label.checkbox-custom.checkbox-inline');
				$checkboxLabel.attr('id', $checkboxLabel.attr('id') + '_cloned');

				$frozenColumnWrapper.append($frozenColumn);
				repeaterWrapper.append($frozenTheadWrapper);
				this.$canvas.addClass('frozen-enabled');
			}

			this.list_sizeFrozenColumns();

			$('.frozen-thead-wrapper .repeater-list-heading').on('click', function onClickHeading () {
				var index = $(this).parent('th').index();
				index = index + 1;
				self.$element.find('.repeater-list-wrapper > table thead th:nth-child(' + index + ') .repeater-list-heading')[0].click();
			});
		};

		$.fn.repeater.Constructor.prototype.list_positionColumns = function listPositionColumns () {
			var $wrapper = this.$element.find('.repeater-canvas');
			var scrollTop = $wrapper.scrollTop();
			var scrollLeft = $wrapper.scrollLeft();
			var frozenEnabled = this.viewOptions.list_frozenColumns || this.viewOptions.list_selectable === 'multi';
			var actionsEnabled = this.viewOptions.list_actions;

			var canvasWidth = this.$element.find('.repeater-canvas').outerWidth();
			var tableWidth = this.$element.find('.repeater-list .repeater-list-wrapper > table').outerWidth();

			var actionsWidth = this.$element.find('.table-actions') ? this.$element.find('.table-actions').outerWidth() : 0;

			var shouldScroll = (tableWidth - (canvasWidth - actionsWidth)) >= scrollLeft;


			if (scrollTop > 0) {
				$wrapper.find('.repeater-list-heading').css('top', scrollTop);
			} else {
				$wrapper.find('.repeater-list-heading').css('top', '0');
			}

			if (scrollLeft > 0) {
				if (frozenEnabled) {
					$wrapper.find('.frozen-thead-wrapper').css('left', scrollLeft);
					$wrapper.find('.frozen-column-wrapper').css('left', scrollLeft);
				}
				if (actionsEnabled && shouldScroll) {
					$wrapper.find('.actions-thead-wrapper').css('right', -scrollLeft);
					$wrapper.find('.actions-column-wrapper').css('right', -scrollLeft);
				}
			} else {
				if (frozenEnabled) {
					$wrapper.find('.frozen-thead-wrapper').css('left', '0');
					$wrapper.find('.frozen-column-wrapper').css('left', '0');
				}
				if (actionsEnabled) {
					$wrapper.find('.actions-thead-wrapper').css('right', '0');
					$wrapper.find('.actions-column-wrapper').css('right', '0');
				}
			}
		};

		$.fn.repeater.Constructor.prototype.list_createItemActions = function listCreateItemActions () {
			var actionsHtml = '';
			var self = this;
			var i;
			var length;
			var $table = this.$element.find('.repeater-list .repeater-list-wrapper > table');
			var $actionsTable = this.$canvas.find('.table-actions');

			for (i = 0, length = this.viewOptions.list_actions.items.length; i < length; i++) {
				var action = this.viewOptions.list_actions.items[i];
				var html = action.html;

				actionsHtml += '<li><a href="#" data-action="' + action.name + '" class="action-item"> ' + html + '</a></li>';
			}

			var actionsDropdown = '<div class="btn-group">' +
				'<button type="button" class="btn btn-xs btn-default dropdown-toggle repeater-actions-button" data-toggle="dropdown" data-flip="auto" aria-expanded="false">' +
				'<span class="caret"></span>' +
				'</button>' +
				'<ul class="dropdown-menu dropdown-menu-right" role="menu">' +
				actionsHtml +
				'</ul></div>';

			if ($actionsTable.length < 1) {
				var $actionsColumnWrapper = $('<div class="actions-column-wrapper" style="width: ' + this.list_actions_width + 'px"></div>').insertBefore($table);
				var $actionsColumn = $table.clone().addClass('table-actions');
				$actionsColumn.find('th:not(:last-child)').remove();
				$actionsColumn.find('tr td:not(:last-child)').remove();

				// Dont show actions dropdown in header if not multi select
				if (this.viewOptions.list_selectable === 'multi' || this.viewOptions.list_selectable === 'action') {
					$actionsColumn.find('thead tr').html('<th><div class="repeater-list-heading">' + actionsDropdown + '</div></th>');

					if (this.viewOptions.list_selectable !== 'action') {
						// disable the header dropdown until an item is selected
						$actionsColumn.find('thead .btn').attr('disabled', 'disabled');
					}
				} else {
					var label = this.viewOptions.list_actions.label || '<span class="actions-hidden">a</span>';
					$actionsColumn.find('thead tr').addClass('empty-heading').html('<th>' + label + '<div class="repeater-list-heading">' + label + '</div></th>');
				}

				// Create Actions dropdown for each cell in actions table
				var $actionsCells = $actionsColumn.find('td');

				$actionsCells.each(function addActionsDropdown (rowNumber) {
					$(this).html(actionsDropdown);
					$(this).find('a').attr('data-row', rowNumber + 1);
				});

				$actionsColumnWrapper.append($actionsColumn);

				this.$canvas.addClass('actions-enabled');
			}

			this.list_sizeActionsTable();

			// row level actions click
			this.$element.find('.table-actions tbody .action-item').on('click', function onBodyActionItemClick (e) {
				if (!self.isDisabled) {
					var actionName = $(this).data('action');
					var row = $(this).data('row');
					var selected = {
						actionName: actionName,
						rows: [row]
					};
					self.list_getActionItems(selected, e);
				}
			});
			// bulk actions click
			this.$element.find('.table-actions thead .action-item').on('click', function onHeadActionItemClick (e) {
				if (!self.isDisabled) {
					var actionName = $(this).data('action');
					var selected = {
						actionName: actionName,
						rows: []
					};
					var selector = '.repeater-list-wrapper > table .selected';

					if ( self.viewOptions.list_selectable === 'action' ) {
						selector = '.repeater-list-wrapper > table tr';
					}
					self.$element.find(selector).each(function eachSelector (selectorIndex) {
						selected.rows.push(selectorIndex + 1);
					});

					self.list_getActionItems(selected, e);
				}
			});
		};

		$.fn.repeater.Constructor.prototype.list_getActionItems = function listGetActionItems (selected, e) {
			var selectedObj = [];
			var actionObj = $.grep(this.viewOptions.list_actions.items, function matchedActions (actions) {
				return actions.name === selected.actionName;
			})[0];
			for (var i = 0, selectedRowsL = selected.rows.length; i < selectedRowsL; i++) {
				var clickedRow = this.$canvas.find('.repeater-list-wrapper > table tbody tr:nth-child(' + selected.rows[i] + ')');
				selectedObj.push({
					item: clickedRow,
					rowData: clickedRow.data('item_data')
				});
			}
			if (selectedObj.length === 1) {
				selectedObj = selectedObj[0];
			}

			if (actionObj.clickAction) {
				var callback = function noop () {};// for backwards compatibility. No idea why this was originally here...
				actionObj.clickAction(selectedObj, callback, e);
			}
		};

		$.fn.repeater.Constructor.prototype.list_sizeActionsTable = function listSizeActionsTable () {
			var $actionsTable = this.$element.find('.repeater-list table.table-actions');
			var $actionsTableHeader = $actionsTable.find('thead tr th');
			var $table = this.$element.find('.repeater-list-wrapper > table');

			$actionsTableHeader.outerHeight($table.find('thead tr th').outerHeight());
			$actionsTableHeader.find('.repeater-list-heading').outerHeight($actionsTableHeader.outerHeight());
			$actionsTable.find('tbody tr td:first-child').each(function eachFirstChild (i) {
				$(this).outerHeight($table.find('tbody tr:eq(' + i + ') td').outerHeight());
			});
		};

		$.fn.repeater.Constructor.prototype.list_sizeFrozenColumns = function listSizeFrozenColumns () {
			var $table = this.$element.find('.repeater-list .repeater-list-wrapper > table');

			this.$element.find('.repeater-list table.table-frozen tr').each(function eachTR (i) {
				$(this).height($table.find('tr:eq(' + i + ')').height());
			});

			var columnWidth = $table.find('td:eq(0)').outerWidth();
			this.$element.find('.frozen-column-wrapper, .frozen-thead-wrapper').width(columnWidth);
		};

		$.fn.repeater.Constructor.prototype.list_frozenOptionsInitialize = function listFrozenOptionsInitialize () {
			var $checkboxes = this.$element.find('.frozen-column-wrapper .checkbox-inline');
			var $headerCheckbox = this.$element.find('.header-checkbox .checkbox-custom');
			var $everyTable = this.$element.find('.repeater-list table');
			var self = this;

			// Make sure if row is hovered that it is shown in frozen column as well
			this.$element.find('tr.selectable').on('mouseover mouseleave', function onMouseEvents (e) {
				var index = $(this).index();
				index = index + 1;
				if (e.type === 'mouseover') {
					$everyTable.find('tbody tr:nth-child(' + index + ')').addClass('hovered');
				} else {
					$everyTable.find('tbody tr:nth-child(' + index + ')').removeClass('hovered');
				}
			});

			$headerCheckbox.checkbox();
			$checkboxes.checkbox();

			// Row checkboxes
			var $rowCheckboxes = this.$element.find('.table-frozen tbody .checkbox-inline');
			var $checkAll = this.$element.find('.frozen-thead-wrapper thead .checkbox-inline input');
			$rowCheckboxes.on('change', function onChangeRowCheckboxes (e) {
				e.preventDefault();

				if (!self.list_revertingCheckbox) {
					if (self.isDisabled) {
						revertCheckbox($(e.currentTarget));
					} else {
						var row = $(this).attr('data-row');
						row = parseInt(row, 10) + 1;
						self.$element.find('.repeater-list-wrapper > table tbody tr:nth-child(' + row + ')').click();

						var numSelected = self.$element.find('.table-frozen tbody .checkbox-inline.checked').length;
						if (numSelected === 0) {
							$checkAll.prop('checked', false);
							$checkAll.prop('indeterminate', false);
						} else if (numSelected === $rowCheckboxes.length) {
							$checkAll.prop('checked', true);
							$checkAll.prop('indeterminate', false);
						} else {
							$checkAll.prop('checked', false);
							$checkAll.prop('indeterminate', true);
						}
					}
				}
			});

			// "Check All" checkbox
			$checkAll.on('change', function onChangeCheckAll (e) {
				if (!self.list_revertingCheckbox) {
					if (self.isDisabled) {
						revertCheckbox($(e.currentTarget));
					} else if ($(this).is(':checked')) {
						self.$element.find('.repeater-list-wrapper > table tbody tr:not(.selected)').click();
						self.$element.trigger('selected.fu.repeaterList', $checkboxes);
					} else {
						self.$element.find('.repeater-list-wrapper > table tbody tr.selected').click();
						self.$element.trigger('deselected.fu.repeaterList', $checkboxes);
					}
				}
			});

			function revertCheckbox ($checkbox) {
				self.list_revertingCheckbox = true;
				$checkbox.checkbox('toggle');
				delete self.list_revertingCheckbox;
			}
		};

		// ADDITIONAL DEFAULT OPTIONS
		$.fn.repeater.defaults = $.extend({}, $.fn.repeater.defaults, {
			list_columnRendered: null,
			list_columnSizing: true,
			list_columnSyncing: true,
			list_highlightSortedColumn: true,
			list_infiniteScroll: false,
			list_noItemsHTML: 'no items found',
			list_selectable: false,
			list_sortClearing: false,
			list_rowRendered: null,
			list_frozenColumns: 0,
			list_actions: false
		});

		// EXTENSION DEFINITION
		$.fn.repeater.viewTypes.list = {
			cleared: function cleared () {
				if (this.viewOptions.list_columnSyncing) {
					this.list_sizeHeadings();
				}
			},
			dataOptions: function dataOptions (options) {
				if (this.list_sortDirection) {
					options.sortDirection = this.list_sortDirection;
				}
				if (this.list_sortProperty) {
					options.sortProperty = this.list_sortProperty;
				}
				return options;
			},
			enabled: function enabled (helpers) {
				if (this.viewOptions.list_actions) {
					if (!helpers.status) {
						this.$canvas.find('.repeater-actions-button').attr('disabled', 'disabled');
					} else {
						this.$canvas.find('.repeater-actions-button').removeAttr('disabled');
						toggleActionsHeaderButton.call(this);
					}
				}
			},
			initialize: function initialize (helpers, callback) {
				this.list_sortDirection = null;
				this.list_sortProperty = null;
				this.list_specialBrowserClass = specialBrowserClass();
				this.list_actions_width = (this.viewOptions.list_actions.width !== undefined) ? this.viewOptions.list_actions.width : 37;
				this.list_noItems = false;
				callback();
			},
			resize: function resize () {
				sizeColumns.call(this, this.$element.find('.repeater-list-wrapper > table thead tr'));
				if (this.viewOptions.list_actions) {
					this.list_sizeActionsTable();
				}
				if (this.viewOptions.list_frozenColumns || this.viewOptions.list_selectable === 'multi') {
					this.list_sizeFrozenColumns();
				}
				if (this.viewOptions.list_columnSyncing) {
					this.list_sizeHeadings();
				}
			},
			selected: function selected () {
				var infScroll = this.viewOptions.list_infiniteScroll;
				var opts;

				this.list_firstRender = true;
				this.$loader.addClass('noHeader');

				if (infScroll) {
					opts = (typeof infScroll === 'object') ? infScroll : {};
					this.infiniteScrolling(true, opts);
				}
			},
			before: function before (helpers) {
				var $listContainer = helpers.container.find('.repeater-list');
				var self = this;
				var $table;

				// this is a patch, it was pulled out of `renderThead`
				if (helpers.data.count > 0) {
					this.list_noItems = false;
				} else {
					this.list_noItems = true;
				}

				if ($listContainer.length < 1) {
					$listContainer = $('<div class="repeater-list ' + this.list_specialBrowserClass + '" data-preserve="shallow"><div class="repeater-list-wrapper" data-infinite="true" data-preserve="shallow"><table aria-readonly="true" class="table" data-preserve="shallow" role="grid"></table></div></div>');
					$listContainer.find('.repeater-list-wrapper').on('scroll.fu.repeaterList', function onScrollRepeaterList () {
						if (self.viewOptions.list_columnSyncing) {
							self.list_positionHeadings();
						}
					});
					if (self.viewOptions.list_frozenColumns || self.viewOptions.list_actions || self.viewOptions.list_selectable === 'multi') {
						helpers.container.on('scroll.fu.repeaterList', function onScrollRepeaterList () {
							self.list_positionColumns();
						});
					}

					helpers.container.append($listContainer);
				}
				helpers.container.removeClass('actions-enabled actions-enabled multi-select-enabled');

				$table = $listContainer.find('table');
				renderThead.call(this, $table, helpers.data);
				renderTbody.call(this, $table, helpers.data);

				return false;
			},
			renderItem: function renderItem (helpers) {
				renderRow.call(this, helpers.container, helpers.subset, helpers.index);
				return false;
			},
			after: function after () {
				var $sorted;

				if ((this.viewOptions.list_frozenColumns || this.viewOptions.list_selectable === 'multi') && !this.list_noItems) {
					this.list_setFrozenColumns();
				}

				if (this.viewOptions.list_actions && !this.list_noItems) {
					this.list_createItemActions();
					this.list_sizeActionsTable();
				}

				if ((this.viewOptions.list_frozenColumns || this.viewOptions.list_actions || this.viewOptions.list_selectable === 'multi') && !this.list_noItems) {
					this.list_positionColumns();
					this.list_frozenOptionsInitialize();
				}

				if (this.viewOptions.list_columnSyncing) {
					this.list_sizeHeadings();
					this.list_positionHeadings();
				}

				$sorted = this.$canvas.find('.repeater-list-wrapper > table .repeater-list-heading.sorted');
				if ($sorted.length > 0) {
					this.list_highlightColumn($sorted.data('fu_item_index'));
				}

				return false;
			}
		};
	}

	// ADDITIONAL METHODS
	var areDifferentColumns = function areDifferentColumns (oldCols, newCols) {
		if (!newCols) {
			return false;
		}
		if (!oldCols || (newCols.length !== oldCols.length)) {
			return true;
		}
		for (var i = 0, newColsL = newCols.length; i < newColsL; i++) {
			if (!oldCols[i]) {
				return true;
			}

			for (var j in newCols[i]) {
				if (newCols[i].hasOwnProperty(j) && oldCols[i][j] !== newCols[i][j]) {
					return true;
				}
			}
		}
		return false;
	};

	var renderColumn = function renderColumn ($row, rows, rowIndex, columns, columnIndex) {
		var className = columns[columnIndex].className;
		var content = rows[rowIndex][columns[columnIndex].property];
		var $col = $('<td></td>');
		var width = columns[columnIndex]._auto_width;

		var property = columns[columnIndex].property;
		if (this.viewOptions.list_actions !== false && property === '@_ACTIONS_@') {
			content = '<div class="repeater-list-actions-placeholder" style="width: ' + this.list_actions_width  + 'px"></div>';
		}

		content = (content !== undefined) ? content : '';

		$col.addClass(((className !== undefined) ? className : '')).append(content);
		if (width !== undefined) {
			$col.outerWidth(width);
		}

		$row.append($col);

		if (this.viewOptions.list_selectable === 'multi' && columns[columnIndex].property === '@_CHECKBOX_@') {
			var checkBoxMarkup = '<label data-row="' + rowIndex + '" class="checkbox-custom checkbox-inline body-checkbox repeater-select-checkbox">' +
				'<input class="sr-only" type="checkbox"></label>';

			$col.html(checkBoxMarkup);
		}

		return $col;
	};

	var renderHeader = function renderHeader ($tr, columns, index) {
		var chevDown = 'glyphicon-chevron-down';
		var chevron = '.glyphicon.rlc:first';
		var chevUp = 'glyphicon-chevron-up';
		var $div = $('<div class="repeater-list-heading"><span class="glyphicon rlc"></span></div>');
		var checkAllID = (this.$element.attr('id') + '_' || 0) + 'checkall';

		var checkBoxMarkup = '<div class="repeater-list-heading header-checkbox">' +
				'<label id="' + checkAllID + '" class="checkbox-custom checkbox-inline">' +
					'<input class="sr-only" type="checkbox" value="">' +
					'<span class="checkbox-label">&nbsp;</span>' +
				'</label>' +
			'</div>';

		var $header = $('<th></th>');
		var self = this;
		var $both;
		var className;
		var sortable;
		var $span;
		var $spans;

		$div.data('fu_item_index', index);
		$div.prepend(columns[index].label);
		$header.html($div.html()).find('[id]').removeAttr('id');

		if (columns[index].property !== '@_CHECKBOX_@') {
			$header.append($div);
		} else {
			$header.append(checkBoxMarkup);
		}

		$both = $header.add($div);
		$span = $div.find(chevron);
		$spans = $span.add($header.find(chevron));

		if (this.viewOptions.list_actions && columns[index].property === '@_ACTIONS_@') {
			var width = this.list_actions_width;
			$header.css('width', width);
			$div.css('width', width);
		}

		className = columns[index].className;
		if (className !== undefined) {
			$both.addClass(className);
		}

		sortable = columns[index].sortable;
		if (sortable) {
			$both.addClass('sortable');
			$div.on('click.fu.repeaterList', function onClickRepeaterList () {
				if (!self.isDisabled) {
					self.list_sortProperty = (typeof sortable === 'string') ? sortable : columns[index].property;
					if ($div.hasClass('sorted')) {
						if ($span.hasClass(chevUp)) {
							$spans.removeClass(chevUp).addClass(chevDown);
							self.list_sortDirection = 'desc';
						} else if (!self.viewOptions.list_sortClearing) {
							$spans.removeClass(chevDown).addClass(chevUp);
							self.list_sortDirection = 'asc';
						} else {
							$both.removeClass('sorted');
							$spans.removeClass(chevDown);
							self.list_sortDirection = null;
							self.list_sortProperty = null;
						}
					} else {
						$tr.find('th, .repeater-list-heading').removeClass('sorted');
						$spans.removeClass(chevDown).addClass(chevUp);
						self.list_sortDirection = 'asc';
						$both.addClass('sorted');
					}

					self.render({
						clearInfinite: true,
						pageIncrement: null
					});
				}
			});
		}

		if (columns[index].sortDirection === 'asc' || columns[index].sortDirection === 'desc') {
			$tr.find('th, .repeater-list-heading').removeClass('sorted');
			$both.addClass('sortable sorted');
			if (columns[index].sortDirection === 'asc') {
				$spans.addClass(chevUp);
				this.list_sortDirection = 'asc';
			} else {
				$spans.addClass(chevDown);
				this.list_sortDirection = 'desc';
			}

			this.list_sortProperty = (typeof sortable === 'string') ? sortable : columns[index].property;
		}

		$tr.append($header);
	};

	var onClickRowRepeaterList = function onClickRowRepeaterList (repeater) {
		var isMulti = repeater.viewOptions.list_selectable === 'multi';
		var isActions = repeater.viewOptions.list_actions;
		var $repeater = repeater.$element;

		if (!repeater.isDisabled) {
			var $item = $(this);
			var index = $(this).index() + 1;
			var $frozenRow = $repeater.find('.frozen-column-wrapper tr:nth-child(' + index + ')');
			var $actionsRow = $repeater.find('.actions-column-wrapper tr:nth-child(' + index + ')');
			var $checkBox = $repeater.find('.frozen-column-wrapper tr:nth-child(' + index + ') .checkbox-inline');

			if ($item.is('.selected')) {
				$item.removeClass('selected');
				if (isMulti) {
					$checkBox.click();
					$frozenRow.removeClass('selected');
					if (isActions) {
						$actionsRow.removeClass('selected');
					}
				} else {
					$item.find('.repeater-list-check').remove();
				}

				$repeater.trigger('deselected.fu.repeaterList', $item);
			} else {
				if (!isMulti) {
					repeater.$canvas.find('.repeater-list-check').remove();
					repeater.$canvas.find('.repeater-list tbody tr.selected').each(function deslectRow () {
						$(this).removeClass('selected');
						$repeater.trigger('deselected.fu.repeaterList', $(this));
					});
					$item.find('td:first').prepend('<div class="repeater-list-check"><span class="glyphicon glyphicon-ok"></span></div>');
					$item.addClass('selected');
					$frozenRow.addClass('selected');
				} else {
					$checkBox.click();
					$item.addClass('selected');
					$frozenRow.addClass('selected');
					if (isActions) {
						$actionsRow.addClass('selected');
					}
				}
				$repeater.trigger('selected.fu.repeaterList', $item);
			}

			toggleActionsHeaderButton.call(repeater);
		}
	};

	var renderRow = function renderRow ($tbody, rows, index) {
		var $row = $('<tr></tr>');

		if (this.viewOptions.list_selectable) {
			$row.data('item_data', rows[index]);

			if (this.viewOptions.list_selectable !== 'action') {
				$row.addClass('selectable');
				$row.attr('tabindex', 0);	// allow items to be tabbed to / focused on

				var repeater = this;
				$row.on('click.fu.repeaterList', function callOnClickRowRepeaterList() {
					onClickRowRepeaterList.call(this, repeater);
				});

				// allow selection via enter key
				$row.keyup(function onRowKeyup (e) {
					if (e.keyCode === 13) {
						// triggering a standard click event to be caught by the row click handler above
						$row.trigger('click.fu.repeaterList');
					}
				});
			}
		}

		if (this.viewOptions.list_actions && !this.viewOptions.list_selectable) {
			$row.data('item_data', rows[index]);
		}

		var columns = [];
		for (var i = 0, length = this.list_columns.length; i < length; i++) {
			columns.push(renderColumn.call(this, $row, rows, index, this.list_columns, i));
		}

		$tbody.append($row);

		if (this.viewOptions.list_columnRendered) {
			for (var columnIndex = 0, colLength = columns.length; columnIndex < colLength; columnIndex++) {
				if (!(this.list_columns[columnIndex].property === '@_CHECKBOX_@' || this.list_columns[columnIndex].property === '@_ACTIONS_@')) {
					this.viewOptions.list_columnRendered({
						container: $row,
						columnAttr: this.list_columns[columnIndex].property,
						item: columns[columnIndex],
						rowData: rows[index]
					}, function noop () {});
				}
			}
		}

		if (this.viewOptions.list_rowRendered) {
			this.viewOptions.list_rowRendered({
				container: $tbody,
				item: $row,
				rowData: rows[index]
			}, function noop () {});
		}
	};

	var renderTbody = function renderTbody ($table, data) {
		var $tbody = $table.find('tbody');
		var $empty;

		if ($tbody.length < 1) {
			$tbody = $('<tbody data-container="true"></tbody>');
			$table.append($tbody);
		}

		if (typeof data.error === 'string' && data.error.length > 0) {
			$empty = $('<tr class="empty text-danger"><td colspan="' + this.list_columns.length + '"></td></tr>');
			$empty.find('td').append(data.error);
			$tbody.append($empty);
		} else if (data.items && data.items.length < 1) {
			$empty = $('<tr class="empty"><td colspan="' + this.list_columns.length + '"></td></tr>');
			$empty.find('td').append(this.viewOptions.list_noItemsHTML);
			$tbody.append($empty);
		}
	};

	var renderThead = function renderThead ($table, data) {
		var columns = data.columns || [];
		var $thead = $table.find('thead');
		var i;
		var length;
		var $tr;

		if (this.list_firstRender || areDifferentColumns(this.list_columns, columns) || $thead.length === 0) {
			$thead.remove();

			// list_noItems is set in `before` method

			if (this.viewOptions.list_selectable === 'multi' && !this.list_noItems) {
				var checkboxColumn = {
					label: 'c',
					property: '@_CHECKBOX_@',
					sortable: false
				};
				columns.splice(0, 0, checkboxColumn);
			}

			this.list_columns = columns;
			this.list_firstRender = false;
			this.$loader.removeClass('noHeader');

			// keep action column header even when empty, you'll need it later....
			if (this.viewOptions.list_actions) {
				var actionsColumn = {
					label: this.viewOptions.list_actions.label || '<span class="actions-hidden">a</span>',
					property: '@_ACTIONS_@',
					sortable: false,
					width: this.list_actions_width
				};
				columns.push(actionsColumn);
			}


			$thead = $('<thead data-preserve="deep"><tr></tr></thead>');
			$tr = $thead.find('tr');
			for (i = 0, length = columns.length; i < length; i++) {
				renderHeader.call(this, $tr, columns, i);
			}
			$table.prepend($thead);

			if (this.viewOptions.list_selectable === 'multi' && !this.list_noItems) {
				// after checkbox column is created need to get width of checkbox column from
				// its css class
				var checkboxWidth = this.$element.find('.repeater-list-wrapper .header-checkbox').outerWidth();
				var selectColumn = $.grep(columns, function grepColumn (column) {
					return column.property === '@_CHECKBOX_@';
				})[0];
				selectColumn.width = checkboxWidth;
			}
			sizeColumns.call(this, $tr);
		}
	};

	var sizeColumns = function sizeColumns ($tr) {
		var automaticallyGeneratedWidths = [];
		var self = this;
		var i;
		var length;
		var newWidth;
		var widthTaken;

		if (this.viewOptions.list_columnSizing) {
			i = 0;
			widthTaken = 0;
			$tr.find('th').each(function eachTH () {
				var $th = $(this);
				var width;
				if (self.list_columns[i].width !== undefined) {
					width = self.list_columns[i].width;
					$th.outerWidth(width);
					widthTaken += $th.outerWidth();
					self.list_columns[i]._auto_width = width;
				} else {
					var outerWidth = $th.find('.repeater-list-heading').outerWidth();
					automaticallyGeneratedWidths.push({
						col: $th,
						index: i,
						minWidth: outerWidth
					});
				}

				i++;
			});

			length = automaticallyGeneratedWidths.length;
			if (length > 0) {
				var canvasWidth = this.$canvas.find('.repeater-list-wrapper').outerWidth();
				newWidth = Math.floor((canvasWidth - widthTaken) / length);
				for (i = 0; i < length; i++) {
					if (automaticallyGeneratedWidths[i].minWidth > newWidth) {
						newWidth = automaticallyGeneratedWidths[i].minWidth;
					}
					automaticallyGeneratedWidths[i].col.outerWidth(newWidth);
					this.list_columns[automaticallyGeneratedWidths[i].index]._auto_width = newWidth;
				}
			}
		}
	};

	var specialBrowserClass = function specialBrowserClass () {
		var ua = window.navigator.userAgent;
		var msie = ua.indexOf('MSIE ');
		var firefox = ua.indexOf('Firefox');

		if (msie > 0 ) {
			return 'ie-' + parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		} else if (firefox > 0) {
			return 'firefox';
		}

		return '';
	};

	var toggleActionsHeaderButton = function toggleActionsHeaderButton () {
		var selectedSelector = '.repeater-list-wrapper > table .selected';
		var $actionsColumn = this.$element.find('.table-actions');
		var $selected;

		if (this.viewOptions.list_selectable === 'action') {
			selectedSelector = '.repeater-list-wrapper > table tr';
		}

		$selected = this.$canvas.find( selectedSelector );

		if ($selected.length > 0) {
			$actionsColumn.find('thead .btn').removeAttr('disabled');
		} else {
			$actionsColumn.find('thead .btn').attr('disabled', 'disabled');
		}
	};

	// -- BEGIN UMD WRAPPER AFTERWORD --
}));
// -- END UMD WRAPPER AFTERWORD --


/***/ }),

/***/ 9115:
/*!******************************************************!*\
  !*** ./node_modules/fuelux/js/repeater-thumbnail.js ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global jQuery:true */

/*
 * Fuel UX Repeater - Thumbnail View Plugin
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
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ 5311), __webpack_require__(/*! fuelux/repeater */ 890)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}(function repeaterThumbnailWrapper ($) {
	// -- END UMD WRAPPER PREFACE --

	// -- BEGIN MODULE CODE HERE --

	if ($.fn.repeater) {
		//ADDITIONAL METHODS
		$.fn.repeater.Constructor.prototype.thumbnail_clearSelectedItems = function () {
			this.$canvas.find('.repeater-thumbnail-cont .selectable.selected').removeClass('selected');
		};

		$.fn.repeater.Constructor.prototype.thumbnail_getSelectedItems = function () {
			var selected = [];
			this.$canvas.find('.repeater-thumbnail-cont .selectable.selected').each(function () {
				selected.push($(this));
			});
			return selected;
		};

		$.fn.repeater.Constructor.prototype.thumbnail_setSelectedItems = function (items, force) {
			var selectable = this.viewOptions.thumbnail_selectable;
			var self = this;
			var i, $item, l, n;

			//this function is necessary because lint yells when a function is in a loop
			function compareItemIndex () {
				if (n === items[i].index) {
					$item = $(this);
					return false;
				} else {
					n++;
				}
			}

			//this function is necessary because lint yells when a function is in a loop
			function compareItemSelector () {
				$item = $(this);
				if ($item.is(items[i].selector)) {
					selectItem($item, items[i].selected);
				}
			}

			function selectItem ($itm, select) {
				select = (select !== undefined) ? select : true;
				if (select) {
					if (!force && selectable !== 'multi') {
						self.thumbnail_clearSelectedItems();
					}

					$itm.addClass('selected');
				} else {
					$itm.removeClass('selected');
				}
			}

			if (!$.isArray(items)) {
				items = [items];
			}

			if (force === true || selectable === 'multi') {
				l = items.length;
			} else if (selectable) {
				l = (items.length > 0) ? 1 : 0;
			} else {
				l = 0;
			}

			for (i = 0; i < l; i++) {
				if (items[i].index !== undefined) {
					$item = $();
					n = 0;
					this.$canvas.find('.repeater-thumbnail-cont .selectable').each(compareItemIndex);
					if ($item.length > 0) {
						selectItem($item, items[i].selected);
					}

				} else if (items[i].selector) {
					this.$canvas.find('.repeater-thumbnail-cont .selectable').each(compareItemSelector);
				}
			}
		};

		//ADDITIONAL DEFAULT OPTIONS
		$.fn.repeater.defaults = $.extend({}, $.fn.repeater.defaults, {
			thumbnail_alignment: 'left',
			thumbnail_infiniteScroll: false,
			thumbnail_itemRendered: null,
			thumbnail_noItemsHTML: 'no items found',
			thumbnail_selectable: false,
			thumbnail_template: '<div class="thumbnail repeater-thumbnail"><img height="75" src="{{src}}" width="65"><span>{{name}}</span></div>'
		});

		//EXTENSION DEFINITION
		$.fn.repeater.viewTypes.thumbnail = {
			selected: function () {
				var infScroll = this.viewOptions.thumbnail_infiniteScroll;
				var opts;
				if (infScroll) {
					opts = (typeof infScroll === 'object') ? infScroll : {};
					this.infiniteScrolling(true, opts);
				}
			},
			before: function (helpers) {
				var alignment = this.viewOptions.thumbnail_alignment;
				var $cont = this.$canvas.find('.repeater-thumbnail-cont');
				var data = helpers.data;
				var response = {};
				var $empty, validAlignments;

				if ($cont.length < 1) {
					$cont = $('<div class="clearfix repeater-thumbnail-cont" data-container="true" data-infinite="true" data-preserve="shallow"></div>');
					if (alignment && alignment !== 'none') {
						validAlignments = {
							'center': 1,
							'justify': 1,
							'left': 1,
							'right': 1
						};
						alignment = (validAlignments[alignment]) ? alignment : 'justify';
						$cont.addClass('align-' + alignment);
						this.thumbnail_injectSpacers = true;
					} else {
						this.thumbnail_injectSpacers = false;
					}
					response.item = $cont;
				} else {
					response.action = 'none';
				}

				if (data.items && data.items.length < 1) {
					$empty = $('<div class="empty"></div>');
					$empty.append(this.viewOptions.thumbnail_noItemsHTML);
					$cont.append($empty);
				} else {
					$cont.find('.empty:first').remove();
				}

				return response;
			},
			renderItem: function (helpers) {
				var selectable = this.viewOptions.thumbnail_selectable;
				var selected = 'selected';
				var self = this;
				var $thumbnail = $(fillTemplate(helpers.subset[helpers.index], this.viewOptions.thumbnail_template));

				$thumbnail.data('item_data', helpers.data.items[helpers.index]);

				if (selectable) {
					$thumbnail.addClass('selectable');
					$thumbnail.on('click', function () {
						if (self.isDisabled) return;

						if (!$thumbnail.hasClass(selected)) {
							if (selectable !== 'multi') {
								self.$canvas.find('.repeater-thumbnail-cont .selectable.selected').each(function () {
									var $itm = $(this);
									$itm.removeClass(selected);
									self.$element.trigger('deselected.fu.repeaterThumbnail', $itm);
								});
							}

							$thumbnail.addClass(selected);
							self.$element.trigger('selected.fu.repeaterThumbnail', $thumbnail);
						} else {
							$thumbnail.removeClass(selected);
							self.$element.trigger('deselected.fu.repeaterThumbnail', $thumbnail);
						}
					});
				}

				helpers.container.append($thumbnail);
				if (this.thumbnail_injectSpacers) {
					$thumbnail.after('<span class="spacer">&nbsp;</span>');
				}

				if (this.viewOptions.thumbnail_itemRendered) {
					this.viewOptions.thumbnail_itemRendered({
						container: helpers.container,
						item: $thumbnail,
						itemData: helpers.subset[helpers.index]
					}, function () {});
				}

				return false;
			}
		};
	}

	//ADDITIONAL METHODS
	function fillTemplate (itemData, template) {
		var invalid = false;

		function replace () {
			var end, start, val;

			start = template.indexOf('{{');
			end = template.indexOf('}}', start + 2);

			if (start > -1 && end > -1) {
				val = $.trim(template.substring(start + 2, end));
				val = (itemData[val] !== undefined) ? itemData[val] : '';
				template = template.substring(0, start) + val + template.substring(end + 2);
			} else {
				invalid = true;
			}
		}

		while (!invalid && template.search('{{') >= 0) {
			replace(template);
		}

		return template;
	}

	// -- BEGIN UMD WRAPPER AFTERWORD --
}));
// -- END UMD WRAPPER AFTERWORD --


/***/ }),

/***/ 890:
/*!********************************************!*\
  !*** ./node_modules/fuelux/js/repeater.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global jQuery:true */

/*
 * Fuel UX Repeater
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
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ 5311), __webpack_require__(/*! fuelux/combobox */ 6214), __webpack_require__(/*! fuelux/infinite-scroll */ 8671), __webpack_require__(/*! fuelux/search */ 8340), __webpack_require__(/*! fuelux/selectlist */ 604)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}(function RepeaterWrapper ($) {
	// -- END UMD WRAPPER PREFACE --

	// -- BEGIN MODULE CODE HERE --

	var old = $.fn.repeater;

	// REPEATER CONSTRUCTOR AND PROTOTYPE

	var Repeater = function Repeater (element, options) {
		var self = this;
		var $btn;
		var currentView;

		this.$element = $(element);

		this.$canvas = this.$element.find('.repeater-canvas');
		this.$count = this.$element.find('.repeater-count');
		this.$end = this.$element.find('.repeater-end');
		this.$filters = this.$element.find('.repeater-filters');
		this.$loader = this.$element.find('.repeater-loader');
		this.$pageSize = this.$element.find('.repeater-itemization .selectlist');
		this.$nextBtn = this.$element.find('.repeater-next');
		this.$pages = this.$element.find('.repeater-pages');
		this.$prevBtn = this.$element.find('.repeater-prev');
		this.$primaryPaging = this.$element.find('.repeater-primaryPaging');
		this.$search = this.$element.find('.repeater-search').find('.search');
		this.$secondaryPaging = this.$element.find('.repeater-secondaryPaging');
		this.$start = this.$element.find('.repeater-start');
		this.$viewport = this.$element.find('.repeater-viewport');
		this.$views = this.$element.find('.repeater-views');

		this.currentPage = 0;
		this.currentView = null;
		this.isDisabled = false;
		this.infiniteScrollingCallback = function noop () {};
		this.infiniteScrollingCont = null;
		this.infiniteScrollingEnabled = false;
		this.infiniteScrollingEnd = null;
		this.infiniteScrollingOptions = {};
		this.lastPageInput = 0;
		this.options = $.extend({}, $.fn.repeater.defaults, options);
		this.pageIncrement = 0;// store direction navigated
		this.resizeTimeout = {};
		this.stamp = new Date().getTime() + (Math.floor(Math.random() * 100) + 1);
		this.storedDataSourceOpts = null;
		this.syncingViewButtonState = false;
		this.viewOptions = {};
		this.viewType = null;

		this.$filters.selectlist();
		this.$pageSize.selectlist();
		this.$primaryPaging.find('.combobox').combobox();
		this.$search.search({
			searchOnKeyPress: this.options.searchOnKeyPress,
			allowCancel: this.options.allowCancel
		});

		this.$filters.on('changed.fu.selectlist', function onFiltersChanged (e, value) {
			self.$element.trigger('filtered.fu.repeater', value);
			self.render({
				clearInfinite: true,
				pageIncrement: null
			});
		});
		this.$nextBtn.on('click.fu.repeater', $.proxy(this.next, this));
		this.$pageSize.on('changed.fu.selectlist', function onPageSizeChanged (e, value) {
			self.$element.trigger('pageSizeChanged.fu.repeater', value);
			self.render({
				pageIncrement: null
			});
		});
		this.$prevBtn.on('click.fu.repeater', $.proxy(this.previous, this));
		this.$primaryPaging.find('.combobox').on('changed.fu.combobox', function onPrimaryPagingChanged (evt, data) {
			self.pageInputChange(data.text, data);
		});
		this.$search.on('searched.fu.search cleared.fu.search', function onSearched (e, value) {
			self.$element.trigger('searchChanged.fu.repeater', value);
			self.render({
				clearInfinite: true,
				pageIncrement: null
			});
		});
		this.$search.on('canceled.fu.search', function onSearchCanceled (e, value) {
			self.$element.trigger('canceled.fu.repeater', value);
			self.render({
				clearInfinite: true,
				pageIncrement: null
			});
		});

		this.$secondaryPaging.on('blur.fu.repeater', function onSecondaryPagingBlur () {
			self.pageInputChange(self.$secondaryPaging.val());
		});
		this.$secondaryPaging.on('keyup', function onSecondaryPagingKeyup (e) {
			if (e.keyCode === 13) {
				self.pageInputChange(self.$secondaryPaging.val());
			}
		});
		this.$views.find('input').on('change.fu.repeater', $.proxy(this.viewChanged, this));

		$(window).on('resize.fu.repeater.' + this.stamp, function onResizeRepeater () {
			clearTimeout(self.resizeTimeout);
			self.resizeTimeout = setTimeout(function resizeTimeout () {
				self.resize();
				self.$element.trigger('resized.fu.repeater');
			}, 75);
		});

		this.$loader.loader();
		this.$loader.loader('pause');
		if (this.options.defaultView !== -1) {
			currentView = this.options.defaultView;
		} else {
			$btn = this.$views.find('label.active input');
			currentView = ($btn.length > 0) ? $btn.val() : 'list';
		}

		this.setViewOptions(currentView);

		this.initViewTypes(function initViewTypes () {
			self.resize();
			self.$element.trigger('resized.fu.repeater');
			self.render({
				changeView: currentView
			});
		});
	};

	var logWarn = function logWarn (msg) {
		if (window.console && window.console.warn) {
			window.console.warn(msg);
		}
	};

	var scan = function scan (cont) {
		var keep = [];
		cont.children().each(function eachContainerChild () {
			var item = $(this);
			var pres = item.attr('data-preserve');
			if (pres === 'deep') {
				item.detach();
				keep.push(item);
			} else if (pres === 'shallow') {
				scan(item);
				item.detach();
				keep.push(item);
			}
		});
		cont.empty();
		cont.append(keep);
	};

	var addItem = function addItem ($parent, response) {
		var action;
		if (response) {
			action = (response.action) ? response.action : 'append';
			if (action !== 'none' && response.item !== undefined) {
				var $container = (response.container !== undefined) ? $(response.container) : $parent;
				$container[action](response.item);
			}
		}
	};

	var callNextInit = function callNextInit (currentViewType, viewTypes, callback) {
		var nextViewType = currentViewType + 1;
		if (nextViewType < viewTypes.length) {
			initViewType.call(this, nextViewType, viewTypes, callback);
		} else {
			callback();
		}
	};

	var initViewType = function initViewType (currentViewtype, viewTypes, callback) {
		if (viewTypes[currentViewtype].initialize) {
			viewTypes[currentViewtype].initialize.call(this, {}, function afterInitialize () {
				callNextInit.call(this, currentViewtype, viewTypes, callback);
			});
		} else {
			callNextInit.call(this, currentViewtype, viewTypes, callback);
		}
	};

	// Does all of our cleanup post-render
	var afterRender = function afterRender (state) {
		var data = state.data || {};

		if (this.infiniteScrollingEnabled) {
			if (state.viewChanged || state.options.clearInfinite) {
				this.initInfiniteScrolling();
			}

			this.infiniteScrollPaging(data, state.options);
		}

		this.$loader.hide().loader('pause');
		this.enable();

		this.$search.trigger('rendered.fu.repeater', {
			data: data,
			options: state.dataOptions,
			renderOptions: state.options
		});
		this.$element.trigger('rendered.fu.repeater', {
			data: data,
			options: state.dataOptions,
			renderOptions: state.options
		});

		// for maintaining support of 'loaded' event
		this.$element.trigger('loaded.fu.repeater', state.dataOptions);
	};

	// This does the actual rendering of the repeater
	var doRender = function doRender (state) {
		var data = state.data || {};

		if (this.infiniteScrollingEnabled) {
			// pass empty object because data handled in infiniteScrollPaging method
			this.infiniteScrollingCallback({});
		} else {
			this.itemization(data);
			this.pagination(data);
		}

		var self = this;
		this.renderItems(
			state.viewTypeObj,
			data,
			function callAfterRender (d) {
				state.data = d;
				afterRender.call(self, state);
			}
		);
	};

	Repeater.prototype = {
		constructor: Repeater,

		clear: function clear (opts) {
			var options = opts || {};

			if (!options.preserve) {
				// Just trash everything because preserve is false
				this.$canvas.empty();
			} else if (!this.infiniteScrollingEnabled || options.clearInfinite) {
				// Preserve clear only if infiniteScrolling is disabled or if specifically told to do so
				scan(this.$canvas);
			} // Otherwise don't clear because infiniteScrolling is enabled

			// If viewChanged and current viewTypeObj has a cleared function, call it
			var viewChanged = (options.viewChanged !== undefined) ? options.viewChanged : false;
			var viewTypeObj = $.fn.repeater.viewTypes[this.viewType] || {};
			if (!viewChanged && viewTypeObj.cleared) {
				viewTypeObj.cleared.call(this, {
					options: options
				});
			}
		},

		clearPreservedDataSourceOptions: function clearPreservedDataSourceOptions () {
			this.storedDataSourceOpts = null;
		},

		destroy: function destroy () {
			var markup;
			// set input value attrbute in markup
			this.$element.find('input').each(function eachInput () {
				$(this).attr('value', $(this).val());
			});

			// empty elements to return to original markup
			this.$canvas.empty();
			markup = this.$element[0].outerHTML;

			// destroy components and remove leftover
			this.$element.find('.combobox').combobox('destroy');
			this.$element.find('.selectlist').selectlist('destroy');
			this.$element.find('.search').search('destroy');
			if (this.infiniteScrollingEnabled) {
				$(this.infiniteScrollingCont).infinitescroll('destroy');
			}

			this.$element.remove();

			// any external events
			$(window).off('resize.fu.repeater.' + this.stamp);

			return markup;
		},

		disable: function disable () {
			var viewTypeObj = $.fn.repeater.viewTypes[this.viewType] || {};

			this.$search.search('disable');
			this.$filters.selectlist('disable');
			this.$views.find('label, input').addClass('disabled').attr('disabled', 'disabled');
			this.$pageSize.selectlist('disable');
			this.$primaryPaging.find('.combobox').combobox('disable');
			this.$secondaryPaging.attr('disabled', 'disabled');
			this.$prevBtn.attr('disabled', 'disabled');
			this.$nextBtn.attr('disabled', 'disabled');

			if (viewTypeObj.enabled) {
				viewTypeObj.enabled.call(this, {
					status: false
				});
			}

			this.isDisabled = true;
			this.$element.addClass('disabled');
			this.$element.trigger('disabled.fu.repeater');
		},

		enable: function enable () {
			var viewTypeObj = $.fn.repeater.viewTypes[this.viewType] || {};

			this.$search.search('enable');
			this.$filters.selectlist('enable');
			this.$views.find('label, input').removeClass('disabled').removeAttr('disabled');
			this.$pageSize.selectlist('enable');
			this.$primaryPaging.find('.combobox').combobox('enable');
			this.$secondaryPaging.removeAttr('disabled');

			if (!this.$prevBtn.hasClass('page-end')) {
				this.$prevBtn.removeAttr('disabled');
			}
			if (!this.$nextBtn.hasClass('page-end')) {
				this.$nextBtn.removeAttr('disabled');
			}

			// is 0 or 1 pages, if using $primaryPaging (combobox)
			// if using selectlist allow user to use selectlist to select 0 or 1
			if (this.$prevBtn.hasClass('page-end') && this.$nextBtn.hasClass('page-end')) {
				this.$primaryPaging.combobox('disable');
			}

			// if there are no items
			if (parseInt(this.$count.html(), 10) !== 0) {
				this.$pageSize.selectlist('enable');
			} else {
				this.$pageSize.selectlist('disable');
			}

			if (viewTypeObj.enabled) {
				viewTypeObj.enabled.call(this, {
					status: true
				});
			}

			this.isDisabled = false;
			this.$element.removeClass('disabled');
			this.$element.trigger('enabled.fu.repeater');
		},

		getDataOptions: function getDataOptions (opts) {
			var options = opts || {};
			if (options.pageIncrement !== undefined) {
				if (options.pageIncrement === null) {
					this.currentPage = 0;
				} else {
					this.currentPage += options.pageIncrement;
				}
			}

			var dataSourceOptions = {};
			if (options.dataSourceOptions) {
				dataSourceOptions = options.dataSourceOptions;

				if (options.preserveDataSourceOptions) {
					if (this.storedDataSourceOpts) {
						this.storedDataSourceOpts = $.extend(this.storedDataSourceOpts, dataSourceOptions);
					} else {
						this.storedDataSourceOpts = dataSourceOptions;
					}
				}
			}

			if (this.storedDataSourceOpts) {
				dataSourceOptions = $.extend(this.storedDataSourceOpts, dataSourceOptions);
			}

			var returnOptions = {
				view: this.currentView,
				pageIndex: this.currentPage,
				filter: {
					text: 'All',
					value: 'all'
				}
			};
			if (this.$filters.length > 0) {
				returnOptions.filter = this.$filters.selectlist('selectedItem');
			}

			if (!this.infiniteScrollingEnabled) {
				returnOptions.pageSize = 25;

				if (this.$pageSize.length > 0) {
					returnOptions.pageSize = parseInt(this.$pageSize.selectlist('selectedItem').value, 10);
				}
			}

			var searchValue = this.$search && this.$search.find('input') && this.$search.find('input').val();
			if (searchValue !== '') {
				returnOptions.search = searchValue;
			}

			var viewType = $.fn.repeater.viewTypes[this.viewType] || {};
			var addViewTypeData = viewType.dataOptions;
			if (addViewTypeData) {
				returnOptions = addViewTypeData.call(this, returnOptions);
			}

			returnOptions = $.extend(returnOptions, dataSourceOptions);

			return returnOptions;
		},

		infiniteScrolling: function infiniteScrolling (enable, opts) {
			var footer = this.$element.find('.repeater-footer');
			var viewport = this.$element.find('.repeater-viewport');
			var options = opts || {};

			if (enable) {
				this.infiniteScrollingEnabled = true;
				this.infiniteScrollingEnd = options.end;
				delete options.dataSource;
				delete options.end;
				this.infiniteScrollingOptions = options;
				viewport.css({
					height: viewport.height() + (footer.outerHeight() || 0)
				});
				footer.hide();
			} else {
				var cont = this.infiniteScrollingCont;
				var data = cont.data();
				delete data.infinitescroll;
				cont.off('scroll');
				cont.removeClass('infinitescroll');

				this.infiniteScrollingCont = null;
				this.infiniteScrollingEnabled = false;
				this.infiniteScrollingEnd = null;
				this.infiniteScrollingOptions = {};
				viewport.css({
					height: viewport.height() - (footer.outerHeight() || 0)
				});
				footer.show();
			}
		},

		infiniteScrollPaging: function infiniteScrollPaging (data) {
			var end = (this.infiniteScrollingEnd !== true) ? this.infiniteScrollingEnd : undefined;
			var page = data.page;
			var pages = data.pages;

			this.currentPage = (page !== undefined) ? page : NaN;

			if (this.infiniteScrollingCont) {
				if (data.end === true || (this.currentPage + 1) >= pages) {
					this.infiniteScrollingCont.infinitescroll('end', end);
				} else {
					this.infiniteScrollingCont.infinitescroll('onScroll');
				}
			}
		},

		initInfiniteScrolling: function initInfiniteScrolling () {
			var cont = this.$canvas.find('[data-infinite="true"]:first');

			cont = (cont.length < 1) ? this.$canvas : cont;
			if (cont.data('fu.infinitescroll')) {
				cont.infinitescroll('enable');
			} else {
				var self = this;
				var opts = $.extend({}, this.infiniteScrollingOptions);
				opts.dataSource = function dataSource (helpers, callback) {
					self.infiniteScrollingCallback = callback;
					self.render({
						pageIncrement: 1
					});
				};
				cont.infinitescroll(opts);
				this.infiniteScrollingCont = cont;
			}
		},

		initViewTypes: function initViewTypes (callback) {
			var viewTypes = [];

			for (var key in $.fn.repeater.viewTypes) {
				if ({}.hasOwnProperty.call($.fn.repeater.viewTypes, key)) {
					viewTypes.push($.fn.repeater.viewTypes[key]);
				}
			}

			if (viewTypes.length > 0) {
				initViewType.call(this, 0, viewTypes, callback);
			} else {
				callback();
			}
		},

		itemization: function itemization (data) {
			this.$count.html((data.count !== undefined) ? data.count : '?');
			this.$end.html((data.end !== undefined) ? data.end : '?');
			this.$start.html((data.start !== undefined) ? data.start : '?');
		},

		next: function next () {
			this.$nextBtn.attr('disabled', 'disabled');
			this.$prevBtn.attr('disabled', 'disabled');
			this.pageIncrement = 1;
			this.$element.trigger('nextClicked.fu.repeater');
			this.render({
				pageIncrement: this.pageIncrement
			});
		},

		pageInputChange: function pageInputChange (val, dataFromCombobox) {
			// dataFromCombobox is a proxy for data from combobox's changed event,
			// if no combobox is present data will be undefined
			var pageInc;
			if (val !== this.lastPageInput) {
				this.lastPageInput = val;
				var value = parseInt(val, 10) - 1;
				pageInc = value - this.currentPage;
				this.$element.trigger('pageChanged.fu.repeater', [value, dataFromCombobox]);
				this.render({
					pageIncrement: pageInc
				});
			}
		},

		pagination: function pagination (data) {
			this.$primaryPaging.removeClass('active');
			this.$secondaryPaging.removeClass('active');

			var totalPages = data.pages;
			this.currentPage = (data.page !== undefined) ? data.page : NaN;
			// set paging to 0 if total pages is 0, otherwise use one-based index
			var currenPageOutput = totalPages === 0 ? 0 : this.currentPage + 1;

			if (totalPages <= this.viewOptions.dropPagingCap) {
				this.$primaryPaging.addClass('active');
				var dropMenu = this.$primaryPaging.find('.dropdown-menu');
				dropMenu.empty();
				for (var i = 0; i < totalPages; i++) {
					var l = i + 1;
					dropMenu.append('<li data-value="' + l + '"><a href="#">' + l + '</a></li>');
				}

				this.$primaryPaging.find('input.form-control').val(currenPageOutput);
			} else {
				this.$secondaryPaging.addClass('active');
				this.$secondaryPaging.val(currenPageOutput);
			}

			this.lastPageInput = this.currentPage + 1 + '';

			this.$pages.html('' + totalPages);

			// this is not the last page
			if ((this.currentPage + 1) < totalPages) {
				this.$nextBtn.removeAttr('disabled');
				this.$nextBtn.removeClass('page-end');
			} else {
				this.$nextBtn.attr('disabled', 'disabled');
				this.$nextBtn.addClass('page-end');
			}

			// this is not the first page
			if ((this.currentPage - 1) >= 0) {
				this.$prevBtn.removeAttr('disabled');
				this.$prevBtn.removeClass('page-end');
			} else {
				this.$prevBtn.attr('disabled', 'disabled');
				this.$prevBtn.addClass('page-end');
			}

			// return focus to next/previous buttons after navigating
			if (this.pageIncrement !== 0) {
				if (this.pageIncrement > 0) {
					if (this.$nextBtn.is(':disabled')) {
						// if you can't focus, go the other way
						this.$prevBtn.focus();
					} else {
						this.$nextBtn.focus();
					}
				} else if (this.$prevBtn.is(':disabled')) {
					// if you can't focus, go the other way
					this.$nextBtn.focus();
				} else {
					this.$prevBtn.focus();
				}
			}
		},

		previous: function previous () {
			this.$nextBtn.attr('disabled', 'disabled');
			this.$prevBtn.attr('disabled', 'disabled');
			this.pageIncrement = -1;
			this.$element.trigger('previousClicked.fu.repeater');
			this.render({
				pageIncrement: this.pageIncrement
			});
		},

		// This functions more as a "pre-render" than a true "render"
		render: function render (opts) {
			this.disable();

			var viewChanged = false;
			var viewTypeObj = $.fn.repeater.viewTypes[this.viewType] || {};
			var options = opts || {};

			if (options.changeView && (this.currentView !== options.changeView)) {
				var prevView = this.currentView;
				this.currentView = options.changeView;
				this.viewType = this.currentView.split('.')[0];
				this.setViewOptions(this.currentView);
				this.$element.attr('data-currentview', this.currentView);
				this.$element.attr('data-viewtype', this.viewType);
				viewChanged = true;
				options.viewChanged = viewChanged;

				this.$element.trigger('viewChanged.fu.repeater', this.currentView);

				if (this.infiniteScrollingEnabled) {
					this.infiniteScrolling(false);
				}

				viewTypeObj = $.fn.repeater.viewTypes[this.viewType] || {};
				if (viewTypeObj.selected) {
					viewTypeObj.selected.call(this, {
						prevView: prevView
					});
				}
			}

			this.syncViewButtonState();

			options.preserve = (options.preserve !== undefined) ? options.preserve : !viewChanged;
			this.clear(options);

			if (!this.infiniteScrollingEnabled || (this.infiniteScrollingEnabled && viewChanged)) {
				this.$loader.show().loader('play');
			}

			var dataOptions = this.getDataOptions(options);

			var beforeRender = this.viewOptions.dataSource;
			var repeaterPrototypeContext = this;
			beforeRender(
				dataOptions,
				// this serves as a bridge function to pass all required data through to the actual function
				// that does the rendering for us.
				function callDoRender (dataSourceReturnedData) {
					doRender.call(
						repeaterPrototypeContext,
						{
							data: dataSourceReturnedData,
							dataOptions: dataOptions,
							options: options,
							viewChanged: viewChanged,
							viewTypeObj: viewTypeObj
						}
					);
				}
			);
		},

		resize: function resize () {
			var staticHeight = (this.viewOptions.staticHeight === -1) ? this.$element.attr('data-staticheight') : this.viewOptions.staticHeight;
			var viewTypeObj = {};
			var height;
			var viewportMargins;
			var scrubbedElements = [];
			var previousProperties = [];
			var $hiddenElements = this.$element.parentsUntil(':visible').addBack();
			var currentHiddenElement;
			var currentElementIndex = 0;

			// Set parents to 'display:block' until repeater is visible again
			while (currentElementIndex < $hiddenElements.length && this.$element.is(':hidden')) {
				currentHiddenElement = $hiddenElements[currentElementIndex];
				// Only set display property on elements that are explicitly hidden (i.e. do not inherit it from their parent)
				if ($(currentHiddenElement).is(':hidden')) {
					previousProperties.push(currentHiddenElement.style['display']);
					currentHiddenElement.style['display'] = 'block';
					scrubbedElements.push(currentHiddenElement);
				}
				currentElementIndex++;
			}

			if (this.viewType) {
				viewTypeObj = $.fn.repeater.viewTypes[this.viewType] || {};
			}

			if (staticHeight !== undefined && staticHeight !== false && staticHeight !== 'false') {
				this.$canvas.addClass('scrolling');
				viewportMargins = {
					bottom: this.$viewport.css('margin-bottom'),
					top: this.$viewport.css('margin-top')
				};

				var staticHeightValue = (staticHeight === 'true' || staticHeight === true) ? this.$element.height() : parseInt(staticHeight, 10);
				var headerHeight = this.$element.find('.repeater-header').outerHeight() || 0;
				var footerHeight = this.$element.find('.repeater-footer').outerHeight() || 0;
				var bottomMargin = (viewportMargins.bottom === 'auto') ? 0 : parseInt(viewportMargins.bottom, 10);
				var topMargin = (viewportMargins.top === 'auto') ? 0 : parseInt(viewportMargins.top, 10);

				height = staticHeightValue - headerHeight - footerHeight - bottomMargin - topMargin;
				this.$viewport.outerHeight(height);
			} else {
				this.$canvas.removeClass('scrolling');
			}

			if (viewTypeObj.resize) {
				viewTypeObj.resize.call(this, {
					height: this.$element.outerHeight() || 0,
					width: this.$element.outerWidth() || 0
				});
			}

			scrubbedElements.forEach(function (element, i) {
				element.style['display'] = previousProperties[i];
			});
		},

		// e.g. "Rows" or "Thumbnails"
		renderItems: function renderItems (viewTypeObj, data, callback) {
			if (!viewTypeObj.render) {
				if (viewTypeObj.before) {
					var addBefore = viewTypeObj.before.call(this, {
						container: this.$canvas,
						data: data
					});
					addItem(this.$canvas, addBefore);
				}

				var $dataContainer = this.$canvas.find('[data-container="true"]:last');
				var $container = ($dataContainer.length > 0) ? $dataContainer : this.$canvas;

				// It appears that the following code would theoretically allow you to pass a deeply
				// nested value to "repeat on" to be added to the repeater.
				// eg. `data.foo.bar.items`
				if (viewTypeObj.renderItem) {
					var subset;
					var objectAndPropsToRepeatOnString = viewTypeObj.repeat || 'data.items';
					var objectAndPropsToRepeatOn = objectAndPropsToRepeatOnString.split('.');
					var objectToRepeatOn = objectAndPropsToRepeatOn[0];

					if (objectToRepeatOn === 'data' || objectToRepeatOn === 'this') {
						subset = (objectToRepeatOn === 'this') ? this : data;

						// Extracts subset from object chain (get `items` out of `foo.bar.items`). I think....
						var propsToRepeatOn = objectAndPropsToRepeatOn.slice(1);
						for (var prop = 0; prop < propsToRepeatOn.length; prop++) {
							if (subset[propsToRepeatOn[prop]] !== undefined) {
								subset = subset[propsToRepeatOn[prop]];
							} else {
								subset = [];
								logWarn('WARNING: Repeater unable to find property to iterate renderItem on.');
								break;
							}
						}

						for (var subItemIndex = 0; subItemIndex < subset.length; subItemIndex++) {
							var addSubItem = viewTypeObj.renderItem.call(this, {
								container: $container,
								data: data,
								index: subItemIndex,
								subset: subset
							});
							addItem($container, addSubItem);
						}
					} else {
						logWarn('WARNING: Repeater plugin "repeat" value must start with either "data" or "this"');
					}
				}

				if (viewTypeObj.after) {
					var addAfter = viewTypeObj.after.call(this, {
						container: this.$canvas,
						data: data
					});
					addItem(this.$canvas, addAfter);
				}

				callback(data);
			} else {
				viewTypeObj.render.call(this, {
					container: this.$canvas,
					data: data
				}, callback);
			}
		},

		setViewOptions: function setViewOptions (curView) {
			var opts = {};
			var viewName = curView.split('.')[1];

			if (this.options.views) {
				opts = this.options.views[viewName] || this.options.views[curView] || {};
			} else {
				opts = {};
			}

			this.viewOptions = $.extend({}, this.options, opts);
		},

		viewChanged: function viewChanged (e) {
			var $selected = $(e.target);
			var val = $selected.val();

			if (!this.syncingViewButtonState) {
				if (this.isDisabled || $selected.parents('label:first').hasClass('disabled')) {
					this.syncViewButtonState();
				} else {
					this.render({
						changeView: val,
						pageIncrement: null
					});
				}
			}
		},

		syncViewButtonState: function syncViewButtonState () {
			var $itemToCheck = this.$views.find('input[value="' + this.currentView + '"]');

			this.syncingViewButtonState = true;
			this.$views.find('input').prop('checked', false);
			this.$views.find('label.active').removeClass('active');

			if ($itemToCheck.length > 0) {
				$itemToCheck.prop('checked', true);
				$itemToCheck.parents('label:first').addClass('active');
			}
			this.syncingViewButtonState = false;
		}
	};

	// For backwards compatibility.
	Repeater.prototype.runRenderer = Repeater.prototype.renderItems;

	// REPEATER PLUGIN DEFINITION

	$.fn.repeater = function fnrepeater (option) {
		var args = Array.prototype.slice.call(arguments, 1);
		var methodReturn;

		var $set = this.each(function eachThis () {
			var $this = $(this);
			var data = $this.data('fu.repeater');
			var options = typeof option === 'object' && option;

			if (!data) {
				$this.data('fu.repeater', (data = new Repeater(this, options)));
			}

			if (typeof option === 'string') {
				methodReturn = data[option].apply(data, args);
			}
		});

		return (methodReturn === undefined) ? $set : methodReturn;
	};

	$.fn.repeater.defaults = {
		dataSource: function dataSource (options, callback) {
			callback({ count: 0, end: 0, items: [], page: 0, pages: 1, start: 0 });
		},
		defaultView: -1, // should be a string value. -1 means it will grab the active view from the view controls
		dropPagingCap: 10,
		staticHeight: -1, // normally true or false. -1 means it will look for data-staticheight on the element
		views: null, // can be set to an object to configure multiple views of the same type,
		searchOnKeyPress: false,
		allowCancel: true
	};

	$.fn.repeater.viewTypes = {};

	$.fn.repeater.Constructor = Repeater;

	$.fn.repeater.noConflict = function noConflict () {
		$.fn.repeater = old;
		return this;
	};

	// -- BEGIN UMD WRAPPER AFTERWORD --
}));
// -- END UMD WRAPPER AFTERWORD --


/***/ }),

/***/ 9817:
/*!*********************************************!*\
  !*** ./node_modules/fuelux/js/scheduler.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global jQuery:true */

/*
 * Fuel UX Scheduler
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
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ 5311), __webpack_require__(/*! fuelux/combobox */ 6214), __webpack_require__(/*! fuelux/datepicker */ 3212), __webpack_require__(/*! fuelux/radio */ 7184), __webpack_require__(/*! fuelux/selectlist */ 604), __webpack_require__(/*! fuelux/spinbox */ 3504)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}(function SchedulerWrapper ($) {
	if (!$.fn.combobox || !$.fn.datepicker || !$.fn.radio || !$.fn.selectlist || !$.fn.spinbox) {
		throw new Error('Fuel UX scheduler control requires combobox, datepicker, radio, selectlist, and spinbox.');
	}

	// -- END UMD WRAPPER PREFACE --

	// -- BEGIN MODULE CODE HERE --

	var old = $.fn.scheduler;

	// SCHEDULER CONSTRUCTOR AND PROTOTYPE

	var Scheduler = function Scheduler(element, options) {
		var self = this;

		this.$element = $(element);
		this.options = $.extend({}, $.fn.scheduler.defaults, options);

		// cache elements
		this.$startDate = this.$element.find('.start-datetime .start-date');
		this.$startTime = this.$element.find('.start-datetime .start-time');

		this.$timeZone = this.$element.find('.timezone-container .timezone');

		this.$repeatIntervalPanel = this.$element.find('.repeat-every-panel');
		this.$repeatIntervalSelect = this.$element.find('.repeat-options');

		this.$repeatIntervalSpinbox = this.$element.find('.repeat-every');
		this.$repeatIntervalTxt = this.$element.find('.repeat-every-text');

		this.$end = this.$element.find('.repeat-end');
		this.$endSelect = this.$end.find('.end-options');
		this.$endAfter = this.$end.find('.end-after');
		this.$endDate = this.$end.find('.end-on-date');

		// panels
		this.$recurrencePanels = this.$element.find('.repeat-panel');


		this.$repeatIntervalSelect.selectlist();

		//initialize sub-controls
		this.$element.find('.selectlist').selectlist();
		this.$startDate.datepicker(this.options.startDateOptions);

		var startDateResponse = (typeof this.options.startDateChanged === "function") ? this.options.startDateChanged : this._guessEndDate;
		this.$startDate.on('change changed.fu.datepicker dateClicked.fu.datepicker', $.proxy(startDateResponse, this));

		this.$startTime.combobox();
		// init start time
		if (this.$startTime.find('input').val() === '') {
			this.$startTime.combobox('selectByIndex', 0);
		}

		// every 0 days/hours doesn't make sense, change if not set
		if (this.$repeatIntervalSpinbox.find('input').val() === '0') {
			this.$repeatIntervalSpinbox.spinbox({
				'value': 1,
				'min': 1,
				'limitToStep': true
			});
		} else {
			this.$repeatIntervalSpinbox.spinbox({
				'min': 1,
				'limitToStep': true
			});
		}

		this.$endAfter.spinbox({
			'value': 1,
			'min': 1,
			'limitToStep': true
		});
		this.$endDate.datepicker(this.options.endDateOptions);
		this.$element.find('.radio-custom').radio();

		// bind events: 'change' is a Bootstrap JS fired event
		this.$repeatIntervalSelect.on('changed.fu.selectlist', $.proxy(this.repeatIntervalSelectChanged, this));
		this.$endSelect.on('changed.fu.selectlist', $.proxy(this.endSelectChanged, this));
		this.$element.find('.repeat-days-of-the-week .btn-group .btn').on('change.fu.scheduler', function (e, data) {
			self.changed(e, data, true);
		});
		this.$element.find('.combobox').on('changed.fu.combobox', $.proxy(this.changed, this));
		this.$element.find('.datepicker').on('changed.fu.datepicker', $.proxy(this.changed, this));
		this.$element.find('.datepicker').on('dateClicked.fu.datepicker', $.proxy(this.changed, this));
		this.$element.find('.selectlist').on('changed.fu.selectlist', $.proxy(this.changed, this));
		this.$element.find('.spinbox').on('changed.fu.spinbox', $.proxy(this.changed, this));
		this.$element.find('.repeat-monthly .radio-custom, .repeat-yearly .radio-custom').on('change.fu.scheduler', $.proxy(this.changed, this));
	};

	var _getFormattedDate = function _getFormattedDate(dateObj, dash) {
		var fdate = '';
		var item;

		fdate += dateObj.getFullYear();
		fdate += dash;
		item = dateObj.getMonth() + 1;//because 0 indexing makes sense when dealing with months /sarcasm
		fdate += (item < 10) ? '0' + item : item;
		fdate += dash;
		item = dateObj.getDate();
		fdate += (item < 10) ? '0' + item : item;

		return fdate;
	};

	var ONE_SECOND = 1000;
	var ONE_MINUTE = ONE_SECOND * 60;
	var ONE_HOUR = ONE_MINUTE * 60;
	var ONE_DAY = ONE_HOUR * 24;
	var ONE_WEEK = ONE_DAY * 7;
	var ONE_MONTH = ONE_WEEK * 5;// No good way to increment by one month using vanilla JS. Since this is an end date, we only need to ensure that this date occurs after at least one or more repeat increments, but there is no reason for it to be exact.
	var ONE_YEAR = ONE_WEEK * 52;
	var INTERVALS = {
		secondly: ONE_SECOND,
		minutely: ONE_MINUTE,
		hourly: ONE_HOUR,
		daily: ONE_DAY,
		weekly: ONE_WEEK,
		monthly: ONE_MONTH,
		yearly: ONE_YEAR
	};

	var _incrementDate = function _incrementDate(start, end, interval, increment) {
		return new Date(start.getTime() + (INTERVALS[interval] * increment));
	};

	Scheduler.prototype = {
		constructor: Scheduler,

		destroy: function destroy() {
			var markup;
			// set input value attribute
			this.$element.find('input').each(function () {
				$(this).attr('value', $(this).val());
			});

			// empty elements to return to original markup and store
			this.$element.find('.datepicker .calendar').empty();

			markup = this.$element[0].outerHTML;

			// destroy components
			this.$element.find('.combobox').combobox('destroy');
			this.$element.find('.datepicker').datepicker('destroy');
			this.$element.find('.selectlist').selectlist('destroy');
			this.$element.find('.spinbox').spinbox('destroy');
			this.$element.find('.radio-custom').radio('destroy');
			this.$element.remove();

			// any external bindings
			// [none]

			return markup;
		},

		changed: function changed(e, data, propagate) {
			if (!propagate) {
				e.stopPropagation();
			}

			this.$element.trigger('changed.fu.scheduler', {
				data: (data !== undefined) ? data : $(e.currentTarget).data(),
				originalEvent: e,
				value: this.getValue()
			});
		},

		disable: function disable() {
			this.toggleState('disable');
		},

		enable: function enable() {
			this.toggleState('enable');
		},

		setUtcTime: function setUtcTime(day, time, offset) {
			var dateSplit = day.split('-');
			var timeSplit = time.split(':');
			function z(n) {
				return (n < 10 ? '0' : '') + n;
			}

			var utcDate = new Date(Date.UTC(dateSplit[0], (dateSplit[1] - 1), dateSplit[2], timeSplit[0], timeSplit[1], (timeSplit[2] ? timeSplit[2] : 0)));

			if (offset === 'Z') {
				utcDate.setUTCHours(utcDate.getUTCHours() + 0);
			} else {
				var expression = [];
				expression[0] = '(.)'; // Any Single Character 1
				expression[1] = '.*?'; // Non-greedy match on filler
				expression[2] = '\\d'; // Uninteresting and ignored: d
				expression[3] = '.*?'; // Non-greedy match on filler
				expression[4] = '(\\d)'; // Any Single Digit 1

				var p = new RegExp(expression.join(''), ["i"]);
				var offsetMatch = p.exec(offset);
				if (offsetMatch !== null) {
					var offsetDirection = offsetMatch[1];
					var offsetInteger = offsetMatch[2];
					var modifier = (offsetDirection === '+') ? 1 : -1;

					utcDate.setUTCHours(utcDate.getUTCHours() + (modifier * parseInt(offsetInteger, 10)));
				}

			}

			var localDifference = utcDate.getTimezoneOffset();
			utcDate.setMinutes(localDifference);
			return utcDate;
		},

		// called when the end range changes
		// (Never, After, On date)
		endSelectChanged: function endSelectChanged(e, data) {
			var selectedItem, val;

			if (!data) {
				selectedItem = this.$endSelect.selectlist('selectedItem');
				val = selectedItem.value;
			} else {
				val = data.value;
			}

			// hide all panels
			this.$endAfter.parent().addClass('hidden');
			this.$endAfter.parent().attr('aria-hidden', 'true');

			this.$endDate.parent().addClass('hidden');
			this.$endDate.parent().attr('aria-hidden', 'true');

			if (val === 'after') {
				this.$endAfter.parent().removeClass('hide hidden'); // jQuery deprecated hide in 3.0. Use hidden instead. Leaving hide here to support previous markup
				this.$endAfter.parent().attr('aria-hidden', 'false');
			} else if (val === 'date') {
				this.$endDate.parent().removeClass('hide hidden');	// jQuery deprecated hide in 3.0. Use hidden instead. Leaving hide here to support previous markup
				this.$endDate.parent().attr('aria-hidden', 'false');
			}
		},

		_guessEndDate: function _guessEndDate() {
			var interval = this.$repeatIntervalSelect.selectlist('selectedItem').value;
			var end = new Date(this.$endDate.datepicker('getDate'));
			var start = new Date(this.$startDate.datepicker('getDate'));
			var increment = this.$repeatIntervalSpinbox.find('input').val();

			if(interval !== "none" && end <= start){
				// if increment spinbox is hidden, user has no idea what it is set to and it is probably not set to
				// something they intended. Safest option is to set date forward by an increment of 1.
				// this will keep monthly & yearly from auto-incrementing by more than a single interval
				if(!this.$repeatIntervalSpinbox.is(':visible')){
					increment = 1;
				}

				// treat weekdays as weekly. This treats all "weekdays" as a single set, of which a single increment
				// is one week.
				if(interval === "weekdays"){
					increment = 1;
					interval = "weekly";
				}

				end = _incrementDate(start, end, interval, increment);

				this.$endDate.datepicker('setDate', end);
			}
		},

		getValue: function getValue() {
			// FREQ = frequency (secondly, minutely, hourly, daily, weekdays, weekly, monthly, yearly)
			// BYDAY = when picking days (MO,TU,WE,etc)
			// BYMONTH = when picking months (Jan,Feb,March) - note the values should be 1,2,3...
			// BYMONTHDAY = when picking days of the month (1,2,3...)
			// BYSETPOS = when picking First,Second,Third,Fourth,Last (1,2,3,4,-1)

			var interval = this.$repeatIntervalSpinbox.spinbox('value');
			var pattern = '';
			var repeat = this.$repeatIntervalSelect.selectlist('selectedItem').value;
			var startTime;

			if (this.$startTime.combobox('selectedItem').value) {
				startTime = this.$startTime.combobox('selectedItem').value;
				startTime = startTime.toLowerCase();

			} else {
				startTime = this.$startTime.combobox('selectedItem').text.toLowerCase();
			}

			var timeZone = this.$timeZone.selectlist('selectedItem');
			var day, days, hasAm, hasPm, month, pos, startDateTime, type;

			startDateTime = '' + _getFormattedDate(this.$startDate.datepicker('getDate'), '-');

			startDateTime += 'T';
			hasAm = (startTime.search('am') >= 0);
			hasPm = (startTime.search('pm') >= 0);
			startTime = $.trim(startTime.replace(/am/g, '').replace(/pm/g, '')).split(':');
			startTime[0] = parseInt(startTime[0], 10);
			startTime[1] = parseInt(startTime[1], 10);
			if (hasAm && startTime[0] > 11) {
				startTime[0] = 0;
			} else if (hasPm && startTime[0] < 12) {
				startTime[0] += 12;
			}

			startDateTime += (startTime[0] < 10) ? '0' + startTime[0] : startTime[0];
			startDateTime += ':';
			startDateTime += (startTime[1] < 10) ? '0' + startTime[1] : startTime[1];

			startDateTime += (timeZone.offset === '+00:00') ? 'Z' : timeZone.offset;

			if (repeat === 'none') {
				pattern = 'FREQ=DAILY;INTERVAL=1;COUNT=1;';
			} else if (repeat === 'secondly') {
				pattern = 'FREQ=SECONDLY;';
				pattern += 'INTERVAL=' + interval + ';';
			} else if (repeat === 'minutely') {
				pattern = 'FREQ=MINUTELY;';
				pattern += 'INTERVAL=' + interval + ';';
			} else if (repeat === 'hourly') {
				pattern = 'FREQ=HOURLY;';
				pattern += 'INTERVAL=' + interval + ';';
			} else if (repeat === 'daily') {
				pattern += 'FREQ=DAILY;';
				pattern += 'INTERVAL=' + interval + ';';
			} else if (repeat === 'weekdays') {
				pattern += 'FREQ=WEEKLY;';
				pattern += 'BYDAY=MO,TU,WE,TH,FR;';
				pattern += 'INTERVAL=1;';
			} else if (repeat === 'weekly') {
				days = [];
				this.$element.find('.repeat-days-of-the-week .btn-group input:checked').each(function () {
					days.push($(this).data().value);
				});

				pattern += 'FREQ=WEEKLY;';
				pattern += 'BYDAY=' + days.join(',') + ';';
				pattern += 'INTERVAL=' + interval + ';';
			} else if (repeat === 'monthly') {
				pattern += 'FREQ=MONTHLY;';
				pattern += 'INTERVAL=' + interval + ';';
				type = this.$element.find('input[name=repeat-monthly]:checked').val();

				if (type === 'bymonthday') {
					day = parseInt(this.$element.find('.repeat-monthly-date .selectlist').selectlist('selectedItem').text, 10);
					pattern += 'BYMONTHDAY=' + day + ';';
				} else if (type === 'bysetpos') {
					days = this.$element.find('.repeat-monthly-day .month-days').selectlist('selectedItem').value;
					pos = this.$element.find('.repeat-monthly-day .month-day-pos').selectlist('selectedItem').value;
					pattern += 'BYDAY=' + days + ';';
					pattern += 'BYSETPOS=' + pos + ';';
				}

			} else if (repeat === 'yearly') {
				pattern += 'FREQ=YEARLY;';
				type = this.$element.find('input[name=repeat-yearly]:checked').val();

				if (type === 'bymonthday') {
					// there are multiple .year-month classed elements in scheduler markup
					month = this.$element.find('.repeat-yearly-date .year-month').selectlist('selectedItem').value;
					day = this.$element.find('.repeat-yearly-date .year-month-day').selectlist('selectedItem').text;
					pattern += 'BYMONTH=' + month + ';';
					pattern += 'BYMONTHDAY=' + day + ';';
				} else if (type === 'bysetpos') {
					days = this.$element.find('.repeat-yearly-day .year-month-days').selectlist('selectedItem').value;
					pos = this.$element.find('.repeat-yearly-day .year-month-day-pos').selectlist('selectedItem').value;
					// there are multiple .year-month classed elements in scheduler markup
					month = this.$element.find('.repeat-yearly-day .year-month').selectlist('selectedItem').value;

					pattern += 'BYDAY=' + days + ';';
					pattern += 'BYSETPOS=' + pos + ';';
					pattern += 'BYMONTH=' + month + ';';
				}

			}

			var end = this.$endSelect.selectlist('selectedItem').value;
			var duration = '';

			// if both UNTIL and COUNT are not specified, the recurrence will repeat forever
			// http://tools.ietf.org/html/rfc2445#section-4.3.10
			if (repeat !== 'none') {
				if (end === 'after') {
					duration = 'COUNT=' + this.$endAfter.spinbox('value') + ';';
				} else if (end === 'date') {
					duration = 'UNTIL=' + _getFormattedDate(this.$endDate.datepicker('getDate'), '') + ';';
				}

			}

			pattern += duration;
			// remove trailing semicolon
			pattern = pattern.substring(pattern.length - 1) === ';' ? pattern.substring(0, pattern.length - 1) : pattern;

			var data = {
				startDateTime: startDateTime,
				timeZone: timeZone,
				recurrencePattern: pattern
			};

			return data;
		},

		// called when the repeat interval changes
		// (None, Hourly, Daily, Weekdays, Weekly, Monthly, Yearly
		repeatIntervalSelectChanged: function repeatIntervalSelectChanged(e, data) {
			var selectedItem, val, txt;

			if (!data) {
				selectedItem = this.$repeatIntervalSelect.selectlist('selectedItem');
				val = selectedItem.value || "";
				txt = selectedItem.text || "";
			} else {
				val = data.value;
				txt = data.text;
			}

			// set the text
			this.$repeatIntervalTxt.text(txt);

			switch (val.toLowerCase()) {
				case 'hourly':
				case 'daily':
				case 'weekly':
				case 'monthly':
					this.$repeatIntervalPanel.removeClass('hide hidden'); // jQuery deprecated hide in 3.0. Use hidden instead. Leaving hide here to support previous markup
					this.$repeatIntervalPanel.attr('aria-hidden', 'false');
					break;
				default:
					this.$repeatIntervalPanel.addClass('hidden'); // jQuery deprecated hide in 3.0. Use hidden instead. Leaving hide here to support previous markup
					this.$repeatIntervalPanel.attr('aria-hidden', 'true');
					break;
			}

			// hide all panels
			this.$recurrencePanels.addClass('hidden');
			this.$recurrencePanels.attr('aria-hidden', 'true');

			// show panel for current selection
			this.$element.find('.repeat-' + val).removeClass('hide hidden'); // jQuery deprecated hide in 3.0. Use hidden instead. Leaving hide here to support previous markup
			this.$element.find('.repeat-' + val).attr('aria-hidden', 'false');

			// the end selection should only be shown when
			// the repeat interval is not "None (run once)"
			if (val === 'none') {
				this.$end.addClass('hidden');
				this.$end.attr('aria-hidden', 'true');
			} else {
				this.$end.removeClass('hide hidden'); // jQuery deprecated hide in 3.0. Use hidden instead. Leaving hide here to support previous markup
				this.$end.attr('aria-hidden', 'false');
			}

			this._guessEndDate();
		},

		_parseAndSetRecurrencePattern: function(recurrencePattern, startTime) {
			var recur = {};
			var i = 0;
			var item = '';
			var commaPatternSplit;

			var $repeatMonthlyDate, $repeatYearlyDate, $repeatYearlyDay;

			var semiColonPatternSplit = recurrencePattern.toUpperCase().split(';');
			for (i = 0; i < semiColonPatternSplit.length; i++) {
				if (semiColonPatternSplit[i] !== '') {
					item = semiColonPatternSplit[i].split('=');
					recur[item[0]] = item[1];
				}
			}

			if (recur.FREQ === 'DAILY') {
				if (recur.BYDAY === 'MO,TU,WE,TH,FR') {
					item = 'weekdays';
				} else {
					if (recur.INTERVAL === '1' && recur.COUNT === '1') {
						item = 'none';
					} else {
						item = 'daily';
					}
				}
			} else if (recur.FREQ === 'SECONDLY') {
				item = 'secondly';
			} else if (recur.FREQ === 'MINUTELY') {
				item = 'minutely';
			} else if (recur.FREQ === 'HOURLY') {
				item = 'hourly';
			} else if (recur.FREQ === 'WEEKLY') {
				item = 'weekly';

				if (recur.BYDAY) {
					if (recur.BYDAY === 'MO,TU,WE,TH,FR') {
						item = 'weekdays';
					} else {
						var el = this.$element.find('.repeat-days-of-the-week .btn-group');
						el.find('label').removeClass('active');
						commaPatternSplit = recur.BYDAY.split(',');
						for (i = 0; i < commaPatternSplit.length; i++) {
							el.find('input[data-value="' + commaPatternSplit[i] + '"]').prop('checked',true).parent().addClass('active');
						}
					}
				}
			} else if (recur.FREQ === 'MONTHLY') {
				this.$element.find('.repeat-monthly input').removeAttr('checked').removeClass('checked');
				this.$element.find('.repeat-monthly label.radio-custom').removeClass('checked');
				if (recur.BYMONTHDAY) {
					$repeatMonthlyDate = this.$element.find('.repeat-monthly-date');
					$repeatMonthlyDate.find('input').addClass('checked').prop('checked', true);
					$repeatMonthlyDate.find('label.radio-custom').addClass('checked');
					$repeatMonthlyDate.find('.selectlist').selectlist('selectByValue', recur.BYMONTHDAY);
				} else if (recur.BYDAY) {
					var $repeatMonthlyDay = this.$element.find('.repeat-monthly-day');
					$repeatMonthlyDay.find('input').addClass('checked').prop('checked', true);
					$repeatMonthlyDay.find('label.radio-custom').addClass('checked');
					if (recur.BYSETPOS) {
						$repeatMonthlyDay.find('.month-day-pos').selectlist('selectByValue', recur.BYSETPOS);
					}

					$repeatMonthlyDay.find('.month-days').selectlist('selectByValue', recur.BYDAY);
				}

				item = 'monthly';
			} else if (recur.FREQ === 'YEARLY') {
				this.$element.find('.repeat-yearly input').removeAttr('checked').removeClass('checked');
				this.$element.find('.repeat-yearly label.radio-custom').removeClass('checked');
				if (recur.BYMONTHDAY) {
					$repeatYearlyDate = this.$element.find('.repeat-yearly-date');
					$repeatYearlyDate.find('input').addClass('checked').prop('checked', true);
					$repeatYearlyDate.find('label.radio-custom').addClass('checked');
					if (recur.BYMONTH) {
						$repeatYearlyDate.find('.year-month').selectlist('selectByValue', recur.BYMONTH);
					}

					$repeatYearlyDate.find('.year-month-day').selectlist('selectByValue', recur.BYMONTHDAY);
				} else if (recur.BYSETPOS) {
					$repeatYearlyDay = this.$element.find('.repeat-yearly-day');
					$repeatYearlyDay.find('input').addClass('checked').prop('checked', true);
					$repeatYearlyDay.find('label.radio-custom').addClass('checked');
					$repeatYearlyDay.find('.year-month-day-pos').selectlist('selectByValue', recur.BYSETPOS);

					if (recur.BYDAY) {
						$repeatYearlyDay.find('.year-month-days').selectlist('selectByValue', recur.BYDAY);
					}

					if (recur.BYMONTH) {
						$repeatYearlyDay.find('.year-month').selectlist('selectByValue', recur.BYMONTH);
					}
				}

				item = 'yearly';
			} else {
				item = 'none';
			}

			if (recur.COUNT) {
				this.$endAfter.spinbox('value', parseInt(recur.COUNT, 10));
				this.$endSelect.selectlist('selectByValue', 'after');
			} else if (recur.UNTIL) {
				var untilSplit, untilDate;

				if (recur.UNTIL.length === 8) {
					untilSplit = recur.UNTIL.split('');
					untilSplit.splice(4, 0, '-');
					untilSplit.splice(7, 0, '-');
					untilDate = untilSplit.join('');
				}

				var timeZone = this.$timeZone.selectlist('selectedItem');
				var timezoneOffset = (timeZone.offset === '+00:00') ? 'Z' : timeZone.offset;

				var utcEndHours = this.setUtcTime(untilDate, startTime.time24HourFormat, timezoneOffset);
				this.$endDate.datepicker('setDate', utcEndHours);

				this.$endSelect.selectlist('selectByValue', 'date');
			} else {
				this.$endSelect.selectlist('selectByValue', 'never');
			}

			this.endSelectChanged();

			if (recur.INTERVAL) {
				this.$repeatIntervalSpinbox.spinbox('value', parseInt(recur.INTERVAL, 10));
			}

			this.$repeatIntervalSelect.selectlist('selectByValue', item);
			this.repeatIntervalSelectChanged();
		},

		_parseStartDateTime: function(startTimeISO8601) {
			var startTime = {};
			var startDate, startDateTimeISO8601FormatSplit, hours, minutes, period;

			startTime.time24HourFormat = startTimeISO8601.split('+')[0].split('-')[0];

			if (startTimeISO8601.search(/\+/) > -1) {
				startTime.timeZoneOffset = '+' + $.trim(startTimeISO8601.split('+')[1]);
			} else if (startTimeISO8601.search(/\-/) > -1) {
				startTime.timeZoneOffset = '-' + $.trim(startTimeISO8601.split('-')[1]);
			} else {
				startTime.timeZoneOffset = '+00:00';
			}

			startTime.time24HourFormatSplit = startTime.time24HourFormat.split(':');
			hours = parseInt(startTime.time24HourFormatSplit[0], 10);
			minutes = (startTime.time24HourFormatSplit[1]) ? parseInt(startTime.time24HourFormatSplit[1].split('+')[0].split('-')[0].split('Z')[0], 10) : 0;
			period = (hours < 12) ? 'AM' : 'PM';

			if (hours === 0) {
				hours = 12;
			} else if (hours > 12) {
				hours -= 12;
			}

			minutes = (minutes < 10) ? '0' + minutes : minutes;
			startTime.time12HourFormat = hours + ':' + minutes;
			startTime.time12HourFormatWithPeriod = hours + ':' + minutes + ' ' + period;

			return startTime;
		},

		_parseTimeZone: function(options, startTime) {
			startTime.timeZoneQuerySelector = '';
			if (options.timeZone) {
				if (typeof (options.timeZone) === 'string') {
					startTime.timeZoneQuerySelector += 'li[data-name="' + options.timeZone + '"]';
				} else {
					$.each(options.timeZone, function(key, value) {
						startTime.timeZoneQuerySelector += 'li[data-' + key + '="' + value + '"]';
					});
				}
				startTime.timeZoneOffset = options.timeZone.offset;
			} else if (options.startDateTime) {
				// Time zone has not been specified via options object, therefore use the timeZoneOffset from _parseAndSetStartDateTime
				startTime.timeZoneOffset = (startTime.timeZoneOffset === '+00:00') ? 'Z' : startTime.timeZoneOffset;
				startTime.timeZoneQuerySelector += 'li[data-offset="' + startTime.timeZoneOffset + '"]';
			} else {
				startTime.timeZoneOffset = 'Z';
			}

			return startTime.timeZoneOffset;
		},

		_setTimeUI: function(time12HourFormatWithPeriod) {
			this.$startTime.find('input').val(time12HourFormatWithPeriod);
			this.$startTime.combobox('selectByText', time12HourFormatWithPeriod);
		},

		_setTimeZoneUI: function(querySelector) {
			this.$timeZone.selectlist('selectBySelector', querySelector);
		},

		setValue: function setValue(options) {
			var startTime = {};
			var startDateTime, startDate, startTimeISO8601, timeOffset, utcStartHours;

			// TIME
			if (options.startDateTime) {
				startDateTime = options.startDateTime.split('T');
				startDate = startDateTime[0];
				startTimeISO8601 = startDateTime[1];

				if(startTimeISO8601) {
					startTime = this._parseStartDateTime(startTimeISO8601);
					this._setTimeUI(startTime.time12HourFormatWithPeriod);
				}
				else {
					startTime.time12HourFormat = '00:00';
					startTime.time24HourFormat = '00:00';
				}
			} else {
				startTime.time12HourFormat = '00:00';
				startTime.time24HourFormat = '00:00';
				var currentDate = this.$startDate.datepicker('getDate');
				startDate = currentDate.getFullYear() + '-' + currentDate.getMonth() + '-' + currentDate.getDate();
			}

			// TIMEZONE
			this._parseTimeZone(options, startTime);
			if (startTime.timeZoneQuerySelector) {
				this._setTimeZoneUI(startTime.timeZoneQuerySelector);
			}

			// RECURRENCE PATTERN
			if(options.recurrencePattern) {
				this._parseAndSetRecurrencePattern(options.recurrencePattern, startTime);
			}

			utcStartHours = this.setUtcTime(startDate, startTime.time24HourFormat, startTime.timeZoneOffset);
			this.$startDate.datepicker('setDate', utcStartHours);
		},

		toggleState: function toggleState(action) {
			this.$element.find('.combobox').combobox(action);
			this.$element.find('.datepicker').datepicker(action);
			this.$element.find('.selectlist').selectlist(action);
			this.$element.find('.spinbox').spinbox(action);
			this.$element.find('.radio-custom').radio(action);

			if (action === 'disable') {
				action = 'addClass';
			} else {
				action = 'removeClass';
			}

			this.$element.find('.repeat-days-of-the-week .btn-group')[action]('disabled');
		},

		value: function value(options) {
			if (options) {
				return this.setValue(options);
			} else {
				return this.getValue();
			}
		}
	};


	// SCHEDULER PLUGIN DEFINITION

	$.fn.scheduler = function scheduler(option) {
		var args = Array.prototype.slice.call(arguments, 1);
		var methodReturn;

		var $set = this.each(function () {
			var $this = $(this);
			var data = $this.data('fu.scheduler');
			var options = typeof option === 'object' && option;

			if (!data) {
				$this.data('fu.scheduler', (data = new Scheduler(this, options)));
			}

			if (typeof option === 'string') {
				methodReturn = data[option].apply(data, args);
			}
		});

		return (methodReturn === undefined) ? $set : methodReturn;
	};

	$.fn.scheduler.defaults = {};

	$.fn.scheduler.Constructor = Scheduler;

	$.fn.scheduler.noConflict = function noConflict() {
		$.fn.scheduler = old;
		return this;
	};


	// DATA-API

	$(document).on('mousedown.fu.scheduler.data-api', '[data-initialize=scheduler]', function (e) {
		var $control = $(e.target).closest('.scheduler');
		if (!$control.data('fu.scheduler')) {
			$control.scheduler($control.data());
		}
	});

	// Must be domReady for AMD compatibility
	$(function () {
		$('[data-initialize=scheduler]').each(function () {
			var $this = $(this);
			if ($this.data('scheduler')) return;
			$this.scheduler($this.data());
		});
	});

	// -- BEGIN UMD WRAPPER AFTERWORD --
}));
// -- END UMD WRAPPER AFTERWORD --


/***/ }),

/***/ 8340:
/*!******************************************!*\
  !*** ./node_modules/fuelux/js/search.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global jQuery:true */

/*
 * Fuel UX Search
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
}(function SearchWrapper ($) {
	// -- END UMD WRAPPER PREFACE --

	// -- BEGIN MODULE CODE HERE --

	var old = $.fn.search;

	// SEARCH CONSTRUCTOR AND PROTOTYPE

	var Search = function (element, options) {
		this.$element = $(element);
		this.$repeater = $(element).closest('.repeater');
		this.options = $.extend({}, $.fn.search.defaults, options);

		if (this.$element.attr('data-searchOnKeyPress') === 'true'){
			this.options.searchOnKeyPress = true;
		}

		this.$button = this.$element.find('button');
		this.$input = this.$element.find('input');
		this.$icon = this.$element.find('.glyphicon, .fuelux-icon');

		this.$button.on('click.fu.search', $.proxy(this.buttonclicked, this));
		this.$input.on('keyup.fu.search', $.proxy(this.keypress, this));

		if (this.$repeater.length > 0) {
			this.$repeater.on('rendered.fu.repeater', $.proxy(this.clearPending, this));
		}

		this.activeSearch = '';
	};

	Search.prototype = {
		constructor: Search,

		destroy: function () {
			this.$element.remove();
			// any external bindings
			// [none]
			// set input value attrbute
			this.$element.find('input').each(function () {
				$(this).attr('value', $(this).val());
			});
			// empty elements to return to original markup
			// [none]
			// returns string of markup
			return this.$element[0].outerHTML;
		},

		search: function (searchText) {
			if (this.$icon.hasClass('glyphicon')) {
				this.$icon.removeClass('glyphicon-search').addClass('glyphicon-remove');
			}
			if (this.$icon.hasClass('fuelux-icon')) {
				this.$icon.removeClass('fuelux-icon-search').addClass('fuelux-icon-remove');
			}

			this.activeSearch = searchText;
			this.$element.addClass('searched pending');
			this.$element.trigger('searched.fu.search', searchText);
		},

		clear: function () {
			if (this.$icon.hasClass('glyphicon')) {
				this.$icon.removeClass('glyphicon-remove').addClass('glyphicon-search');
			}
			if (this.$icon.hasClass('fuelux-icon')) {
				this.$icon.removeClass('fuelux-icon-remove').addClass('fuelux-icon-search');
			}

			if (this.$element.hasClass('pending')) {
				this.$element.trigger('canceled.fu.search');
			}

			this.activeSearch = '';
			this.$input.val('');
			this.$element.trigger('cleared.fu.search');
			this.$element.removeClass('searched pending');
		},

		clearPending: function () {
			this.$element.removeClass('pending');
		},

		action: function () {
			var val = this.$input.val();

			if (val && val.length > 0) {
				this.search(val);
			} else {
				this.clear();
			}
		},

		buttonclicked: function (e) {
			e.preventDefault();
			if ($(e.currentTarget).is('.disabled, :disabled')) return;

			if (this.$element.hasClass('pending') || this.$element.hasClass('searched')) {
				this.clear();
			} else {
				this.action();
			}
		},

		keypress: function (e) {
			var ENTER_KEY_CODE = 13;
			var TAB_KEY_CODE = 9;
			var ESC_KEY_CODE = 27;

			if (e.which === ENTER_KEY_CODE) {
				e.preventDefault();
				this.action();
			} else if (e.which === TAB_KEY_CODE) {
				e.preventDefault();
			} else if (e.which === ESC_KEY_CODE) {
				e.preventDefault();
				this.clear();
			} else if (this.options.searchOnKeyPress) {
				// search on other keypress
				this.action();
			}
		},

		disable: function () {
			this.$element.addClass('disabled');
			this.$input.attr('disabled', 'disabled');

			if (!this.options.allowCancel) {
				this.$button.addClass('disabled');
			}
		},

		enable: function () {
			this.$element.removeClass('disabled');
			this.$input.removeAttr('disabled');
			this.$button.removeClass('disabled');
		}
	};


	// SEARCH PLUGIN DEFINITION

	$.fn.search = function (option) {
		var args = Array.prototype.slice.call(arguments, 1);
		var methodReturn;

		var $set = this.each(function () {
			var $this = $(this);
			var data = $this.data('fu.search');
			var options = typeof option === 'object' && option;

			if (!data) {
				$this.data('fu.search', (data = new Search(this, options)));
			}

			if (typeof option === 'string') {
				methodReturn = data[option].apply(data, args);
			}
		});

		return (methodReturn === undefined) ? $set : methodReturn;
	};

	$.fn.search.defaults = {
		clearOnEmpty: false,
		searchOnKeyPress: false,
		allowCancel: false
	};

	$.fn.search.Constructor = Search;

	$.fn.search.noConflict = function () {
		$.fn.search = old;
		return this;
	};


	// DATA-API

	$(document).on('mousedown.fu.search.data-api', '[data-initialize=search]', function (e) {
		var $control = $(e.target).closest('.search');
		if (!$control.data('fu.search')) {
			$control.search($control.data());
		}
	});

	// Must be domReady for AMD compatibility
	$(function () {
		$('[data-initialize=search]').each(function () {
			var $this = $(this);
			if ($this.data('fu.search')) return;
			$this.search($this.data());
		});
	});

	// -- BEGIN UMD WRAPPER AFTERWORD --
}));
// -- END UMD WRAPPER AFTERWORD --


/***/ }),

/***/ 604:
/*!**********************************************!*\
  !*** ./node_modules/fuelux/js/selectlist.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global jQuery:true */

/*
 * Fuel UX Selectlist
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
}(function SelectlistWrapper ($) {
	// -- END UMD WRAPPER PREFACE --

	// -- BEGIN MODULE CODE HERE --

	var old = $.fn.selectlist;
	// SELECT CONSTRUCTOR AND PROTOTYPE

	var Selectlist = function (element, options) {
		this.$element = $(element);
		this.options = $.extend({}, $.fn.selectlist.defaults, options);


		this.$button = this.$element.find('.btn.dropdown-toggle');
		this.$hiddenField = this.$element.find('.hidden-field');
		this.$label = this.$element.find('.selected-label');
		this.$dropdownMenu = this.$element.find('.dropdown-menu');

		this.$element.on('click.fu.selectlist', '.dropdown-menu a', $.proxy(this.itemClicked, this));
		this.setDefaultSelection();

		if (options.resize === 'auto' || this.$element.attr('data-resize') === 'auto') {
			this.resize();
		}

		// if selectlist is empty or is one item, disable it
		var items = this.$dropdownMenu.children('li');
		if( items.length === 0) {
			this.disable();
			this.doSelect( $(this.options.emptyLabelHTML));
		}

		// support jumping focus to first letter in dropdown when key is pressed
		this.$element.on('shown.bs.dropdown', function () {
				var $this = $(this);
				// attach key listener when dropdown is shown
				$(document).on('keypress.fu.selectlist', function(e){

					// get the key that was pressed
					var key = String.fromCharCode(e.which);
					// look the items to find the first item with the first character match and set focus
					$this.find("li").each(function(idx,item){
						if ($(item).text().charAt(0).toLowerCase() === key) {
							$(item).children('a').focus();
							return false;
						}
					});

			});
		});

		// unbind key event when dropdown is hidden
		this.$element.on('hide.bs.dropdown', function () {
				$(document).off('keypress.fu.selectlist');
		});
	};

	Selectlist.prototype = {

		constructor: Selectlist,

		destroy: function () {
			this.$element.remove();
			// any external bindings
			// [none]
			// empty elements to return to original markup
			// [none]
			// returns string of markup
			return this.$element[0].outerHTML;
		},

		doSelect: function ($item) {
			var $selectedItem;
			this.$selectedItem = $selectedItem = $item;

			this.$hiddenField.val(this.$selectedItem.attr('data-value'));
			this.$label.html($(this.$selectedItem.children()[0]).html());

			// clear and set selected item to allow declarative init state
			// unlike other controls, selectlist's value is stored internal, not in an input
			this.$element.find('li').each(function () {
				if ($selectedItem.is($(this))) {
					$(this).attr('data-selected', true);
				} else {
					$(this).removeData('selected').removeAttr('data-selected');
				}
			});
		},

		itemClicked: function (e) {
			this.$element.trigger('clicked.fu.selectlist', this.$selectedItem);

			e.preventDefault();
			// ignore if a disabled item is clicked
			if ($(e.currentTarget).parent('li').is('.disabled, :disabled')) { return; }

			// is clicked element different from currently selected element?
			if (!($(e.target).parent().is(this.$selectedItem))) {
				this.itemChanged(e);
			}

			// return focus to control after selecting an option
			this.$element.find('.dropdown-toggle').focus();
		},

		itemChanged: function (e) {
			//selectedItem needs to be <li> since the data is stored there, not in <a>
			this.doSelect($(e.target).closest('li'));

			// pass object including text and any data-attributes
			// to onchange event
			var data = this.selectedItem();
			// trigger changed event
			this.$element.trigger('changed.fu.selectlist', data);
		},

		resize: function () {
			var width = 0;
			var newWidth = 0;
			var sizer = $('<div/>').addClass('selectlist-sizer');


			if (Boolean($(document).find('html').hasClass('fuelux'))) {
				// default behavior for fuel ux setup. means fuelux was a class on the html tag
				$(document.body).append(sizer);
			} else {
				// fuelux is not a class on the html tag. So we'll look for the first one we find so the correct styles get applied to the sizer
				$('.fuelux:first').append(sizer);
			}

			sizer.append(this.$element.clone());

			this.$element.find('a').each(function () {
				sizer.find('.selected-label').text($(this).text());
				newWidth = sizer.find('.selectlist').outerWidth();
				newWidth = newWidth + sizer.find('.sr-only').outerWidth();
				if (newWidth > width) {
					width = newWidth;
				}
			});

			if (width <= 1) {
				return;
			}

			this.$button.css('width', width);
			this.$dropdownMenu.css('width', width);

			sizer.remove();
		},

		selectedItem: function () {
			var txt = this.$selectedItem.text();
			return $.extend({
				text: txt
			}, this.$selectedItem.data());
		},

		selectByText: function (text) {
			var $item = $([]);
			this.$element.find('li').each(function () {
				if ((this.textContent || this.innerText || $(this).text() || '').toLowerCase() === (text || '').toLowerCase()) {
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
			var $item = this.$element.find('li[data-selected=true]').eq(0);

			if ($item.length === 0) {
				$item = this.$element.find('li').has('a').eq(0);
			}

			this.doSelect($item);
		},

		enable: function () {
			this.$element.removeClass('disabled');
			this.$button.removeClass('disabled');
		},

		disable: function () {
			this.$element.addClass('disabled');
			this.$button.addClass('disabled');
		}
	};

	Selectlist.prototype.getValue = Selectlist.prototype.selectedItem;


	// SELECT PLUGIN DEFINITION

	$.fn.selectlist = function (option) {
		var args = Array.prototype.slice.call(arguments, 1);
		var methodReturn;

		var $set = this.each(function () {
			var $this = $(this);
			var data = $this.data('fu.selectlist');
			var options = typeof option === 'object' && option;

			if (!data) {
				$this.data('fu.selectlist', (data = new Selectlist(this, options)));
			}

			if (typeof option === 'string') {
				methodReturn = data[option].apply(data, args);
			}
		});

		return (methodReturn === undefined) ? $set : methodReturn;
	};

	$.fn.selectlist.defaults = {
		emptyLabelHTML: '<li data-value=""><a href="#">No items</a></li>'
	};

	$.fn.selectlist.Constructor = Selectlist;

	$.fn.selectlist.noConflict = function () {
		$.fn.selectlist = old;
		return this;
	};


	// DATA-API

	$(document).on('mousedown.fu.selectlist.data-api', '[data-initialize=selectlist]', function (e) {
		var $control = $(e.target).closest('.selectlist');
		if (!$control.data('fu.selectlist')) {
			$control.selectlist($control.data());
		}
	});

	// Must be domReady for AMD compatibility
	$(function () {
		$('[data-initialize=selectlist]').each(function () {
			var $this = $(this);
			if (!$this.data('fu.selectlist')) {
				$this.selectlist($this.data());
			}
		});
	});

	// -- BEGIN UMD WRAPPER AFTERWORD --
}));
// -- END UMD WRAPPER AFTERWORD --


/***/ }),

/***/ 3504:
/*!*******************************************!*\
  !*** ./node_modules/fuelux/js/spinbox.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global jQuery:true */

/*
 * Fuel UX Spinbox
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
}(function SpinboxWrapper ($) {
	// -- END UMD WRAPPER PREFACE --

	// -- BEGIN MODULE CODE HERE --

	var old = $.fn.spinbox;

	// SPINBOX CONSTRUCTOR AND PROTOTYPE

	var Spinbox = function Spinbox(element, options) {
		this.$element = $(element);
		this.$element.find('.btn').on('click', function (e) {
			//keep spinbox from submitting if they forgot to say type="button" on their spinner buttons
			e.preventDefault();
		});
		this.options = $.extend({}, $.fn.spinbox.defaults, options);
		this.options.step = this.$element.data('step') || this.options.step;

		if (this.options.value < this.options.min) {
			this.options.value = this.options.min;
		} else if (this.options.max < this.options.value) {
			this.options.value = this.options.max;
		}

		this.$input = this.$element.find('.spinbox-input');
		this.$input.on('focusout.fu.spinbox', this.$input, $.proxy(this.change, this));
		this.$element.on('keydown.fu.spinbox', this.$input, $.proxy(this.keydown, this));
		this.$element.on('keyup.fu.spinbox', this.$input, $.proxy(this.keyup, this));

		if (this.options.hold) {
			this.$element.on('mousedown.fu.spinbox', '.spinbox-up', $.proxy(function () {
				this.startSpin(true);
			}, this));
			this.$element.on('mouseup.fu.spinbox', '.spinbox-up, .spinbox-down', $.proxy(this.stopSpin, this));
			this.$element.on('mouseout.fu.spinbox', '.spinbox-up, .spinbox-down', $.proxy(this.stopSpin, this));
			this.$element.on('mousedown.fu.spinbox', '.spinbox-down', $.proxy(function () {
				this.startSpin(false);
			}, this));
		} else {
			this.$element.on('click.fu.spinbox', '.spinbox-up', $.proxy(function () {
				this.step(true);
			}, this));
			this.$element.on('click.fu.spinbox', '.spinbox-down', $.proxy(function () {
				this.step(false);
			}, this));
		}

		this.switches = {
			count: 1,
			enabled: true
		};

		if (this.options.speed === 'medium') {
			this.switches.speed = 300;
		} else if (this.options.speed === 'fast') {
			this.switches.speed = 100;
		} else {
			this.switches.speed = 500;
		}

		this.options.defaultUnit = _isUnitLegal(this.options.defaultUnit, this.options.units) ? this.options.defaultUnit : '';
		this.unit = this.options.defaultUnit;

		this.lastValue = this.options.value;

		this.render();

		if (this.options.disabled) {
			this.disable();
		}
	};

	// Truly private methods
	var _limitToStep = function _limitToStep(number, step) {
		return Math.round(number / step) * step;
	};

	var _isUnitLegal = function _isUnitLegal(unit, validUnits) {
		var legalUnit = false;
		var suspectUnit = unit.toLowerCase();

		$.each(validUnits, function (i, validUnit) {
			validUnit = validUnit.toLowerCase();
			if (suspectUnit === validUnit) {
				legalUnit = true;
				return false;//break out of the loop
			}
		});

		return legalUnit;
	};

	var _applyLimits = function _applyLimits(value) {
		// if unreadable
		if (isNaN(parseFloat(value))) {
			return value;
		}

		// if not within range return the limit
		if (value > this.options.max) {
			if (this.options.cycle) {
				value = this.options.min;
			} else {
				value = this.options.max;
			}
		} else if (value < this.options.min) {
			if (this.options.cycle) {
				value = this.options.max;
			} else {
				value = this.options.min;
			}
		}

		if (this.options.limitToStep && this.options.step) {
			value = _limitToStep(value, this.options.step);

			//force round direction so that it stays within bounds
			if(value > this.options.max){
				value = value - this.options.step;
			} else if(value < this.options.min) {
				value = value + this.options.step;
			}
		}

		return value;
	};

	Spinbox.prototype = {
		constructor: Spinbox,

		destroy: function destroy() {
			this.$element.remove();
			// any external bindings
			// [none]
			// set input value attrbute
			this.$element.find('input').each(function () {
				$(this).attr('value', $(this).val());
			});
			// empty elements to return to original markup
			// [none]
			// returns string of markup
			return this.$element[0].outerHTML;
		},

		render: function render() {
			this._setValue(this.getDisplayValue());
		},

		change: function change() {
			this._setValue(this.getDisplayValue());

			this.triggerChangedEvent();
		},

		stopSpin: function stopSpin() {
			if (this.switches.timeout !== undefined) {
				clearTimeout(this.switches.timeout);
				this.switches.count = 1;
				this.triggerChangedEvent();
			}
		},

		triggerChangedEvent: function triggerChangedEvent() {
			var currentValue = this.getValue();
			if (currentValue === this.lastValue) return;
			this.lastValue = currentValue;

			// Primary changed event
			this.$element.trigger('changed.fu.spinbox', currentValue);
		},

		startSpin: function startSpin(type) {
			if (!this.options.disabled) {
				var divisor = this.switches.count;

				if (divisor === 1) {
					this.step(type);
					divisor = 1;
				} else if (divisor < 3) {
					divisor = 1.5;
				} else if (divisor < 8) {
					divisor = 2.5;
				} else {
					divisor = 4;
				}

				this.switches.timeout = setTimeout($.proxy(function () {
					this.iterate(type);
				}, this), this.switches.speed / divisor);
				this.switches.count++;
			}
		},

		iterate: function iterate(type) {
			this.step(type);
			this.startSpin(type);
		},

		step: function step(isIncrease) {
			//refresh value from display before trying to increment in case they have just been typing before clicking the nubbins
			this._setValue(this.getDisplayValue());
			var newVal;

			if (isIncrease) {
				newVal = this.options.value + this.options.step;
			} else {
				newVal = this.options.value - this.options.step;
			}

			newVal = newVal.toFixed(5);

			this._setValue(newVal + this.unit);
		},

		getDisplayValue: function getDisplayValue() {
			var inputValue = this.parseInput(this.$input.val());
			var value = (!!inputValue) ? inputValue : this.options.value;
			return value;
		},

		setDisplayValue: function setDisplayValue(value) {
			this.$input.val(value);
		},

		getValue: function getValue() {
			var val = this.options.value;
			if (this.options.decimalMark !== '.'){
				val = (val + '').split('.').join(this.options.decimalMark);
			}
			return val + this.unit;
		},

		setValue: function setValue(val) {
			return this._setValue(val, true);
		},

		_setValue: function _setValue(val, shouldSetLastValue) {
			//remove any i18n on the number
			if (this.options.decimalMark !== '.') {
				val = this.parseInput(val);
			}

			//are we dealing with united numbers?
			if(typeof val !== "number"){
				var potentialUnit = val.replace(/[0-9.-]/g, '');
				//make sure unit is valid, or else drop it in favor of current unit, or default unit (potentially nothing)
				this.unit = _isUnitLegal(potentialUnit, this.options.units) ? potentialUnit : this.options.defaultUnit;
			}

			var intVal = this.getIntValue(val);

			//make sure we are dealing with a number
			if (isNaN(intVal) && !isFinite(intVal)) {
				return this._setValue(this.options.value, shouldSetLastValue);
			}

			//conform
			intVal = _applyLimits.call(this, intVal);

			//cache the pure int value
			this.options.value = intVal;

			//prepare number for display
			val = intVal + this.unit;

			if (this.options.decimalMark !== '.'){
				val = (val + '').split('.').join(this.options.decimalMark);
			}

			//display number
			this.setDisplayValue(val);

			if (shouldSetLastValue) {
				this.lastValue = val;
			}

			return this;
		},

		value: function value(val) {
			if (val || val === 0) {
				return this.setValue(val);
			} else {
				return this.getValue();
			}
		},

		parseInput: function parseInput(value) {
			value = (value + '').split(this.options.decimalMark).join('.');

			return value;
		},

		getIntValue: function getIntValue(value) {
			//if they didn't pass in a number, try and get the number
			value = (typeof value === "undefined") ? this.getValue() : value;
			// if there still isn't a number, abort
			if(typeof value === "undefined"){return;}

			if (typeof value === 'string'){
				value = this.parseInput(value);
			}

			value = parseFloat(value, 10);

			return value;
		},

		disable: function disable() {
			this.options.disabled = true;
			this.$element.addClass('disabled');
			this.$input.attr('disabled', '');
			this.$element.find('button').addClass('disabled');
		},

		enable: function enable() {
			this.options.disabled = false;
			this.$element.removeClass('disabled');
			this.$input.removeAttr('disabled');
			this.$element.find('button').removeClass('disabled');
		},

		keydown: function keydown(event) {
			var keyCode = event.keyCode;
			if (keyCode === 38) {
				this.step(true);
			} else if (keyCode === 40) {
				this.step(false);
			} else if (keyCode === 13) {
				this.change();
			}
		},

		keyup: function keyup(event) {
			var keyCode = event.keyCode;

			if (keyCode === 38 || keyCode === 40) {
				this.triggerChangedEvent();
			}
		}

	};


	// SPINBOX PLUGIN DEFINITION

	$.fn.spinbox = function spinbox(option) {
		var args = Array.prototype.slice.call(arguments, 1);
		var methodReturn;

		var $set = this.each(function () {
			var $this = $(this);
			var data = $this.data('fu.spinbox');
			var options = typeof option === 'object' && option;

			if (!data) {
				$this.data('fu.spinbox', (data = new Spinbox(this, options)));
			}

			if (typeof option === 'string') {
				methodReturn = data[option].apply(data, args);
			}
		});

		return (methodReturn === undefined) ? $set : methodReturn;
	};

	// value needs to be 0 for this.render();
	$.fn.spinbox.defaults = {
		value: 0,
		min: 0,
		max: 999,
		step: 1,
		hold: true,
		speed: 'medium',
		disabled: false,
		cycle: false,
		units: [],
		decimalMark: '.',
		defaultUnit: '',
		limitToStep: false
	};

	$.fn.spinbox.Constructor = Spinbox;

	$.fn.spinbox.noConflict = function noConflict() {
		$.fn.spinbox = old;
		return this;
	};


	// DATA-API

	$(document).on('mousedown.fu.spinbox.data-api', '[data-initialize=spinbox]', function (e) {
		var $control = $(e.target).closest('.spinbox');
		if (!$control.data('fu.spinbox')) {
			$control.spinbox($control.data());
		}
	});

	// Must be domReady for AMD compatibility
	$(function () {
		$('[data-initialize=spinbox]').each(function () {
			var $this = $(this);
			if (!$this.data('fu.spinbox')) {
				$this.spinbox($this.data());
			}
		});
	});

	// -- BEGIN UMD WRAPPER AFTERWORD --
}));
// -- END UMD WRAPPER AFTERWORD --


/***/ }),

/***/ 5291:
/*!****************************************!*\
  !*** ./node_modules/fuelux/js/tree.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global jQuery:true */

/*
 * Fuel UX Tree
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
}(function TreeWrapper ($) {
	// -- END UMD WRAPPER PREFACE --

	// -- BEGIN MODULE CODE HERE --

	var old = $.fn.tree;

	// TREE CONSTRUCTOR AND PROTOTYPE

	var Tree = function Tree(element, options) {
		this.$element = $(element);
		this.options = $.extend({}, $.fn.tree.defaults, options);

		this.$element.attr('tabindex', '0');

		if (this.options.itemSelect) {
			this.$element.on('click.fu.tree', '.tree-item', $.proxy(function callSelect (ev) {
				this.selectItem(ev.currentTarget);
			}, this));
		}

		this.$element.on('click.fu.tree', '.tree-branch-name', $.proxy(function callToggle (ev) {
			this.toggleFolder(ev.currentTarget);
		}, this));

		this.$element.on('click.fu.tree', '.tree-overflow', $.proxy(function callPopulate (ev) {
			this.populate($(ev.currentTarget));
		}, this));

		// folderSelect default is true
		if (this.options.folderSelect) {
			this.$element.addClass('tree-folder-select');
			this.$element.off('click.fu.tree', '.tree-branch-name');
			this.$element.on('click.fu.tree', '.icon-caret', $.proxy(function callToggle (ev) {
				this.toggleFolder($(ev.currentTarget).parent());
			}, this));
			this.$element.on('click.fu.tree', '.tree-branch-name', $.proxy(function callSelect (ev) {
				this.selectFolder($(ev.currentTarget));
			}, this));
		}

		this.$element.on('focus', function setFocusOnTab () {
			var $tree = $(this);
			focusIn($tree, $tree);
		});

		this.$element.on('keydown', function processKeypress (e) {
			return navigateTree($(this), e);
		});

		this.render();
	};

	Tree.prototype = {
		constructor: Tree,

		deselectAll: function deselectAll(n) {
			// clear all child tree nodes and style as deselected
			var nodes = n || this.$element;
			var $selectedElements = $(nodes).find('.tree-selected');
			$selectedElements.each(function callStyleNodeDeselected (index, element) {
				var $element = $(element);
				ariaDeselect($element);
				styleNodeDeselected( $element, $element.find( '.glyphicon' ) );
			});
			return $selectedElements;
		},

		destroy: function destroy() {
			// any external bindings [none]
			// empty elements to return to original markup
			this.$element.find('li:not([data-template])').remove();

			this.$element.remove();
			// returns string of markup
			return this.$element[0].outerHTML;
		},

		render: function render() {
			this.populate(this.$element);
		},

		populate: function populate($el, ibp) {
			var self = this;

			// populate was initiated based on clicking overflow link
			var isOverflow = $el.hasClass('tree-overflow');

			var $parent = ($el.hasClass('tree')) ? $el : $el.parent();
			var atRoot = $parent.hasClass('tree');

			if (isOverflow && !atRoot) {
				$parent = $parent.parent();
			}

			var treeData = $parent.data();
			// expose overflow data to datasource so it can be responded to appropriately.
			if (isOverflow) {
				treeData.overflow = $el.data();
			}

			var isBackgroundProcess = ibp || false;	// no user affordance needed (ex.- "loading")

			if (isOverflow) {
				if (atRoot) {
					// the loader at the root level needs to continually replace the overflow trigger
					// otherwise, when loader is shown below, it will be the loader for the last folder
					// in the tree, instead of the loader at the root level.
					$el.replaceWith($parent.find('> .tree-loader').remove());
				} else {
					$el.remove();
				}
			}

			var $loader = $parent.find('.tree-loader:last');

			if (isBackgroundProcess === false) {
				$loader.removeClass('hide hidden'); // jQuery deprecated hide in 3.0. Use hidden instead. Leaving hide here to support previous markup
			}

			this.options.dataSource(treeData ? treeData : {}, function populateNodes (items) {
				$.each(items.data, function buildNode (i, treeNode) {
					var nodeType = treeNode.type;

					// 'item' and 'overflow' remain consistent, but 'folder' maps to 'branch'
					if (treeNode.type === 'folder') {
						nodeType = 'branch';
					}

					var $entity = self.$element
						.find('[data-template=tree' + nodeType + ']:eq(0)')
						.clone()
						.removeClass('hide hidden')// jQuery deprecated hide in 3.0. Use hidden instead. Leaving hide here to support previous markup
						.removeData('template')
						.removeAttr('data-template');
					$entity.find('.tree-' + nodeType + '-name > .tree-label')[self.options.html ? 'html' : 'text'](treeNode.text || treeNode.name);
					$entity.data(treeNode);


					// Decorate $entity with data or other attributes making the
					// element easily accessible with libraries like jQuery.
					//
					// Values are contained within the object returned
					// for folders and items as attr:
					//
					// {
					//     text: "An Item",
					//     type: 'item',
					//     attr = {
					//         'classes': 'required-item red-text',
					//         'data-parent': parentId,
					//         'guid': guid,
					//         'id': guid
					//     }
					// };
					//
					// the "name" attribute is also supported but is deprecated for "text".

					// add attributes to tree-branch or tree-item
					var attrs = treeNode.attr || treeNode.dataAttributes || [];
					$.each(attrs, function setAttribute (attr, setTo) {
						switch (attr) {
						case 'cssClass':
						case 'class':
						case 'className':
							$entity.addClass(setTo);
							break;

						// allow custom icons
						case 'data-icon':
							$entity.find('.icon-item').removeClass().addClass('icon-item ' + setTo);
							$entity.attr(attr, setTo);
							break;

						// ARIA support
						case 'id':
							$entity.attr(attr, setTo);
							$entity.attr('aria-labelledby', setTo + '-label');
							$entity.find('.tree-branch-name > .tree-label').attr('id', setTo + '-label');
							break;

						// style, data-*
						default:
							$entity.attr(attr, setTo);
							break;
						}
					});

					// add child node
					if (atRoot) {
						// For accessibility reasons, the root element is the only tab-able element (see https://github.com/ExactTarget/fuelux/issues/1964)
						$parent.append($entity);
					} else {
						$parent.find('.tree-branch-children:eq(0)').append($entity);
					}
				});

				$parent.find('.tree-loader').addClass('hidden');
				// return newly populated folder
				self.$element.trigger('loaded.fu.tree', $parent);
			});
		},

		selectTreeNode: function selectItem(clickedElement, nodeType) {
			var clicked = {};	// object for clicked element
			clicked.$element = $(clickedElement);

			var selected = {}; // object for selected elements
			selected.$elements = this.$element.find('.tree-selected');
			selected.dataForEvent = [];

			// determine clicked element and it's icon
			if (nodeType === 'folder') {
				// make the clicked.$element the container branch
				clicked.$element = clicked.$element.closest('.tree-branch');
				clicked.$icon = clicked.$element.find('.icon-folder');
			} else {
				clicked.$icon = clicked.$element.find('.icon-item');
			}
			clicked.elementData = clicked.$element.data();

			ariaSelect(clicked.$element);

			// the below functions pass objects by copy/reference and use modified object in this function
			if ( this.options.multiSelect ) {
				selected = multiSelectSyncNodes(this, clicked, selected);
			} else {
				selected = singleSelectSyncNodes(this, clicked, selected);
			}

			setFocus(this.$element, clicked.$element);

			// all done with the DOM, now fire events
			this.$element.trigger(selected.eventType + '.fu.tree', {
				target: clicked.elementData,
				selected: selected.dataForEvent
			});

			clicked.$element.trigger('updated.fu.tree', {
				selected: selected.dataForEvent,
				item: clicked.$element,
				eventType: selected.eventType
			});
		},

		discloseFolder: function discloseFolder(folder) {
			var $folder = $(folder);

			var $branch = $folder.closest('.tree-branch');
			var $treeFolderContent = $branch.find('.tree-branch-children');
			var $treeFolderContentFirstChild = $treeFolderContent.eq(0);

			// take care of the styles
			$branch.addClass('tree-open');
			$branch.attr('aria-expanded', 'true');
			$treeFolderContentFirstChild.removeClass('hide hidden'); // jQuery deprecated hide in 3.0. Use hidden instead. Leaving hide here to support previous markup
			$branch.find('> .tree-branch-header .icon-folder').eq(0)
				.removeClass('glyphicon-folder-close')
				.addClass('glyphicon-folder-open');

			var $tree = this.$element;
			var disclosedCompleted = function disclosedCompleted () {
				$tree.trigger('disclosedFolder.fu.tree', $branch.data());
			};

			// add the children to the folder
			if (!$treeFolderContent.children().length) {
				$tree.one('loaded.fu.tree', disclosedCompleted);
				this.populate($treeFolderContent);
			} else {
				disclosedCompleted();
			}
		},

		closeFolder: function closeFolder(el) {
			var $el = $(el);
			var $branch = $el.closest('.tree-branch');
			var $treeFolderContent = $branch.find('.tree-branch-children');
			var $treeFolderContentFirstChild = $treeFolderContent.eq(0);

			// take care of the styles
			$branch.removeClass('tree-open');
			$branch.attr('aria-expanded', 'false');
			$treeFolderContentFirstChild.addClass('hidden');
			$branch.find('> .tree-branch-header .icon-folder').eq(0)
				.removeClass('glyphicon-folder-open')
				.addClass('glyphicon-folder-close');

			// remove chidren if no cache
			if (!this.options.cacheItems) {
				$treeFolderContentFirstChild.empty();
			}

			this.$element.trigger('closed.fu.tree', $branch.data());
		},

		toggleFolder: function toggleFolder(el) {
			var $el = $(el);

			if ($el.find('.glyphicon-folder-close').length) {
				this.discloseFolder(el);
			} else if ($el.find('.glyphicon-folder-open').length) {
				this.closeFolder(el);
			}
		},

		selectFolder: function selectFolder(el) {
			if (this.options.folderSelect) {
				this.selectTreeNode(el, 'folder');
			}
		},

		selectItem: function selectItem(el) {
			if (this.options.itemSelect) {
				this.selectTreeNode(el, 'item');
			}
		},

		selectedItems: function selectedItems() {
			var $sel = this.$element.find('.tree-selected');
			var selected = [];

			$.each($sel, function buildSelectedArray (i, value) {
				selected.push($(value).data());
			});
			return selected;
		},

		// collapses open folders
		collapse: function collapse() {
			var self = this;
			var reportedClosed = [];

			var closedReported = function closedReported(event, closed) {
				reportedClosed.push(closed);

				// jQuery deprecated hide in 3.0. Use hidden instead. Leaving hide here to support previous markup
				if (self.$element.find(".tree-branch.tree-open:not('.hidden, .hide')").length === 0) {
					self.$element.trigger('closedAll.fu.tree', {
						tree: self.$element,
						reportedClosed: reportedClosed
					});
					self.$element.off('loaded.fu.tree', self.$element, closedReported);
				}
			};

			// trigger callback when all folders have reported closed
			self.$element.on('closed.fu.tree', closedReported);

			self.$element.find(".tree-branch.tree-open:not('.hidden, .hide')").each(function closeFolder () {
				self.closeFolder(this);
			});
		},

		// disclose visible will only disclose visible tree folders
		discloseVisible: function discloseVisible() {
			var self = this;

			var $openableFolders = self.$element.find(".tree-branch:not('.tree-open, .hidden, .hide')");
			var reportedOpened = [];

			var openReported = function openReported(event, opened) {
				reportedOpened.push(opened);

				if (reportedOpened.length === $openableFolders.length) {
					self.$element.trigger('disclosedVisible.fu.tree', {
						tree: self.$element,
						reportedOpened: reportedOpened
					});
					/*
					* Unbind the `openReported` event. `discloseAll` may be running and we want to reset this
					* method for the next iteration.
					*/
					self.$element.off('loaded.fu.tree', self.$element, openReported);
				}
			};

			// trigger callback when all folders have reported opened
			self.$element.on('loaded.fu.tree', openReported);

			// open all visible folders
			self.$element.find(".tree-branch:not('.tree-open, .hidden, .hide')").each(function triggerOpen() {
				self.discloseFolder($(this).find('.tree-branch-header'));
			});
		},

		/*
		* Disclose all will keep listening for `loaded.fu.tree` and if `$(tree-el).data('ignore-disclosures-limit')`
		* is `true` (defaults to `true`) it will attempt to disclose any new closed folders than were
		* loaded in during the last disclosure.
		*/
		discloseAll: function discloseAll() {
			var self = this;

			// first time
			if (typeof self.$element.data('disclosures') === 'undefined') {
				self.$element.data('disclosures', 0);
			}

			var isExceededLimit = (self.options.disclosuresUpperLimit >= 1 && self.$element.data('disclosures') >= self.options.disclosuresUpperLimit);
			var isAllDisclosed = self.$element.find(".tree-branch:not('.tree-open, .hidden, .hide')").length === 0;


			if (!isAllDisclosed) {
				if (isExceededLimit) {
					self.$element.trigger('exceededDisclosuresLimit.fu.tree', {
						tree: self.$element,
						disclosures: self.$element.data('disclosures')
					});

					/*
					* If you've exceeded the limit, the loop will be killed unless you
					* explicitly ignore the limit and start the loop again:
					*
					*    $tree.one('exceededDisclosuresLimit.fu.tree', function () {
					*        $tree.data('ignore-disclosures-limit', true);
					*        $tree.tree('discloseAll');
					*    });
					*/
					if (!self.$element.data('ignore-disclosures-limit')) {
						return;
					}
				}

				self.$element.data('disclosures', self.$element.data('disclosures') + 1);

				/*
				* A new branch that is closed might be loaded in, make sure those get handled too.
				* This attachment needs to occur before calling `discloseVisible` to make sure that
				* if the execution of `discloseVisible` happens _super fast_ (as it does in our QUnit tests
				* this will still be called. However, make sure this only gets called _once_, because
				* otherwise, every single time we go through this loop, _another_ event will be bound
				* and then when the trigger happens, this will fire N times, where N equals the number
				* of recursive `discloseAll` executions (instead of just one)
				*/
				self.$element.one('disclosedVisible.fu.tree', function callDiscloseAll () {
					self.discloseAll();
				});

				/*
				* If the page is very fast, calling this first will cause `disclosedVisible.fu.tree` to not
				* be bound in time to be called, so, we need to call this last so that the things bound
				* and triggered above can have time to take place before the next execution of the
				* `discloseAll` method.
				*/
				self.discloseVisible();
			} else {
				self.$element.trigger('disclosedAll.fu.tree', {
					tree: self.$element,
					disclosures: self.$element.data('disclosures')
				});

				// if `cacheItems` is false, and they call closeAll, the data is trashed and therefore
				// disclosures needs to accurately reflect that
				if (!self.options.cacheItems) {
					self.$element.one('closeAll.fu.tree', function updateDisclosuresData () {
						self.$element.data('disclosures', 0);
					});
				}
			}
		},

		// This refreshes the children of a folder. Please destroy and re-initilize for "root level" refresh.
		// The data of the refreshed folder is not updated. This control's architecture only allows updating of children.
		// Folder renames should probably be handled directly on the node.
		refreshFolder: function refreshFolder($el) {
			var $treeFolder = $el.closest('.tree-branch');
			var $treeFolderChildren = $treeFolder.find('.tree-branch-children');
			$treeFolderChildren.eq(0).empty();

			if ($treeFolder.hasClass('tree-open')) {
				this.populate($treeFolderChildren, false);
			} else {
				this.populate($treeFolderChildren, true);
			}

			this.$element.trigger('refreshedFolder.fu.tree', $treeFolder.data());
		}

	};

	// ALIASES

	// alias for collapse for consistency. "Collapse" is an ambiguous term (collapse what? All? One specific branch?)
	Tree.prototype.closeAll = Tree.prototype.collapse;
	// alias for backwards compatibility because there's no reason not to.
	Tree.prototype.openFolder = Tree.prototype.discloseFolder;
	// For library consistency
	Tree.prototype.getValue = Tree.prototype.selectedItems;

	// PRIVATE FUNCTIONS

	var fixFocusability = function fixFocusability ($tree, $branch) {
		/*
		When tree initializes on page, the `<ul>` element should have tabindex=0 and all sub-elements should have
		tabindex=-1. When focus leaves the tree, whatever the last focused on element was will keep the tabindex=0. The
		tree itself will have a tabindex=-1. The reason for this is that if you are inside of the tree and press
		shift+tab, it will try and focus on the tree you are already in, which will cause focus to shift immediately
		back to the element you are already focused on. That will make it seem like the event is getting "Swallowed up"
		by an aggressive event listener trap.

		For this reason, only one element in the entire tree, including the tree itself, should ever have tabindex=0.
		If somewhere down the line problems are being caused by this, the only further potential improvement I can
		envision at this time is listening for the tree to lose focus and reseting the tabindexes of all children to -1
		and setting the tabindex of the tree itself back to 0. This seems overly complicated with no benefit that I can
		imagine at this time, so instead I am leaving the last focused element with the tabindex of 0, even upon blur of
		the tree.

		One benefit to leaving the last focused element in a tree with a tabindex=0 is that if you accidentally tab out
		of the tree and then want to tab back in, you will be placed exactly where you left off instead of at the
		beginning of the tree.
		*/
		$tree.attr('tabindex', -1);
		$tree.find('li').attr('tabindex', -1);
		if ($branch && $branch.length > 0) {
			$branch.attr('tabindex', 0); // if tabindex is not set to 0 (or greater), node is not able to receive focus
		}
	};

	// focuses into (onto one of the children of) the provided branch
	var focusIn = function focusIn ($tree, $branch) {
		var $focusCandidate = $branch.find('.tree-selected:first');

		// if no node is selected, set focus to first visible node
		if ($focusCandidate.length <= 0) {
			$focusCandidate = $branch.find('li:not(".hidden"):first');
		}

		setFocus($tree, $focusCandidate);
	};

	// focuses on provided branch
	var setFocus = function setFocus ($tree, $branch) {
		fixFocusability($tree, $branch);

		$tree.attr('aria-activedescendant', $branch.attr('id'));

		$branch.focus();

		$tree.trigger('setFocus.fu.tree', $branch);
	};

	var navigateTree = function navigateTree ($tree, e) {
		if (e.isDefaultPrevented() || e.isPropagationStopped()) {
			return false;
		}

		var targetNode = e.originalEvent.target;
		var $targetNode = $(targetNode);
		var isOpen = $targetNode.hasClass('tree-open');
		var handled = false;
		// because es5 lacks promises and fuelux has no polyfil (and I'm not adding one just for this change)
		// I am faking up promises here through callbacks and listeners. Done will be fired immediately at the end of
		// the navigateTree method if there is no (fake) promise, but will be fired by an event listener that will
		// be triggered by another function if necessary. This way when done runs, and fires keyboardNavigated.fu.tree
		// anything listening for that event can be sure that everything tied to that event is actually completed.
		var fireDoneImmediately = true;
		var done = function done () {
			$tree.trigger('keyboardNavigated.fu.tree', e, $targetNode);
		};

		switch (e.which) {
		case 13: // enter
		case 32: // space
			// activates a node, i.e., performs its default action.
			// For parent nodes, one possible default action is to open or close the node.
			// In single-select trees where selection does not follow focus, the default action is typically to select the focused node.
			var foldersSelectable = $tree.hasClass('tree-folder-select');
			var isFolder = $targetNode.hasClass('tree-branch');
			var isItem = $targetNode.hasClass('tree-item');
			// var isOverflow = $targetNode.hasClass('tree-overflow');

			fireDoneImmediately = false;
			if (isFolder) {
				if (foldersSelectable) {
					$tree.one('selected.fu.tree deselected.fu.tree', done);
					$tree.tree('selectFolder', $targetNode.find('.tree-branch-header')[0]);
				} else {
					$tree.one('loaded.fu.tree closed.fu.tree', done);
					$tree.tree('toggleFolder', $targetNode.find('.tree-branch-header')[0]);
				}
			} else if (isItem) {
				$tree.one('selected.fu.tree', done);
				$tree.tree('selectItem', $targetNode);
			} else {
				// should be isOverflow... Try and click on it either way.
				$prev = $($targetNode.prevAll().not('.hidden')[0]);
				$targetNode.click();

				$tree.one('loaded.fu.tree', function selectFirstNewlyLoadedNode () {
					$next = $($prev.nextAll().not('.hidden')[0]);

					setFocus($tree, $next);
					done();
				});
			}

			handled = true;
			break;
		case 35: // end
			// Set focus to the last node in the tree that is focusable without opening a node.
			setFocus($tree, $tree.find('li:not(".hidden"):last'));

			handled = true;
			break;
		case 36: // home
			// set focus to the first node in the tree without opening or closing a node.
			setFocus($tree, $tree.find('li:not(".hidden"):first'));

			handled = true;
			break;
		case 37: // left
			if (isOpen) {
				fireDoneImmediately = false;
				$tree.one('closed.fu.tree', done);
				$tree.tree('closeFolder', targetNode);
			} else {
				setFocus($tree, $($targetNode.parents('li')[0]));
			}

			handled = true;
			break;

		case 38: // up
			// move focus to previous sibling
			var $prev = [];
			// move to previous li not hidden
			$prev = $($targetNode.prevAll().not('.hidden')[0]);

			// if the previous li is open, and has children, move selection to its last child so selection
			// appears to move to the next "thing" up
			if ($prev.hasClass('tree-open')) {
				var $prevChildren = $prev.find('li:not(".hidden"):last');
				if ($prevChildren.length > 0) {
					$prev = $($prevChildren[0]);
				}
			}

			// if nothing has been selected, we are presumably at the top of an open li, select the immediate parent
			if ($prev.length < 1) {
				$prev = $($targetNode.parents('li')[0]);
			}
			setFocus($tree, $prev);

			handled = true;
			break;

		case 39: // right
			if (isOpen) {
				focusIn($tree, $targetNode);
			} else {
				fireDoneImmediately = false;
				$tree.one('disclosed.fu.tree', done);
				$tree.tree('discloseFolder', targetNode);
			}

			handled = true;
			break;

		case 40: // down
			// move focus to next selectable tree node
			var $next = $($targetNode.find('li:not(".hidden"):first')[0]);
			if (!isOpen || $next.length <= 0) {
				$next = $($targetNode.nextAll().not('.hidden')[0]);
			}

			if ($next.length < 1) {
				$next = $($($targetNode.parents('li')[0]).nextAll().not('.hidden')[0]);
			}
			setFocus($tree, $next);

			handled = true;
			break;

		default:
			// console.log(e.which);
			return true; // exit this handler for other keys
		}

		// if we didn't handle the event, allow propagation to continue so something else might.
		if (handled) {
			e.preventDefault();
			e.stopPropagation();
			if (fireDoneImmediately) {
				done();
			}
		}

		return true;
	};

	var ariaSelect = function ariaSelect ($element) {
		$element.attr('aria-selected', true);
	};

	var ariaDeselect = function ariaDeselect ($element) {
		$element.attr('aria-selected', false);
	};

	function styleNodeSelected ($element, $icon) {
		$element.addClass('tree-selected');
		if ( $element.data('type') === 'item' && $icon.hasClass('fueluxicon-bullet') ) {
			$icon.removeClass('fueluxicon-bullet').addClass('glyphicon-ok'); // make checkmark
		}
	}

	function styleNodeDeselected ($element, $icon) {
		$element.removeClass('tree-selected');
		if ( $element.data('type') === 'item' && $icon.hasClass('glyphicon-ok') ) {
			$icon.removeClass('glyphicon-ok').addClass('fueluxicon-bullet'); // make bullet
		}
	}

	function multiSelectSyncNodes (self, clicked, selected) {
		// search for currently selected and add to selected data list if needed
		$.each(selected.$elements, function findCurrentlySelected (index, element) {
			var $element = $(element);

			if ($element[0] !== clicked.$element[0]) {
				selected.dataForEvent.push( $($element).data() );
			}
		});

		if (clicked.$element.hasClass('tree-selected')) {
			styleNodeDeselected(clicked.$element, clicked.$icon);
			// set event data
			selected.eventType = 'deselected';
		} else {
			styleNodeSelected(clicked.$element, clicked.$icon);
			// set event data
			selected.eventType = 'selected';
			selected.dataForEvent.push(clicked.elementData);
		}

		return selected;
	}

	function singleSelectSyncNodes(self, clicked, selected) {
		// element is not currently selected
		if (selected.$elements[0] !== clicked.$element[0]) {
			self.deselectAll(self.$element);
			styleNodeSelected(clicked.$element, clicked.$icon);
			// set event data
			selected.eventType = 'selected';
			selected.dataForEvent = [clicked.elementData];
		} else {
			styleNodeDeselected(clicked.$element, clicked.$icon);
			// set event data
			selected.eventType = 'deselected';
			selected.dataForEvent = [];
		}

		return selected;
	}

	// TREE PLUGIN DEFINITION

	$.fn.tree = function fntree (option) {
		var args = Array.prototype.slice.call(arguments, 1);
		var methodReturn;

		var $set = this.each(function eachThis () {
			var $this = $(this);
			var data = $this.data('fu.tree');
			var options = typeof option === 'object' && option;

			if (!data) {
				$this.data('fu.tree', (data = new Tree(this, options)));
				$this.trigger('initialized.fu.tree');
			}

			if (typeof option === 'string') {
				methodReturn = data[option].apply(data, args);
			}
		});

		return (methodReturn === undefined) ? $set : methodReturn;
	};

	/*
	 * Private method used only by the default dataSource for the tree, which is used to consume static
	 * tree data.
	 *
	 * Find children of supplied parent in rootData. You can pass in an entire deeply nested tree
	 * and this will look through it recursively until it finds the child data you are looking for.
	 *
	 * For extremely large trees, this could cause the browser to crash, as there is no protection
	 * or limit on the amount of branches that will be searched through.
	 */
	var findChildData = function findChildData (targetParent, rootData) {
		var isRootOfTree = $.isEmptyObject(targetParent);
		if (isRootOfTree) {
			return rootData;
		}

		if (rootData === undefined) {
			return false;
		}

		for (var i = 0; i < rootData.length; i++) {
			var potentialMatch = rootData[i];

			if (potentialMatch.attr && targetParent.attr && potentialMatch.attr.id === targetParent.attr.id) {
				return potentialMatch.children;
			} else if (potentialMatch.children) {
				var foundChild = findChildData(targetParent, potentialMatch.children);
				if (foundChild) {
					return foundChild;
				}
			}
		}

		return false;
	};

	$.fn.tree.defaults = {
		/*
		 * A static data representation of your full tree data. If you do not override the tree's
		 * default dataSource method, this will just make the tree work out of the box without
		 * you having to bring your own dataSource.
		 *
		 * Array of Objects representing tree branches (folder) and leaves (item):
			[
				{
					name: '',
					type: 'folder',
					attr: {
						id: ''
					},
					children: [
						{
							name: '',
							type: 'item',
							attr: {
								id: '',
								'data-icon': 'glyphicon glyphicon-file'
							}
						}
					]
				},
				{
					name: '',
					type: 'item',
					attr: {
						id: '',
						'data-icon': 'glyphicon glyphicon-file'
					}
				}
			];
		 */
		staticData: [],
		/*
		 * If you set the full tree data on options.staticData, you can use this default dataSource
		 * to consume that data. This allows you to just pass in a JSON array representation
		 * of your full tree data and the tree will just work out of the box.
		 */
		dataSource: function staticDataSourceConsumer (openedParentData, callback) {
			if (this.staticData.length > 0) {
				var childData = findChildData(openedParentData, this.staticData);

				callback({
					data: childData
				});
			}
		},
		multiSelect: false,
		cacheItems: true,
		folderSelect: true,
		itemSelect: true,
		/*
		* How many times `discloseAll` should be called before a stopping and firing
		* an `exceededDisclosuresLimit` event. You can force it to continue by
		* listening for this event, setting `ignore-disclosures-limit` to `true` and
		* starting `discloseAll` back up again. This lets you make more decisions
		* about if/when/how/why/how many times `discloseAll` will be started back
		* up after it exceeds the limit.
		*
		*    $tree.one('exceededDisclosuresLimit.fu.tree', function () {
		*        $tree.data('ignore-disclosures-limit', true);
		*        $tree.tree('discloseAll');
		*    });
		*
		* `disclusuresUpperLimit` defaults to `0`, so by default this trigger
		* will never fire. The true hard the upper limit is the browser's
		* ability to load new items (i.e. it will keep loading until the browser
		* falls over and dies). On the Fuel UX `index.html` page, the point at
		* which the page became super slow (enough to seem almost unresponsive)
		* was `4`, meaning 256 folders had been opened, and 1024 were attempting to open.
		*/
		disclosuresUpperLimit: 0
	};

	$.fn.tree.Constructor = Tree;

	$.fn.tree.noConflict = function noConflict () {
		$.fn.tree = old;
		return this;
	};


	// NO DATA-API DUE TO NEED OF DATA-SOURCE

	// -- BEGIN UMD WRAPPER AFTERWORD --
}));
// -- END UMD WRAPPER AFTERWORD --


/***/ }),

/***/ 1792:
/*!*********************************************!*\
  !*** ./node_modules/fuelux/js/utilities.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global jQuery:true */

/*
 * Fuel UX Utilities
 * https://github.com/ExactTarget/fuelux
 *
 * Copyright (c) 2016 ExactTarget
 * Licensed under the BSD New license.
 */

// -- BEGIN UMD WRAPPER PREFACE --

// For more information on UMD visit:
// https://github.com/umdjs/umd/blob/master/templates/jqueryPlugin.js

// Uses CommonJS, AMD or browser globals to create a jQuery plugin.

(function umdFactory (factory) {
	if (true) {
		// if AMD loader is available, register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ 5311)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}(function utilitiesWrapper ($) {
	// -- END UMD WRAPPER PREFACE --

	// -- BEGIN MODULE CODE HERE --
	var CONST = {
		BACKSPACE_KEYCODE: 8,
		COMMA_KEYCODE: 188, // `,` & `<`
		DELETE_KEYCODE: 46,
		DOWN_ARROW_KEYCODE: 40,
		ENTER_KEYCODE: 13,
		TAB_KEYCODE: 9,
		UP_ARROW_KEYCODE: 38
	};

	var isShiftHeld = function isShiftHeld (e) { return e.shiftKey === true; };

	var isKey = function isKey (keyCode) {
		return function compareKeycodes (e) {
			return e.keyCode === keyCode;
		};
	};

	var isBackspaceKey = isKey(CONST.BACKSPACE_KEYCODE);
	var isDeleteKey = isKey(CONST.DELETE_KEYCODE);
	var isTabKey = isKey(CONST.TAB_KEYCODE);
	var isUpArrow = isKey(CONST.UP_ARROW_KEYCODE);
	var isDownArrow = isKey(CONST.DOWN_ARROW_KEYCODE);

	var ENCODED_REGEX = /&[^\s]*;/;
	/*
	 * to prevent double encoding decodes content in loop until content is encoding free
	 */
	var cleanInput = function cleanInput (questionableMarkup) {
		// check for encoding and decode
		while (ENCODED_REGEX.test(questionableMarkup)) {
			questionableMarkup = $('<i>').html(questionableMarkup).text();
		}

		// string completely decoded now encode it
		return $('<i>').text(questionableMarkup).html();
	};

	$.fn.utilities = {
		CONST: CONST,
		cleanInput: cleanInput,
		isBackspaceKey: isBackspaceKey,
		isDeleteKey: isDeleteKey,
		isShiftHeld: isShiftHeld,
		isTabKey: isTabKey,
		isUpArrow: isUpArrow,
		isDownArrow: isDownArrow
	};

	// -- BEGIN UMD WRAPPER AFTERWORD --
}));
// -- END UMD WRAPPER AFTERWORD --


/***/ })

}]);
//# sourceMappingURL=vendors-86f4a106.2384d3fce1a12a237460.bundle.js.map