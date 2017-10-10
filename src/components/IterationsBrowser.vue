<template>
    <div v-if="hasActiveModel">
      <span>Iterations</span>
      <el-slider
        v-model="currentIteration"
        :step="1"
        show-stops>
      </el-slider>
    </div>
</template>

<script>

  export default {
    name: 'IterationsRunner',

    computed:{
      hasActiveModel: function(){
        return this.$store.getters.getActiveModel;
      },
      currentIteration: {
        get: function(){
          return this.$store.getters.currentIteration;
        },
        set: function(newValue){
          this.$store.commit('updateCurrentIteration', newValue);
        }
      }
    },
    methods:{

    }
  }
</script>

<style>

</style>
