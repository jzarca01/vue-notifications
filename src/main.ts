import { ERROR, INFO, SUCCESS, WARN } from "./models/messageTypes"
import {
  BEFORE_CREATE_HOOK,
  BEFORE_DESTROY_HOOK,
  EVANGELION,
  INIT_HOOK,
  PACKAGE_NAME,
  PROPERTY_NAME
} from "./constants"
import { ALREADY_INSTALLED_MSG } from "./messages"
import { Config } from "./models/config"
import { Type } from "./models/type"
import { PluginOptions } from "./models/pluginOptions"
import { VueNotificationsPlugin } from "./models/VueNotifications"
import { Message } from "./models/message"
import { VueApp } from "./models/VueApp"
import { Hooks } from "./models/Hooks"
import { Mixin } from "./models/Mixin"

function getVersion (Vue: VueApp): number {
  const version = Vue.version.match(/(\d+)/g)
  return +version[0]
}

function showDefaultMessage ({type, message, title}: Message): void {
  let msg = `Title: ${title}, Message: ${message}, Type: ${type}`
  if (type === ERROR) console.error(msg)
  else if (type === WARN) console.warn(msg)
  else console.log(msg)
}

function getValues (vueApp: VueApp, config: Config): Message {
  const result = new Message()

  Object.keys(config).forEach(field => {
    if (field === 'cb') {
      result[field] = config[field].bind(vueApp)
    } else {
      result[field] = (typeof config[field] === 'function') ? config[field].call(vueApp) : config[field]
    }
  })

  return result
}

function showMessage (config: Config, vueApp: VueApp): any {
  const valuesObj: Message = getValues(vueApp, config)
  const isMethodOverridden = VueNotifications.pluginOptions[valuesObj.type]

  if (isMethodOverridden) {
    VueNotifications.pluginOptions[valuesObj.type](valuesObj, vueApp)
  } else {
    showDefaultMessage(valuesObj)
  }

  if (config.cb) return config.cb()
}

// TODO (S.Panfilov) fix typing
function addMethods (targetObj, typesObj, vueApp: VueApp): void {
  Object.keys(typesObj).forEach(v => {
    targetObj[typesObj[v]] = function (config) {
      config.type = typesObj[v]
      // TODO (S.Panfilov) fix 'vueApp' in param
      return showMessage(config, vueApp)
    }
  })
}

function setMethod (vueApp: VueApp, name: string, vueAppOptions: VueAppOptions): void {
  if (!vueAppOptions.methods) vueAppOptions.methods = {}
  if (!vueAppOptions.methods[name]) {
    vueAppOptions.methods[name] = makeMethod(vueApp, name, vueAppOptions)
  }
}

function makeMethod (vueApp: VueApp, configName: string, options: VueAppOptions): Function {
  return function (config) {
    const newConfig = Object.assign({},
      VueNotifications.config,
      options[VueNotifications.propertyName][configName],
      config)

    return showMessage(newConfig, vueApp)
  }
}

// TODO (S.Panfilov) typing (notifications?)
function initVueNotificationPlugin (vueApp: VueApp, notifications): void {
  if (!notifications) return
  Object.keys(notifications).forEach(name => setMethod(vueApp, name, vueApp.$options))
  vueApp.$emit(`${PACKAGE_NAME}-initiated`)
}

// TODO (S.Panfilov) typing (notifications?)
function unlinkVueNotificationPlugin (vueApp: VueApp, notifications): void {
  if (!notifications) return
  const attachedMethods = vueApp.$options.methods
  Object.keys(notifications).forEach(name => {
    if (attachedMethods[name]) {
      attachedMethods[name] = undefined
      delete attachedMethods[name]
    }
  })

  vueApp.$emit(`${PACKAGE_NAME}-unlinked`)
}

function makeMixin (Vue: VueApp): Mixin {
  const init: Hooks = getVersion(Vue) === EVANGELION ? INIT_HOOK : BEFORE_CREATE_HOOK

  return {
    [init]: function () {
      //this === vueApp
      const notificationsField = this.$options[VueNotifications.propertyName]
      initVueNotificationPlugin(this, notificationsField)
    },
    [BEFORE_DESTROY_HOOK]: function () {
      //this === vueApp
      const notificationsField = this.$options[VueNotifications.propertyName]
      unlinkVueNotificationPlugin(this, notificationsField)
    }
  }
}

const VueNotifications: VueNotificationsPlugin = {
  types: new Type({error: ERROR, warn: WARN, info: INFO, success: SUCCESS}),
  propertyName: PROPERTY_NAME,
  config: new Config({
    type: INFO,
    timeout: 3000
  }),
  pluginOptions: new PluginOptions(),
  installed: false,
  install (Vue, pluginOptions: PluginOptions = new PluginOptions()) {
    if (this.installed) throw console.error(ALREADY_INSTALLED_MSG)
    const mixin = makeMixin(Vue)
    Vue.mixin(mixin)

    this.setPluginOptions(pluginOptions)
    addMethods(this, this.types, Vue)

    this.installed = true
  },
  setPluginOptions (pluginOptions: PluginOptions = new PluginOptions()) {
    this.pluginOptions = pluginOptions
  }

  //TODO (S.Panfilov) add ability to access this.notifications.someError.message
  //TODO (S.Panfilov) add "noCall:true" property
}

if (typeof window !== 'undefined' && (<any>window).Vue) {
  (<any>window).Vue.use(VueNotifications)
}

/*START.TESTS_ONLY*/
// VueNotifications._private = {}
// VueNotifications._private.getVersion = getVersion
// VueNotifications._private.showDefaultMessage = showDefaultMessage
// VueNotifications._private.getValues = getValues
// VueNotifications._private.showMessage = showMessage
// VueNotifications._private.addMethods = addMethods
// VueNotifications._private.setMethod = setMethod
// VueNotifications._private.makeMethod = makeMethod
// VueNotifications._private.initVueNotificationPlugin = initVueNotificationPlugin
// VueNotifications._private.unlinkVueNotificationPlugin = unlinkVueNotificationPlugin
// VueNotifications._private.makeMixin = makeMixin
// VueNotifications._private.TYPES = TYPES
// VueNotifications._private.PLUGIN_NAME = PLUGIN_NAME
// VueNotifications._private.PACKAGE_NAME = PACKAGE_NAME
// VueNotifications._private.PROPERTY_NAME = PROPERTY_NAME
// VueNotifications._private.EVANGELION = EVANGELION
// VueNotifications._private.MESSAGES = MESSAGES

export default VueNotifications
/*END.TESTS_ONLY*/
