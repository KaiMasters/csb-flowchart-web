<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <ul id="courseList">
      <li v-for="course in Curriculum">
        <CourseButton :Course="course"></CourseButton>
      </li>
    </ul>
    
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import CourseButton from './components/CourseButton.vue'
import Vue from 'vue'
import Curriculum from '../../server/data/db/CURRICULUM.json'

console.log(Curriculum);

export default {
  name: 'app',
  components: {
    HelloWorld,
    CourseButton
  },
  data () {
    return {
      Curriculum
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
