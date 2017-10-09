<template>
    <el-col :span="12">
      <h4>Network Visualization</h4>
      <canvas :width="width" :height="height" id="netviz" ref="netviz"></canvas>
    </el-col>
</template>

<script>

  var d3Force = require('d3-force');
  var d3Selection = require('d3-selection');
  var d3Zoom = require('d3-zoom');
  var d3Quadtree = require('d3-quadtree');
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

    var currentTransform = d3Zoom.zoomIdentity.translate(width/2,height/2);
    var qtree = d3Quadtree.quadtree()
      .x(function(d){return d.x})
      .y(function(d){return d.y});

    var theme = {
      odd: {
        evaluate: function(d){
          return d.id % 2 != 0
        },
        color: "pink"
      },
      even: {
        evaluate: function(d){
          return d.id % 2 ==0
        },
        color: "steelblue"
      }
    }


    function me(selection){
      graph = selection.datum();

      ctx = selection.node().getContext("2d");

      selection.call(d3Zoom.zoom().scaleExtent([0.2,8]).on("zoom", zoom))
      console.log("datum", selection.datum());
      simulation
        .nodes(graph.nodes)
        .on("end", function(){
          qtree.addAll(graph.nodes);
          // TODO: check if all nodes are visible. In case change zoom parameters
          tick();
        });

      if(isNetworkManageable()){
        simulation
          .on("tick", tick)
      }
      simulation
        .force("link").links(graph['links']);
      tick();
//      simulation.alpha(0.1);
//      simulation.restart();


    }

    function isNetworkManageable(){
      return graph.nodes && graph.nodes.length < 1000;
    }

    function zoom(){
      var transform = d3Selection.event.transform;
      currentTransform = transform.translate(width/2, height/2);
      ctx.clearRect(0, 0, width, height);

      tick();
      ctx.restore();
    }

    function isVisible(tl, br, d){
      return (d.x >= tl[0]) && (d.x < br[0]) && (d.y >= tl[1]) && (d.y < br[1])
    }

    function tick(){
      console.log("tick");
      ctx.save();
      ctx.clearRect(0,0,width,height);
      ctx.translate(currentTransform.x, currentTransform.y);
      ctx.scale(currentTransform.k, currentTransform.k);

      // select only visible features

      var offset = 0;
      var tl = currentTransform.invert([0+offset,0+offset]);
      var br = currentTransform.invert([width - offset,height-offset]);



//      qtree.visit(function(node, x1, y1, x2, y2) {
//        if (!node.length) {
//          do {
//            var d = node.data;
//            d.selected = (d.x >= tl[0]) && (d.x < br[0]) && (d.y >= tl[1]) && (d.y < br[1]);
//          } while (node = node.next);
//        }
//        return x1 >= br[0] || y1 >= br[1] || x2 < tl[0] || y2 < tl[1];
//      });


      // draw links
      ctx.strokeStyle = "lightgray";
      // context.globalCompositeOperation = 'overlay';
      ctx.globalAlpha = 0.4;
      ctx.beginPath();
      graph.links.forEach(function(d) {
        if(isNetworkManageable||(isVisible(tl,br,d.source) && isVisible(tl,br,d.target))){
          ctx.moveTo(d.source.x, d.source.y);
          ctx.lineTo(d.target.x, d.target.y);
        }

      });
      ctx.stroke();

      // draw nodes
      d3.entries(theme).forEach(function(e) {
        var currentColor = e.value['color'];
        ctx.fillStyle = currentColor;
        ctx.beginPath();
        graph.nodes
          .filter(e.value['evaluate'])
          .forEach(function (d) {
            if (isVisible(tl, br, d)) {
              ctx.moveTo(d.x, d.y);
              ctx.arc(d.x, d.y, 4.5, 0, 2 * Math.PI);
            }
          });
        ctx.fill()
      });


//
//      ctx.fillStyle = 'darkgray';
//      ctx.globalAlpha = 1.0;
//      ctx.beginPath();
//      graph.nodes.forEach(function(d){
//        if(isVisible(tl,br,d)){
//          ctx.moveTo(d.x,d.y);
//          ctx.arc(d.x, d.y, 4.5, 0, 2 * Math.PI);
//        }
//      })
//      ctx.fill();



//      ctx.fillStyle = 'red';
//      ctx.beginPath();
//      ctx.moveTo(tl[0],tl[1]);
//      ctx.arc(tl[0],tl[1],5,0,2*Math.PI);
//      ctx.moveTo(br[0],br[1]);
//      ctx.arc(br[0],br[1],5,0,2*Math.PI);
//      ctx.fill();
//
//      ctx.fillStyle = 'green';
//      ctx.beginPath();
//      ctx.moveTo(0,0);
//      ctx.arc(0,0,5,0,2*Math.PI);

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
