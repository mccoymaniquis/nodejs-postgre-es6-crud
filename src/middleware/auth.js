'use strict'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import express from 'express'
import { app as appConfig } from '../../config.js'
import { successResponse, errorResponse } from '../_helper/statusResponse.js'
dotenv.config()

export const validateApp = (req, res, next) => {
  try {
    const clientID = req.headers['client-id']
    const clientSecret = req.headers['client-secret']

    const expectedClientID = process.env.APP_CLIENT_ID
    const expectedClientSecret = process.env.APP_CLIENT_SECRET

    if (!clientID || !clientSecret) {
      return errorResponse(res, 401, {
        error: {
          result: 'Unauthorized',
          message: 'Client ID/Client Secret is missing.',
        },
      })
    }
    if (clientID !== expectedClientID) {
      return res.status(401).json({
        result: 'Unauthorized',
        message: 'Invalid Client ID',
      })
    }
    if (clientSecret !== expectedClientSecret) {
      return res.status(401).json({
        result: 'Unauthorized',
        message: 'Invalid Client Secret',
      })
    }
    next()
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : null,
    })
  }
}

export const validateToken = (req, res, next) => {
  try {
    const authorization = req.headers['authorization']

    if (!authorization)
      return res.status(401).json({
        result: 'Unathorized',
        message: 'Invalid Token',
      })
    req.token = authorization
    next()
  } catch (error) {
    // errorResponse(res, error)
  }
}

export const getAuthData = async (req, res, next) => {
  try {
    // const authorization = req.headers['Authorization']
    jwt.verify(req.token, appConfig.clientSecret, async (err, authData) => {
      if (err) {
        return res.status(403).json({
          result: 'forbidden',
          message: err?.message,
        })
      }
      req.authData = authData
      next()
    })
  } catch (error) {
    // errorResponse(res, error)
  }
}
