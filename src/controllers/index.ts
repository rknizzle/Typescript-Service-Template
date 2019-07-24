import DocController from './doc.controller'
import PingController from './ping.controller'
import Controller from '../interfaces/controller.interface'

const controllers: Controller[] = [new DocController(), new PingController()]

export default controllers
