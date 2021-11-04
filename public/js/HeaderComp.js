Vue.component('header-comp', {
    data() {
        return {
            cartQuantity: 0
        }
    },

    methods: {
        updateCartQuantity(newValue) {
            this.cartQuantity = newValue;
        }
    },

    template: `
        <header class="header">
            <input type="checkbox" id="burger">

            <div class="container header__wrap">
                <div class="header__left">
                    <router-link to="/" class="header__logo"> <img src="img/logo.png" alt="logo"> </router-link>
                    <filter-comp></filter-comp>
                </div>
                <div class="header__right">
                    <label for="burger" class="header__menu">
                        <i class="fas fa-bars"></i>
                    </label>
                    <a class="header__item" href="registration.html"> <img src="img/reg.svg" alt=""> </a>
                    <a class="header__item" id="showCart" href="#" 
                        @click.prevent="$refs.popupcart.showPopupCart = !$refs.popupcart.showPopupCart">
                        <img src="img/cart.svg" alt="">
                        <span>{{cartQuantity}}</span>
                    </a>
                </div>
            </div>
            <cartcontent-comp ref="popupcart" popup="true" 
                @updateCartQuantity="updateCartQuantity">
            </cartcontent-comp>    
            <nav class="header__nav">
                <div class="header__nav__wrap">
                    <label for="burger" class="menu-close">
                        <i class="fas fa-times"></i>
                    </label>
                    <h2>MENU</h2>
                    <h3>MAN</h3>
                    <ul>
                        <li><a href="#">Accessories</a></li>
                        <li><a href="#">Bags</a></li>
                        <li><a href="#">Denim</a></li>
                        <li><a href="#">T-Shirts</a></li>
                    </ul>
                    <h3>WOMAN</h3>
                    <ul>
                        <li><a href="#">Accessories</a></li>
                        <li><a href="#">Jackets & Coats</a></li>
                        <li><a href="#">Polos</a></li>
                        <li><a href="#">T-Shirts</a></li>
                        <li><a href="#">Shirts</a></li>
                    </ul>
                    <h3>KIDS</h3>
                    <ul>
                        <li><a href="#">Accessories</a></li>
                        <li><a href="#">Jackets & Coats</a></li>
                        <li><a href="#">Polos</a></li>
                        <li><a href="#">T-Shirts</a></li>
                        <li><a href="#">Shirts</a></li>
                        <li><a href="#">Bags</a></li>
                    </ul>
                </div>
            </nav>
        </header>
    `
});