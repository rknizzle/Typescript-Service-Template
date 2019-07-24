import * as express from 'express'
import Controller from '../interfaces/controller.interface'

class PingController implements Controller {
  public path = '/ping'
  public router = express.Router()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    /**
     * @swagger
     *
     * /ping:
     *   get:
     *     description: Respond with a ping message
     *     responses:
     *       200:
     *         description: PING
     */
    this.router.get(this.path, this.ping)
  }

  private ping = async (request: express.Request, response: express.Response) => {
    response.send('TEMPLATE PING')
  }
}

export default PingController
