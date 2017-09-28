<template>
    <div class="experiment-model-stats-viewer col-md-6">
      <h4>Model Statistics</h4>
      <h6 v-if="this.$store.state.activeModel">Selected Model: {{activeModel}}</h6>
      <div ref="modelviz">

      </div>
    </div>
</template>

<script>
  var nvstyle = require("nvd3/build/nv.d3.css");
  var d3 = require('d3');
  var nv = require('nvd3');


  export default {
    name: 'ModelStatsViewer',
    data: function(){
      return {
        width: 300,
        height: 300,
        nvCharts: [],
      }
    },
    mounted:function(){
      var body = d3.select(this.$refs.modelviz)
        .append("div")
        .text("Mouse over the chart to select a time instant of the simulation");

      // charts
      var charts = body.append("div")

        .classed("charts",true);

      charts.append("div")
        .classed("trend-chart",true)
//        .classed("col-sm-12",false)
        .append("svg")
        .attr("width","100%")
        .attr("height",this.height);

      charts.append("div")
        .classed("prevalence-chart",true)
//        .classed("col-sm-12",true)
        .append("svg")
        .attr("width","100%")
        .attr("height",this.height);
      var myCharts = this.nvCharts;
      d3.range(2).forEach(function(d,i){
        var chart = nv.models.lineChart()
          .useInteractiveGuideline(true)
          .margin({left:30});
        myCharts[i] = chart;
      })
    },
    computed:{
      activeModel: function(){
        return this.$store.state.activeModel;
      }
    },
    watch:{
      activeModel: function(newModel){
        console.log(newModel);
        var series = this.$store.state.content.series[newModel];
        if(series){
          d3.select(this.$refs.modelviz).select("div.charts .trend-chart svg")
            .datum(d3.entries(series).map(function(d){
              return {
                key: d.value.label,
                label: d.value.label,
                values: d.value.values.map(function(v,i){
                  return {x:i, y:v}
                }),
                // color: nodeColor(d.key)
              }
            }))
            .call(this.nvCharts[0]);
          d3.select(this.$refs.modelviz).select("div.charts .prevalence-chart svg")
            .datum(d3.entries(series).map(function(d){
              return {
                key:d.value.label,
                label: d.value.label,
                values: d.value.values.slice(1).map(function(v,i){
                  return {
                    x:i, y: v - d.value.values[i]
                  }
                })
              }
            }))
            .call(this.nvCharts[1]);
        }
      }
    }
  }
</script>

<style>

</style>
