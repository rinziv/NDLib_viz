<template>
  <div id="app" class="page-container">
    <Experiment></Experiment>

    <el-row>
      <h1 class="h1">Network Diffusion Library</h1>
    </el-row>
    <el-row :gutter="5">
      <el-col :sm="8"><NetworkDescriptor></NetworkDescriptor></el-col>
      <el-col :sm="8"><ModelsList></ModelsList></el-col>
      <el-col :sm="8"><IterationsRunner></IterationsRunner></el-col>
    </el-row>
    <el-row>
      <IterationsBrowser></IterationsBrowser>
    </el-row>
    <el-row :gutter="5">
      <el-col :md="12">
        <NetworkViewer></NetworkViewer>
      </el-col>
      <el-col :md="12">
        <ModelStatsViewer></ModelStatsViewer>
      </el-col>
    </el-row>
  </div>
</template>

<script>


  import Experiment from './components/Experiment'
  import NetworkDescriptor from './components/NetworkDescriptor'
  import ModelsList from './components/ModelsList'
  import IterationsRunner from './components/IterationsRunner'
  import NetworkViewer from './components/NetworkViewer'
  import ModelStatsViewer from './components/ModelStatsViewer'
  import IterationsBrowser from './components/IterationsBrowser.vue'

export default {
  name: 'app',

  components: {
    Experiment,
    NetworkDescriptor,
    ModelsList,
    IterationsRunner,
    NetworkViewer,
    ModelStatsViewer,
    IterationsBrowser
  }
}
</script>

<style>
  body {
    font-family: "Helvetica Neue", Helvetica, sans-serif;
  }

  #app{
    width: 1140px;
    padding: 0 30px;
    margin: 0 auto;
  }

</style>
