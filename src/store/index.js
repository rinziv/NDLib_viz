import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);



const API_URL='http://localhost:5000/api/'

var instance = axios.create({
  baseURL: API_URL
})

export const store = new Vuex.Store({
  state:{
    token:'',
    availableModels:[],
    availableGenerators:[],
    models:[],
    network:{}
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
    createExperiment: function (context) {
      instance.get('Experiment')
        .then(response => {
          console.log(response);
          context.commit('setToken',response.data.token);
        })
    },

    destroyExperiment: function(context){
      instance.delete('Experiment', {
        params:{
          token:this.state.token
        }
        })
        .then(function(response){

        })
    }
  },
  getters:{
    isNetworkEmpy: function (state) {
      return state.network.nodes;
    },

    availableGenerators: function(state){
      return state.availableGenerators;
    }
  }
})
