Vue.component('filter-comp', {
    data() {
        return {
            userSearch: ''
        }
    },

    template: `
    <form v-show="$route.name === 'CatalogComp'"
        action="#" @submit.prevent="$root.$refs.routerview.$refs.cards.filter(userSearch)">
        <input type="text" placeholder="Searching..." v-model="userSearch">
        <button class="header__item" type="submit">
            <img src="img/search.svg" alt=""> 
        </button>
    </form>
    `
})

// $root.$refs.catalog.$refs.cards.filter(userSearch)