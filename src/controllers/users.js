import jwt from 'jsonwebtoken'
import pkg from 'pg'
import { database, app as appConfig } from '../../config.js'
import bcrypt from 'bcrypt'
import {
  postUser,
  getUser,
  GetAllUsersPagination as GetAllUsers,
} from '../queries/users.js'
import { errorResponse, successResponse } from '../_helper/statusResponse.js'

const { Pool } = pkg
const pool = new Pool(database)

export const createUser = async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      dateOfBirth,
      age,
      username,
      password,
    } = req.body

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)
    // Execute the query using pg.Pool
    pool.query(
      postUser,
      [
        firstName,
        middleName,
        lastName,
        dateOfBirth,
        age,
        username,
        hashedPassword,
      ],
      (error, results) => {
        if (error) {
          return errorResponse(400, res, error)
        }
        successResponse(res, 200, {
          result: { message: 'User Created Successfully' },
        })
      }
    )
  } catch (error) {
    errorResponse(res, 500, {
      error: {
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : null,
      },
    })
  }
}

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body

    pool.query(getUser, [username], async (error, result) => {
      const isUserExist = result?.rows.length > 0
      if (error) {
        return errorResponse(500, res, error)
      }
      if (!isUserExist) {
        return errorResponse(400, res, error)
      }
      const { id, firstName, middleName, lastName, age, dateOfBirth } =
        result?.rows?.[0]
      const hashedPassword = result?.rows?.[0].password
      const isPasswordMatch = await bcrypt.compare(password, hashedPassword)
      if (!isPasswordMatch) {
        return errorResponse(400, res, {
          message: 'Invalid username or password',
        })
      }
      const tokenSignIn = jwt.sign(
        {
          id,
          firstName,
          middleName,
          lastName,
          age,
          dateOfBirth,
          username,
        },
        appConfig.clientSecret,
        { expiresIn: '1h' }
      )
      successResponse(res, 200, {
        result: { message: 'Login Successfully', token: tokenSignIn },
      })
    })
  } catch (error) {
    errorResponse(res, 500, {
      error: {
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : null,
      },
    })
  }
}

export const checkAuthentication = async (req, res) => {
  try {
    // const authorization = req.headers['Authorization']
    jwt.verify(req.token, appConfig.clientSecret, async (err, authData) => {
      if (err) {
        return errorResponse(res, 403, {
          error: err,
        })
      }
      return successResponse(res, 200, {
        result: {
          message: 'Authentication Successfully Verified',
          authData,
        },
      })
    })
  } catch (error) {
    errorResponse(res, 500, {
      error: {
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : null,
      },
    })
  }
}

export const GetAllUsersPagination = async (req, res) => {
  // errorResponse(400, res, { message: 'error po' })
  const { page, limit } = req?.query
  const offset = (page - 1) * limit
  try {
    let totalCount = await pool.query('SELECT COUNT(*) From users', [])
    totalCount = parseInt(totalCount?.rows[0].count)
    pool.query(GetAllUsers, [limit, offset], (error, result) => {
      if (error) {
        return errorResponse(400, res, error)
      }
      successResponse(res, 200, {
        result: {
          message: 'successfully fetch data',
          data: result?.rows,
          totalCount: totalCount,
          totalPage: Math.ceil(totalCount / limit),
          currentPage: parseInt(page),
          limit: parseInt(limit),
        },
      })
    })
  } catch (error) {
    errorResponse(res, 500, {
      error: {
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : null,
      },
    })
  }
}

export const updateUser = async (req, res) => {
  try {
    const { firstName, middleName, lastName, age, dateOfBirth } = req.body
    const { id } = req.authData

    pool.query(
      'UPDATE users SET firstname=$2,middlename=$3,lastname=$4,age=$5,dateofbirth=$6 where id = $1',
      [id, firstName, middleName, lastName, age, dateOfBirth],
      (error, result) => {
        if (error) {
          return errorResponse(500, res, error)
        }
        successResponse(res, 200, {
          result: 'Successfully Updated data',
        })
      }
    )
  } catch (error) {
    errorResponse(res, 500, {
      error: {
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : null,
      },
    })
  }
}
