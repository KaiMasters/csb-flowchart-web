<template>
  <div id="aside" class="column is-one-quarter">
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


#aside {
  display: inline-block;
}

</style>
