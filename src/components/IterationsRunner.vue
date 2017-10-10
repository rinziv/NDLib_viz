<template>
    <div v-if="hasModel">
      <h4>3. Run iterations</h4>
      <p>Execute the model over the network</p>
      <p>Which model(s) to use for the simulation? <el-switch
        v-model="applyToAll" :width=120
        on-text="All models"
        off-text="Active model"
        off-color="#13ce66">
      </el-switch></p>
      <el-slider :min="1" show-tooltip show-input v-model="nIterations"></el-slider>
      <el-button type="primary" icon="caret-right" v-on:click="runIterations" v-bind:loading="isLoading">Run Iterations</el-button>
    </div>
    <div v-else>
      <h4>3. Run iterations</h4>
      <p>Create a network and (at least) a model to run iterations.</p>
    </div>
</template>

<script>

  export default {
    name: 'IterationsRunner',
    data: function(){
      return {
        nIterations:50,  // default number of iterations to run
        applyToAll: true, // choose if the iterations are run for all models
        isLoading: false
      }
    },
    computed:{
      hasModel: function(){
        return this.$store.getters.hasModels;
      }
    },
    methods:{
      runIterations: function(){
        var that = this;
        that.isLoading = true;

        var p = this.$store.dispatch('iterate',{bunch:this.nIterations})
          .then(function(resp){
            console.log("notloading");
            that.isLoading = false;
          });
      }
    }
  }
</script>

<style>

</style>
