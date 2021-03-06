'use strong'

import expect from 'expect'
const describe = global.describe
const it = global.it
import EruDB from './../src/index.js'

describe('Service', () => {
  let service
  it('should instantiate', () => {
    service = new EruDB.Service()
    expect(service).toBeA(EruDB.Service)
  })
  it('should have a client', () => {
    expect(service.client).toBeA(EruDB.Client)
  })
  it('Service.use()', () => {
    expect(service.use).toBeA('function')
  })
  it('Service.get()', () => {
    expect(service.get).toBeA('function')
  })
  it('Service.put()', () => {
    expect(service.put).toBeA('function')
  })
})
