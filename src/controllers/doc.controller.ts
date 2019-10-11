import * as express from 'express'
import Controller from '../interfaces/controller.interface'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import fs from 'fs'

class DocController implements Controller {
  public path = '/docs'
  public router = express.Router()
  private swaggerSpec

  constructor() {
    this.initializeSwagger().then(() => {
      // /docs will run the swaggerUI middleware and render the documentation
      this.router.use(this.path, swaggerUi.serve, swaggerUi.setup(this.swaggerSpec))
    })
  }

  private initializeSwagger() {
    return new Promise((resolve, reject) => {
      // -- setup up swagger-jsdoc --
      const swaggerDefinition = {
        info: {
          title: 'Template',
          version: '1.0.0',
          description: 'Template Project',
        },
        basePath: '/',
      }

      const controllers: string[] = []
      fs.readdir('./dist/controllers', (err, files) => {
        files.forEach(file => {
          if (file.includes('controller') && !file.includes('doc.controller')) {
            controllers.push(`./src/controllers/${file}`)
          }
        })
        const options = {
          swaggerDefinition,
          apis: controllers,
        }
        this.swaggerSpec = swaggerJSDoc(options)
        return resolve()
      })
    })
  }
}

export default DocController
