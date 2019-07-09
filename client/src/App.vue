<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div class="columns" id="viewport">
      <Aside 
        msg="Hi"
        :CourseList="Curriculum"
      />
      <Canvas
        :CourseList="Curriculum"
        :CompletedCourseList="Completed"
        v-on:updateCompleted="updateCompleted"
      />
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Canvas from './components/Canvas.vue'
import Aside from './components/Aside.vue'
import Vue from 'vue'
import CURRICULUM from '../../server/data/db/CURRICULUM.json'
import Completed from '../../server/data/COMPLETED.json'
import CSB2023 from '../../server/data/map/CSB2023.json'

const mapContains = (id, map) => {
  let ret = -1;
  map.forEach((course, index) => {
    if (course.id === id) {
      ret = index;
    }
  });
  return ret;
};

const sortCourses = (list) => {
  return list.sort((a, b) => {
    if (a.id.substr(0, 3) >= b.id.substr(0, 3)) {
      // TODO better sort
      return 1;
    } else {
      return -1;
    }
  });
};

let Curriculum = sortCourses(CURRICULUM.filter((course, index, list) => {
  let i = mapContains(course.id, CSB2023);
  if (i !== -1) {
    return true;
  } else {
    return false;
  }
}).map((course, index, list) => {
  let i = mapContains(course.id, CSB2023);
  course.view = {...CSB2023[i].view};
  return course;
}))
// .map((course, index, list) => {
//   let i = mapContains(course.id, CURRICULUM);
//   course.information = {...CURRICULUM[i].information};
//   return course;
// });

// console.log(Curriculum);

export default {
  name: 'app',
  components: {
    HelloWorld,
    Canvas,
    Aside
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
        Completed.push(course);
        this.getPrereqs(course).forEach((prereq) => {
          if (Completed.indexOf(prereq) === -1) {
            Completed.push(prereq);
          }
        });
      } else {
        // Remove course
        Completed.splice(index, 1);
        for (let i = 0; i < 2; i++) { // TODO: figure out why this needs to be done twice
          Completed.forEach((crs, idx) => { // Remove dependent courses
            if (this.getPrereqs(crs).indexOf(course) !== -1) {
              Completed.splice(idx, 1);
            }
          });
        }
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
          course.information.prereqs._2019.flat().forEach((prereq) => {
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
  font-family: "Avenir", 'Montserrat', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 100%;
  height: 100vh;
}


body {
  margin: 0;
}

#viewport {
  height: 95%;
  width: 100%;
  margin: 0;
}


</style>
