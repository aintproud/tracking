import Runtime from "src/modules/ws/runtime.mjs";
import { readdirSync } from 'node:fs'
const folder = 'classes'
const files = readdirSync(`${import.meta.dirname}/${folder}`)
const filteredFiles = files.filter((file) => file.endsWith('.mjs'))

const classes = (
  await Promise.all(filteredFiles.map((file) => import(`./${folder}/${file}`)))
).map((r) => r.default)

export default new Runtime(classes)