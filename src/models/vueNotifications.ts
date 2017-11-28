import { Type } from "./type"
import { Config } from "./config"
import { PluginOptions } from "./pluginOptions"
import { IVuePlugin } from "./vuePlugin"
import { VueApp } from "./VueApp"

export interface IVueNotificationsPlugin extends IVuePlugin {
  types: Type
  propertyName: string
  config: Config
  pluginOptions: PluginOptions
  installed: boolean

  install (Vue, pluginOptions: PluginOptions): void

  setPluginOptions (pluginOptions: PluginOptions = new PluginOptions()): void

  // _private?: any
}

type VueNotificationsParams = {
  types: Type
  propertyName: string
  config: Config
  pluginOptions: PluginOptions
  installed: boolean

  install (Vue: VueApp, pluginOptions: PluginOptions): void

  setPluginOptions (pluginOptions: PluginOptions = new PluginOptions()): void
}

export class VueNotificationsPlugin implements IVueNotificationsPlugin {
  public types: Type
  public propertyName: string
  public config: Config
  public pluginOptions: PluginOptions
  public installed: boolean
  public install: Function
  public setPluginOptions: Function

  _private?: any

  constructor (params: VueNotificationsParams) {
    this.types = params.types
    this.propertyName = params.propertyName
    this.config = params.config
    this.pluginOptions = params.pluginOptions
    this.installed = params.installed
    this.install = params.install
    this.setPluginOptions = params.setPluginOptions
  }
}