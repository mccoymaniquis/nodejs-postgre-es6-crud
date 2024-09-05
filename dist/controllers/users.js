"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.loginUser = exports.createUser = exports.checkAuthentication = exports.GetUserById = exports.GetAllUsersPagination = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _pg = _interopRequireDefault(require("pg"));
var _config = require("../../config.js");
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _users = require("../queries/users.js");
var _statusResponse = require("../_helper/statusResponse.js");
var _moment = _interopRequireDefault(require("moment"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var Pool = _pg["default"].Pool;
var pool = new Pool(_config.database);
var createUser = exports.createUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, firstName, middleName, lastName, dateOfBirth, age, username, password, hashedPassword;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, firstName = _req$body.firstName, middleName = _req$body.middleName, lastName = _req$body.lastName, dateOfBirth = _req$body.dateOfBirth, age = _req$body.age, username = _req$body.username, password = _req$body.password; // Hash the password
          _context.next = 4;
          return _bcrypt["default"].hash(password, 10);
        case 4:
          hashedPassword = _context.sent;
          // Execute the query using pg.Pool
          pool.query(_users.postUser, [firstName, middleName, lastName, dateOfBirth, age, username, hashedPassword], function (error, results) {
            if (error) {
              return (0, _statusResponse.errorResponse)(400, res, error);
            }
            (0, _statusResponse.successResponse)(res, 200, {
              result: {
                message: 'User Created Successfully'
              }
            });
          });
          _context.next = 11;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          (0, _statusResponse.errorResponse)(res, 500, {
            error: {
              message: _context.t0.message,
              stack: process.env.NODE_ENV === 'development' ? _context.t0.stack : null
            }
          });
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function createUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var loginUser = exports.loginUser = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$body2, username, password;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          try {
            _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password;
            pool.query(_users.getUser, [username], /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(error, result) {
                var _result$rows, _result$rows2;
                var isUserExist, _result$rows$, id, firstName, middleName, lastName, age, dateOfBirth, hashedPassword, isPasswordMatch, tokenSignIn;
                return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                  while (1) switch (_context2.prev = _context2.next) {
                    case 0:
                      isUserExist = (result === null || result === void 0 ? void 0 : result.rows.length) > 0;
                      if (!error) {
                        _context2.next = 3;
                        break;
                      }
                      return _context2.abrupt("return", res.status(500).json({
                        error: error
                      }));
                    case 3:
                      if (isUserExist) {
                        _context2.next = 5;
                        break;
                      }
                      return _context2.abrupt("return", res.status(400).json({
                        message: 'Username is not exist'
                      }));
                    case 5:
                      _result$rows$ = result === null || result === void 0 || (_result$rows = result.rows) === null || _result$rows === void 0 ? void 0 : _result$rows[0], id = _result$rows$.id, firstName = _result$rows$.firstName, middleName = _result$rows$.middleName, lastName = _result$rows$.lastName, age = _result$rows$.age, dateOfBirth = _result$rows$.dateOfBirth;
                      hashedPassword = result === null || result === void 0 || (_result$rows2 = result.rows) === null || _result$rows2 === void 0 ? void 0 : _result$rows2[0].password;
                      _context2.next = 9;
                      return _bcrypt["default"].compare(password, hashedPassword);
                    case 9:
                      isPasswordMatch = _context2.sent;
                      if (isPasswordMatch) {
                        _context2.next = 12;
                        break;
                      }
                      return _context2.abrupt("return", res.status(400).json({
                        message: 'Invalid username or password'
                      }));
                    case 12:
                      tokenSignIn = _jsonwebtoken["default"].sign({
                        id: id,
                        firstName: firstName,
                        middleName: middleName,
                        lastName: lastName,
                        age: age,
                        dateOfBirth: dateOfBirth,
                        username: username
                      }, _config.app.clientSecret, {
                        expiresIn: '1h'
                      }); // successResponse(res, 200, {
                      //   result: { message: 'Login Successfully', token: tokenSignIn },
                      // })
                      return _context2.abrupt("return", res.status(200).json({
                        message: 'Login Successfully',
                        token: tokenSignIn
                      }));
                    case 14:
                    case "end":
                      return _context2.stop();
                  }
                }, _callee2);
              }));
              return function (_x5, _x6) {
                return _ref3.apply(this, arguments);
              };
            }());
          } catch (error) {
            res.status(500).json({
              error: {
                message: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : null
              }
            });
          }
        case 1:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function loginUser(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var checkAuthentication = exports.checkAuthentication = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          try {
            // const authorization = req.headers['Authorization']
            _jsonwebtoken["default"].verify(req.token, _config.app.clientSecret, /*#__PURE__*/function () {
              var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(err, authData) {
                return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                  while (1) switch (_context4.prev = _context4.next) {
                    case 0:
                      if (!err) {
                        _context4.next = 2;
                        break;
                      }
                      return _context4.abrupt("return", (0, _statusResponse.errorResponse)(res, 403, {
                        error: err
                      }));
                    case 2:
                      return _context4.abrupt("return", (0, _statusResponse.successResponse)(res, 200, {
                        result: {
                          message: 'Authentication Successfully Verified',
                          authData: authData
                        }
                      }));
                    case 3:
                    case "end":
                      return _context4.stop();
                  }
                }, _callee4);
              }));
              return function (_x9, _x10) {
                return _ref5.apply(this, arguments);
              };
            }());
          } catch (error) {
            (0, _statusResponse.errorResponse)(res, 500, {
              error: {
                message: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : null
              }
            });
          }
        case 1:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function checkAuthentication(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var GetAllUsersPagination = exports.GetAllUsersPagination = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _req$query, page, limit, offset, _totalCount, totalCount;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          // errorResponse(400, res, { message: 'error po' })
          _req$query = req === null || req === void 0 ? void 0 : req.query, page = _req$query.page, limit = _req$query.limit;
          offset = (page - 1) * limit;
          _context6.prev = 2;
          _context6.next = 5;
          return pool.query('SELECT COUNT(*) From users', []);
        case 5:
          totalCount = _context6.sent;
          totalCount = parseInt((_totalCount = totalCount) === null || _totalCount === void 0 ? void 0 : _totalCount.rows[0].count);
          pool.query(_users.GetAllUsersPagination, [limit, offset], function (error, result) {
            var formattedData = result === null || result === void 0 ? void 0 : result.rows.map(function (user) {
              return _objectSpread(_objectSpread({}, user), {}, {
                // Example: Format the dateOfBirth field using moment
                dateOfBirth: user.dateOfBirth ? (0, _moment["default"])(user.dateOfBirth).format('MM-DD-YYYY') : null
                // You can format other fields here as needed
              });
            });
            if (error) {
              return (0, _statusResponse.errorResponse)(400, res, error);
            }
            (0, _statusResponse.successResponse)(res, 200, {
              result: {
                data: formattedData,
                totalCount: totalCount,
                totalPage: Math.ceil(totalCount / limit),
                limit: parseInt(limit)
              }
            });
          });
          _context6.next = 13;
          break;
        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](2);
          (0, _statusResponse.errorResponse)(res, 500, {
            error: {
              message: _context6.t0.message,
              stack: process.env.NODE_ENV === 'development' ? _context6.t0.stack : null
            }
          });
        case 13:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[2, 10]]);
  }));
  return function GetAllUsersPagination(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var GetUserById = exports.GetUserById = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var id;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          id = req.query.id;
          try {
            pool.query(_users.GetUserById, [id], function (error, result) {
              var _result$rows3;
              var _result$rows$2 = result === null || result === void 0 || (_result$rows3 = result.rows) === null || _result$rows3 === void 0 ? void 0 : _result$rows3[0],
                id = _result$rows$2.id,
                firstName = _result$rows$2.firstName,
                middleName = _result$rows$2.middleName,
                lastName = _result$rows$2.lastName,
                age = _result$rows$2.age,
                dateOfBirth = _result$rows$2.dateOfBirth;
              // const dateOfBirth = new Date() // Replace with your actual date
              var formattedDate = (0, _moment["default"])(dateOfBirth).format('MM-DD-YYYY');
              if (error) {
                return (0, _statusResponse.errorResponse)(400, res, error);
              }
              (0, _statusResponse.successResponse)(res, 200, {
                result: {
                  id: id,
                  firstName: firstName,
                  middleName: middleName,
                  lastName: lastName,
                  age: age,
                  dateOfBirth: formattedDate
                  // dateOfBirth,
                }
              });
            });
          } catch (error) {
            (0, _statusResponse.errorResponse)(res, 500, {
              error: {
                message: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : null
              }
            });
          }
        case 2:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function GetUserById(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var updateUser = exports.updateUser = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var _req$body3, firstName, middleName, lastName, age, dateOfBirth, id;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          try {
            _req$body3 = req.body, firstName = _req$body3.firstName, middleName = _req$body3.middleName, lastName = _req$body3.lastName, age = _req$body3.age, dateOfBirth = _req$body3.dateOfBirth;
            id = req.query.id;
            pool.query('UPDATE users SET firstname=$2,middlename=$3,lastname=$4,age=$5,dateofbirth=$6 where id = $1', [id, firstName, middleName, lastName, age, dateOfBirth], function (error, result) {
              if (error) {
                return (0, _statusResponse.errorResponse)(500, res, error);
              }
              (0, _statusResponse.successResponse)(res, 200, {
                result: result.rowCount === 0 ? 'No Data Updated' : 'Updated'
              });
            });
          } catch (error) {
            (0, _statusResponse.errorResponse)(res, 500, {
              error: {
                message: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : null
              }
            });
          }
        case 1:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function updateUser(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();