<template>
  <div id="aside" class="column is-one-quarter">
    <select v-model="dropdownState">
      <option value="1">Courses</option>
      <option value="2">AP/Transfer Credit</option>
    </select>
    <div id="aside-container">
      <div v-if="dropdownState === '1'">
        <AsideCourses :CourseList="CourseList"/>
      </div>
      <div v-if="dropdownState === '2'">
        <AsideTransfer :TransferList="TransferList"/>
      </div>
    </div>
  </div>
</template>

<script>
import AsideCourses from './CoursesTab/AsideCourses.vue'
import AsideTransfer from './TransferTab/AsideTransfer.vue'

export default {
  name: 'Aside',
  components: {
    AsideCourses,
    AsideTransfer
  },
  props: {
    msg: String,
    CourseList: Array,
    TransferList: Array
  },
  data () {
    return {
      dropdownState: '2'
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
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
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
