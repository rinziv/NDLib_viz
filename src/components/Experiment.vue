<template>
    <div class="experiment-token col-md-4">
      <h4>Experiment ID: </h4> {{ $store.state.token }}
    </div>
</template>

<script>

  export default {
    name: 'Experiment',

    created:  function(){
      this.$store.dispatch('createExperiment');
      this.$store.dispatch('loadNetworkGeneratorEndpoints');
      this.$store.dispatch('loadModelsEndpoints');
    },


  }
</script>

<style>

</style>
