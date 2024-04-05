import { Container } from "inversify";
import { PrismaClient } from "@prisma/client";
import { UserServices } from "../modules/auth/services/userServices";
import { UserController } from "../modules/auth/controllers/auth.controllers";

const container = new Container({
  defaultScope: "Singleton",
});

container.bind<UserServices>(UserServices).toSelf().inSingletonScope();
container.bind<UserController>(UserController).toSelf().inSingletonScope();

container
  .bind<PrismaClient>(PrismaClient)
  .toDynamicValue(() => {
    return new PrismaClient();
  })
  .inSingletonScope();

export default container;
