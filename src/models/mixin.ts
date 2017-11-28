import { BEFORE_CREATE_HOOK, BEFORE_DESTROY_HOOK, INIT_HOOK } from "../constants"
import { Hooks } from "./Hooks"

export interface Mixin {
  [INIT_HOOK || BEFORE_CREATE_HOOK]: Hooks
  [BEFORE_DESTROY_HOOK]: Hooks
}