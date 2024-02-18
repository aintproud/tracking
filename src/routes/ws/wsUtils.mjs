
export function createResponse(data, isError = false) {
  const response = {
    data,
    error: isError,
  }
  return JSON.stringify(response)
}
