<template>
  <div class="hello">
    <h1>{{ Banner.title }}</h1>
    <h6>{{ Banner.subtitle }}</h6>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  props: {
    Banner: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: 2rem;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
