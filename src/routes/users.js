'use strict'
import { Router } from 'express'
import {
  createUser,
  loginUser,
  checkAuthentication,
  GetAllUsersPagination,
  updateUser,
  GetUserById,
} from '../controllers/users.js'

import { validateToken, getAuthData } from '../middleware/auth.js'
import {
  validateCreateUser,
  validateLogin,
  validatePagination,
  validateUpdateUser,
} from '../middleware/users.js'

const router = Router()

//routers
router.post('/register', validateCreateUser, createUser) //endpoint will be http://localhost:3000/api/v1/users/register
router.post('/login', validateLogin, loginUser)
router.post('/check-authentication', validateToken, checkAuthentication)
router.get(
  '/list',
  validatePagination,
  validateToken,
  getAuthData,
  GetAllUsersPagination
)
router.get('/list/user', validateToken, getAuthData, GetUserById)
router.put(
  '/update-user',
  validateUpdateUser,
  validateToken,
  getAuthData,
  updateUser
)

export default router
