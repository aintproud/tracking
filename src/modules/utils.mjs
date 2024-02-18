import { scrypt, randomBytes } from 'crypto'
export async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
export async function createHash(password) {
  return new Promise((resolve, reject) => {
    const salt = randomBytes(8).toString('hex')
    scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err)
      resolve(salt + ':' + derivedKey.toString('hex'))
    })
  })
}
export async function verifyHash(password, hashedPassword) {
  return new Promise((resolve, reject) => {
    const [salt, key] = hashedPassword.split(':')
    scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err)
      resolve(key === derivedKey.toString('hex'))
    })
  })
}
export function createResponse(data, isError = false) {
  const response = {
    data,
    error: isError,
  }
  return JSON.stringify(response)
}
