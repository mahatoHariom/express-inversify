import { Container } from 'inversify'
import { UserServices } from '../modules/auth/services/userServices'
import { UserController } from '../modules/auth/controllers/auth.controllers'
import { PrismaService } from './prisma'

const container = new Container({
  defaultScope: 'Singleton',
})

container.bind<UserServices>(UserServices).toSelf().inSingletonScope()
container.bind<UserController>(UserController).toSelf().inSingletonScope()
container.bind<PrismaService>(PrismaService).toSelf().inSingletonScope()

export default container
