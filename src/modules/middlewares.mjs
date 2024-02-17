import asyncLocalStorage from './async.mjs'

export function asyncStorageBinding(req, res, done) {
  asyncLocalStorage.run({}, done)
}
