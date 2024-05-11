import { injectable } from 'inversify'
import { User } from '@prisma/client'
import { CreateUserInput } from '../interfaces/userInterface'
import ApiError from '../../../errors/ApiError'
import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import config from '../../../config'
import { PrismaService } from '../../../config/prisma'

@injectable()
export class UserServices {
  constructor(private prisma: PrismaService) {}
  async createUser(data: CreateUserInput): Promise<User> {
    await this.checkUserExistence(data.email)
    return await this.prisma.client.user.create({
      data: {
        ...data,
      },
    })
  }

  checkUserExistence = async (email: string) => {
    const existingUser = await this.prisma.client.user.findFirst({
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
