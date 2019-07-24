import app from '../src/server'
import 'mocha'
import chai from 'chai'
import request from 'supertest'
const expect = chai.expect

describe('GET /ping', () => {
  it('Should return the string "TEMPLATE PING"', done => {
    request(app)
      .get('/ping')
      .end((err, res) => {
        console.log(res.text)
        expect(res.statusCode).to.equal(200)
        expect(res.text).to.equal('TEMPLATE PING')
        done()
      })
  })
})
