import navBarService from '../service/nav-bar-service.js';
import ebusService from '../service/eventbus-service.js';



export default {
    template: `

        <section class="home-page flex flex-col">

            <div class="img"></div>

            <div class="home-links-container flex space-between">

                <router-link exact to="/">
                    <div @click="onClick('home-title')" class="flex flex-col justify-center">
                        <span><img src="./img/home-page.png" alt=""/></span>
                        Home
                    </div>
                </router-link>

                <router-link to="/about">
                    <div @click="onClick('about-title')" class="flex flex-col justify-center">
                        <span><img src="./img/about-us.png" alt=""/></span>
                        About us
                    </div>
                </router-link>

                <router-link class-active="header-link" to="/email-sus/email-inbox">
                    <div @click="onClick('email-title')" class="flex flex-col justify-center">
                        <span><img src="./img/mail-box.png" alt=""/></span>
                        Email
                    </div>
                </router-link>

                <router-link to="/keep-sus">
                    <div @click="onClick('keep-title')" class="flex flex-col justify-center">
                        <span><img src="./img/keep.png"/></span>
                        Keep
                    </div>
                </router-link>

                <router-link to="/">
                    <div @click="onClick('books-title')" class="flex flex-col justify-center">
                        <span><img src="./img/books.png" alt=""/></span>
                        Books
                    </div>
                </router-link>
            </div>

        </section>

        `,
    data() {
        return {
            currType: 'home-title',
        }
    },
    methods: {
        onClick(type) {
            ebusService.$emit('setCurrType', type);
        }
    },
    created() {
        this.currType = navBarService.getCurrTitle();
    },

}