Vue.component('card-comp', {
    props: ['product'],

    template: `
    <div class="cards__item">
        <div class="cards__item__img">
            <img :src="product.images[0]" :alt="product.name">
        </div>
        <div class="cards__item__overlay">
            <button class="btn-add" @click="$root.$refs.header.$refs.popupcart.add(product)">
                <img src="img/cart.svg" alt="Add o Cart img"><span>Add to Cart</span>
            </button>
        </div>
        <div class="cards__item__info">
            <router-link :to="{name: 'ProductComp', params: {id: product.id}}"> 
                <h3>{{product.name}}</h3>
            </router-link>
            <p>{{product.description}}</p>
            <span>$ {{product.price}}</span>
        </div>
    </div>
`
})