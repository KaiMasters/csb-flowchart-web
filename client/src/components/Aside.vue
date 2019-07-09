<template>
  <div id="aside" class="column is-one-quarter">
    {{msg}}  
    <div v-for="course in $props.CourseList" v-bind:key="'AsideButton_' + course.id">
      <AsideButton :Course="course"/>
    </div>
  </div>
</template>

<script>
import AsideButton from './AsideButton.vue'

export default {
  name: 'Aside',
  components: {
    AsideButton
  },
  props: {
    msg: String,
    CourseList: Array
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
  overflow-y: scroll;
}

</style>
