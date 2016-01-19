'use strong'

import expect from 'expect'
const describe = global.describe
const it = global.it
import { validateOptions } from './../src/helpers.js'

describe('Helpers', () => {
  const opts = validateOptions()
  it('validateOptions', () => {
    expect(validateOptions).toBeA('function')
  })
  it('defaults properly', () => {
    expect(opts.host).toEqual('localhost')
    expect(opts.port).toEqual(9040)
    expect(opts.peers).toEqual(false)
  })
})
