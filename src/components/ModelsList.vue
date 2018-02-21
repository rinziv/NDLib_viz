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
    <el-button type="primary" icon="menu" @click="dialogFormVisible = true">Add model</el-button>

    <el-dialog title="Append a model" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="Model" :label-width="formLabelWidth">
          <el-select v-model="form.values.model" placeholder="Please select a model">
            <el-option v-for="(g,k) in availableModels" :key="g.name" :label="g.name" :value="g.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-for="(v, k) in availableModels[form.values.model].params"
          :label= "(v.label + ' (' + k +')')"
          :key="k"
          :prop="form.values[form.values.model][k]"
          :rules="{
                required: true, message: 'required parameter', trigger: 'blur'
            }"
        >
          <el-input v-model="form.values[form.values.model][k]"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="appendModel">Confirm</el-button>
        </span>
    </el-dialog>

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
    data: function () {
      return {
        dialogFormVisible: false,
        form: {
          values:{
            model: 'SIR',
            SIR:{},
            SI: {},
            SIS: {},
            SEIS: {},
            SEIR: {},
            SWIR: {},
            Threshold: {},
            Profile: {},
            "Profile-Threshold": {},
            "Independent Cascades": {},
            "Voter": {},
            "QVoter": {},
            "Majority Rule": {},
            "Sznajd": {},
            "KerteszThreshold": {}
          },
        },
        formLabelWidth: '120px',

      }
    },
    computed: {

      hasModel: function () {
        return this.$store.getters.hasModels;
      },
      models: function () {
        return this.$store.getters.getModels;
      },
      activeModel: function(){
        return this.$store.getters.activeModel;
      },
      availableModels: function(){
        return this.$store.getters.availableModels;
      }

    },
    methods: {
      selectModel: function (key) {
        console.log('key', key);
        this.$store.state.activeModel = key;
      },
      appendModel: function(){
        console.log("form", this.form.values);
        var selectedModel = this.form.values.model;
        var uri = this.$store.getters.availableModels[selectedModel].uri.split('/').slice(-1)[0];

        this.$store.dispatch('appendModel',{
          model:selectedModel,
          params:this.form.values[selectedModel]
        });


        this.dialogFormVisible = false;


        //this.$store.dispatch('appendModel',{model:'SIR',params:{beta:0.1,infected:0.2,gamma:0.01}});
      }
    },
    watch: {
      availableModels: function(models){
        console.log("All models watch", models);
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
