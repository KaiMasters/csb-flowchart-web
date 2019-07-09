<template>
  <div id="aside" class="column is-one-quarter">
    <select v-model="dropdownState">
      <option>Courses</option>
      <option>AP/Transfer Credit</option>
    </select>
    <div id="aside-container">
      <div v-if="dropdownState === 'Courses'">
        <div v-for="course in $props.CourseList" v-bind:key="'AsideButton_' + course.id">
          <AsideButton :Course="course"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AsideButton from './AsideButton.vue'

export default {
  name: 'Aside',
  components: {
    AsideButton
  },
  props: {
    msg: String,
    CourseList: Array
  },
  data () {
    return {
      dropdownState: 1
    }
  },
  methods: {
  }
}
</script>

<style scoped>


#aside {
  display: inline-block;
  padding: 0%;
}

select {
  width: 100%;
  height: 10%;
  border-radius: 15px 15px 0 0;
  color: white;
  background-color: #C62828;
  font-size: 1rem;
  padding-left: 5%;
  transition: .3s;
  cursor: pointer;
}

select:hover {
  background-color: #E53935;
}

select:focus {
  outline: none;
}

option {
  background-color: #EF9A9A;
  color: black;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
}

option:hover {
  background-color: #FFCDD2;
}

</style>
