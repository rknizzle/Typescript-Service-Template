import * as bodyParser from 'body-parser'
import express from 'express'
import Controller from './interfaces/controller.interface'
import errorMiddleware from './middleware/error.middleware'

class App {
  private app: express.Application
  private port: number

  constructor(controllers: Controller[]) {
    this.app = express()
    // TODO: verify the PORT is a number
    this.port = parseInt(process.env.PORT)

    this.initializeMiddlewares()
    this.initializeControllers(controllers)
    this.initializeErrorHandling()
  }

  // starts the server
  public listen() {
    const server = this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`)
    })
    return server
  }

  // return the express instance
  public getServer() {
    return this.app
  }

  // initialize shared middleware
  private initializeMiddlewares() {
    this.app.use(bodyParser.json())
  }

  // initialize error middleware
  private initializeErrorHandling() {
    this.app.use(errorMiddleware)
  }

  // initialize api controllers and routes
  private initializeControllers(controllers: Controller[]) {
    controllers.forEach(controller => {
      // leave the /api/ prefix out of the /ping and /docs paths
      if (controller.path === '/ping' || controller.path === '/docs') {
        this.app.use('/', controller.router)
      } else {
        // Use the /api/ prefix for API paths
        this.app.use('/api', controller.router)
      }
    })

    // When a nonexistent path is requested return a 404
    this.app.get('*', function(request: express.Request, response: express.Response) {
      response.status(404).send(`Not found`)
    })
  }
}

export default App
