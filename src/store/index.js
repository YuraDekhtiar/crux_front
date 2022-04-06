import { createStore } from 'vuex'

export default createStore({
  state: {
    backendUrl: "http://127.0.0.1:3000"
  },
  getters: {
    getServerUrl: state => {
      return state.backendUrl;
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
