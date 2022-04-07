export default {
    state: {
        urls: [],
        // Метрики які ми отримали під час онлайн аналізу
        dataCharts: []
    },
    getters: {
        getAllUrls(state) {
            return state.urls;
        },
        getDataCharts(state) {
            return state.dataCharts;
        }
    },
    mutations: {
        setUrls(state, data) {
            state.urls = data;

        },
        setDataCharts(state, data) {
            state.dataCharts = data;
        }
    },
    actions: {
        async fetchAllUrlHistory(ctx) {
            try {
                const response = await fetch(`http://localhost:3000/adminPanel/url_history`, {
                    method: 'GET',
                }).then(res => res.json());
                ctx.commit('setUrls', response.map(i => i.url));
            } catch (e) {
                console.log(e)
            }
        },
        async analyzeUrl(ctx, data) {
            ctx.commit('setUrls', data.url);
            try {
                const response = await fetch('http://127.0.0.1:3000/adminPanel/analyze_url', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then(r => {
                    return r.json();
                });
                ctx.commit('setDataCharts', response);
            } catch (e) {
                console.log(e)
            }
        }
    },
    modules: {
    }
}