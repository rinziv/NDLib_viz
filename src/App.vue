<template>
  <div id="app" class="container page-component">
    <Experiment></Experiment>

    <el-row>
      <h1 class="h1">Network Diffusion Library</h1>
    </el-row>
    <el-row :gutter="5">
      <NetworkDescriptor></NetworkDescriptor>
      <ModelsList></ModelsList>
      <IterationsBrowser></IterationsBrowser>
    </el-row>
    <el-row>
      <NetworkViewer></NetworkViewer>
      <ModelStatsViewer></ModelStatsViewer>
    </el-row>
  </div>
</template>

<script>


  import Experiment from './components/Experiment'
  import NetworkDescriptor from './components/NetworkDescriptor'
  import ModelsList from './components/ModelsList'
  import IterationsBrowser from './components/IterationsBrowser'
  import NetworkViewer from './components/NetworkViewer'
  import ModelStatsViewer from './components/ModelStatsViewer'

export default {
  name: 'app',

  components: {
    Experiment,
    NetworkDescriptor,
    ModelsList,
    IterationsBrowser,
    NetworkViewer,
    ModelStatsViewer
  }
}
</script>

<style>
  #app {
    font-family: "Helvetica Neue", Helvetica, sans-serif;
  }
</style>
