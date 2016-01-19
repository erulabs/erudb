'use strong'

import {
  validateClientOptions
} from './helpers.js'

// EruDB Client
export default class {
  constructor (rawOptions, service = false) {
    this.opts = validateClientOptions(rawOptions)
    if (service) this.localService = service
  }
  get (key) {
    return this
  }
  put (key, value) {
    return this
  }
  use (database) {
    return this
  }
}
