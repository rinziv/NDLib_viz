<template>
    <div>
      <el-row v-if="hasNetwork">
        <h4>1. Network</h4>
        <el-col :span="12"><strong># nodes:</strong> {{this.$store.getters.getNumNodes}}</el-col>
        <el-col :span="12"><strong># edges:</strong> {{this.$store.getters.getNumEdges}}</el-col>
      </el-row>
      <el-row v-else>
        <el-col>
          <h4>1. Create Network</h4>
          <p>Create a network to run your simulation</p>
          <el-button type="primary" icon="plus" @click="createNetwork">Create Network</el-button>
        </el-col>
      </el-row>
    </div>

  <!--<div class="row">-->
  <!--<p>No network loaded. Create a new one</p>-->
  <!--<div class="input-group">-->
  <!--<select name="network-generator-cmb" id="network-generator-name" class="form-control" v-model="generator">-->
  <!--<option v-for="model in availableGenerators">{{model.name}}</option>-->
  <!--</select>-->
  <!--<span class="input-group-btn">-->
  <!--<button class="btn btn-default" type="button" v-on:click="createNetwork">Create...</button>-->
  <!--</span>-->
  <!--</div>-->

  <!--<div class="row mt-2">-->
  <!--<form class="form-horizontal">-->
  <!--<div class="form-group">-->
  <!--<label for="input1" class="col-sm-2">Label</label>-->
  <!--<div class="col-sm-10">-->
  <!--<input type="text" class="form-control" id="input1">-->
  <!--</div>-->
  <!--</div>-->
  <!--</form>-->
  <!--</div>-->

  <!--</div>-->

</template>

<script>



  export default {
    name: 'NetworkDescriptor',
    data: function () {
      return {
        generator:'ERGraph'
      }
    },
    computed:{
      hasNetwork: function (){
        return this.$store.getters.isNetworkEmpty;
      },
      availableGenerators: function () {
        return this.$store.getters.availableGenerators;
      },
      generatorParameters: function(){
        var that = this;
        return Object.keys(this.$store.state.availableGenerators.filter(function(g){
          return g.name === that.generator;
        })[0].params);
      },

    },
    methods:{
      createNetwork: function () {
        this.$store.dispatch('generateNetwork',{generator:'ERGraph',params:{n:500,p:0.01}});
      }
    }
  }
</script>

<style>

</style>
