<template>
  <div 
   :id="'TransferToggle_' + Transfer.transferid"
  >
    {{Transfer.transferid}}
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

</style>
