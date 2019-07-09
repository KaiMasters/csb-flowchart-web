<template>
  <div 
   :id="'CourseCollapsible_' + Course.id"
   v-bind:class="{ expanded: isExpanded }"
   class="asideButton"
  >
    <div class="collapsibleMain columns" v-on:click="toggleExpanded">
      <span class="collapsibleSign column is-one-quarter">
        <span v-if="!isExpanded" class="plusMinus">+</span>
        <span v-if="isExpanded" class="plusMinus">-</span>
      </span>
      <span class="collapsibleText column is-three-quarters">
        <span>{{ Course.information.dept }} {{ Course.information.coursenum }}</span>
      </span>
    </div>
    
    <div v-if="isExpanded === true" class="content">
      <div class="columns">
        <div class="column">
          <div v-if="Course.information.credits === 1">{{ Course.information.credits }} Credit</div>
          <div v-if="Course.information.credits !== 1">{{ Course.information.credits }} Credits</div>
        </div>
        <div class="column">
          {{ Course.information.title }}
        </div>
      </div>
      {{ Course.information.coursedesc }}
    </div>
  </div>
</template>

<script>

export default {
  name: 'AsideButton',
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
  margin-block-start: 0.1em;
  margin-block-end: 0.1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  vertical-align: middle;
}

span.collapsibleSign {
  font-size: 2.6rem;
  margin: 0;
  padding: 0;
  vertical-align: middle;
}

span.collapsibleText {
  font-size: 1.5rem;
  text-align: left;
}

div.asideButton {
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

div.asideButton:hover {
  background-color: #E53935;
}

div.expanded {
  background-color: #EF9A9A;
  color: black;
}

div.expanded:hover {
  background-color: #FFCDD2;
}

div.collapsibleMain {
  margin: 0;
  line-height: 1rem;
}

.content {
  font-size: .75rem;
  border-top: 2px solid black;
  cursor: default;
}

.plusMinus {
  height: 100%;
  vertical-align: middle;
  padding: 5% 0;
}

</style>
