
export const formatMediaURI = function (uri:string) {
  if (uri && process.env.REST_BACKEND_URL) {
    return process.env.REST_BACKEND_URL + '/' + uri
  }

  return uri
}
