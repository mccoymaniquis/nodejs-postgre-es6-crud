'use strict'

import { Router } from 'express'
import { validateApp } from '../middleware/auth.js'
import { getStatus } from '../controllers/connectionStatus.js'
import usersRouter from './users.js'

const router = Router()

router.get('/status', validateApp, getStatus)
router.use('/users', validateApp, usersRouter)

export default router
