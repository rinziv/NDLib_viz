<template>
  <div class="row">
    <div class="experiment-token col-md-4">
      <strong style="display:block">Experiment ID: </strong> {{ $store.state.token }}
    </div>
  </div>
</template>

<script>



  export default {
    name: 'Experiment',
    created:  function(){
      console.log("created app");
      this.$store.dispatch('createExperiment');
      this.$store.dispatch('loadNetworkGeneratorEndpoints');
      this.$store.dispatch('loadModelsEndpoints');
    },
    mounted: function(){
      console.log("mounted");
      console.log("token", this.$store.state.token);

    },

  }
</script>

<style>

</style>
