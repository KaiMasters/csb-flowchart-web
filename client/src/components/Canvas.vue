<template>
  <div id="courseList">
    <div v-for="course in $props.CourseList" v-bind:key="course.id">
      <CourseButton 
        :Course="course" 
        v-bind:isAvailable="true" 
        v-bind:isCompleted="false"
        v-on:updateCompleted="updateCompleted"
      ></CourseButton>
    </div>
  </div>
</template>

<script>
import CourseButton from './CourseButton.vue'

export default {
  name: 'Canvas',
  components: {
    CourseButton
  },
  props: {
    CourseList: Array,
    CompletedCourseList: Array
  },
  data () {
    return {
      
    }
  },
  methods: {
    updateCompleted (course) {
      console.log("PARENT");
    }
  },
  created () {
  }
}
</script>

<style scoped>


</style>
