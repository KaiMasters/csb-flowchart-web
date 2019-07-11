<template>
  <div class="columns" id="viewport">
    <Aside msg="Hi" 
      :CourseList="CourseList"
      :TransferList="TransferList"
    />
    <Canvas
      :CourseList="CourseList"
      :CompletedCourseList="CompletedCourseList"
      v-on:updateCompleted="updateCompleted"
    />
  </div>
</template>

<script>
import Canvas from './Canvas/Canvas.vue'
import Aside from './Aside/Aside.vue'

export default {
  components: {
    Aside,
    Canvas
  },
  props: {
    CourseList: Array,
    CompletedCourseList: Array,
    TransferList: Array
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