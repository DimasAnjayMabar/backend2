import express from 'express'
import loginController from '../controller/login_page_controller.js'
import {authMiddleware} from '../middleware/auth_middleware.js'
import userController from '../controller/user_controller.js'

const userRouter = new express.Router()
userRouter.use(authMiddleware)
userRouter.get('/api/users/current', loginController.get)
userRouter.post('/api/users/logout', loginController.logout)
userRouter.post('/api/users/edit-name', userController.editName)
userRouter.post('/api/users/edit-phone', userController.editPhone)
userRouter.post('/api/users/edit-email', userController.editEmail)

export{
    userRouter
}