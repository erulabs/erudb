# erudb [![Build Status](https://img.shields.io/circleci/project/erulabs/erudb/master.svg?style=flat-square)](https://circleci.com/gh/erulabs/erudb) [![npm version](https://img.shields.io/npm/v/erudb.svg?style=flat-square)](https://www.npmjs.com/package/erudb) [![Code Climate](https://img.shields.io/codeclimate/github/erulabs/erudb.svg?style=flat-square)](https://codeclimate.com/github/erulabs/erudb)

[![Dependency Status](https://img.shields.io/david/erulabs/erudb.svg?style=flat-square)](https://david-dm.org/erulabs/erudb) [![devDependency Status](https://img.shields.io/david/dev/erulabs/erudb.svg?style=flat-square)](https://david-dm.org/erulabs/erudb#info=devDependencies) [![npm downloads](https://img.shields.io/npm/dm/erudb.svg?style=flat-square)](https://www.npmjs.com/package/erudb) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/erulabs/erudb)

# About

EruDB (e-roo-deebee) an asynchronous & distributed key-value data store powered by LevelDB with limited features and carefully chosen limitations. It runs in a single thread and is intended to run side-car to a NodeJS application. It features durable replication, service discovery, real-time events, disk persistence, disaster recovery and superior at-rest and at-transport encryption features.

EruDB is designed and maintained by Seandon 'Eru' Mooy.

This is a truly open project! Pull requests will be merged and we will happily give out contributor access to those who contribute!

# Why

Firstly, because there is no simple cross platform datastore that can be easily installed as an NPM dependency. Secondly, solutions like RethinkDB and Redis are excellent, but have large dependency chains, do not work on all O/Ss, are not npm-tracked dependencies, and are easily misconfigured.

# Usage:
 - Have a [valid build chain for node-gyp](https://github.com/nodejs/node-gyp#installation)
 - Install: `npm install --save erudb`
 - CLI Usage: `erudb -X GET localhost:9040/database/key`

Within your app:
```
const EruDB = require('erudb')
```

#### Client example:
```
const db = new EruDB.Client({
  host: '127.0.0.1',
  port: 9040
}).select('database')

db.get('key').then((err, value) => {
  console.log(value)
})
```

#### Server example:
```
new EruDB.Service({
  port: 9040
  peers: [ 'addr1', 'addr2...' ]
}).ensure({
  // Ensure a database exists
  databases: [ 'database' ],
  // Ensure a record exists
  records: {
    database: [
      { name: 'Sample Record' }
    ]
  }
})
```

Note that all servers are also clients!

```
const db = new EruDB.Service({
  port: 9040
}).select('database').get('key').then((err, value) => {
  console.log(value)
})
```

EruDB also understands service discovery - .service() can simply accept a list of peers - but you may also use load balancing (or DNS round-robbin) and an expected number of peers and EruDB will sort that out for you as well!

```
const db = new EruDB.Service({
  port: 9040,
  expectedPeerCount: 3,
  peers: {
    loadBalancer: 'load_balancer:port'
  }
}).select('database').get('key').then((err, value) => {
  console.log(value)
})
```

Alternatively, a Redis cache can also be used for service discovery (works great with elasticache!):
```
const db = new EruDB.Service({
  port: 9040,
  peers: {
    redis: {
      host: 'some_redis',
      port: 9000,
      db: 0,
      key: 'erudb_peers'
    }
  }
}).select('database').get('key').then((err, value) => {
  console.log(value)
})
```

# Design
