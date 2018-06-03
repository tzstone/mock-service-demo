<template>
  <div>
    <button @click="post">post</button>
    <button @click="get">get</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    post() {
      this.$http('/api/info', {
        msg: 'request msg info'
      }).then(res => {
        console.log(res)
      })
    },
    get() {
      this.$http('/api/admin', {
        msg: 'getAdmin'
      }, {
        method: 'get'
      }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
