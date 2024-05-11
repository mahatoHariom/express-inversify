import { Request, Response } from 'express'
import { controller, httpPost } from 'inversify-express-utils'
import { UserServices } from '../services/userServices'
import sendResponse from '../../../shared/sendReponse'
import { User } from '@prisma/client'
import httpStatus from 'http-status'
import { ZodValidate } from '../../../middleware/ZodValidate'
import { createUserSchema } from '../../../schemas/userSchema'
@controller('/users')
export class UserController {
  constructor(private readonly userServices: UserServices) {}
  @httpPost('/', ZodValidate(createUserSchema))
  async createUser(req: Request, res: Response) {
    const { ...userinfo } = req.body
    const user = await this.userServices.createUser(userinfo)
    sendResponse<User>(res, {
      statusCode: httpStatus.OK,
      message: ' Registration sdfs',
      data: user,
    })
  }
}
