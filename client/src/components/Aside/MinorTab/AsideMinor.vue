<template>
  <div>
    <div v-for="minor in MinorList" v-bind:key="'AsideMinorButton_' + minor.minor">
      <AsideMinorButton :Minor="minor"/>
    </div>
  </div>
</template>

<script>

import AsideMinorButton from './AsideMinorButton.vue'

export default {
  name: 'AsideMinor',
  components: {
    AsideMinorButton
  },
  props: {
    MinorList: Array
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

</style>
