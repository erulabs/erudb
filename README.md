# EruDB [![Build Status](https://img.shields.io/circleci/project/erulabs/erudb/master.svg?style=flat-square)](https://circleci.com/gh/erulabs/erudb) [![npm version](https://img.shields.io/npm/v/erudb.svg?style=flat-square)](https://www.npmjs.com/package/erudb) [![Code Climate](https://img.shields.io/codeclimate/github/erulabs/erudb.svg?style=flat-square)](https://codeclimate.com/github/erulabs/erudb)

[![Dependency Status](https://img.shields.io/david/erulabs/erudb.svg?style=flat-square)](https://david-dm.org/erulabs/erudb) [![devDependency Status](https://img.shields.io/david/dev/erulabs/erudb.svg?style=flat-square)](https://david-dm.org/erulabs/erudb#info=devDependencies) [![npm downloads](https://img.shields.io/npm/dm/erudb.svg?style=flat-square)](https://www.npmjs.com/package/erudb) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/erulabs/erudb)

# Nothing to see here just yet :)

# About
__EruDB__ (e-roo-deebee) __is a persistent, distributed, and fault-tolerant key-value data store__ written in ES6, powered by NodeJS, and backed by LevelDB. It features durable replication, service discovery, real-time events and superior at-rest and at-transport encryption features.

EruDB is designed and maintained by Seandon 'Eru' Mooy.

This is a truly open project! Pull requests will be merged and we will happily give out contributor access to those who contribute!


# Why
Firstly, because there is no simple cross platform datastore that can be easily installed as an NPM dependency. Secondly, solutions like RethinkDB and Redis are excellent, but have large dependency chains, do not work on all platforms, are not npm-tracked dependencies, and are easily misconfigured.


# Usage:
  - Have a [valid build chain for node-gyp](https://github.com/nodejs/node-gyp#installation)
  - Install: `npm install --save erudb`
  - CLI Usage: `erudb -X GET localhost:9040/database/key`

Within your app:
```javascript
import EruDB from 'erudb'
```

#### Client example:
```javascript
const db = new EruDB.Client({
  host: '127.0.0.1',
  port: 9040
}).use('database')

db.get('key').then((err, value) => {
  console.log(value)
})
```

#### Server example:
```javascript
const db = new EruDB.Service({
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

Note that all `Services` are also `Clients`!

```javascript
const db = new EruDB.Service({
  port: 9040
}).use('database').get('key').then((err, value) => {
  console.log(value)
})
```

EruDB also understands service discovery - `Service` can simply accept a list of peers - but you may also use load balancing (or DNS round-robbin) and an expected number of peers and EruDB will sort that out for you as well!

```javascript
const db = new EruDB.Service({
  port: 9040,
  expectedPeerCount: 3,
  peers: {
    loadBalancer: 'load_balancer:port'
  }
}).use('database').get('key').then((err, value) => {
  console.log(value)
})
```

Alternatively, a Redis cache can also be used for service discovery (works great with elasticache!):
```javascript
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
}).use('database').get('key').then((err, value) => {
  console.log(value)
})
```

# Design

## Service
#### Concepts & Terms
##### Safe, Strong, Weak
  A __Safe__ operation waits for quorum and accepted replication of data. __Safe__ operations are the slowest & most reliable of all operations in EruDB.

  A __Strong__ operation waits for the master shard to store and accept the data. It does not wait for quorum replication, but returns once the master shard has OKed the data. __Strong__ mode is the default mode for reads and writes in EruDB.

  A __Weak__ operation does not wait for data safety. It returns immediately upon handing the data to the EruDB Service. This mode is only appropriate for cache data and should be considered volatile.
##### Disk
  A __disk__ is a single independent storage unit. A __disk__ can be a physical storage medium, a logical volume, or a cloud storage service like AWS S3. Multiple instances of EruDB can write to the same __disk__, but each instance will be aware of the actual replication that is represented. For example, EruDB will not attempt to replicate data to another instance of EruDB which would write to the same __disk__ as the original instance. A warning will be issued if EruDB cannot reach it's desired replication factor relative to the number of __disks__ in the cluster. This default is 3.
##### Host
  A __host__ is a single independent compute unit. In the case of Docker, a __host__ is not the container, but the physical host which the container resides on. A warning will be issued if EruDB cannot reach it's desired replication factor relative to the number of __hosts__ in the cluster. This default is 3.
##### Group
  A __group__ is an association of __hosts__ which share some single point of failure. By default, we assume that the 3rd octet of the instances IP address represents a group (10.0.0.0 and 10.0.1.0 are separate "groups"). This can be overridden by configuration or service discovery plugins. A warning will be issued if EruDB cannot reach it's desired replication factor relative to the number of __groups__ in the cluster. This default is 3.
##### Region
  A __region__ an association of __hosts__ which share a geographical location. __Regions__, by default, use public IP detection to determine geographically distinct __hosts__, and can be overridden by configuration or discovery plugins. A warning will be issued if EruDB cannot reach it's desired replication factor relative to the number of __regions__ in the cluster. This default is 3.
##### Index
  An __Index__ is not a natively supported feature of EruDB. EruDB is a key-value store. However, EruDB will feature ElasticSearch and Apache Spark integration for it's query language, allowing full text indexing of your data store.

#### Limited by design
"Limited by design" is an important philosophy of EruDB. Here are some things you _cannot_ do with EruDB:
  1. You cannot use plaintext communication, ever. EruDB instances are ___secure___.
  2. You cannot avoid authorization, ever. EruDB instances are ___auditable___.
  3. You cannot insert invalid data, ever. EruDB instances are ___sane___.
  4. You cannot disable warnings for clusters which are not highly available by design. EruDB clusters are ___resiliant___.
  5. EruDB instances only maintain sockets with a number of EruDB instances equal to it's __quorum__ for Safe operations. This means, when configured properly in conjunction with sharding, EruDB cluters are ___massively scalable___.

#### Configuration
Some settings can be changed in realtime via the management interface, but this is highly discouraged. Instead, treat EruDB like an _immutable_ web service and launch new instances with new configuration and destroy old instances when ready.

#### Administration
#### Discovery
#### Security
#### Fault Tolerance
#### Logging

## Client
#### Strong and Weak writes
#### Strong and Weak reads
#### Events
#### Query syntax
#### Indexing tips
