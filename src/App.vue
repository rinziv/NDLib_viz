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
      <Experiment></Experiment>
    </div>

  </div>
</template>

<script>

  import Experiment from './components/Experiment'


export default {
  name: 'app',
  components: {
    Experiment
  }

}
</script>

<style>

</style>
