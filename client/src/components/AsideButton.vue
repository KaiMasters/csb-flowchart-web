<template>
  <div 
   :id="'CourseCollapsible_' + Course.id"
   v-on:click="toggleExpanded"
   v-bind:class="{ expanded: isExpanded }"
  >
    <span v-if="!isExpanded">+</span>
    <span v-if="isExpanded">-</span>
    <span>{{ Course.information.dept }} {{ Course.information.coursenum }}</span>
    <div v-if="isExpanded === true">
      {{ Course.information.description }} HELLO
    </div>
  </div>
</template>

<script>

export default {
  name: 'CourseButton',
  props: {
    Course: Object
  },
  data () {
    return {
      isExpanded: false
    }
  },
  methods: {
    toggleExpanded () {
      this.isExpanded = !this.isExpanded;
    }
  }
}
</script>

<style scoped>

span {
  display: inline;
  font-size: 2em;
  margin-block-start: 0.3em;
  margin-block-end: 0.3em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}

div {
  font-size: 0.5em;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid black;
  transition: .3s;
  margin: 0.2%;
  background-color: #C62828;
  color: white;
  overflow: hidden;
  display: inline-block;
  text-align: center;
  background-clip: padding-box;
}

div:hover {
  background-color: #E53935;
}

div.expanded {
  background-color: #EF9A9A;
  color: black;
}

div.expanded:hover {
  background-color: #FFCDD2;
}


</style>
