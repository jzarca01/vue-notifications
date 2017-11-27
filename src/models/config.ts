import { INFO, messageType } from "./messageTypes"

type ConfigParams ={
  type?: messageType,
  cb?: Function,
  timeout?: number
}

export class Config {
  type: messageType
  cb?: Function
  timeout: number

  constructor (params?: ConfigParams) {
    this.type = (params && params.type) ? params.type : INFO
    this.cb = (params && params.cb) ? params.cb : undefined
    this.timeout = (params && params.timeout) ? params.timeout : 3000
  }
}