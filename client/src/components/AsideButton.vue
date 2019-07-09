<template>
  <div 
   :id="'CourseCollapsible_' + Course.id"
   v-bind:class="{ expanded: isExpanded }"
   class="asideButton"
  >
    <div class="collapsibleMain columns" v-on:click="toggleExpanded">
      <span class="collapsibleSign column is-one-quarter">
        <div v-if="!isExpanded" class="plusMinus">+</div>
        <div v-if="isExpanded" class="plusMinus">-</div>
      </span>
      <span class="collapsibleText column is-three-quarters">
        <span>{{ Course.information.dept }} {{ Course.information.coursenum }}</span>
      </span>
    </div>
    <transition name="expand">
      <div v-if="isExpanded === true" class="content">
        <div class="info">
          <div>
            <strong>Title:</strong> {{ Course.information.title }}
          </div>
          <div>
            <strong>Credits:</strong> {{ Course.information.credits }}
          </div>
        </div>
        <div class="description">
          <strong>Description:</strong>
          {{ Course.information.coursedesc }}
        </div>
      </div>
    </transition>
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

div.asideButton {
  display: inline;
  vertical-align: middle;
}

span.collapsibleSign {
  font-size: 2.6rem;
  margin: 0;
  padding: 0;
  vertical-align: middle;
  line-height: 1rem;
}

span.collapsibleText {
  font-size: 1.5rem;
  text-align: left;
  padding: 5%;
  height: 90%;
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
  line-height: 1.5rem;
  font-weight: bold;
}

.content {
  font-size: .75rem;
  border-top: 2px solid black;
  cursor: default;
  text-align: left;
  margin: 0 5%;
  user-select: auto;
}

.plusMinus {
  vertical-align: middle;
  padding: 25%;
  height: 50%;
}

div.description {

}

div.info {

}

div.expand-enter, div.expand-leave-to {
  height: 0;
}

div.expand-enter-to, div.expand-leave {
  height: 100%;
}

div.expand-enter-active, div.expand-leave-active {
  transition: height 1.5s all;
}

</style>
