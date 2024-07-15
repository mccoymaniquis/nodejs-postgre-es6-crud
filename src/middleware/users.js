'use strict'
import { body, validationResult, query } from 'express-validator'

export const validateCreateUser = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('dateOfBirth')
    .notEmpty()
    .withMessage('Date of birth is required')
    .isDate({ format: 'MM-DD-YYYY' })
    .withMessage('Valid date is required'),
  body('age')
    .notEmpty()
    .withMessage('Age is required')
    .isInt({ min: 0 })
    .withMessage('Age must be a positive integer'),
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),

  // This function handles validation errors
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next() // Proceed to the next middleware or route handler if validation passes
  },
]

export const validateLogin = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  },
]

export const validatePagination = [
  query('page')
    .notEmpty()
    .withMessage('Page value is required')
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),

  query('limit')
    .notEmpty()
    .withMessage('Limit value is required')
    .isInt({ min: 1 })
    .withMessage('Limit must be a positive integer'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next() // Proceed to the next middleware or route handler
  },
]

export const validateUpdateUser = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('dateOfBirth')
    .notEmpty()
    .withMessage('Date of birth is required')
    .isDate({ format: 'MM-DD-YYYY' })
    .withMessage('Valid date is required'),
  body('age')
    .notEmpty()
    .withMessage('Age is required')
    .isInt({ min: 0 })
    .withMessage('Age must be a positive integer'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next() // Proceed to the next middleware or route handler if validation passes
  },
]
