const routes = [
    { path: '/CatalogComp', name: 'CatalogComp', component: CatalogComp },
    { path: '/CartComp', component: CartComp },
    { path: '/ProductComp/:id', name: 'ProductComp', component: ProductComp, props: true },
    { path: '/', redirect: '/CatalogComp' }
];

const router = new VueRouter({
    routes: routes
});

new Vue({
    el: '#app',

    router,

    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                })
        },

        postJson(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                });
        },
        putJson(url, data) {
            console.log('putJson ' + url);

            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                });
        },
        deleteJson(url, data) {
            console.log('deleteJson ' + url);

            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                });
        }
    }
});