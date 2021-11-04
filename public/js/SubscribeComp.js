Vue.component('subscribe-comp', {
    template: `
        <section class="subscribe">
            <div class="container subscribe__wrap">
                <div class="subscribe__photo">
                    <img src="img/subscribe_photo.png" alt="">
                    <p class="subscribe-text">&ldquo;Vestibulum quis porttitor dui! Quisque viverra nunc mi, 
                        <span class="subscribe-text-itallic">a pulvinar purus condimentum </span>&ldquo;
                    </p>
                </div>
                <div class="subscribe__do">
                    <h6 class="subscribe-text"><span class="subscribe-text-big">SUBSCRIBE </span>
                            FOR OUR NEWLETTER AND PROMOTION</h6>
                    <form class="subscribe__form" action="#">
                        <input type="email" required placeholder="Enter Your Email">
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
            </div>
        </section>
    `
})