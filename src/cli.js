'use strong'

import yargs from 'yargs'
const cliName = 'erudb'

const argv = yargs
  .usage(`Usage: ${cliName} [options] <action> [key] [value]`)
  // Common options:
  .help('h')
  .alias('h', 'help')
  .alias('d', 'database')
  // GET
  .command('get', 'get the value of a key')
  .example(`${cliName} get myKey`)
  // SET
  .command('set', 'set the value of a key')
  .example(`${cliName} set myKey someValue`)
  // MAP
  .command('map', 'run some command for each returned value')
  .example(`${cliName} map myPrefix* someScript.sh`)
  // DEL
  .command('del', 'delete a key')
  .example(`${cliName} del myKey`)
  // LS
  .command('ls', 'list databases')
  .example(`${cliName} ls`)
  // TRUNCATE
  .command('truncate', 'empty a database of all data')
  .example(`${cliName} truncate myDatabase`)
  .demand(1)
  .argv

console.log(argv)
