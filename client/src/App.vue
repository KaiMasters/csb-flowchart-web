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
      const index = this.findCourseById(course.id);
      if (index === -1) {
        Completed.push(course);
      } else {
        Completed[index].completed = course.completed;
      }
      this.$forceUpdate();
    },
    findCourseById (id) {
      for (let i = 0; i < Completed.length; i++) {
        if (id === Completed[i].id) {
          return i;
        }
      }
      return -1;
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
