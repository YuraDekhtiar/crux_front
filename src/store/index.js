import { createStore } from 'vuex'
import fecherCharts from "@/store/modules/fecherCharts";

export default createStore({
  state: {
    backendUrl: "http://5.58.211.54:3000",
    //backendUrl: "http://localhost:3000"
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
