'use strict'

import pkg from 'pg'
import { database } from '../../config.js'
import { successResponse, errorResponse } from '../_helper/statusResponse.js'
const { Pool } = pkg
const pool = new Pool(database)

export const getStatus = async (req, res) => {
  try {
    const client = await pool.connect()
    client.release() // Release client immediately after connection test

    successResponse(res, 200, {
      result: {
        statusCode: 200,
        status: 'connected',
        message: 'Database is connected',
      },
    })
  } catch (error) {
    errorResponse(res, 500, {
      error: {
        statusCode: 200,
        status: 'connected',
        message: 'Database is connected',
      },
    })
  }
}
