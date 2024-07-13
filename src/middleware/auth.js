'use strict'

import dotenv from 'dotenv'
import express from 'express'
const app = express()
dotenv.config()

// app.use(express.json()) // for parsing application/json

export const validateApp = (req, res, next) => {
  try {
    const clientID = req.headers['client-id']
    const clientSecret = req.headers['client-secret']

    const expectedClientID = process.env.APP_CLIENT_ID
    const expectedClientSecret = process.env.APP_CLIENT_SECRET

    if (!clientID || !clientSecret) {
      return res.status(401).json({
        result: 'Unauthorized',
        message: 'Client ID/Client Secret is missing.',
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
