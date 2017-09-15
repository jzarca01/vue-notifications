<template>
  <div>
    <h4>This is TWO</h4>
    <button type="button" @click="warnMsg()">Show 'warn' from component Two</button>
    <button type="button" @click="successMsg()">Show 'success' from component Two</button>
  </div>
</template>

<script>
  export default {
    name: 'Two',
    data () {
      return {}
    },
    notifications: {
      warnMsg: {
        type: 'warn',
        message: 'Component TWO warning'
      },
      successMsg: {
        type: 'success',
        title: 'Success!',
        message: 'Component TWO success'
      }
    },
    methods: {
      warnMe () {
        this.warnMsg()
      }
    }
  }
</script>

