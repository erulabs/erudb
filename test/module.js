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
