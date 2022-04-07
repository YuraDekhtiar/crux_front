import { createStore } from 'vuex'
import fecherCharts from "@/store/modules/fecherCharts";

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
    fecherCharts,
  }
})
