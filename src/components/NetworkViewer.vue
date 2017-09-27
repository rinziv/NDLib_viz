<template>
    <div class="experiment-newtork-viewer col-md-12">
      <h4>Network</h4>
      <canvas :width="width" :height="height" id="netviz" ref="netviz"></canvas>
    </div>
</template>

<script>

  var d3Force = require('d3-force');
  var d3Selection = require('d3-selection');
  var d3 = require('d3');

  function NetworkLayout(){
    var graph = {};

    var simulation = d3Force.forceSimulation()
      .force("charge", d3Force.forceManyBody().strength(-30))
      .force("link", d3Force.forceLink().distance(30).id(function(d) { return d.id; }))
      .force("x", d3Force.forceX())
      .force("y", d3Force.forceY())
      ;
    var ctx ;
    var width = 500;
    var height = 500;


    function me(selection){
      graph = selection.datum();
      ctx = selection.node().getContext("2d");

      console.log("datum", selection.datum());
      simulation
        .nodes(graph.nodes)
        .on("tick", tick);
      simulation
        .force("link").links(graph['links']);

      simulation.restart();
    }

    function tick(){
      console.log("tick");
      ctx.clearRect(0,0,width,height);
      ctx.save();
      ctx.translate(width/2, height/2);
      // draw links
      ctx.strokeStyle = "lightgray";
      // context.globalCompositeOperation = 'overlay';
      ctx.globalAlpha = 0.1;
      ctx.beginPath();
      graph.links.forEach(function(d) {
        ctx.moveTo(d.source.x, d.source.y);
        ctx.lineTo(d.target.x, d.target.y);
      });
      ctx.stroke();

      // draw nodes
      ctx.fillStyle = 'steelblue';
      ctx.globalAlpha = 1.0;
      ctx.beginPath();

      graph.nodes.forEach(function(d){
        ctx.moveTo(d.x,d.y);
        ctx.arc(d.x, d.y, 4.5, 0, 2 * Math.PI);
      })
      ctx.fill();
      ctx.restore();
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
    },
    computed:{
      network: function(){
        return this.$store.getters.getNetwork;
      }
    },
    watch:{
      network: function(newNetwork){
        console.log("newNetwork", newNetwork);
        d3Selection.select(this.$refs.netviz)
          .datum({
            nodes:newNetwork.nodes,
            links: newNetwork.links
          })
          .call(this.networkLayout);
      }
    }
  }
</script>

<style>

</style>
