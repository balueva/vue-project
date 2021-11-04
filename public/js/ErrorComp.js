Vue.component('error-comp', {
    data() {
        return {
            str: ''
        }
    },

    methods: {
        setError(str) {
            this.str = str;
        }
    },

    template: `
    <div class="error" v-if="str!==''">
    <span>Error!</span>
    <p>{{str}}</p>
    <button @click="setError('')">Close</button>
    </div>
    `
})