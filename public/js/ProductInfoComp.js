Vue.component('productinfo-comp', {
    data() {
        return {
            productURL: '/api/products',
            product: { images: [] },
            imageIndex: 0
        }
    },

    methods: {
        getInfo(id) {
            this.$root.getJson(`${this.productURL}/${id}`)
                .then(data => this.product = data);
            this.imageIndex = 0;
        }
    },

    watch: {
        '$route.params.id': {
            handler(newValue) {
                this.getInfo(newValue);
            }
        }
    },


    mounted() {
        this.getInfo(this.$route.params.id);
    },

    template: `
        <section>
            <div class="slider">
                <button :disabled="imageIndex === 0" @click="imageIndex--">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <div>
                    <img :src="product.images[imageIndex]" :alt="product.name">
                </div>
                <button :disabled="imageIndex === product.images.length - 1" @click="imageIndex++">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>

            <div class="container info">
                <div class="info__wrap">
                    <h2>{{product.gender === 'm' ? 'MEN': 'WOMEN'}} COLLECTION</h2>
                    <hr class="info__line1">
                    <p class="info__title">{{product.name}}</p>
                    <p class="info__description">{{product.description}}</p>
                    <p class="info__price">$ {{product.price}}</p>
                    <hr class="info__line2">
                    
                    <button class="info__add" @click="$root.$refs.header.$refs.popupcart.add(product)">
                        <img src="img/cart.svg" alt="">
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
        </section>
    `
})

