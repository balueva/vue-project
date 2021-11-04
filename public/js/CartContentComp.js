Vue.component('cartcontent-comp', {
    props: ['popup'],

    data() {
        return {
            cartURL: '/api/cart',
            items: [],
            showPopupCart: false
        }
    },

    computed: {
        totalQuantity() {
            let q = 0;
            this.items.forEach(item => q += item.quantity);
            return q;
        },
        totalPrice() {
            let p = 0;
            this.items.forEach(item => p += item.quantity * item.price);
            return p;
        }
    },

    watch: {
        // прослушивание изменения значения вычисляемого свойства
        // и генерация события 
        totalQuantity(newValue) {
            this.$emit('updateCartQuantity', newValue);
            //console.log('watch ' + newValue);
        }
    },

    methods: {
        add(cartItem, q = 1) {
            let find = this.items.find(item => item.id === cartItem.id);
            if (find) {
                this.$root.putJson(`${this.cartURL}/${find.id}`, { quantity: q })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity += q;

                            // изменение количества доступно из каталога и страницы корзины
                            // если изменяли из страниы каталога, то обнволяем всплывающую корзины
                            if (!this.popup) {
                                let popupfind = this.$root.$refs.header.$refs.popupcart.items.find(item => item.id === cartItem.id)
                                popupfind.quantity = find.quantity;
                            }
                        }
                    });
            } else {
                let item = Object.assign({ quantity: q }, cartItem);
                this.$root.postJson(this.cartURL, item)
                    .then(data => {
                        if (data.result === 1) {
                            this.items.push(item);
                            // добавляется несуществующий товар из каталога или страницы товара
                            //во всплывающую корзину,
                            // страница корзина при этом неактивна
                        }
                    });
            }
        },

        remove(cartItem) {
            let find = this.items.find(item => item.id === cartItem.id);
            console.log('delete ' + find.id);

            this.$root.deleteJson(`${this.cartURL}/${find.id}`)
                .then(data => {
                    if (data.result === 1) {
                        const idx = this.items.indexOf(find);
                        this.items.splice(idx, 1);
                        if (this.popup) {
                            // если удалялось во всплывающей корзине, то
                            // удаление со страницы Корзина, если она открыта 
                            if (this.$root.$refs.routerview.$refs.cart)
                                this.$root.$refs.routerview.$refs.cart.items.splice(idx, 1);
                        } else
                            // иначе если удалялось из страницы корзины, то дополнительно 
                            // то удаление из выпадающей корзины
                            this.$root.$refs.header.$refs.popupcart.items.splice(idx, 1);
                    }
                });

        },

        clear() {
            this.$root.deleteJson(this.cartURL)
                .then(data => {
                    if (data.result === 1) {
                        // функцинал очстки корзины есть только на страницы корзины,
                        // очищаем корзину компонента страницы
                        this.items = [];
                        // очищаем массив компонента всплывающей корзины
                        this.$root.$refs.header.$refs.popupcart.items = [];
                    }
                })
        },

        change(cartItem, newValue) {
            if (newValue > 0)
                this.add(cartItem, newValue - cartItem.quantity);
            else
                this.remove(cartItem);
        }
    },

    mounted() {
        this.$root.getJson(this.cartURL)
            .then(data => data.forEach(item => this.items.push(item)));
    },

    template: `
    <div>
        <section class="cart" v-if="!popup">
            <div class="container cart__wrap">
                <div class="cart__content">
                    <cartitem-comp v-for="item of items" :key="item.id" :item="item" @change="change" @remove="remove" />
                    <div class="cart__buttons">
                        <button @click="clear()">Clear shopping cart</button>
                        <router-link to="/">Continue shopping</router-link>
                    </div>
                </div>

                <form class="cart__info">
                    <h3>SHIPPING ADRESS</h3>
                    <div>
                        <div class="cart__adress">
                            <input class="input-text" type="text" name="adress-city" placeholder="Bangladesh">
                            <input class="input-text" type="text" name="adress-country" placeholder="State">
                            <input class="input-text" type="text" name="adress-postcode" placeholder="Postcode / Zip">
                            <button>Get a quote</button>
                        </div>
                        <div class="cart__summary">
                            <p class="p1">SUB TOTAL $ {{totalPrice}}</p>
                            <p class="p2">GRAND TOTAL <span class="decor">$ {{totalPrice}}</span></p>
                            <hr>
                            <button>PROCEED TO CHECKOUT</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
        <div class="header__cart" v-else v-show="showPopupCart">
            <p class="popupcart-empty" v-if="items.length===0">No Products in Cart</p>               
            <div class="popupcart" v-else>
                <popupitem-comp v-for="item of items" :key="item.id" :item="item" @remove="remove"/>
                <p>Total Quantity: {{totalQuantity}} </p>
                <p>Total Price: <span class="decor">$ {{totalPrice}}</span></p>
                <router-link to="/CartComp">Go to Cart</router-link>
            </div>
        </div>        
    </div>
    `
});

Vue.component('cartitem-comp', {
    props: ['item'],

    template: `
    <div class="cart__item">
        <div class="cart__item__photo">
            <img :src="item.images[0]" :alt="item.name">
        </div>
        <div class="cart__item__about">
            <router-link :to="{name: 'ProductComp', params: {id: item.id}}"> 
                <h4>{{item.name}}</h4>
            </router-link>
            <p>Price: <span class="decor">$ {{item.price}}</span></p>
            <p>Color: {{item.color}}</p>
            <p>Size: {{item.size}}</p>
            <p class="quantity">Quantity:
                <input type="number" :value="item.quantity"  
                    @change="$emit('change', item, $event.target.value)">
            </p>
        </div>
        <button @click="$emit('remove', item)">&#215;</button>
    </div>
`
});

Vue.component('popupitem-comp', {
    props: ['item'],

    template: `
    <div class="popupcart__item">
        <img :src="item.images[0]" :alt="item.name">
        <div>
            <router-link :to="{name: 'ProductComp', params: {id: item.id}}">{{item.name}}</router-link>
            <p>Price: <span class="decor">$ {{item.price}}</span></p>
            <p>Color: {{item.color}}</p>
            <p>Size: {{item.size}}</p>
            <p class="quantity">Quantity: {{item.quantity}}</p>
            <p>Total Price: <span class="decor">$ {{item.quantity * item.price}}</span></p>
        </div>
        <button @click="$emit('remove', item)">&#215;</button>
    </div>
    `
})

