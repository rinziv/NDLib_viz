<template>
    <div class="experiment-network col-md-4">
      <h4>Models</h4>
      <div v-if="hasModel" class="row">
        <div class="list-group">
          <a v-for="(value,key) in models" href="#" class="list-group-item ">
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
        <div class="row">
          <p>No model loaded. Create a new one</p>
        </div>
      </div>
    </div>
</template>

<script>



  export default {
    name: 'ModelsList',

    computed:{

      hasModel: function () {
        return this.$store.getters.hasModels;
      },
      models: function(){
        return this.$store.getters.getModels;
      }
    },
  }
</script>

<style>

</style>
