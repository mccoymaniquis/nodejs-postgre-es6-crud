'use strict'

export const successResponse = (res, statusCode = 200, message) => {
  return res.status(statusCode).json({
    result: message.result,
    // stack: appConfig.environment === 'development' ? err.stack : null,
  })
}

export const errorResponse = (res, statusCode = 500, err) => {
  return res.status(statusCode).json({
    errors: err.error,
    // stack: appConfig.environment === 'development' ? err.stack : null,
  })
}
