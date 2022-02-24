"use strict";
(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([["app-d8d712bf"],{

/***/ "modules/user/user":
/*!**********************************!*\
  !*** ./src/modules/user/user.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "User": function() { return /* binding */ User; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-router */ 6433);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../resources/utils/utils */ 8741);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
/* harmony import */ var _resources_data_siteInfo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../resources/data/siteInfo */ 1290);
/* harmony import */ var _resources_data_sessions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../resources/data/sessions */ 2073);
/* harmony import */ var _resources_data_people__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../resources/data/people */ 353);
/* harmony import */ var _resources_data_helpTickets__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../resources/data/helpTickets */ 8142);
/* harmony import */ var _resources_data_clientRequests__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../resources/data/clientRequests */ 5446);
/* harmony import */ var _resources_data_apjClientRequests__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../resources/data/apjClientRequests */ 3444);
/* harmony import */ var _resources_data_events__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../resources/data/events */ 4247);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_11__);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }













var User = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_2__.Utils, _config_appConfig__WEBPACK_IMPORTED_MODULE_3__.AppConfig, _resources_data_siteInfo__WEBPACK_IMPORTED_MODULE_4__.SiteInfo, _resources_data_sessions__WEBPACK_IMPORTED_MODULE_5__.Sessions, _resources_data_helpTickets__WEBPACK_IMPORTED_MODULE_7__.HelpTickets, _resources_data_clientRequests__WEBPACK_IMPORTED_MODULE_8__.ClientRequests, _resources_data_people__WEBPACK_IMPORTED_MODULE_6__.People, _resources_data_apjClientRequests__WEBPACK_IMPORTED_MODULE_9__.APJClientRequests, _resources_data_events__WEBPACK_IMPORTED_MODULE_10__.Events), _dec(_class = /*#__PURE__*/function () {
  function User(router, utils, config, siteinfo, sessions, helpTickets, requests, people, events, apjRequests) {
    this.router = router;
    this.utils = utils;
    this.config = config;
    this.siteinfo = siteinfo;
    this.sessions = sessions;
    this.helpTickets = helpTickets;
    this.requests = requests;
    this.people = people;
    this.apjRequests = apjRequests;
    this.events = events;
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
  }

  var _proto = User.prototype;

  _proto.attached = function attached() {
    this.alertIndex = this.utils.arrayContainsValue(this.siteinfo.siteArray, "itemType", "ALRT");

    if (!sessionStorage.getItem('alert')) {
      if (this.alertIndex > -1) {
        this.openAlert(this.siteinfo.siteArray[this.alertIndex]);
      }
    }

    $("#notice").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  };

  _proto.canActivate = function canActivate() {
    if (!this.userObj) {
      this.userObj = this.config.user;

      if (!this.userObj) {
        this.utils.showNotification("Couldn't find your user information.  Try logging in again or call the UCC.");
        this.router.navigate("home");
      }
    }
  };

  _proto.activate = /*#__PURE__*/function () {
    var _activate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.getData();

            case 2:
              this.config.getConfig(true); // this.getEvents();
              // this.helpTicketArray = [
              //     {
              //         value: this.helpTickets.newHelpTickets || 0,
              //         color:"#F7464A",
              //         highlight: "#FF5A5E",
              //         label: "New"
              //     },
              //     {
              //         value: this.helpTickets.underReviewHelpTickets || 0,
              //         color: "#46BFBD",
              //         highlight: "#5AD3D1",
              //         label: "Under Review"
              //     },
              //     {
              //         value: this.helpTickets.customerActionHelpTickets || 0,
              //         color: "#FDB45C",
              //         highlight: "#FFC870",
              //         label: "Customer Action"
              //     }
              // ]
              // this.clientRequestsArray = [
              //     {
              //         value: this.requests.unassignedRequests || 0,
              //         color:"#F7464A",
              //         highlight: "#FF5A5E",
              //         label: "Unassigned"
              //     },
              //     {
              //         value: this.requests.updatedRequests || 0,
              //         color: "#46BFBD",
              //         highlight: "#5AD3D1",
              //         label: "Updated"
              //     },
              //     {
              //         value: this.requests.customerActionRequests || 0,
              //         color: "#FDB45C",
              //         highlight: "#FFC870",
              //         label: "Customer Action"
              //     }
              // ]

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function activate() {
      return _activate.apply(this, arguments);
    }

    return activate;
  }();

  _proto.getData = /*#__PURE__*/function () {
    var _getData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var currentDate, options, responses, _responses, weather, weatherObj, _weather, uccweather;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // let apjUnassignedRequests = await this.apjRequests.getClientRequestsDetailsArray('?filter=requestStatus|eq|1',true);
              currentDate = moment__WEBPACK_IMPORTED_MODULE_11___default()(new Date()).format("MM-DD-YYYY");
              options = '?filter=expiredDate|gt|' + currentDate + '&order=sortOrder';

              if (!(this.userObj.userRole >= this.config.UCC_ROLE)) {
                _context2.next = 9;
                break;
              }

              _context2.next = 5;
              return Promise.all([// this.helpTickets.getCurrentCount(),
              // this.requests.getCurrentCount(),
              // this.requests.getClientRequestsDetailsArray('?filter=institutionId|eq|' + this.userObj.institutionId._id, true),
              this.sessions.getSessionsArray('?order=startDate'), this.siteinfo.getInfoArray(true, options), this.config.getConfig()]);

            case 5:
              responses = _context2.sent;
              //   this.showRequests = this.requests.updatedRequests + this.requests.unassignedRequests;
              //   this.showHelpTickets = this.helpTickets.newHelpTickets;
              this.showCarousel = this.siteinfo.showCarousel();
              _context2.next = 13;
              break;

            case 9:
              _context2.next = 11;
              return Promise.all([//   this.helpTickets.getCurrentCount('?filter=personId|eq|'+ this.userObj._id),
              //   this.requests.getCurrentCount('?filter=audit[0].personId|eq|' + this.userObj._id),
              this.sessions.getSessionsArray('?order=startDate'), this.siteinfo.getInfoArray(true, options), this.config.getConfig()]);

            case 11:
              _responses = _context2.sent;
              // this.showRequests = this.requests.customerActionRequests;
              // this.showHelpTickets = this.helpTickets.customerActionHelpTickets;
              this.showCarousel = this.siteinfo.showCarousel();

            case 13:
              // this.requestsCount = new Array();
              // this.countLabels = new Array();
              // var requestCountArray = await this.requests.getSessionCount(this.sessions.sessionsArray, 4, countOptions);
              // if(requestCountArray){
              //     requestCountArray.forEach((item) => {
              //         this.requestsCount.push(item.count);
              //         this.countLabels.push(item.session);
              //     })
              // }
              this.temp = undefined;

              if (sessionStorage.getItem('weather')) {
                _context2.next = 22;
                break;
              }

              if (!this.userObj.postalCode) {
                _context2.next = 20;
                break;
              }

              _context2.next = 18;
              return this.siteinfo.getWeather(this.userObj.institutionId.postalCode);

            case 18:
              weather = _context2.sent;

              if (weather && weather.main) {
                this.temp = parseFloat(weather.main.temp) - 273.15;

                if (this.config.TEMP_SCALE == 'C') {
                  this.temp = this.temp.toFixed(1) + "\xB0 C";
                } else {
                  this.temp = (parseFloat(this.temp) * 1.8 + 32).toFixed(1) + "\xB0 F";
                }

                this.weatherIcon = this.config.IMG_DOWNLOAD_URL + "icons/" + weather.weather[0].icon + ".png";
                weatherObj = {
                  temp: this.temp,
                  url: this.weatherIcon
                };
                sessionStorage.setItem('weather', JSON.stringify(weatherObj));
              }

            case 20:
              _context2.next = 25;
              break;

            case 22:
              _weather = JSON.parse(sessionStorage.getItem('weather'));
              this.temp = _weather.temp;
              this.weatherIcon = _weather.url;

            case 25:
              if (sessionStorage.getItem('uccweather')) {
                uccweather = JSON.parse(sessionStorage.getItem('uccweather'));
                this.ucctemp = parseFloat(uccweather.temp) - 273.15;

                if (this.config.TEMP_SCALE == 'C') {
                  this.ucctemp = this.ucctemp.toFixed(1) + "\xB0 C";
                } else {
                  this.ucctemp = (parseFloat(this.ucctemp) * 1.8 + 32).toFixed(1) + "\xB0 F";
                }

                this.uccweatherIcon = this.config.IMG_DOWNLOAD_URL + 'icons/' + uccweather.icon + ".png";
              }

            case 26:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getData() {
      return _getData.apply(this, arguments);
    }

    return getData;
  }();

  _proto.getEvents = /*#__PURE__*/function () {
    var _getEvents = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var _this = this;

      var today;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              this.eventArray = new Array();
              _context3.next = 3;
              return this.events.getEventsArray('', true);

            case 3:
              today = moment__WEBPACK_IMPORTED_MODULE_11___default()(new Date()).format('YYYY-MM-DD');
              this.events.eventArray.forEach(function (item) {
                if (item.personId === _this.userObj._id || item.scope === 'u') {
                  var start = moment__WEBPACK_IMPORTED_MODULE_11___default()(item.start).format('YYYY-MM-DD');
                  var end = moment__WEBPACK_IMPORTED_MODULE_11___default()(item.end).format('YYYY-MM-DD');

                  if (moment__WEBPACK_IMPORTED_MODULE_11___default()(today).isBetween(start, end)) {
                    _this.eventArray.push(item);
                  } else if (moment__WEBPACK_IMPORTED_MODULE_11___default()(today).isSame(start)) {
                    _this.eventArray.push(item);
                  }
                }
              });

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function getEvents() {
      return _getEvents.apply(this, arguments);
    }

    return getEvents;
  }();

  _proto.moreInfoExists = function moreInfoExists(item) {
    return item.url && item.url.length > 0;
  };

  return User;
}()) || _class);

/***/ }),

/***/ "modules/user/user.html":
/*!************************************!*\
  !*** ./src/modules/user/user.html ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <compose view=\"./components/banner.html\"></compose>\r\n\r\n    <div class=\"fluid-container\">\r\n\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-3 col-lg-offset-1\">\r\n                <div class=\"bigMarginTop leftMargin\">\r\n                    <compose view=\"./components/uccInformation.html\"></compose>\r\n                </div>\r\n            </div>\r\n           \r\n            <div class=\"col-lg-3 col-md-11 col-sm-11 bigLeftMargin\">\r\n                <h2 show.bind=\"siteinfo.siteArray | infoFilter:'NEWS':true\" class=\"underline topMargin\">UCC and UA News</h2>\r\n                <img style=\"height: 150px; width: 100%; display: block;\" src=\"${config.IMG_DOWNLOAD_URL}uaucc.png\" alt=\"Card image\">\r\n                <div repeat.for=\"item of siteinfo.siteArray | infoFilter:'NEWS'\">\r\n                    <compose view=\"./components/newsItem.html\"></compose>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"col-lg-3 col-md-11 col-sm-11  bigLeftMargin\">\r\n                <h2 class=\"underline bottomMargin\">Useful Links</h2>\r\n                <img style=\"height: 150px; width: 100%; display: block;\" src=\"${config.IMG_DOWNLOAD_URL}ua2.jpg\" alt=\"Card image\">\r\n                <div repeat.for=\"item of siteinfo.siteArray | infoFilter:'OLNK'\">\r\n                    <compose view=\"./components/homePageLinks.html\"></compose>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ })

}]);
//# sourceMappingURL=app-d8d712bf.c2f6f034a062b3d7f766.bundle.js.map