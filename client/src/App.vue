<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Canvas 
      :CourseList="Curriculum" 
      :CompletedCourseList="Completed"
      v-on:updateCompleted="updateCompleted"  
    ></Canvas>   
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Canvas from './components/Canvas.vue'
import Vue from 'vue'
import Curriculum from '../../server/data/db/CURRICULUM.json'
import Completed from '../../server/data/COMPLETED.json'

export default {
  name: 'app',
  components: {
    HelloWorld,
    Canvas
  },
  data () {
    return {
      Curriculum,
      Completed
    }
  },
  methods: {
    updateCompleted (course) {
      const index = Completed.indexOf(course);
      if (index === -1) {
        console.log("COMPLETED: " + course);
        Completed.push(course);
        this.getPrereqs(course).forEach((prereq) => {
          Completed.push(prereq);
        });
      } else {
        console.log("NOTCOMPLETED: " + course);
        Completed.splice(index, 1);
      }
      this.$forceUpdate();
    },
    getPrereqs (course) {
      let allPrereqs = new Set();
      return Array.from(this.getPrereqsHelper(course, allPrereqs));
    },
    getPrereqsHelper (id, set) {

      Curriculum.forEach((course) => {
        if (course.id === id) {
          course.information.prereqs.prereqsold.flat().forEach((prereq) => {
            let size = set.size;
            set.add(prereq);
            if (set.size === size) { // No new things to check
              // No
            } else { // New things to check
              this.getPrereqsHelper(prereq, set);
            }
          });
        }
      });
      return set;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
