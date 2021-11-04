const ProductComp = Vue.component('product-comp', {
    props: ['id'],

    template: `
    <div>
        <panelcaption-comp caption="NEW ARRIVALS"></panelcaption-comp>
        <productinfo-comp></productinfo-comp>
    </div>
    `
})