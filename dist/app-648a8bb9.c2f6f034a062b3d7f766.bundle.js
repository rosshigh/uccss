"use strict";
(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([["app-648a8bb9"],{

/***/ "modules/tech/support/viewHelpTickets":
/*!*****************************************************!*\
  !*** ./src/modules/tech/support/viewHelpTickets.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ViewHelpTickets": function() { return /* binding */ ViewHelpTickets; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-router */ 6433);
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../resources/utils/dataTable */ 6847);
/* harmony import */ var _resources_data_helpTickets__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../resources/data/helpTickets */ 8142);
/* harmony import */ var _resources_data_sessions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../resources/data/sessions */ 2073);
/* harmony import */ var _resources_data_systems__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../resources/data/systems */ 4077);
/* harmony import */ var _resources_data_products__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../resources/data/products */ 8666);
/* harmony import */ var _resources_data_downloads__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../resources/data/downloads */ 9132);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_people__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../resources/data/people */ 353);
/* harmony import */ var _resources_utils_validation__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../resources/utils/validation */ 2824);
/* harmony import */ var _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../resources/dialogs/common-dialogs */ 6545);
/* harmony import */ var _resources_data_clientRequests__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../resources/data/clientRequests */ 5446);
/* harmony import */ var _resources_data_documents__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../resources/data/documents */ 7188);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
















var ViewHelpTickets = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, _config_appConfig__WEBPACK_IMPORTED_MODULE_8__.AppConfig, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_11__["default"], _resources_data_people__WEBPACK_IMPORTED_MODULE_10__.People, _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_12__.CommonDialogs, _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_2__.DataTable, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_9__.Utils, _resources_data_helpTickets__WEBPACK_IMPORTED_MODULE_3__.HelpTickets, _resources_data_sessions__WEBPACK_IMPORTED_MODULE_4__.Sessions, _resources_data_systems__WEBPACK_IMPORTED_MODULE_5__.Systems, _resources_data_downloads__WEBPACK_IMPORTED_MODULE_7__.Downloads, _resources_data_products__WEBPACK_IMPORTED_MODULE_6__.Products, aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.TemplatingEngine, _resources_data_clientRequests__WEBPACK_IMPORTED_MODULE_13__.ClientRequests, _resources_data_documents__WEBPACK_IMPORTED_MODULE_14__.DocumentsServices, _resources_data_clientRequests__WEBPACK_IMPORTED_MODULE_13__.ClientRequests), _dec(_class = /*#__PURE__*/function () {
  //minutes
  function ViewHelpTickets(router, config, validation, people, dialog, datatable, utils, helpTickets, sessions, systems, apps, products, templatingEngine, requests, documents) {
    this.helpTicketSelected = false;
    this.enterResponse = false;
    this.sendMailDisable = false;
    this.notesHistory = false;
    this.showRequestPanel = false;
    this.viewHelpTickets = true;
    this.showAssignment = false;
    this.refreshInterval = 10;
    this.tableMargin = "margin-top:0px;";
    this.toolbar = void 0;
    this.colSpan = 10;
    this.spinnerHTML = "";
    this.filterValues = new Array();
    this.commentShown = "";
    this.responseMessage = "";
    this.toolbar = [['style', ['style', 'bold', 'italic', 'underline', 'clear']], ['color', ['color']], ['font', ['strikethrough', 'superscript', 'subscript']], ['layout', ['ul', 'ol', 'paragraph']], ['insert', ['link', 'table', 'hello']], ['misc', ['undo', 'redo', 'fullscreen', 'codeview']]];
    this.router = router;
    this.config = config;
    this.validation = validation;
    this.validation.initialize(this);
    this.people = people;
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.utils = utils;
    this.helpTickets = helpTickets;
    this.sessions = sessions;
    this.systems = systems;
    this.apps = apps;
    this.products = products;
    this.dialog = dialog;
    this.templatingEngine = templatingEngine;
    this.requests = requests;
    this.documents = documents;
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
    this.isUCC = this.userObj.userRole >= this.config.UCC_ROLE;
  }

  var _proto = ViewHelpTickets.prototype;

  /*****************************************************************************************
  * Retrieve the help tickets, sessions, downloads and people
  * Only active help tickets are retrieved
  *****************************************************************************************/
  _proto.activate =
  /*#__PURE__*/
  function () {
    var _activate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params) {
      var responses;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Promise.all([this.helpTickets.getHelpTicketTypes('?order=category'), this.config.getConfig()]);

            case 2:
              responses = _context.sent;

              if (!(params.HTNumber == -1)) {
                _context.next = 8;
                break;
              }

              _context.next = 6;
              return this.showHTList();

            case 6:
              _context.next = 10;
              break;

            case 8:
              this.HTToShow = params.HTNumber;
              this.showHelpTicketImmediately = true;

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function activate(_x) {
      return _activate.apply(this, arguments);
    }

    return activate;
  }();

  _proto.showHTList = /*#__PURE__*/function () {
    var _showHTList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var _this = this;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this.sessions.getSessionsArray('?order=startDate:DSC');
              this.apps.getDownloadsArray(true, '?filter=helpTicketRelevant|eq|true&order=name');
              this.systems.getSystemsArray();
              this.documents.getDocumentsCategoriesArray();
              this.products.getProductsArray('?fields=_id name');
              this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
              this.sendEmail = this.config.SEND_EMAILS;

              this._setUpValidation();

              this.helpTicketTypes = this.config.HELP_TICKET_STATUSES.filter(function (item) {
                return item.code !== _this.config.CLOSED_HELPTICKET_STATUS;
              });
              this.helpTicketTypeLookupArray = new Array();
              this.helpTickets.helpTicketTypesArray.forEach(function (item) {
                item.subtypes.forEach(function (item2) {
                  _this.helpTicketTypeLookupArray.push({
                    helpTicketType: item2.type,
                    description: item2.description
                  });
                });
              });
              this.removeHTStatus = [this.config.NEW_HELPTICKET_STATUS, this.config.REPLIED_HELPTICKET_STATUS];

              if (this.utils.isMobile()) {
                this.mobile = true;
                this.toolbar = [['style', ['style', 'bold', 'clear']]];
              }

              this.initialLoaded = false;
              this.refreshInterval = this.config.HELP_TICKET_REFRESH_INTERVAL;

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function showHTList() {
      return _showHTList.apply(this, arguments);
    }

    return showHTList;
  }();

  _proto.showHT = /*#__PURE__*/function () {
    var _showHT = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(HTNumber) {
      var indices, subTypeIndex, categoryIndex;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              this.tableMargin = "margin-top:0px;"; //Make the selected help ticket the selected help ticket

              _context3.next = 3;
              return this.helpTickets.getHelpTicketByNumber(HTNumber);

            case 3:
              this.oroginalHelpTicket = this.helpTickets.selectedHelpTicket;
              this.openHelpTicket();
              indices = this.getIndex();
              subTypeIndex = indices.subTypeIndex;
              categoryIndex = indices.categoryIndex;
              this.createOutputForm(this.helpTickets.helpTicketTypesArray[categoryIndex].subtypes[subTypeIndex].outputForm);
              this.viewHelpTicketsHeading = "Help Ticket " + this.helpTickets.selectedHelpTicket.helpTicketNo;
              this.helpTicketSelected = true;
              window.scrollTo(0, 0);

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function showHT(_x2) {
      return _showHT.apply(this, arguments);
    }

    return showHT;
  }();

  _proto.attached = /*#__PURE__*/function () {
    var _attached = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var _this2 = this;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              this.refresh(false);
              if (!this.mobile) this.toolTips();
              this.initialLoaded = true;
              setInterval(function () {
                if (!_this2.helpTicketSelected) _this2.refresh(false);
              }, this.refreshInterval * 60 * 1000);
              $.summernote.dom.emptyPara = "<div><br/></div>";

              if (!this.showHelpTicketImmediately) {
                _context4.next = 8;
                break;
              }

              _context4.next = 8;
              return this.showHT(this.HTToShow);

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function attached() {
      return _attached.apply(this, arguments);
    }

    return attached;
  }();

  _proto.toolTips = function toolTips() {
    $('[data-toggle="tooltip"]').tooltip();
  };

  _proto.sendMailNow = function sendMailNow() {
    this.helpTickets.sendMail();
  };

  _proto.showComment = function showComment(helpTicket, el) {
    this.commentShown = helpTicket.content[0].content.comments;
    $(".hover").css("top", el.clientY - 100);
    $(".hover").css("left", el.clientX + 10);
    $(".hover").css("display", "block");
  };

  _proto.hideComment = function hideComment() {
    $(".hover").css("display", "none");
  };

  _proto.showProfile = function showProfile(helpTicket, el) {
    this.profileHelpTicket = helpTicket;
    $(".hoverProfile").css("top", el.clientY - 175);
    $(".hoverProfile").css("left", el.clientX - 200);
    $(".hoverProfile").css("display", "block");
  };

  _proto.hideProfile = function hideProfile() {
    $(".hoverProfile").css("display", "none");
  };

  _proto.viewAssignment = /*#__PURE__*/function () {
    var _viewAssignment = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(index, request) {
      var response;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              this.editIndex = index;
              _context5.next = 3;
              return this.requests.getRequestDetail(request._id);

            case 3:
              response = _context5.sent;

              if (!response.error) {
                this.selectedRequestDetail = response;
                if (this.selectedRequestDetail.requestId && this.selectedRequestDetail.requestId.courseId === null) this.selectedRequestDetail.requestId.courseId = {
                  _id: this.config.SANDBOX_ID,
                  name: this.config.SANDBOX_NAME
                };
                this.products.selectedProductFromId(this.selectedRequestDetail.productId._id);
                if (this.selectedRequestDetail.assignments && this.selectedRequestDetail.assignments.length > 0) this.systems.selectedSystemFromId(this.selectedRequestDetail.assignments[0].systemId);
                this.showAssignment = true;
              }

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function viewAssignment(_x3, _x4) {
      return _viewAssignment.apply(this, arguments);
    }

    return viewAssignment;
  }();

  _proto.backView = function backView() {
    this.showAssignment = false;
  };

  _proto.sendAnEmail = function sendAnEmail(person) {
    var _this3 = this;

    if (person) {
      var email = {
        emailBody: "",
        emailSubject: "",
        person: person
      };
      return this.dialog.showEmail("Enter Email", email, ['Submit', 'Cancel']).whenClosed(function (response) {
        if (!response.wasCancelled) {
          _this3.sendTheEmail(response.output);
        } else {
          console.log("Cancelled");
        }
      });
    }
  };

  _proto.sendTheEmail = /*#__PURE__*/function () {
    var _sendTheEmail = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(email) {
      var message, serverResponse;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!email) {
                _context6.next = 6;
                break;
              }

              message = {
                id: email.email.person._id,
                fullName: email.email.person.fullName,
                message: email.email.emailBody,
                email: email.email.person.email,
                subject: email.email.emailSubject,
                audit: {
                  property: 'Send Message',
                  eventDate: new Date(),
                  newValue: email.email.emailBody,
                  personId: this.userObj._id
                }
              };
              _context6.next = 4;
              return this.people.sendCustomerMessage(message);

            case 4:
              serverResponse = _context6.sent;

              if (!serverResponse.error) {
                this.utils.showNotification("The message was sent");
                this.hideProfile();
              }

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function sendTheEmail(_x5) {
      return _sendTheEmail.apply(this, arguments);
    }

    return sendTheEmail;
  }();

  _proto.confidentialChecked = function confidentialChecked() {
    if (document.getElementById('confidentialCheckBox').checked) {
      this.sendMailDisable = true;
      this.sendEmail = false;
    } else {
      this.sendMailDisable = false;
      this.sendEmail = true;
    }
  }
  /*****************************************************************************************
  * Refresh the helpticket collection
  *****************************************************************************************/
  ;

  _proto.refresh =
  /*#__PURE__*/
  function () {
    var _refresh = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(clickRefresh) {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (!clickRefresh) $("#loading").show();
              _context7.next = 3;
              return this.helpTickets.getHelpTicketArray("?filter=helpTicketStatus|lt|" + this.config.CLOSED_HELPTICKET_STATUS + "&order=createdDate:DSC", true);

            case 3:
              this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
              this.helpTickets.calcHelpTicketAges();
              $("#loading").hide();

              this._cleanUpFilters();

            case 7:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function refresh(_x6) {
      return _refresh.apply(this, arguments);
    }

    return refresh;
  }()
  /*****************************************************************************************
  * User selected a help ticket
  * el - event object
  * index - index of selected help ticket
  *****************************************************************************************/
  ;

  _proto.selectHelpTicket =
  /*#__PURE__*/
  function () {
    var _selectHelpTicket = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(el, index, helpTicket) {
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              this.tableMargin = "margin-top:0px;"; //Make the selected help ticket the selected help ticket

              this.editIndex = this.dataTable.getOriginalIndex(index);
              _context8.next = 4;
              return this.helpTickets.getHelpTicket(helpTicket._id);

            case 4:
              this.proceedWithSelect(el);

            case 5:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function selectHelpTicket(_x7, _x8, _x9) {
      return _selectHelpTicket.apply(this, arguments);
    }

    return selectHelpTicket;
  }();

  _proto.proceedWithSelect = function proceedWithSelect(el) {
    this.oroginalHelpTicket = this.helpTickets.selectedHelpTicket;
    this.openHelpTicket();
    var indices = this.getIndex();
    var subTypeIndex = indices.subTypeIndex;
    var categoryIndex = indices.categoryIndex;
    this.createOutputForm(this.helpTickets.helpTicketTypesArray[categoryIndex].subtypes[subTypeIndex].outputForm);
    if (this.selectedRow) this.selectedRow.children().removeClass('info');
    this.selectedRow = $(el.target).closest('tr');
    this.selectedRow.children().addClass('info');
    this.viewHelpTicketsHeading = "Help Ticket " + this.helpTickets.selectedHelpTicket.helpTicketNo;
    this.helpTicketSelected = true;
    window.scrollTo(0, 0);
  };

  _proto.getCategoryIndex = function getCategoryIndex() {
    for (var i = 0; i < this.helpTickets.helpTicketTypesArray.length; i++) {
      if (this.helpTickets.helpTicketTypesArray[i] == this.helpTickets.selectedHelpTicket.helpTicketCategory) {
        return i;
      }
    }
  };

  _proto.getIndex = function getIndex() {
    for (var j = 0; j < this.helpTickets.helpTicketTypesArray.length; j++) {
      for (var i = 0; i < this.helpTickets.helpTicketTypesArray[j].subtypes.length; i++) {
        if (this.helpTickets.helpTicketTypesArray[j].subtypes[i].type === this.helpTickets.selectedHelpTicket.content[0].type || this.helpTickets.helpTicketTypesArray[j].subtypes[i].type === 'OTHER_OTHER' && this.helpTickets.selectedHelpTicket.content[0].type === 'OTHER') {
          return {
            subTypeIndex: i,
            categoryIndex: j
          };
        }
      }
    }
  };

  _proto.createOutputForm = function createOutputForm(html) {
    var el = document.getElementById('container');
    el.innerHTML = html;

    if (el) {
      if (!el.querySelectorAll('.au-target').length) {
        this.templatingEngine.enhance({
          element: el,
          bindingContext: this
        });
      }
    }
  };

  _proto.openHelpTicket = /*#__PURE__*/function () {
    var _openHelpTicket = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              if (!this.helpTickets.selectedHelpTicket._id.length) {
                _context9.next = 5;
                break;
              }

              _context9.next = 3;
              return this.getDetails();

            case 3:
              _context9.next = 6;
              break;

            case 5:
              this.utils.showNotification('Help Ticket not found');

            case 6:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function openHelpTicket() {
      return _openHelpTicket.apply(this, arguments);
    }

    return openHelpTicket;
  }();

  _proto.getDetails = /*#__PURE__*/function () {
    var _getDetails = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              this.showRequestDetails = false;

              if (this.helpTickets.selectedHelpTicket.requestId) {
                if (this.helpTickets.selectedHelpTicket.requestId.assignments && this.helpTickets.selectedHelpTicket.requestId.assignments.length > 0) this.showRequestDetails = true;
                this.showCourse = false;
                this.course = "";
                this.showCourse = true;

                if (this.helpTickets.selectedHelpTicket.courseId) {
                  this.course = this.helpTickets.selectedHelpTicket.courseId.number + " - " + this.helpTickets.selectedHelpTicket.courseId.name;
                } else {
                  this.course = this.config.SANDBOX_NAME;
                }
              }

            case 2:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    function getDetails() {
      return _getDetails.apply(this, arguments);
    }

    return getDetails;
  }();

  _proto.save = /*#__PURE__*/function () {
    var _save = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(changes) {
      var _this4 = this;

      var serverResponse, _serverResponse;

      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              changes = changes ? changes : this.helpTickets.isHelpTicketDirty(this.oroginalHelpTicket, ["requestId", "courseId", "personId", "institutionId"]);

              if (changes && changes.length > 0) {
                changes.forEach(function (item) {
                  _this4.helpTickets.selectedHelpTicket.audit.push({
                    property: item.property,
                    oldValue: item.oldValue,
                    newValue: item.newValue,
                    eventDate: new Date(),
                    personId: _this4.userObj._id
                  });
                });
              }

              if (!(this.helpTickets.selectedHelpTicket.helpTicketStatus == this.config.CLOSED_HELPTICKET_STATUS)) {
                _context11.next = 12;
                break;
              }

              this.helpTickets.selectHelpTicketContent();
              this.responseMessage = "Help Ticket closed by " + this.userObj.fullName;

              this._createResponse();

              _context11.next = 8;
              return this.helpTickets.closeHelpTicket();

            case 8:
              serverResponse = _context11.sent;

              if (!serverResponse.error) {
                // this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
                this.dataTable.updateArrayMaintainFilters(this.helpTickets.helpTicketsArray);
                this.reSort();
                this.utils.showNotification("The help ticket was updated");
              }

              _context11.next = 16;
              break;

            case 12:
              _context11.next = 14;
              return this.helpTickets.saveHelpTicket();

            case 14:
              _serverResponse = _context11.sent;

              if (!_serverResponse.error) {
                this.dataTable.updateArrayMaintainFilters(this.helpTickets.helpTicketsArray);
                this.reSort(); // this.dataTable.updateArray(this.helpTickets.helpTicketsArray);

                this.utils.showNotification("The help ticket was updated");
              }

            case 16:
              // var email = new Object();
              // let serverResponse = await this.helpTickets.saveHelpTicket(email);
              // if (!serverResponse.error) {
              //   // if (serverResponse.helpTicketStatus == this.config.CLOSED_HELPTICKET_STATUS) await this.refresh(false);
              //   this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
              //   this.utils.showNotification("The help ticket was updated");
              // }
              this._cleanUp();

            case 17:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, this);
    }));

    function save(_x10) {
      return _save.apply(this, arguments);
    }

    return save;
  }();

  _proto.getStatusDescription = function getStatusDescription(status) {
    for (var i = 0; i < this.config.HELP_TICKET_STATUSES.length; i++) {
      if (status == this.config.HELP_TICKET_STATUSES[i].code) {
        return this.config.HELP_TICKET_STATUSES[i].description;
      }
    }

    return "";
  }
  /*****************************************************************************************
  * Open the response form and create an empty help ticket content object
  *****************************************************************************************/
  ;

  _proto.respond =
  /*#__PURE__*/
  function () {
    var _respond = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
      var owner;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              if (this.enterResponse) {
                _context12.next = 15;
                break;
              }

              _context12.next = 3;
              return this.helpTickets.getOwner(this.helpTickets.selectedHelpTicket._id);

            case 3:
              owner = _context12.sent;

              if (!(this.helpTickets.selectedHelpTicket.owner[0].personId == null)) {
                _context12.next = 9;
                break;
              }

              _context12.next = 7;
              return this.noOwnerRespond();

            case 7:
              _context12.next = 15;
              break;

            case 9:
              if (!(owner.owner[0].personId._id != this.userObj._id)) {
                _context12.next = 14;
                break;
              }

              _context12.next = 12;
              return this.dontOwnItRespond(owner);

            case 12:
              _context12.next = 15;
              break;

            case 14:
              this.proceedWithResponse();

            case 15:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, this);
    }));

    function respond() {
      return _respond.apply(this, arguments);
    }

    return respond;
  }();

  _proto.noOwnerRespond = /*#__PURE__*/function () {
    var _noOwnerRespond = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
      var _this5 = this;

      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              this.dialog.showMessage("Please take ownership of this help ticket before responding. Press OK to take ownership or Cancel to return to the list.", "Continue", ['OK', 'Cancel']).whenClosed(function (response) {
                if (!response.wasCancelled) {
                  _this5.ownAndRespond();
                } else {
                  _this5.back();
                }
              });

            case 1:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, this);
    }));

    function noOwnerRespond() {
      return _noOwnerRespond.apply(this, arguments);
    }

    return noOwnerRespond;
  }();

  _proto.ownAndRespond = /*#__PURE__*/function () {
    var _ownAndRespond = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
      var obj, serverResponse;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              obj = {
                status: this.config.REVIEW_HELPTICKET_STATUS,
                personId: this.userObj._id
              };
              _context14.next = 3;
              return this.helpTickets.updateOwner(obj);

            case 3:
              serverResponse = _context14.sent;
              this.proceedWithResponse();

            case 5:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14, this);
    }));

    function ownAndRespond() {
      return _ownAndRespond.apply(this, arguments);
    }

    return ownAndRespond;
  }();

  _proto.dontOwnItRespond = /*#__PURE__*/function () {
    var _dontOwnItRespond = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(owner) {
      var _this6 = this;

      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              this.dialog.showMessage("This help ticket is owned by " + owner.owner[0].personId.firstName + " " + owner.owner[0].personId.lastName + ".  If you continue your response may conflict with their efforts.", "Continue", ['Proceed', 'Cancel']).whenClosed(function (response) {
                if (!response.wasCancelled) {
                  _this6.proceedWithResponse();
                }
              });

            case 1:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15, this);
    }));

    function dontOwnItRespond(_x11) {
      return _dontOwnItRespond.apply(this, arguments);
    }

    return dontOwnItRespond;
  }();

  _proto.proceedWithResponse = function proceedWithResponse() {
    this.sendMailDisable = false; // this.responseMessage = "<p></p>";

    this.responseMessage = "";
    this.helpTickets.selectHelpTicketContent();
    this.enterResponse = true;
    this.enableButton = true;
    window.scrollTo(0, 0);
    setTimeout(function () {
      $(".note-editable").focus().scroll();
    }, 500);
  };

  _proto.cancelResponse = function cancelResponse() {
    this.response = new Object();
    this.isUnchanged = true;
    this.enterResponse = false;
  }
  /*****************************************************************************************
  * Create the response object
  *****************************************************************************************/
  ;

  _proto._createResponse = function _createResponse() {
    this.helpTickets.selectedHelpTicketContent.personId = this.userObj._id;
    this.helpTickets.selectedHelpTicketContent.type = this.config.HELP_TICKET_OTHER_TYPE;
    this.helpTickets.selectedHelpTicketContent.emailSent = this.sendEmail;
    this.helpTickets.selectedHelpTicketContent.content.comments = this.responseMessage;
    this.helpTickets.selectedHelpTicketContent.displayForm = this.config.HELP_TICKET_OTHER_TYPE;
  }
  /*****************************************************************************************
  * Save the response
  *****************************************************************************************/
  ;

  _proto.saveResponse =
  /*#__PURE__*/
  function () {
    var _saveResponse = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(status) {
      var _this7 = this;

      return regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              if (status === this.config.CLOSED_HELPTICKET_STATUS) {
                this.dialog.showMessage("Are you sure you want to close this help ticket", "Save Changes", ['Yes', 'No']).whenClosed(function (response) {
                  if (!response.wasCancelled) {
                    _this7.saveAndCLoseIt(status);
                  }
                });
              } else {
                this.saveIt(status);
              }

            case 1:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16, this);
    }));

    function saveResponse(_x12) {
      return _saveResponse.apply(this, arguments);
    }

    return saveResponse;
  }();

  _proto.saveAndCLoseIt = /*#__PURE__*/function () {
    var _saveAndCLoseIt = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(status) {
      var helpTicket, email, serverResponse;
      return regeneratorRuntime.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              this.helpTickets.selectedHelpTicket.helpTicketStatus = status;
              helpTicket = this.helpTickets.selectedHelpTicket._id;

              this._createResponse();

              email = new Object();

              if (this.sendEmail) {
                if (status == this.config.CUSTOMER_ACTION_HELPTICKET_STATUS) {
                  email.MESSAGE = this.config.HELP_TICKET_UPDATED_MESSAGE_CA.replace('[[No]]', this.helpTickets.selectedHelpTicket.helpTicketNo);
                  email.subject = this.config.HELP_TICKET_UPDATED_SUBJECT_CA.replace('[[No]]', this.helpTickets.selectedHelpTicket.helpTicketNo);
                } else if (status == this.config.CLOSED_HELPTICKET_STATUS) {
                  email.MESSAGE = this.config.HELP_TICKET_UPDATE_CLOSED_MESSAGE_C.replace('[[No]]', this.helpTickets.selectedHelpTicket.helpTicketNo);
                  ;
                  email.subject = this.config.HELP_TICKET_UPDATE_CLOSED_SUBJECT_C.replace('[[No]]', this.helpTickets.selectedHelpTicket.helpTicketNo);
                } else {
                  email.MESSAGE = this.config.HELP_TICKET_UPDATE_MESSAGE_R.replace('[[No]]', this.helpTickets.selectedHelpTicket.helpTicketNo);
                  ;
                  email.subject = this.config.HELP_TICKET_UPDATE_SUBJECT_R.replace('[[No]]', this.helpTickets.selectedHelpTicket.helpTicketNo);
                }

                email.INSTRUCTIONS = this.config.HELP_TICKET_INSTRUCTIONS;
                email.email = this.helpTickets.selectedHelpTicket.personId.email;
                email.cc = this.config.HELP_TICKET_EMAIL_LIST ? this.config.HELP_TICKET_EMAIL_LIST : "";
              }

              _context17.next = 7;
              return this.helpTickets.saveHelpTicketResponseAndCLose(email);

            case 7:
              serverResponse = _context17.sent;

              if (serverResponse.error) {
                _context17.next = 13;
                break;
              }

              _context17.next = 11;
              return this.refresh(false);

            case 11:
              this.utils.showNotification("The help ticket was updated");
              if (this.filesToUpload && this.filesToUpload.length > 0) this.helpTickets.uploadFileArchive(this.filesToUpload, this.helpTickets.selectedHelpTicket._id);

            case 13:
              this._cleanUp();

            case 14:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17, this);
    }));

    function saveAndCLoseIt(_x13) {
      return _saveAndCLoseIt.apply(this, arguments);
    }

    return saveAndCLoseIt;
  }();

  _proto.saveIt = /*#__PURE__*/function () {
    var _saveIt = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(status) {
      var helpTicket, email, serverResponse;
      return regeneratorRuntime.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              this.helpTickets.selectedHelpTicket.helpTicketStatus = status;
              helpTicket = this.helpTickets.selectedHelpTicket;

              this._createResponse();

              email = new Object();

              if (this.sendEmail) {
                if (status == this.config.CUSTOMER_ACTION_HELPTICKET_STATUS) {
                  email.MESSAGE = this.config.HELP_TICKET_UPDATED_MESSAGE_CA.replace('[[No]]', this.helpTickets.selectedHelpTicket.helpTicketNo);
                  email.subject = this.config.HELP_TICKET_UPDATED_SUBJECT_CA.replace('[[No]]', this.helpTickets.selectedHelpTicket.helpTicketNo);
                } else if (status == this.config.CLOSED_HELPTICKET_STATUS) {
                  email.MESSAGE = this.config.HELP_TICKET_UPDATE_CLOSED_MESSAGE_C.replace('[[No]]', this.helpTickets.selectedHelpTicket.helpTicketNo);
                  ;
                  email.subject = this.config.HELP_TICKET_UPDATE_CLOSED_SUBJECT_C.replace('[[No]]', this.helpTickets.selectedHelpTicket.helpTicketNo);
                } else {
                  email.MESSAGE = this.config.HELP_TICKET_UPDATE_MESSAGE_R.replace('[[No]]', this.helpTickets.selectedHelpTicket.helpTicketNo);
                  ;
                  email.subject = this.config.HELP_TICKET_UPDATE_SUBJECT_R.replace('[[No]]', this.helpTickets.selectedHelpTicket.helpTicketNo);
                }

                email.INSTRUCTIONS = this.config.HELP_TICKET_INSTRUCTIONS;
                email.email = this.helpTickets.selectedHelpTicket.personId.email;
                email.cc = this.config.HELP_TICKET_EMAIL_LIST ? this.config.HELP_TICKET_EMAIL_LIST : "";
              }

              _context18.next = 7;
              return this.helpTickets.saveHelpTicketResponse(email);

            case 7:
              serverResponse = _context18.sent;

              if (serverResponse.error) {
                _context18.next = 18;
                break;
              }

              if (!(status == this.config.CLOSED_HELPTICKET_STATUS)) {
                _context18.next = 14;
                break;
              }

              _context18.next = 12;
              return this.refresh(false);

            case 12:
              _context18.next = 16;
              break;

            case 14:
              this.dataTable.updateArrayMaintainFilters(this.helpTickets.helpTicketsArray);
              this.reSort();

            case 16:
              this.utils.showNotification("The help ticket was updated");
              if (this.filesToUpload && this.filesToUpload.length > 0) this.helpTickets.uploadFile(this.filesToUpload, this.helpTickets.selectedHelpTicket._id);

            case 18:
              this._cleanUp();

            case 19:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18, this);
    }));

    function saveIt(_x14) {
      return _saveIt.apply(this, arguments);
    }

    return saveIt;
  }();

  _proto.ownHelpTicket = /*#__PURE__*/function () {
    var _ownHelpTicket = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(helpTicket) {
      var _this8 = this;

      return regeneratorRuntime.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              if (helpTicket) {
                this.helpTickets.selectHelpTicketByID(helpTicket._id);
              }

              if (!(this.helpTickets.selectedHelpTicket.owner[0].personId == this.userObj._id)) {
                _context19.next = 3;
                break;
              }

              return _context19.abrupt("return");

            case 3:
              if (this.helpTickets.selectedHelpTicket.owner[0].personId !== this.userObj._id && this.helpTickets.selectedHelpTicket.owner[0].personId != null) {
                this.dialog.showMessage("Are you sure you want to change ownership of this help ticket", "Save Changes", ['Yes', 'No']).whenClosed(function (response) {
                  if (!response.wasCancelled) {
                    _this8.ownIt();
                  }
                });
              } else {
                this.ownIt();
              }

            case 4:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19, this);
    }));

    function ownHelpTicket(_x15) {
      return _ownHelpTicket.apply(this, arguments);
    }

    return ownHelpTicket;
  }();

  _proto.ownIt = /*#__PURE__*/function () {
    var _ownIt = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20() {
      var obj, serverResponse;
      return regeneratorRuntime.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              if (this.helpTickets.selectedHelpTicket.owner[0].personId === null) {
                obj = {
                  status: this.config.REVIEW_HELPTICKET_STATUS,
                  personId: this.userObj._id
                };
              } else {
                if (this.helpTickets.selectedHelpTicket.owner[0].personId._id != this.userObj._id) {
                  obj = {
                    status: this.config.REVIEW_HELPTICKET_STATUS,
                    personId: this.userObj._id
                  };
                } else {
                  obj = {
                    status: this.config.NEW_HELPTICKET_STATUS,
                    personId: "b1b1b1b1b1b1b1b1b1b1b1b1"
                  };
                }
              }

              _context20.next = 3;
              return this.helpTickets.updateOwner(obj);

            case 3:
              serverResponse = _context20.sent;

              if (!serverResponse.error) {
                this.dataTable.updateArrayMaintainFilters(this.helpTickets.helpTicketsArray);
                this.reSort(); // this.dataTable.updateArray(this.helpTickets.helpTicketsArray);

                this.utils.showNotification("The help ticket was updated");
              }

              if (this.helpTickets.selectedHelpTicket) {
                this._cleanUp();
              }

            case 6:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20, this);
    }));

    function ownIt() {
      return _ownIt.apply(this, arguments);
    }

    return ownIt;
  }();

  _proto.changeStatus = /*#__PURE__*/function () {
    var _changeStatus = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(helpTicket, status) {
      var obj, serverResponse, _serverResponse2;

      return regeneratorRuntime.wrap(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              if (!(status == this.config.MY_HELPTICKET_STATUS && this.userObj._id != helpTicket.owner[0].personId._id)) {
                _context21.next = 3;
                break;
              }

              this.utils.showNotification('You must own this ticket before you can make it yours');
              return _context21.abrupt("return");

            case 3:
              this.helpTickets.selectHelpTicketByID(helpTicket._id);
              obj = {
                property: "helpTicketStatus",
                oldValue: this.helpTickets.selectedHelpTicket.helpTicketStatus,
                newValue: status,
                personId: this.userObj._id,
                date: new Date()
              };
              this.helpTickets.selectedHelpTicket.audit.push(obj);

              if (status == this.config.MY_HELPTICKET_STATUS) {
                this.helpTickets.selectedHelpTicket.helpTicketStatus = this.helpTickets.selectedHelpTicket.helpTicketStatus.toString() + status;
              } else {
                this.helpTickets.selectedHelpTicket.helpTicketStatus = status;
              }

              if (!(status == this.config.CLOSED_HELPTICKET_STATUS)) {
                _context21.next = 17;
                break;
              }

              this.helpTickets.selectHelpTicketContent();
              this.responseMessage = "Help Ticket closed by " + this.userObj.fullName;

              this._createResponse();

              _context21.next = 13;
              return this.helpTickets.closeHelpTicket();

            case 13:
              serverResponse = _context21.sent;

              if (!serverResponse.error) {
                this.dataTable.updateArrayMaintainFilters(this.helpTickets.helpTicketsArray);
                this.reSort(); // this.dataTable.updateArray(this.helpTickets.helpTicketsArray);

                this.utils.showNotification("The help ticket was updated");
              }

              _context21.next = 21;
              break;

            case 17:
              _context21.next = 19;
              return this.helpTickets.saveHelpTicket();

            case 19:
              _serverResponse2 = _context21.sent;

              if (!_serverResponse2.error) {
                this.dataTable.updateArrayMaintainFilters(this.helpTickets.helpTicketsArray);
                this.reSort(); // this.dataTable.updateArray(this.helpTickets.helpTicketsArray);

                this.utils.showNotification("The help ticket was updated");
              }

            case 21:
              this._cleanUp();

            case 22:
            case "end":
              return _context21.stop();
          }
        }
      }, _callee21, this);
    }));

    function changeStatus(_x16, _x17) {
      return _changeStatus.apply(this, arguments);
    }

    return changeStatus;
  }();

  _proto._cleanUp = function _cleanUp() {
    if (this.showHelpTicketImmediately) {
      this.showHelpTicketImmediately = false;
      this.router.navigateToRoute('techHt', {
        HTNumber: -1
      });
    } else {
      this.enterResponse = false;
      this.filesToUpload = new Array();
      this.files = new Array();
      this.filesSelected = "";
      $('input[type=file]').wrap('<form></form>').parent().trigger('reset').children().unwrap();
      this.helpTicketSelected = false;
      this.showRequestPanel = false;
    }
  };

  _proto.flag = function flag() {
    var _this9 = this;

    var note = {
      noteBody: "",
      noteCategories: this.userObj.noteCategories,
      selectedCategory: 0
    };
    return this.dialog.showNote("Save Changes", note, ['Submit', 'Cancel']).whenClosed(function (response) {
      if (!response.wasCancelled) {
        _this9.saveNote(response.output);
      } else {
        console.log("Cancelled");
      }
    });
  };

  _proto.saveNote = /*#__PURE__*/function () {
    var _saveNote = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22(note) {
      var response;
      return regeneratorRuntime.wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              this.people.selectNote();
              this.people.selectedNote.type = "h";
              this.people.selectedNote.personId = this.userObj._id;
              this.people.selectedNote.category = this.userObj.noteCategories[note.selectedCategory];
              this.people.selectedNote.note = note.note.noteBody;
              this.people.selectedNote.reference = this.helpTickets.selectedHelpTicket._id;
              this.people.selectedNote.referenceNo = this.helpTickets.selectedHelpTicket.helpTicketNo;
              _context22.next = 9;
              return this.people.saveNote();

            case 9:
              response = _context22.sent;

              if (!response.error) {
                this.utils.showNotification('The note was saved');
              }

            case 11:
            case "end":
              return _context22.stop();
          }
        }
      }, _callee22, this);
    }));

    function saveNote(_x18) {
      return _saveNote.apply(this, arguments);
    }

    return saveNote;
  }();

  _proto.back = function back() {
    var _this10 = this;

    this.helpTicketSelected = false;
    var changes = this.helpTickets.isHelpTicketDirty(this.oroginalHelpTicket, ["requestId", "courseId", "personId", "institutionId"]);

    if (changes.length) {
      var that = this;
      this.message = "The help ticket has been changed. Do you want to save your changes?";
      return this.dialog.showMessage(that.message, "Save Changes", ['Yes', 'No']).whenClosed(function (response) {
        if (!response.wasCancelled) {
          _this10.save(changes);
        } else {
          _this10._cleanUp();
        }
      });
    } else {
      this._cleanUp();
    }
  }
  /*****************************************************************************************
  * Setup validation rules for each help ticket type
  *****************************************************************************************/
  ;

  _proto._setUpValidation = function _setUpValidation() {
    this.validation.addRule("00", "curriculumTitle", [{
      "rule": "required",
      "message": "Curriculum Title is required"
    }]);
    this.validation.addRule("00", "client", [{
      "rule": "custom",
      "message": "You must select a client",
      "valFunction": function valFunction(context) {
        return context.helpTicket.clientId !== undefined;
      }
    }]);
    this.validation.addRule("01", "resetPasswordUserIDs", [{
      "rule": "required",
      "message": "You must enter the passwords to reset"
    }]);
    this.validation.addRule("01", "client", [{
      "rule": "custom",
      "message": "You must enter the passwords to reset",
      "valFunction": function valFunction(context) {
        return context.helpTicket.clientId !== undefined;
      }
    }]);
    this.validation.addRule("02", "application", [{
      "rule": "custom",
      "message": "You must select the application",
      "valFunction": function valFunction(context) {
        return context.content.application !== undefined;
      }
    }]);
    this.validation.addRule("9", "owner", [{
      "rule": "custom",
      "message": "You are already the owner",
      "valFunction": function valFunction(context) {
        return context.helpTickets.selectedHelpTicket.owner[0].personId !== context.userObj._id;
      }
    }]);
  };

  _proto._cleanUpFilters = function _cleanUpFilters() {
    this.helpTicketNoFilterValue = "";
    this.helpTicketTypeFilterValue = "";
    this.ownerFilterValue = "";
    this.helpTicketStatusFilter = "";
    this.personFilterValue = "";
    this.institutionFilterValue = "";
    this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
  };

  _proto.checkSendMail = function checkSendMail() {
    this.sendMail = !this.sendMail;
  };

  _proto.changeFiles = function changeFiles() {
    var _this11 = this;

    this.filesToUpload = this.filesToUpload ? this.filesToUpload : new Array();

    for (var i = 0; i < this.files.length; i++) {
      var addFile = true;
      this.filesToUpload.forEach(function (item) {
        if (item.name === _this11.files[i].name) addFile = false;
      });
      if (addFile) this.filesToUpload.push(this.files[i]);
    }
  };

  _proto.removeFile = function removeFile(index) {
    this.filesToUpload.splice(index, 1);
  };

  _proto.insertDocument = function insertDocument() {
    var _this12 = this;

    var document = {
      documentURL: "",
      documentCats: this.documents.docCatsArray,
      documents: new Array(),
      selectedCategory: 0
    };
    return this.dialog.showDocument("Select Document", document, ['Submit', 'Cancel']).whenClosed(function (response) {
      if (!response.wasCancelled) {
        _this12.helpTickets.selectedHelpTicketContent.documents = _this12.helpTickets.selectedHelpTicketContent.documents ? _this12.helpTickets.selectedHelpTicketContent.documents : new Array();
        response.output.documents.documents.forEach(function (item) {
          _this12.helpTickets.selectedHelpTicketContent.documents.push({
            categoryCode: item.categoryCode,
            categoryName: item.categoryName,
            fileName: item.fileName
          });
        });
      } else {
        console.log("Cancelled");
      }
    });
  };

  _proto.removeDocument = function removeDocument(index) {
    this.helpTickets.selectedHelpTicketContent.documents.splice(index, 1);
  };

  _proto.showRequestsPanel = function showRequestsPanel() {
    this.showRequestPanel = !this.showRequestPanel;
    this.getRequests();
    window.scrollTo(0, 0);
  };

  _proto.getRequests = /*#__PURE__*/function () {
    var _getRequests = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23() {
      var _this13 = this;

      return regeneratorRuntime.wrap(function _callee23$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              if (!this.selectedSession) {
                _context23.next = 10;
                break;
              }

              this.sessions.selectSessionById(this.selectedSession);
              _context23.next = 4;
              return this.requests.getActiveClientRequestsArray(this.helpTickets.selectedHelpTicket.personId.id, this.selectedSession);

            case 4:
              _context23.next = 6;
              return this.people.getCoursesArray(true, '?filter=personId|eq|' + this.helpTickets.selectedHelpTicket.personId.id + '&order=number');

            case 6:
              this.originalClientRequestsArray = new Array();
              this.clientRequestsArray = new Array(); //Cycle through request array

              this.requests.requestsArray.forEach(function (item) {
                //Cycle through details of request
                item.requestDetails.forEach(function (item2) {
                  //If there are assignments
                  if (item2.assignments && item2.assignments.length > 0) {
                    //Cycle through the assignments
                    item2.assignments.forEach(function (assign) {
                      _this13.originalClientRequestsArray.push({
                        productId: item2.productId._id,
                        sessionId: item.sessionId,
                        requestStatus: item2.requestStatus,
                        systemId: assign.systemId,
                        courseName: item.courseId ? item.courseId.name : 'Trial Client',
                        productName: item2.productId.name,
                        client: assign.client,
                        clientId: assign.clientId,
                        studentIds: assign.studentUserIds,
                        studentPassword: assign.studentPassword,
                        facultyIds: assign.facultyUserIds,
                        facultyPassword: assign.facultyPassword,
                        _id: item2._id
                      });
                    });
                  } else {
                    _this13.originalClientRequestsArray.push({
                      productId: item2.productId._id,
                      productName: item2.productId.name,
                      sessionId: item.sessionId,
                      requestStatus: item2.requestStatus,
                      courseName: item.courseId ? item.courseId.name : 'Trial Client',
                      _id: item2._id
                    });
                  }
                });
              });
              this.originalClientRequestsArray.forEach(function (item) {
                _this13.clientRequestsArray.push(item);
              });

            case 10:
            case "end":
              return _context23.stop();
          }
        }
      }, _callee23, this);
    }));

    function getRequests() {
      return _getRequests.apply(this, arguments);
    }

    return getRequests;
  }() // showProfile(request, el) {
  //   this.profileRequest = request;
  //   $(".hoverProfile").css("top", window.pageYOffset + el.clientY - 175);
  //   $(".hoverProfile").css("left", el.clientX + 100);
  //   $(".hoverProfile").css("display", "block");
  // }
  // hideProfile() {
  //   $(".hoverProfile").css("display", "none");
  // }
  ;

  _proto.customHelpTicketStatusFilter =
  /*#__PURE__*/
  function () {
    var _customHelpTicketStatusFilter = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee24() {
      return regeneratorRuntime.wrap(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              if (!(this.helpTicketStatusFilter > this.config.CLOSED_HELPTICKET_STATUS)) {
                _context24.next = 6;
                break;
              }

              _context24.next = 3;
              return this.helpTickets.getMyHelpTickets(this.userObj._id);

            case 3:
              this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
              _context24.next = 14;
              break;

            case 6:
              if (!(this.oldHelpTicketStatus == this.config.MY_HELPTICKET_STATUS)) {
                _context24.next = 13;
                break;
              }

              $("#loading").show();
              _context24.next = 10;
              return this.helpTickets.getHelpTicketArray("?filter=helpTicketStatus|lt|" + this.config.CLOSED_HELPTICKET_STATUS + "&order=createdDate:DSC", true);

            case 10:
              this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
              this.helpTickets.calcHelpTicketAges();
              $("#loading").hide();

            case 13:
              this.dataTable.filterList({
                target: {
                  value: this.helpTicketStatusFilter
                }
              }, {
                type: 'value',
                filter: 'helpTicketStatusFilter',
                collectionProperty: 'helpTicketStatus',
                displayProperty: 'helpTicketStatus',
                compare: 'match'
              });

            case 14:
              this.oldHelpTicketStatus = this.helpTicketStatusFilter;

            case 15:
            case "end":
              return _context24.stop();
          }
        }
      }, _callee24, this);
    }));

    function customHelpTicketStatusFilter() {
      return _customHelpTicketStatusFilter.apply(this, arguments);
    }

    return customHelpTicketStatusFilter;
  }();

  _proto.customHelpTicketTypeFilter = function customHelpTicketTypeFilter(value, item, context) {
    var foo = value.toUpperCase();

    for (var i = 0; i < context.helpTickets.helpTicketTypesArray.length; i++) {
      for (var j = 0; j < context.helpTickets.helpTicketTypesArray[i].subtypes.length; j++) {
        if (context.helpTickets.helpTicketTypesArray[i].subtypes[j].type == item.helpTicketType) {
          return context.helpTickets.helpTicketTypesArray[i].subtypes[j].description.toUpperCase().indexOf(foo) > -1;
        }
      }
    }

    return false;
  };

  _proto.customOwnerFilter = function customOwnerFilter(value, item, context) {
    if (item.owner[0].personId === null) return false;
    return item.owner[0].personId.fullName.toUpperCase().indexOf(value.toUpperCase()) > -1;
  };

  _proto.customNameFilter = function customNameFilter(value, item, context) {
    return item.personId.fullName.toUpperCase().indexOf(value.toUpperCase()) > -1;
  };

  _proto.institutionCustomFilter = function institutionCustomFilter(value, item, context) {
    return item.institutionId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
  };

  _proto.customOwnerSorter = function customOwnerSorter(sortProperty, sortDirection, sortArray, context) {
    context.sortDirection = context.sortDirection === null ? 1 : context.sortDirection === 1 ? -1 : 1;
    return sortArray.sort(function (a, b) {
      if (a.owner[0].personId === null && b.owner[0].personId === null) return 0;
      if (a.owner[0].personId === null && b.owner[0].personId !== null) return context.sortDirection * -1;
      if (a.owner[0].personId !== null && b.owner[0].personId === null) return context.sortDirection;
      var result = a.owner[0].personId.lastName < b.owner[0].personId.lastName ? -1 : a.owner[0].personId.lastName > b.owner[0].personId.lastName ? 1 : 0;
      return result * context.sortDirection;
    });
  };

  _proto.reSort = function reSort() {
    this.dataTable.sortArray({}, {}, true);
  };

  return ViewHelpTickets;
}()) || _class);

/***/ }),

/***/ "modules/tech/support/viewHelpTickets.html":
/*!*******************************************************!*\
  !*** ./src/modules/tech/support/viewHelpTickets.html ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <span id=\"loading\">\r\n        <ul class=\"bokeh\">\r\n            <li></li>\r\n            <li></li>\r\n            <li></li>\r\n        </ul>\r\n    </span>\r\n    <div>\r\n        <compose  view=\"./components/viewHTTable.html\"></compose>\r\n    </div>\r\n\r\n    <div show.bind=\"helpTicketSelected && !showAssignment\" class=\"col-lg-12\">\r\n        <compose view=\"./components/viewHTForm.html\"></compose>\r\n    </div>\r\n\r\n    <div show.bind=\"helpTicketSelected && showAssignment\" class=\"col-lg-12\">\r\n        <compose view=\"./components/viewAssignmentForm.html\"></compose>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ })

}]);
//# sourceMappingURL=app-648a8bb9.c2f6f034a062b3d7f766.bundle.js.map