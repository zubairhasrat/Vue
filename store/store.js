import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import Request from '../common/request'
import { stat } from 'fs';
import { concat, forEach } from 'async';

Vue.use(Vuex)

const state = {
  touristPoints : [],
  categories : [],
  touristPoint: {
    title: null,
    content: null,
    metadata: {
      place_description: null,
      place_height: null,
      suitable_seasons: null,
      expected_expence: null,
      transportation: null,
      country: null,
      place_img1:{}
    }
  },
    addTouristPoint : null,
    initializeStatus: false,
    isPresent: false,
    status: {
      loading: false,
      success: false,
      error: false
    },
    touristPointStatus: {
      loading: false,
      success: false,
      error: false
    },
    categoryStatus: {
      loading: false,
      success: false,
      error: false
    }
}
const getters = {
  getTouristPlaces : state =>{
    return state.touristPoints
  },
  getTouristPoint : state =>{
    return state.touristPoint
  }
  ,
  isPresent (state) {
    return state.isPresent
  },
  touristPointStatus (state) {
    return state.touristPointStatus
  },
  status (state) {
    return state.status
  },
  initializeStatus (state) {
    return state.initializeStatus
  },
  getCategories: state => {
    return state.categories
  },
  touristPoint (state) {
    return state.touristPoint
  },
  addTouristPoint (state) {
    return state.addTouristPoint
  }
}
function isEmpty (res) {
  return !res.total
}
function isValueUnique (collection, payload ,selector) {
  let res = _.findIndex(collection, { [selector]: payload[selector] })
  if (res === -1 || (res !== -1 && res === payload.index)) {
    return true
  }
  return false  
}
const mutations = {
  SET_TOURIST_POINTS: (state,payload) => {
    state.touristPoint = payload
  },
  SET_CATEGORIES: (state,payload) =>{
    state.categories = payload
  },
  TOURIST_POINTS: (state,payload) =>{
    state.touristPoints = payload
  },
  SET_PLACE_NULL:(state) => {
    state.touristPoint = {
      title: null,
      content: null,
      metadata: {
        place_description: null,
        place_height: null,
        suitable_seasons: null,
        expected_expence: null,
        transportation: null,
        country: null,
        place_img1:{
        
        }
      }
    }
  },
  ADD_TOURISTPOINTS (state, payload) {
    state.touristPoints.unshift(_.cloneDeep(payload))
  },
  EDIT_TOURIST_POINTS (state, payload) {
    const index = payload.index
    delete payload.index
    state.touristPoints[index] = payload
  },
  DELETE_TOURIST_POINT(state, payload){
    state.touristPoints.splice(payload, 1)
  },
  SET_PLACE_IMAGE (state, payload) {
    state.touristPoint.metadata.place_img1.url = payload
  },
  SET_PLACE_IMAGE_FILE (state, payload) {
    state.touristPoint.metadata.place_img1.file = payload
  },
  SET_EDIT_PLACE(state,payload){
    state.touristPoint = payload
  },
  SET_LOAD_MORE_PLACE(state,payload){
    state.touristPoint = payload
  },
  LOADING (state) {
    state.status = {
      loading: true,
      success: false,
      error: false
    }
  },
  TOURIST_PLACE_LOADING (state) {
    state.touristPointStatus = {
      loading: true,
      success: false,
      error: false
    }
  },
  TOURIST_PLACE_SUCCESS (state) {
    state.touristPointStatus = {
      loading: false,
      success: true,
      error: false
    }
  },
  TOURIST_PLACE_ERROR (state, payload) {
    state.touristPointStatus = {
      loading: false,
      success: false,
      error: payload
    }
  },
  SUCCESS (state) {
    state.status = {
      loading: false,
      success: true,
      error: false
    }
  },
  ERROR (state, payload) {
    state.status = {
      loading: false,
      success: false,
      error: payload
    }
  },
  SET_IS_PRESENT (state, payload) {
    state.isPresent = payload
  }
}
const actions = {
  getTouristPlaces(context,payload){
    context.commit('LOADING')
    Request.getTouristPoints().then(res => {
      context.commit('TOURIST_POINTS', res)
      context.commit('SET_IS_PRESENT',true)
      context.commit('SUCCESS')
    })
    .catch(e => {
      context.commit('ERROR', 'Something went wrong.')
    })
  },
  addTouristPlaces (context, payload) {
      context.commit('TOURIST_PLACE_LOADING')
      if (isValueUnique(context.getters.getTouristPlaces, payload,'slug')) {
          Request.saveMedia(payload).then(res =>{
            Request.addTouristPoints(payload).then(res =>{
              context.commit('SET_TOURIST_POINTS', res)
              context.commit('ADD_TOURISTPOINTS',res)
              context.commit('TOURIST_PLACE_SUCCESS')
              context.commit('SET_PLACE_NULL','')
            })
            .catch(e => {
              context.commit('TOURIST_PLACE_ERROR', 'Something went wrong.')
            })
        })
      .catch(e => {
        context.commit('TOURIST_PLACE_ERROR', 'Something went wrong.')
      })
      }else {
        context.commit('TOURIST_PLACE_ERROR', 'Place Already Present!')
        context.commit('SET_PLACE_NULL','')
      }
     
  },
  deletePlace(context,payload){
    context.commit('LOADING')
    Request.deleteMedia(payload.metadata.place_img1.id).then(res => {
      Request.deleteTouristPoint(payload).then(res =>{
        context.commit('DELETE_TOURIST_POINT',payload)
        context.commit('SUCCESS')
      })
      .catch(e => {
        context.commit('TOURIST_PLACE_ERROR', 'Something went wrong.')
      })
    })
  },
  editTouristPlace(context,payload){
    Request.saveMedia(payload).then(res =>{
        Request.editTouristPlace(payload).then( res=>{
            context.commit('EDIT_TOURIST_POINTS',res)
        })
        .catch(e => {
          context.commit('TOURIST_PLACE_ERROR', 'Something went wrong.')
        })
    })
    .catch(e => {
      context.commit('TOURIST_PLACE_ERROR', 'Something went wrong.')
    })
  },
  setTouristPlaces (context, payload) {
    context.commit('SET_PLACE_IMAGE', payload)
  },
  setTouristPlacesFile (context, payload) {
    context.commit('SET_PLACE_IMAGE_FILE', payload)
  },
  setEditPlace(context,payload){
    context.commit('SET_EDIT_PLACE',payload)
  },
  loadMorePlaceDetail(context,payload){
    context.commit('SET_LOAD_MORE_PLACE',payload)
  },
  setPlaceNull(context){
    context.commit('SET_PLACE_NULL')
  }
}
const store = () => {
  return new Vuex.Store({
    state,
    getters,
    mutations,
    actions
  })
}

export default store
