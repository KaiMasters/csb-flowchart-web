<template>
  <div id="aside">
    {{msg}}
  </div>
</template>

<script>

export default {
  name: 'Aside',
  components: {
  },
  props: {
    msg: String
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>

div {
  height: 100%;
  width: 100%;
}

</style>
