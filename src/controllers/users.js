import jwt from 'jsonwebtoken'
import pkg from 'pg'
import { database, app as appConfig } from '../../config.js'
import bcrypt from 'bcrypt'
import { postUser, getUser } from '../queries/users.js'

const { Pool } = pkg
const pool = new Pool(database)

export const createUser = async (req, res) => {
  try {
    // Check if req.body exists and contains all required fields
    if (
      !req.body ||
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.dateOfBirth ||
      !req.body.age ||
      !req.body.password
    ) {
      return res.status(400).json({
        statusCode: 400,
        error: 'Missing required fields in request body.',
      })
    }

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
          return res.status(500).json({
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : null,
          })
        }
        res.status(200).json({
          statusCode: 200,
          result: 'Success',
          message: 'User created successfully!',
        })
      }
    )
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : null,
    })
  }
}

export const loginUser = async (req, res) => {
  try {
    if (!req.body || !req.body.username || !req.body.password) {
      return res.status(400).json({
        statusCode: 400,
        error: 'Missing required fields in request body.',
      })
    }
    const { username, password } = req.body

    pool.query(getUser, [username], async (error, result) => {
      const isUserExist = result?.rows.length > 0
      if (error) {
        return res.status(500).json({
          error: error.message,
          stack: process.env.NODE_ENV === 'development' ? error.stack : null,
        })
      }
      if (!isUserExist) {
        return res.status(400).json({
          statusCode: 400,
          result: 'failed',
          message: 'User does not exist',
        })
      }
      const { firstName, middleName, lastName, age, dateOfBirth } =
        result?.rows?.[0]
      const hashedPassword = result?.rows?.[0].password
      const isPasswordMatch = await bcrypt.compare(password, hashedPassword)
      if (!isPasswordMatch) {
        return res.status(400).json({
          statusCode: 400,
          result: 'failed',
          message: 'Invalid username or password',
        })
      }
      const tokenSignIn = jwt.sign(
        {
          firstName,
          middleName,
          lastName,
          age,
          dateOfBirth,
          username,
        },
        appConfig.clientSecret,
        { expiresIn: '10s' }
      )
      return res.status(200).json({
        result: 'Login successfully',
        token: tokenSignIn,
      })
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : null,
    })
  }
}

export const checkAuthentication = async (req, res) => {
  try {
    // const authorization = req.headers['Authorization']
    jwt.verify(req.token, appConfig.clientSecret, async (err, authData) => {
      if (err) {
        return res.status(403).json({
          result: 'forbidden',
          message: err?.message,
        })
      }
      return res.status(200).json({
        result: 'Authentication Successfully Verified',
        authData,
      })
    })
  } catch (error) {}
}
