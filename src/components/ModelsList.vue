<template>
  <div>
    <el-row v-if="hasModel">
      <h4>2. Models</h4>
      <div class="list-group">
        <el-row :gutter="3">
          <el-col v-for="(value,key) in models" :key="key" :span="8">
            <el-button :key="key" v-on:click="selectModel(key)" v-bind:type="(key === activeModel ? 'primary': '')">{{key}}</el-button>
          </el-col>
        </el-row>
      </div>
    </el-row>
    <el-row v-else>
      <el-col>
        <h4>2. Add a model</h4>
        <p>Choose one or more models from the library</p>
      </el-col>
    </el-row>
    <el-button type="primary" icon="menu" v-on:click="appendModel">Add model</el-button>
  </div>




    <!--<div class="modal fade" id="modal-create-model" tabIndex="-1" role="dialog">-->
      <!--<div class="modal-dialog" role="document">-->
        <!--<div class="modal-content">-->
          <!--<div class="modal-header">-->
            <!--<h4>Add a Model</h4>-->
          <!--</div>-->
          <!--<div class="modal-body">-->
            <!--<form>-->
              <!--<div class="cmb-model-selection">-->

              <!--</div>-->
              <!--<div class="model-parameters">-->

              <!--</div>-->
            <!--</form>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->


</template>

<script>


  export default {
    name: 'ModelsList',

    computed: {

      hasModel: function () {
        return this.$store.getters.hasModels;
      },
      models: function () {
        return this.$store.getters.getModels;
      },
      activeModel: function(){
        return this.$store.getters.activeModel;
      }

    },
    methods: {
      selectModel: function (key) {
        console.log('key', key);
        this.$store.state.activeModel = key;
      },
      appendModel: function(){
        this.$store.dispatch('appendModel',{model:'SIR',params:{beta:0.1,infected:0.2,gamma:0.01}});
      }
    }
  }
</script>

<style>
  .list-group .el-row{
    margin: 4px auto
  }
  .list-group .el-row button{
    width:100%;
    margin-bottom: 5px;
  }
</style>
