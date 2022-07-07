import { IRequest, IResponse } from '../../../app/types/http'
import { buildResponse } from '../../../library/utils/response-builder'
import { OK } from '../../../library/constants/http-status'
import userService from '../services/userService'
import { IUpdateUser } from '../types/dtos'

class UserController {
	getUsers = async (req: IRequest, res: IResponse) => {
		const users = await userService.fetchUsers()
		// TODO
		// Make room for fetching with query parameters
		// Make room for pagination
		const responseData = users

		return res.status(OK).send(
			buildResponse({
				success: true,
				message: 'User fetched',
				data: responseData,
			}),
		)
	}

	getUserById = async (req: IRequest, res: IResponse) => {
		const userId = req.params.id
		const user = await userService.fetchOneUser({ id: userId })
		const responseData = user

		return res.status(OK).send(
			buildResponse({
				success: true,
				message: 'Ok',
				data: responseData,
			}),
		)
	}

	updateUser = async (req: IRequest<IUpdateUser>, res: IResponse) => {
		const userId = req.params.id
		const formData = req.body
		const updatedUser = await userService.updateUser({ id: userId }, formData)
		const responseData = updatedUser

		return res.status(OK).send(
			buildResponse({
				success: true,
				message: 'Ok',
				data: responseData,
			}),
		)
	}
}

export default new UserController()
