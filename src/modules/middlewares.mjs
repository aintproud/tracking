import asyncLocalStorage from './async.mjs'

export function asyncStorageBinding (request, reply, done) {
  asyncLocalStorage.run({}, done)
}
