'use strong'

import expect from 'expect'

const describe = global.describe
const it = global.it

import EruDB from './../src/index.js'

describe('module', () => {
  it('should contain a client and a service', () => {
    expect(EruDB.Client).toBeA('function')
    expect(EruDB.Service).toBeA('function')
  })
})

describe('Client', () => {
  let client
  it('should instantiate', () => {
    client = new EruDB.Client()
    expect(client).toBeA(EruDB.Client)
  })
  it('Client.use()', () => {
    expect(client.use).toBeA('function')
  })
  it('Client.get()', () => {
    expect(client.get).toBeA('function')
  })
  it('Client.put()', () => {
    expect(client.put).toBeA('function')
  })
})

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
