<template>
  <div id="aside" class="column is-one-quarter">
    {{msg}}  
    <div v-for="course in $props.CourseList" v-bind:key="course.id">
      {{course.information.dept}}
    </div>
  </div>
</template>

<script>

export default {
  name: 'Aside',
  components: {
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
