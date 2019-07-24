import App from './app'
import controllers from './controllers'

const app = new App(controllers)
const server = app.listen()

export default server
