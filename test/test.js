'use strict'

import expect from 'expect'

const describe = global.describe
const it = global.it

import EruDB from './../src/index.js'

describe('erudb', function () {
  it('should contain a client and a service', function () {
    expect(EruDB.Client).toExist()
    expect(EruDB.Service).toExist()
  })
})
