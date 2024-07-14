import { Router } from 'express'
import {
  createUser,
  loginUser,
  checkAuthentication,
} from '../controllers/users.js'

import { validateToken } from '../middleware/auth.js'

const router = Router()

//routers
router.post('/register', createUser) //endpoint will be http://localhost:3000/api/v1/users/register
router.post('/login', loginUser)
router.post('/checkAuthentication', validateToken, checkAuthentication)

export default router
