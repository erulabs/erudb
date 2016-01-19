'use strong'

import Client from './Client.js'
import {
  validateServiceOptions,
  validateClientOptions
} from './helpers.js'

// EruDB Service
export default class {
  constructor (rawOptions) {
    // Initialize Client
    this.opts = validateServiceOptions(validateClientOptions(rawOptions))

    this.client = new Client(this.opts, this)

    // Shorthand
    this.get = this.client.get
    this.put = this.client.put
    this.use = this.client.use
  }
}
