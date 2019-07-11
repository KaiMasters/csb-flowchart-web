<template>
  <div>
    <div v-for="course in CourseList" v-bind:key="'AsideCourseButton_' + course.id">
      <AsideCourseButton :Course="course"/>
    </div>
  </div>
</template>

<script>
import AsideCourseButton from './AsideCourseButton.vue'

export default {
  name: 'AsideCourses',
  components: {
    AsideCourseButton
  },
  props: {
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

</style>
