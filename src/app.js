'use strict'

import express from 'express'
import { app as appConfig } from '../config.js'
import usersRouter from '../src/routes/router.js'

const app = express()

app.use(express.json()) // app.use(express.json()) // for parsing application/json

app.use('/api/v1', usersRouter)

app.listen(appConfig.port, (req, res) => {
  try {
    console.log(`[API] App started and listening on port ${appConfig.port}`)
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : null,
    })
  }
})

// app.get('/', (req, res) => {
//   res.send('HELLLO!')
// })

export default app // Provide a default export
