'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _helmet = _interopRequireDefault(require("helmet"));
var _config = require("../config.js");
var _router = _interopRequireDefault(require("../src/routes/router.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var app = (0, _express["default"])();
app.use((0, _helmet["default"])({
  referrerPolicy: {
    policy: 'strict-origin-when-cross-origin'
  } // Set the Referrer-Policy header
}));
app.use((0, _cors["default"])({
  origin: 'https://master.d167bawz5akv41.amplifyapp.com',
  // Adjust this to allow requests from your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'client-id', 'client-secret']
}));
app.use(_express["default"].json()); // app.use(express.json()) // for parsing application/json

app.use('/api/v1', _router["default"]);
app.listen(_config.app.port, function () {
  try {
    console.log("[API] App started and listening on port ".concat(_config.app.port));
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({
      message: 'Internal Server Error',
      stack: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong!'
    });
  }
});
var _default = exports["default"] = app; // Provide a default export