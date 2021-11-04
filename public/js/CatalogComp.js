const CatalogComp = Vue.component('catalog-comp', {
    template: `
    <div>
        <intro-comp></intro-comp>
        <category-comp></category-comp>
        <cards-comp ref="cards"></cards-comp>
        <offers-comp></offers-comp>
    </div>
`
})
