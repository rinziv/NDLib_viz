<template>
    <el-col :span="8">
      <h4>3. Run iteration</h4>
      <p>Execute the model over the network</p>
      <el-button type="primary" icon="caret-right" v-on:click="runIterations">Run Iterations</el-button>
    </el-col>
</template>

<script>

  export default {
    name: 'IterationBrowser',

    computed:{

    },
    methods:{
      runIterations: function(){
        this.$store.dispatch('iterate',{bunch:20});
      }
    }
  }
</script>

<style>

</style>
