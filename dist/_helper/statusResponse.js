'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.successResponse = exports.errorResponse = void 0;
var successResponse = exports.successResponse = function successResponse(res) {
  var statusCode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
  var message = arguments.length > 2 ? arguments[2] : undefined;
  return res.status(statusCode).json({
    result: message.result
    // stack: appConfig.environment === 'development' ? err.stack : null,
  });
};
var errorResponse = exports.errorResponse = function errorResponse(res) {
  var statusCode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  var err = arguments.length > 2 ? arguments[2] : undefined;
  return res.status(statusCode).json({
    errors: err.error
    // stack: appConfig.environment === 'development' ? err.stack : null,
  });
};