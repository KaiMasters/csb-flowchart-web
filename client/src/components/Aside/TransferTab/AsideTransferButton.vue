<template>
  <div 
   :id="'TransferToggle_' + Transfer.transferid"
   class="main"
  >
    <div class="columns is-gapless">
      <div class="column is-two-thirds">
        <span class="text">{{Transfer.transferid}}</span>
      </div>
      <div class="column is-one-third">
        <span class="button">
          <select name="">
            <option v-for="(t, index) in Transfer.transfer" v-bind:key="'TransferToggle_' + Transfer.transferid + '_Option_'+ index">
              {{t.categories}}
            </option>
          </select>
        </span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AsideTransferButton',
  props: {
    Transfer: Object
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>

div.main {
  font-size: .75rem;
  width: 90%;
  height: 100%;
  border-radius: 5px;
  padding: 2% 5%;
  border: 1px solid black;
  transition: .3s;
  margin: 0.2%;
  background-color: #C62828;
  color: white;
  overflow: hidden;
  display: inline-block;
  text-align: left;
  background-clip: padding-box;
}

span.text {
  vertical-align: middle;
  display: inline;
}

span.button {
  vertical-align: middle;
  width: 100%;
  overflow: hidden;
  margin: auto;
  border: 0;
  cursor: pointer;
  padding: 0; 
}


.fill {
  vertical-align: middle;
}

select {
  width: 100%;
  height: 100%;
  border: 0;
  cursor: pointer;
}

</style>
