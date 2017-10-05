<template>
  <div class="experiment-network col-md-4">

    <div v-if="hasModel" class="row">
      <h4>2. Models</h4>
      <div class="list-group">
        <a v-for="(value,key) in models" :key="key" href="#" :id="key" class="list-group-item"
           v-on:click="selectModel(key)">
          <h4 class="list-group-item-heading">{{key}}</h4>
          <div class="row">
              <span v-for="(v,k) in value" class="col-md-6">
              <p class="list-group-item-text"><strong>{{k}}:</strong>{{v}}</p>
            </span>
          </div>
        </a>
      </div>
    </div>
    <div v-else>
      <h4>2. Add a model</h4>
      <p>Choose one or more models from the library</p>
      <p>
        <button type="button" class="btn btn-default" id="btn-create-model" data-toggle="modal"
                data-target="#modal-create-model">
          <span class="glyphicon glyphicon-modal-window" aria-hidden="true"></span> Add Model
        </button>
      </p>
    </div>
    <div class="modal fade" id="modal-create-model" tabIndex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4>Add a Model</h4>
          </div>
          <div class="modal-body">
            <form>
              <div class="cmb-model-selection">

              </div>
              <div class="model-parameters">

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

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
      }
    },
    methods: {
      selectModel: function (key) {
        console.log('key', key);
        this.$store.state.activeModel = key;
      }
    }
  }
</script>

<style>

</style>
