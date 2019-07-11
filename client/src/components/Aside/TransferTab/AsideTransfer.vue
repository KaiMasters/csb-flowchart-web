<template>
  <div>
    <div v-for="transfer in TransferList" v-bind:key="'AsideTransferButton_' + transfer.transferid">
      <AsideTransferButton :Transfer="transfer"/>
    </div>
  </div>
</template>

<script>

import AsideTransferButton from './AsideTransferButton.vue'

export default {
  name: 'AsideTransfer',
  components: {
    AsideTransferButton
  },
  props: {
    TransferList: Array
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
