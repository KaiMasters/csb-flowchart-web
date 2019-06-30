<template>
  <div 
   :id="'CourseButton_' + Course.id" 
   v-on:click="isCompleted = !isCompleted" 
   v-bind:class="{ completed: isCompleted, unavailable: !isAvailable(Course) }"
   v-bind:style="{ left: Course.view.old.xold + '%' }"
  >
    <h1>{{ Course.information.dept }}<br/>{{ Course.information.coursenum }}</h1>
  </div>
</template>

<script>
import Course from '../classes/Course.ts'

const checkPrereqs = (prereqs) => {
  return false;
};

const findCourseByID = (id) => {

};

export default {
  name: 'CourseButton',
  props: {
    Course: Object,
    CourseList: Object
  },
  data: () => {
    return {
      isCompleted: false,
      isAvailable: (Course) => {
        let prereqs = Course.information.prereqs.prereqsold;
        if (prereqs.length === 0) {
          // No prereqs
          return true;
        } else {
          if (checkPrereqs(prereqs)) {
            return true;
          }
          return false;
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
}

div:hover {
  background-color: #E53935;
}

.completed {
  background-color: #EF9A9A;
  color: black;
}

.completed:hover {
  background-color: #FFCDD2;
}

.unavailable {
  background-color: white;
  color: black;
}


</style>
