import { messageType } from "./messageTypes"

export class Message {
  type?: messageType
  message: string
  title?: string
  cb?: Function
}