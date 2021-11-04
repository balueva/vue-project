Vue.component('panelcaption-comp', {
    props: ['caption'],
    template: `
    <section class="breadcrumb-panel">
        <div class="container breadcrumb-panel__wrap">
            <h1> {{ caption }} </h1>
        </div>
    </section>
    `
})