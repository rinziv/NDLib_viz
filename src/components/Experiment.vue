<template>
  <div class="row">
    <div class="experiment-token col-md-4">
      <h5>Experiment ID: </h5> {{ $store.state.token }}
    </div>
    <div class="experiment-network col-md-4">
      <h5>Network</h5>
      <div v-if="hasNetwork">network description</div>
      <div v-else>
        <div class="row">
          <p>No network loaded. Create a new one</p>
          <div class="input-group">
            <select name="network-generator-cmb" id="network-generator-name" class="form-control" v-model="generator">
              <option v-for="model in availableGenerators">{{model.name}}</option>
            </select>
            <span class="input-group-btn">
          <button class="btn btn-default" type="button" v-on:click="createNetwork">Create...</button>
        </span>
        </div>

          <div class="row mt-2">
            <form class="form-horizontal">
              <div class="form-group">
                <label for="input1" class="col-sm-2">Label</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="input1">
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
    <div class="experiment-models col-md-4">
      <h5>Models</h5>
      <div v-if="hasModel">model list</div>
      <div v-else>No model loaded. Create a new one</div>
    </div>
  </div>
</template>

<script>



  export default {
    name: 'Experiment',
    data: function () {
      return {
        generator:'ERGraph'
      }
    },
    created:  function(){
      this.$store.dispatch('createExperiment');
      this.$store.dispatch('loadNetworkGeneratorEndpoints');
      this.$store.dispatch('loadModelsEndpoints');
    },
    computed:{
      hasNetwork: function (){
        return this.$store.getters.isNetworkEmpty;
      },
      hasModel: function () {
        return this.$store.getters.hasModels;
      },
      availableGenerators: function () {
        return this.$store.getters.availableGenerators;
      },
      generatorParameters: function(){
        var that = this;
        return Object.keys(this.$store.state.availableGenerators.filter(function(g){
          return g.name === that.generator;
        })[0].params);
      }
    },
    methods:{
      createNetwork: function () {
        console.log(this.generator);
        console.log(this.generatorParameters);
      }
    }

  }
</script>

<style>

</style>
