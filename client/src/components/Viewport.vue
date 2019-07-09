<template>
  <div class="columns" id="viewport">
    <Aside msg="Hi" :CourseList="$props.CourseList" />
    <Canvas
      :CourseList="$props.CourseList"
      :CompletedCourseList="$props.CompletedCourseList"
      v-on:updateCompleted="updateCompleted"
    />
  </div>
</template>

<script>
import Canvas from './Canvas.vue'
import Aside from './Aside.vue'

export default {
  components: {
    Aside,
    Canvas
  },
  props: {
    CourseList: Array,
    CompletedCourseList: Array
  },
  methods: {
    updateCompleted (course) {
      this.$emit("updateCompleted", course);
    }
  }
}
</script>



<style scoped>
#viewport {
  height: 95%;
  width: 100%;
  margin: 0;
}
</style>