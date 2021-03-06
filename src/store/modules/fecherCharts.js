export default {
    state: {
        urlId: []
    },
    getters: {
        getUrlId(state) {
            return state.urlId;
        }
    },
    mutations: {
        setUrlId(state, data) {
            state.urlId = data;
        }
    },
    actions: {
        async fetchAllUrlHistory(ctx) {
            try {
                const response = await fetch(`${this.state.backendUrl}/adminPanel/tracked_url`, {
                    method: 'GET',
                }).then(res => res.json());
                ctx.commit('setUrlId', response.map(i => i.id));
            } catch (e) {
                console.log(e)
            }
        },
        async analyzeUrl(ctx, data) {
            //ctx.commit('setUrlId', []);
            try {
                const response = await fetch(`${this.state.backendUrl}/adminPanel/analyze_url`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then(r => {
                    return r.json();
                });
                console.log(response)
                ctx.commit('setUrlId', response.url_id);
            } catch (e) {
                console.log(e)
            }
        }
    },
    modules: {
    }
}