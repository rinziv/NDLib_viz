<template>
  <div id="app">
    <nav class="navbar bg-dark navbar-static-top navbar-inverse">
      <a class="navbar-brand" href="#">NDLib</a>
      <div class="navbar-collapse collapse"></div>
    </nav>
    <div class="container">
      <div class="jumbotron">
        <h1>Network Diffusion Library</h1>
      </div>
      <div class="row">
        <Experiment></Experiment>
        <NetworkDescriptor></NetworkDescriptor>
        <ModelsList></ModelsList>
      </div>
      <div class="row">
        <IterationsBrowser></IterationsBrowser>
        <NetworkViewer></NetworkViewer>
      </div>

    </div>
  </div>
</template>

<script>
  import Experiment from './components/Experiment'
  import NetworkDescriptor from './components/NetworkDescriptor'
  import ModelsList from './components/ModelsList'
  import IterationsBrowser from './components/IterationsBrowser'
  import NetworkViewer from './components/NetworkViewer'

export default {
  name: 'app',

  components: {
    Experiment,
    NetworkDescriptor,
    ModelsList,
    IterationsBrowser,
    NetworkViewer
  }
}
</script>

<style>

</style>
