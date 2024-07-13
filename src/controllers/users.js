import jwt from 'jsonwebtoken'
import pkg from 'pg'
import { database } from '../../config.js'
import bcrypt from 'bcrypt'
import { postStudent } from '../queries/users.js'

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
      postStudent,
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
          result: 'Success po',
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
