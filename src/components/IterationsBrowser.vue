<template>
    <div v-if="hasModel">
      <h4>3. Run iterations</h4>
      <p>Execute the model over the network</p>
      <el-slider :min="1" show-tooltip show-input v-model="nIterations"></el-slider>
      <el-button type="primary" icon="caret-right" v-on:click="runIterations">Run Iterations</el-button>
    </div>
    <div v-else>
      <h4>3. Run iterations</h4>
      <p>Create a network and (at least) a model to run iterations.</p>
    </div>
</template>

<script>

  export default {
    name: 'IterationBrowser',
    data: function(){
      return {
        nIterations:10,
      }
    },
    computed:{
      hasModel: function(){
        return this.$store.getters.hasModels;
      }
    },
    methods:{
      runIterations: function(){
        this.$store.dispatch('iterate',{bunch:this.nIterations});
      }
    }
  }
</script>

<style>

</style>
