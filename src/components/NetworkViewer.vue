<template>
    <div class="experiment-newtork-viewer col-md-12">
      <h4>Network</h4>
      <canvas :width="width" :height="height" id="netviz" ref="netviz"></canvas>
    </div>
</template>

<script>

  var d3 = require('d3');

  function NetworkLayout(){

    function me(selection){
      var ctx = selection.node().getContext("2d");
      var width = 500;
      var height = 500;
      console.log("dimensions",[width,height]);
      // draw links
      ctx.strokeStyle = "#000";
      // context.globalCompositeOperation = 'overlay';
      ctx.globalAlpha = 0.2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(width, height);
      ctx.moveTo(0,height);
      ctx.lineTo(width,0);

      ctx.stroke();
    }

    return me;
  }

  export default {
    name: 'NetworkViewer',
    data: function(){
      return {
        width:500,
        height: 500,
        networkLayout: NetworkLayout()
      }
    },
    mounted:function(){
      var width = this.$refs.netviz.clientWidth;
      var height = this.$refs.netviz.clientHeight;
      console.log(this.$refs.netviz);
      d3.select(this.$refs.netviz).call(this.networkLayout);
    },
    computed:{

    },
  }
</script>

<style>

</style>
