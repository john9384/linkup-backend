import { Request, Response } from 'express'
import { OK } from '../../library/constants/http-status'
import { buildResponse } from '../../library/utils/response-builder'
import otpService from './otpService'

class OtpController {
	requestOtp = async (req: Request, res: Response) => {
		const formData = req.body
		const responseData = await otpService.request(formData)

		return res.status(OK).send(
			buildResponse({
				success: true,
				message: 'Otp requested',
				data: responseData,
			}),
		)
	}

	validateOtp = async (req: Request, res: Response) => {
		const formData = req.body
		const otpValid = await otpService.validate(formData.token)
		const responseData = {
			otpValid,
		}
		return res.status(OK).send(
			buildResponse({
				success: true,
				message: 'Success',
				data: responseData,
			}),
		)
	}
}

export default new OtpController()
