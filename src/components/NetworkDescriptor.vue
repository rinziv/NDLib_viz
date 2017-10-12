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
          <el-button type="primary" icon="plus" @click="dialogFormVisible = true">Create Network</el-button>
        </el-col>
      </el-row>

      <el-dialog title="Create a network" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="Generator" :label-width="formLabelWidth">
            <el-select v-model="form.values.generator" placeholder="Please select a generator">
              <el-option v-for="g in availableGenerators" :key="g.name" :label="g.name" :value="g.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-for="(v, k) in generatorDescriptors[form.values.generator]"
            :label="v.label"
            :key="k"
            :prop="form.values[form.values.generator][k]"
            :rules="{
                required: true, message: 'required parameter', trigger: 'blur'
            }"
          >
            <el-input v-model="form.values[form.values.generator][k]"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="createNetwork">Confirm</el-button>
        </span>
      </el-dialog>
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
        dialogFormVisible: false,
        form: {
          values:{
            generator: 'ERGraph',
            ERGraph:{},
            BAGraph: {},
            WattsStrogatzGraph: {},
            CompleteGraph: {}
          },
        },
        formLabelWidth: '120px',
        generatorDescriptors: {
          ERGraph:{
            n: {
              label: "number of nodes",
              range: [200,3000]
            },
            p:{
              label: "rewiring probability",
              range: [0,1]
            }
          },
          BAGraph:{
            n: {
              label: "number of nodes",
              range: [200,3000]
            },
            m:{
              label: "number of edges attached to a new node",
              range: [1,50]
            }
          },
          WattsStrogatzGraph:{
            n: {
              label: "number of nodes",
              range: [200,3000]
            },
            k:{
              label: "Each node is connected to k nearest neighbors in ring topology",
              range: [1,50]
            },
            p:{
              label: "rewiring probability",
              range: [0,1]
            }
          },
          CompleteGraph:{
            n: {
              label: "number of nodes",
              range: [200,3000]
            },
          }
        }
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
        console.log("form", this.form.values);
        var selectedGenerator = this.form.values.generator;
        var uri = this.$store.getters.availableGenerators.filter(function(g){
          return g.name === selectedGenerator
        })[0].uri.split('/').slice(-1)[0];

        this.$store.dispatch('generateNetwork',{
          generator:uri,
          params:this.form.values[selectedGenerator]
        });

//        this.$store.dispatch('generateNetwork',{generator:'ERGraph',params:{n:500,p:0.01}});

        this.dialogFormVisible = false;
      },
    }
  }
</script>

<style>

</style>
