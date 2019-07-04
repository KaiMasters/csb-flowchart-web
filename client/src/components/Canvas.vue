<template>
  <div id="courseList">
    <div v-for="course in $props.CourseList" v-bind:key="course.id">
      <CourseButton 
        :Course="course" 
        v-bind:isCompleted="checkCompleted(course.id)"
        v-on:changeCompleted="changeCompleted"
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
    changeCompleted (course) {
      this.$emit("updateCompleted", course);
    },
    checkCompleted (id) {
      const ccl = this.$props.CompletedCourseList;
      for (let i = 0; i < ccl.length; i++) {
        if (id === ccl[i].id) {
          return true;
        }
      }
      return false;
    },
  },
  created () {
  }
}
</script>

<style scoped>


</style>
