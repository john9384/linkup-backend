import { Router } from 'express'
import catchErrors from '../../../library/utils/error-boundary'
import isAuthenticated from '../../../library/middlewares/authentication'
import userController from '../controllers/userControllers'

const userRouter = Router()

userRouter.get('/', isAuthenticated, catchErrors(userController.getUsers))
userRouter.get('/:id', isAuthenticated, catchErrors(userController.getUserById))
userRouter.put('/:id', isAuthenticated, catchErrors(userController.updateUser))
// userRouter.delete('/:id' isAuthenticated, catchErrors(userController.deleteUser))

export default userRouter
