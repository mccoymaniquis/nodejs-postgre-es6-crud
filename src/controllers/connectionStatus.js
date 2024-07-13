'use strict'

import pkg from 'pg'
import { database } from '../../config.js'
const { Pool } = pkg
const pool = new Pool(database)

export const getStatus = async (req, res) => {
  try {
    const client = await pool.connect()
    client.release() // Release client immediately after connection test

    res.status(200).json({
      result: {
        statusCode: 200,
        status: 'connected',
        message: 'Database is connected',
      },
    })
  } catch (error) {
    res.status(500).json({
      result: {
        statusCode: 500,
        status: 'failed',
        message: 'Database connection error',
        error: error.message,
      },
    })
  }
}
