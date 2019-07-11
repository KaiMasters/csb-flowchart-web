<template>
  <div id="app">
    <Banner 
      :Banner="CSB2023.banner"
    />
    <Viewport
      :CompletedCourseList="Completed"
      :CourseList="Curriculum"
      :TransferList="TRANSFER"
      v-on:updateCompleted="updateCompleted"
    />
  </div>
</template>

<script>
import Banner from './components/Banner.vue'
import Viewport from './components/Viewport.vue'
import Vue from 'vue'

import CURRICULUM from '../../server/data/db/CURRICULUM.json'
import TRANSFER from '../../server/data/db/TRANSFER_CREDIT.json'

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
  let i = mapContains(course.id, CSB2023.display);
  if (i !== -1) {
    return true;
  } else {
    return false;
  }
}).map((course, index, list) => {
  let i = mapContains(course.id, CSB2023.display);
  course.view = {...CSB2023.display[i].view};
  return course;
}))

export default {
  name: 'app',
  components: {
    Viewport,
    Banner
  },
  data () {
    return {
      Curriculum,
      TRANSFER,
      Completed,
      CSB2023
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
  width: 100%;
  height: 100vh;
}


body {
  margin: 0;
}


</style>
