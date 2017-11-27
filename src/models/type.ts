import { messageType } from "./messageTypes"

type TypeParams = {
  error: messageType
  warn: messageType
  info: messageType
  success: messageType
}

export class Type {
  error: messageType
  warn: messageType
  info: messageType
  success: messageType

  constructor (params: TypeParams) {
    return params
  }
}