import asyncLocalStorage from './async.mjs'

export async function verifyRoles(roles) {
  return async (req, res) => {
    const session = asyncLocalStorage.getStore()
    console.log(session)
  }
}
