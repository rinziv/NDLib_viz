<template>
  <div id="app" class="container">
    {{ $store.state.token }}
  </div>
</template>

<script>


export default {
  name: 'app',
  created:  function(){
    console.log("created app");
    this.$store.dispatch('createExperiment');
  },
  mounted: function(){
    console.log("mounted");
    console.log("token", this.$store.state.token);

  },

}
</script>

<style>

</style>
