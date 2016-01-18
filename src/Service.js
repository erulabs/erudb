'use strong'

import Client from './Client.js'

// EruDB Service
export default class {
  constructor (rawOptions) {
    // Initialize Client
    this.opts = this.validateOptions(rawOptions)
    this.client = new Client(this.opts)

    // Shorthand
    this.get = this.client.get
    this.put = this.client.put
    this.use = this.client.use
  }

  validateOptions (opts = {}) {
    if (!opts.host) opts.host = 'localhost'
    if (!opts.port) opts.port = 9040
    if (!opts.expectedPeerCount) opts.expectedPeerCount = 3
    if (!opts.expectedDiskCount) opts.expectedDiskCount = 3
    if (!opts.expectedHostCount) opts.expectedHostCount = 3
    if (!opts.expectedGroupCount) opts.expectedGroupCount = 3
    if (!opts.expectedRegionCount) opts.expectedRegionCount = 3
    const OptionsValidationError = function (message) {
      this.name = 'optionsValidationError'
      this.message = message
    }
    // Validate peer setting
    if (!opts.peers) {
      opts.peers = false
    } else if (Array.isArray(opts.peers)) {
      for (const peer in opts.peers) {
        console.log(peer)
      }
    } else if (typeof opts.peers === 'object') {
      // Validate redis settings
      if (opts.peers.redis !== undefined) {
        if (typeof opts.peers.redis === 'string') {
          const split = opts.peers.redis.split(':')
          opts.peers.redis = {
            host: split[0],
            port: split[1]
          }
        }
        if (typeof opts.peers.redis === 'object' && opts.peers.redis.host && opts.peers.redis.port) {
          if (!opts.peers.redis.key) opts.peers.redis.key = '__EruDB_discovery'
        } else {
          throw new OptionsValidationError('options.peers.redis is not valid!')
        }
      // Validate load balancer settings
      } else if (opts.peers.loadBalancer !== undefined) {
        throw new Error('This has not been implimented yet')
      } else {
        throw new Error('Unknown options.peers format')
      }
    }
    return opts
  }
}
