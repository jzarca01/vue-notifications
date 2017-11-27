import { INFO, messageType } from "./messageTypes"

type PluginOptionsParams = {
  type: messageType,
  timeout: number
}

export class PluginOptions {
  type: messageType
  timeout: number

  constructor (params?: PluginOptionsParams) {
    this.type = params ? (params.type || INFO) : INFO
    this.timeout = params ? (params.type || 3000) : 3000
  }
}