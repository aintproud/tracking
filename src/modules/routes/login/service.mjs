import asyncLocalStorage from '../../async.mjs'

export function getLoginHandler(req, res) {
  const context = asyncLocalStorage.getStore()
  console.log(context)
  return { message: 'Example route' }
}
