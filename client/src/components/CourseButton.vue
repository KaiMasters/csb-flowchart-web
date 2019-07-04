<template>
  <div 
   :id="'CourseButton_' + Course.id"
   v-on:click="toggleCompleted"
   v-bind:class="{ completed: completed, unavailable: !available() }"
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
      completed: false,
      available: () => {
        if (this.completed === true) {
          return false;
        }
        if (this.$props.Course.information.prereqs.prereqsold.length === 0) {
          return true;
        }
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
      this.$emit("changeCompleted", {
        "id": this.$props.Course.id,
        "completed": this.completed
      });
    },
    checkPrereqAvailability () {
      const prereqs = this.$props.Course.information.prereqs.prereqsold;
      const ccl = this.$props.CompletedCourseList;
      for (let i = 0; i < prereqs.length; i++) {
        let index = this.findCourseById(prereqs[i]);
        if (index === -1) {
          return false;
        }
        if (ccl[index].completed === false) {
          return false;
        }
        
      }
      return true;
    },
    findCourseById (id) {
      const ccl = this.$props.CompletedCourseList;
      for (let i = 0; i < ccl.length; i++) {
        if (id === ccl[i].id) {
          console.log(i);
          return i;
        }
      }
      return -1;
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
