'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateUpdateUser = exports.validatePagination = exports.validateLogin = exports.validateCreateUser = void 0;
var _expressValidator = require("express-validator");
var validateCreateUser = exports.validateCreateUser = [(0, _expressValidator.body)('firstName').notEmpty().withMessage('First name is required'), (0, _expressValidator.body)('lastName').notEmpty().withMessage('Last name is required'), (0, _expressValidator.body)('dateOfBirth').notEmpty().withMessage('Date of birth is required').isDate({
  format: 'MM-DD-YYYY'
}).withMessage('Valid date is required'), (0, _expressValidator.body)('age').notEmpty().withMessage('Age is required').isInt({
  min: 0
}).withMessage('Age must be a positive integer'), (0, _expressValidator.body)('username').notEmpty().withMessage('Username is required'), (0, _expressValidator.body)('password').notEmpty().withMessage('Password is required'),
// This function handles validation errors
function (req, res, next) {
  var errors = (0, _expressValidator.validationResult)(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }
  next(); // Proceed to the next middleware or route handler if validation passes
}];
var validateLogin = exports.validateLogin = [(0, _expressValidator.body)('username').notEmpty().withMessage('Username is required'), (0, _expressValidator.body)('password').notEmpty().withMessage('Password is required'), function (req, res, next) {
  var errors = (0, _expressValidator.validationResult)(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }
  next();
}];
var validatePagination = exports.validatePagination = [(0, _expressValidator.query)('page').notEmpty().withMessage('Page value is required').isInt({
  min: 1
}).withMessage('Page must be a positive integer'), (0, _expressValidator.query)('limit').notEmpty().withMessage('Limit value is required').isInt({
  min: 1
}).withMessage('Limit must be a positive integer'), function (req, res, next) {
  var errors = (0, _expressValidator.validationResult)(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }
  next(); // Proceed to the next middleware or route handler
}];
var validateUpdateUser = exports.validateUpdateUser = [(0, _expressValidator.body)('firstName').notEmpty().withMessage('First name is required'), (0, _expressValidator.body)('lastName').notEmpty().withMessage('Last name is required'), (0, _expressValidator.body)('dateOfBirth').notEmpty().withMessage('Date of birth is required').isDate({
  format: 'MM-DD-YYYY'
}).withMessage('Valid date is required'), (0, _expressValidator.body)('age').notEmpty().withMessage('Age is required').isInt({
  min: 0
}).withMessage('Age must be a positive integer'), function (req, res, next) {
  var errors = (0, _expressValidator.validationResult)(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }
  next(); // Proceed to the next middleware or route handler if validation passes
}];