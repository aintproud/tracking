import classes from './classesLoader.mjs'
export default function MessageFabric({ type, data }, context, connection) {
  const TargetClass = classes.find((Handler) => Handler.type === type)
  if (!TargetClass) return
  return new TargetClass(data, context, connection)
}
