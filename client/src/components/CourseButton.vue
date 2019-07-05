<template>
  <div 
   :id="'CourseButton_' + Course.id"
   v-on:click="toggleCompleted"
   v-on:mouseover="boldPrereqs"
   v-on:mouseleave="unboldPrereqs"
   v-bind:class="{ completed: isCompleted, unavailable: !available() }"
   v-bind:style="{ left: Course.view.old.xold + '%' }"
  >
    <h1>{{ Course.information.dept }}<br/>{{ Course.information.coursenum }}</h1>
  </div>
</template>

<script>

export default {
  name: 'CourseButton',
  props: {
    Course: Object,
    CompletedCourseList: Array,
    isCompleted: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      available: () => {
        // If completed
        if (this.isCompleted === true) {
          return false;
        }
        // Check if prereqs are completed
        if (this.checkPrereqAvailability()) {
          return true;
        }
        return false;
      }
    }
  },
  methods: {
    toggleCompleted () {
      this.completed = !this.completed;
      this.$emit("changeCompleted", this.$props.Course.id);
    },
    boldPrereqs () {
      this.$emit("boldPrereqs", this.$props.Course.id);
    },
    unboldPrereqs () {
      this.$emit("unboldPrereqs", this.$props.Course.id);
    },
    checkPrereqAvailability () {
      const prereqs = this.$props.Course.information.prereqs.prereqsold;
      for (let i = 0; i < prereqs.length; i++) {
        let ret = this.checkPrereqAvailabilityHelper(prereqs[i]);
        if (ret === false) {
          return false;
        }
      }
      return true;
    },
    checkPrereqAvailabilityHelper (prereq) {
      const ccl = this.$props.CompletedCourseList;
      if (typeof prereq === "string") { // String
        let index = ccl.indexOf(prereq);
        if (index === -1) {
          return false;
        }
        return true;
      } else { // List
        for (let j = 0; j < prereq.length; j++) {
          if (this.checkPrereqAvailabilityHelper(prereq[j])) {
            return true;
          }
        }
        return false;
      }
    }
  }
}
</script>

<style scoped>

div {
  font-size: 0.5em;
  width: 5%;
  border-radius: 10%;
  cursor: pointer;
  border: 1px solid black;
  transition: .3s;
  margin: 0.5%;
  background-color: #C62828;
  color: white;
  position: relative;
  overflow: hidden;
  display: inline-block;
}

div:hover {
  background-color: #E53935;
}

div.completed {
  background-color: #EF9A9A;
  color: black;
}

div.completed:hover {
  background-color: #FFCDD2;
}

.unavailable {
  background-color: white;
  color: black;
}

</style>
