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
                const response = await fetch(`http://localhost:3000/adminPanel/tracked_url`, {
                    method: 'GET',
                }).then(res => res.json());
                ctx.commit('setUrlId', response.map(i => i.id));
            } catch (e) {
                console.log(e)
            }
        },
        async analyzeUrl(ctx, data) {
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
                ctx.commit('setUrlId', response.url_id);
            } catch (e) {
                console.log(e)
            }
        }
    },
    modules: {
    }
}