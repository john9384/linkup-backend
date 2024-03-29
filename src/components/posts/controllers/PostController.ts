import { Request, Response } from 'express'
import { postService } from '../services'
import { IPostController } from '../../../types/post/IPostController'
import { SuccessResponse } from '../../../library/helpers/response'

class PostController implements IPostController {
	public async index(req: Request, res: Response): Promise<any> {
		const responseData = await postService.fetch(req.query)
		return new SuccessResponse('Posts fetched', responseData).send(res)
	}

	public async show(req: Request, res: Response) {
		const postId = req.params.id
		const responseData = await postService.read({ id: postId })

		return new SuccessResponse('Post Feteched', responseData).send(res)
	}

	public async create(req: Request, res: Response) {
		// TODO: uploading media files with post
		const userId = req.userId
		const { content } = req.body
		const files = req.files
		const responseData = await postService.create({
			userId,
			content,
			files,
		})

		return new SuccessResponse('Post Created', responseData).send(res)
	}

	public async update(req: Request, res: Response) {
		const postId = req.params.id
		const formData = req.body

		const responseData = await postService.update({ id: postId }, formData)

		return new SuccessResponse('Post Updated', responseData).send(res)
	}

	public async delete(req: Request, res: Response) {
		// TODO: Ensure the correct user has delete permission
		const postId = req.params.id
		const responseData = await postService.delete({ id: postId })

		return new SuccessResponse('Post Deleted', responseData).send(res)
	}
}

export default new PostController()
