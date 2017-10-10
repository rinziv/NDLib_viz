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
//  var d3 = require('d3');



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
//      d3.entries(theme).forEach(function(e) {
//        var currentColor = e.value['color'];
//        ctx.fillStyle = currentColor;
//        ctx.beginPath();
//        graph.nodes
//          .filter(e.value['evaluate'])
//          .forEach(function (d) {
//            if (isVisible(tl, br, d)) {
//              ctx.moveTo(d.x, d.y);
//              ctx.arc(d.x, d.y, 4.5, 0, 2 * Math.PI);
//            }
//          });
//        ctx.fill()
//      });


        graph.nodes
          .forEach(function(d){
            //var currentColor = theme//iteration>=0 ? "pink" : "gray";  // determine color of the node
            if(isVisible(tl,br,d)){
              ctx.fillStyle = d.color;//theme.getNodeColor(d);//currentColor;
              ctx.beginPath();
              ctx.moveTo(d.x + 4.5, d.y);
              ctx.arc(d.x, d.y, 4.5, 0, 2 * Math.PI);
              ctx.fill();
              if(d.stroke){
                ctx.strokeStyle = d.stroke;
                ctx.stroke();
              }
            }
          })

      ctx.restore();
    }



    me.redraw = function(_iteration, _modelDescriptor, _activeModel){
      //theme = new NetworkTheme(_activeModel, _modelDescriptor, _iteration);
      tick();
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
      },
      currentIteration: function(){
        return this.$store.getters.currentIteration;
      },
      activeModel: function(){
        return this.$store.state.activeModel;
      },
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
      },
      currentIteration: function(currentIteration){
        var graph = this.$store.getters.getNetwork;
        var activeModel = this.$store.getters.getActiveModel;
        var modelDescriptor = this.$store.getters.getActiveModelDescriptor;

        graph.nodes.forEach(function(n){
          if((n.events) && (activeModel) && (n.events[activeModel]) && (modelDescriptor)){

            var ns = n.events[activeModel]
              .filter(function(e){
                return e.i <= currentIteration
              }).slice(-1)[0];
            n.color = modelDescriptor['nodeColor'](ns.s);
            n.stroke = (ns.i === currentIteration) ? "black" : null;
          }
          else
            n.color = "gray";
        })

        // store nodeColor within each node


        this.networkLayout.redraw();
      }
    }
  }
</script>

<style>

</style>
