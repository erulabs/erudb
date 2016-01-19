'use strong'

import expect from 'expect'
const describe = global.describe
const it = global.it
import EruDB from './../src/index.js'

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
