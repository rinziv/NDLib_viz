import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);



const API_URL='http://localhost:5000/api/'

var instance = axios.create({
  baseURL: API_URL
})

function prepareRequestParameters(obj, injectToken){
  var params = new URLSearchParams();
  Object.keys(obj).forEach(function(k){
    params.append(k, obj[k])
  })

  return params;
}


export const store = new Vuex.Store({
  state:{
    token:'',
    availableModels:[],
    availableGenerators:[],
    describe:{},
    content:{
      network:{},
      models:[],
      iterations:{}
    },
    hasNetwork: false,
    hasModels: false,
  },
  mutations:{
    setToken: function (state,token){
      state.token = token;
    },

    setNetworkGenerators: function (state, networks) {
      state.availableGenerators = networks;
    },

    setAvailableModels: function (state, models) {
      state.availableModels = models;
    },
    updateExperimentDescription: function(state, description){
      state.describe = description;
    },
    updateHasModels: function(state, status){
      state.hasModels = status;
    },
    updateNetwork: function(state, network){
      state.content.network = network;
      state.hasNetwork = true;
    },
    updateIterations: function(state, iteration){
      Object.keys(iteration).forEach(function(m){
        var iters = iteration[m];
        var prevs = state.content.iterations[m];
        if(!prevs) prevs = [];

        // I assume iterations are consecutive
        var join = prevs.concat(iters);
        state.content.iterations[m] = join;

      })
    }
  },
  actions:{
    loadNetworkGeneratorEndpoints: function (context) {
      instance.get('Generators')
        .then(function(response){
          context.commit('setNetworkGenerators', response.data.endpoints);
        })
    },
    loadModelsEndpoints: function (context) {
      instance.get('Models')
        .then(function(response){
          context.commit('setAvailableModels', response.data.endpoints);
        })
    },
    loadExperimentDescrition: function(context) {
      var params = prepareRequestParameters({
        token:this.state.token
      });

      instance.post('ExperimentStatus', params)
        .then(function (response) {
          context.commit('updateExperimentDescription', response.data);
        })
    },


    /**
     * --------------------------------------------------
     *                    EXPERIMENTS
     * --------------------------------------------------
     */

    /**
     * Function to creare a new experiment
     *
     * @param context
     */
    createExperiment: function (context) {
      instance.get('Experiment')
        .then(response => {
          console.log(response);
          context.commit('setToken',response.data.token);
        })
    },
    /**
     * Destroy the current experiment
     *
     * @param context
     */
    destroyExperiment: function(context){
      var params = prepareRequestParameters({
        token: this.state.token
      })

      instance.delete('Experiment', params)
      .then(function(response){
        console.log(response);
      })
    },

    /**
     *  --------------------------------------------
     *     NETWORK GENERATORS
     *  --------------------------------------------
     */
    /**
     * Generate a new graph according to the specific configuration
     * Example of config format
     * {
     *  generator: 'ERGraph',
     *  params:{
     *    n:10,
     *    p:0.1,
     *    directed: false
     *  }
     * }
     * @param context
     * @param config
     */
    generateNetwork: function(context, config){
      config.params.token = this.state.token;
      var params = prepareRequestParameters(config.params);

      instance.put('Generators/'+config.generator, params)
        .then(function(response){
          if(response.status==200){
            // load network from the server
            instance.post('GetGraph', params).then(function(resp){
              console.log(resp);
              context.commit('updateNetwork',resp.data);
            })

          }
        })
        .catch(function(error){
          console.log(error);
        })
    },

    appendModel: function(context, config){
      config.params.token = this.state.token;
      var params = prepareRequestParameters(config.params);

      instance.put(''+config.model, params).then(function(response){
        console.log(response);
        if(response.status==200){
          // load network from the server
          instance.post('ExperimentStatus', params)
            .then(function (resp) {
              context.commit('updateExperimentDescription', resp.data);
            })

        }
      }).catch(function(error){
        console.log(error);
      })
    },

    iterate: function(context, config){
      config.token = this.state.token;
      var params = prepareRequestParameters(config);
      var method = (config.bunch ? 'IterationBunch' : 'Iteration');

      instance.post(method, params).then(function(response){
        console.log(response);
        context.commit('updateIterations', response.data);
      }).catch(function(error){
        console.log(error);
      })
    }
  },
  getters:{
    isNetworkEmpty: function (state) {
      return state.hasNetwork;
    },

    availableGenerators: function(state){
      return state.availableGenerators;
    },

    hasModels: function(state){
      return state.describe.Models && Object.keys(state.describe.Models).length
    },

    getNumNodes: function(state){
      return state.content.network.nodes?state.content.network.nodes.length : 0;
    },

    getNumEdges: function(state){
      return state.content.network.links? state.content.network.links.length : 0;
    },

    getNetwork: function(state){
      return state.content.network;
    },

    getModels: function(state){
      return state.describe.Models ? state.describe.Models:  {};
    }
  }
})
