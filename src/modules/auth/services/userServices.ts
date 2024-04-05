import { injectable } from 'inversify'
import { PrismaClient, User } from '@prisma/client'
import { CreateUserInput } from '../interfaces/userInterface'
import ApiError from '../../../errors/ApiError'
import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import config from '../../../config'

@injectable()
export class UserServices {
  constructor(private prisma: PrismaClient) {}
  createUser = async (data: CreateUserInput): Promise<User> => {
    await this.checkUserExistence(data.email)
    const hash = await this.hashPassword(data.password)
    return await this.prisma.user.create({
      data: {
        ...data,
        password: hash,
      },
    })
  }

  checkUserExistence = async (email: string) => {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        email,
      },
    })
    if (existingUser) {
      const error = new ApiError(httpStatus.FORBIDDEN, `User with ${email} already exists`)
      throw error
    }
  }

  hashPassword = async (password: string) => {
    const hash = await bcrypt.hash(password, Number(config.bcrypt.salt))
    return hash
  }
}
