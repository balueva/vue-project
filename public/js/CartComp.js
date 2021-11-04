const CartComp = Vue.component('cart-comp', {
    template: `
    <div>
        <panelcaption-comp caption="SHOPPING CART"></panelcaption-comp>
        <cartcontent-comp ref="cart"></cartcontent-comp>
    </div>
    `
})