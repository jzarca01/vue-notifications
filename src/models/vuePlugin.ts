import { PluginOptions } from "./pluginOptions"

export interface IVuePlugin {
  install (Vue: VueApp, pluginOptions: PluginOptions): void
}