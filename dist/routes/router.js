'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _auth = require("../middleware/auth.js");
var _connectionStatus = require("../controllers/connectionStatus.js");
var _users = _interopRequireDefault(require("./users.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = (0, _express.Router)();
router.get('/status', _auth.validateApp, _connectionStatus.getStatus);
router.use('/users', _auth.validateApp, _users["default"]);
var _default = exports["default"] = router;