import { Request, Response } from 'express'
import { BaseHttpController, controller, httpPost, request, response } from 'inversify-express-utils'
import { UserServices } from '../services/userServices'
import httpStatus from 'http-status'
import { ZodValidate } from '../../../middleware/ZodValidate'
import { createUserSchema } from '../../../schemas/userSchema'
import { CreateUserInput } from '../interfaces/userInterface'
@controller('/users')
export class UserController extends BaseHttpController {
  constructor(private readonly userServices: UserServices) {
    super()
  }

  @httpPost('/', ZodValidate(createUserSchema))
  async createUser(@request() req: Request, @response() _res: Response) {
    const userinfo: CreateUserInput = req.body
    const user = await this.userServices.createUser(userinfo)
    console.log(_res)
    return this.json(user, httpStatus.OK)
  }
}
