Vue.component('cards-comp', {
    data() {
        return {
            productsURL: '/api/products',
            products: [],
            filtered: []
        }
    },

    methods: {
        filter(userSearch) {
            let regExp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(item => regExp.test(item.name));
        }
    },

    mounted() {
        this.$root.getJson(this.productsURL)
            .then(data => {
                data.forEach(item => {
                    this.products.push(item);
                    this.filtered.push(item);
                })
            });

    },

    template: `
    <section class="cards">
        <div class="container cards__align">
            <div class="headerinfo" v-if="filtered.length>0">
                <h2 class="cards__title" >Fetured Items</h2>
                <p class="cards__description">Shop for items based on what we featured in this week</p>
            </div>                    
            <p class="cards__title" v-else>Items not found</p>
            <div class="cards__wrap">
                <card-comp v-for="item of filtered" :key="item.id" :product="item"></card-comp>
            </div>
        </div>
    </section>
`
})