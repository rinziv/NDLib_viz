<template>
    <!--<div class="experiment-token col-md-4">-->
      <!--<h5>Experiment ID: </h5> {{ $store.state.token }}-->
    <!--</div>-->
</template>

<script>

  export default {
    name: 'Experiment',

    created:  function(){
      this.$store.dispatch('createExperiment');
      this.$store.dispatch('loadModelsEndpoints');
      this.$store.dispatch('loadNetworkGeneratorEndpoints');

    },


  }
</script>

<style>

</style>
