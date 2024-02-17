import SomeHandler from './types/some.mjs'
import TraceHandler from './types/trace.mjs'

const router = {
  some: SomeHandler,
  trace: TraceHandler
}

export default function MessageFabric ({ type, data },context, connection) {
  const targetClass = router[type] || SomeHandler
  return new targetClass(data, context, connection)
}
 