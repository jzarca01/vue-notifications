<template>
  <div class="showcase-page">

    <section class="showcase">

      <section class="showcase__entry -try-live">
        <section class="showcase__actions">
          <ul class="showcase__actions-item msg-buttons">
            <li class="msg-buttons__list-item">
              <button type="button" class="msg-buttons__btn -success" @click="showSuccessMsg()">Success</button>
            </li>
            <li class="msg-buttons__list-item">
              <button type="button" class="msg-buttons__btn -info" @click="showInfoMsg()">Info</button>
            </li>
            <li class="msg-buttons__list-item">
              <button type="button" class="msg-buttons__btn -warn" @click="showWarnMsg()">Warning</button>
            </li>
            <li class="msg-buttons__list-item">
              <button type="button" class="msg-buttons__btn -error" @click="showErrorMsg()">Error</button>
            </li>
          </ul>

        </section>

      </section>

    </section>

  </div>
</template>

<script>
  import Vue from 'vue'
  // import VueNotifications from 'vue-notifications'
  import VueNotifications from 'vue-notifications/dist/vue-notifications.es5.js'

  import miniToastr from 'mini-toastr'

  Vue.config.productionTip = false

  miniToastr.init()

  function toast ({title, message, type, timeout, cb}) {
    return miniToastr[type](message, title, timeout, cb)
  }

  const options = {
    success: toast,
    error: toast,
    info: toast,
    warn: toast
  }

  Vue.use(VueNotifications, options)

  export default {
    name: 'showcase',
    data () {
      return {}
    },
    notifications: {
      showSuccessMsg: {
        type: VueNotifications.types.success,
        title: 'Hello there',
        message: 'That\'s the success!'
      },
      showInfoMsg: {
        type: VueNotifications.types.info,
        title: 'Hey you',
        message: 'Here is some info for you'
      },
      showWarnMsg: {
        type: VueNotifications.types.warn,
        title: 'Wow, man',
        message: 'That\'s the kind of warning'
      },
      showErrorMsg: {
        type: VueNotifications.types.error,
        title: 'Wow-wow',
        message: 'That\'s the error'
      }
    },
    methods: {
      setCurrentLib (libKey) {
        this.currentLib = libKey
        this.checked = libKey
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus" scoped>
  primary_color = #41b883

  .showcase-page
    padding 15px

  hr
    border-color #bfbfbf
    border-style dashed

  h1, h2, h3
    font-weight normal

  a
    color #42b983

  .overview
    text-align center

  ul
    padding 0
    list-style-type none

  .highlighted-text
    background-color #f1f1ed
    border 1px dotted #d0d0d0
    padding 0 3px
    border-radius 2px

  .msg-buttons
    list-style-type none
    padding 0
    margin 10px
    &__btn
      display inline-block
      margin 5px 10px
      color white
      font-size 14px
      background-color primary_color
      border-radius 3px
      padding 7px 12px
      border 1px solid transparent
      transition background .4s ease
      cursor pointer
      min-width 85px
      &:hover
        background-color lighten(primary_color, 5)

  .showcase
    justify-content space-around
    flex-direction row
    display flex
    &__entry
      flex-basis: 350px
      background-color #fafafa
      min-width 1px
      flex-grow 1
      &.-try-live
        flex-basis: 280px
      &.-setup
        flex-basis: 350px
        flex-grow 2
      &.-definition
        flex-basis: 300px
        flex-grow 1.2
    &__actions-item
      display inline-block
      max-width 50%

  .showcase-lib
    &__third-party-home-ling
      font-size 14px

  .misc
    text-align center
    padding 15px 25%
    font-size 14px
    &__item
      text-decoration none
      padding 5px
</style>
