import SomeHandler from './types/some.mjs'

const router = {
  some: SomeHandler,
}

export default function MessageFabric ({ type, data }, connection) {
  const targetClass = router[type] || SomeHandler
  return new targetClass({ type, data }, connection)
}
 