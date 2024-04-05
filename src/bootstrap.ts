import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { InversifyExpressServer } from 'inversify-express-utils'
import container from './config/inversify.config'
import ErrorHandler from './middleware/errorHandler'
import { logger, morganMiddleware } from './config/logger'

export default class App {
  async setup() {
    const server = new InversifyExpressServer(container)
    server
      .setConfig((app) => {
        app.use(express.json())
        app.use(morganMiddleware)
        app.use(
          bodyParser.urlencoded({
            extended: true,
          }),
        )
        app.use(cors())
      })
      .setErrorConfig((app) => {
        app.use(ErrorHandler)
      })
      .build()
      .listen(process.env.PORT, () => {
        logger.info(`🚀🚀🚀server is running on http://localhost:${process.env.PORT}`)
      })
  }
}
