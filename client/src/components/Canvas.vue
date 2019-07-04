<template>
  <div id="courseList">
    <span v-for="course in $props.CourseList" v-bind:key="course.id">
      <CourseButton 
        :Course="course" 
        :CompletedCourseList="$props.CompletedCourseList"
        v-bind:isCompleted="checkCompleted(course.id)"
        v-on:changeCompleted="changeCompleted"
      ></CourseButton>
    </span>
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
      const index = ccl.indexOf(id);
      if (index === -1) {
        return false;
      }
      return true;
    },
  },
  created () {
  }
}
</script>

<style scoped>


</style>
