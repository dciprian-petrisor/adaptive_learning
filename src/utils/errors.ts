import { ExpectedError, ExpectedErrorType } from 'src/generated'
import { ApolloError } from '@apollo/client/errors'
import { QVueGlobals } from 'quasar'

interface ObjWithMessage {
  message: string;
}
const isExpectedError = function (err: unknown): err is ExpectedError {
  return (err as ExpectedError).message !== undefined && (err as ExpectedError).code !== undefined
}

const isObjectWithMessage = function (err: unknown): err is ObjWithMessage {
  return (err as ObjWithMessage).message !== undefined
}

const isExpectedErrorType = function (err: Record<string, unknown|unknown[]>): err is ExpectedErrorType {
  for (const key of Object.keys(err)) {
    const obj = err[key]
    if (obj instanceof Array) {
      for (const error of obj) {
        if (isExpectedError(error)) { return true }
      }
    }
  }
  return false
}

export const notifyApolloError = (q: QVueGlobals, err: ExpectedErrorType | ApolloError) => {
  if (err instanceof ApolloError) {
    q.notify({ message: err.message, type: 'negative' })
  } else if (isExpectedErrorType(err)) {
    for (const key of Object.keys(err)) {
      const errors = err[key]
      if (Symbol.iterator in Object(errors)) {
        for (const error of errors) {
          q.notify({ message: error.message, type: 'negative' })
        }
      }
    }
  } else {
    let msg = ''
    if (isObjectWithMessage(err)) {
      msg = (err as ObjWithMessage).message
    } else {
      msg = String(err)
    }
    q.notify({ message: msg, type: 'negative' })
    console.error(err)
  }
}
