'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { app as appConfig } from '../config.js'
import usersRouter from '../src/routes/router.js'

const app = express()

app.use(
  helmet({
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' }, // Set the Referrer-Policy header
  })
)
app.use(
  cors({
    origin: 'http://localhost:3000', // Adjust this to allow requests from your frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'client-id',
      'client-secret',
    ],
  })
)
app.use(express.json()) // app.use(express.json()) // for parsing application/json

app.use('/api/v1', usersRouter)

app.listen(appConfig.port, () => {
  try {
    console.log(`[API] App started and listening on port ${appConfig.port}`)
  } catch (error) {
    console.log(error.stack)
    res.status(500).json({
      message: 'Internal Server Error',
      stack:
        process.env.NODE_ENV === 'development'
          ? error.message
          : 'Something went wrong!',
    })
  }
})

export default app // Provide a default export
