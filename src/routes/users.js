import { Router } from 'express'
import { createUser } from '../controllers/users.js'

const router = Router()

//routers
router.post('/register', createUser) //endpoint will be http://localhost:3000/api/v1/users/register

export default router
