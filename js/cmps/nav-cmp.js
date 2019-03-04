import navBarService from '../service/nav-bar-service.js';
import ebusService from '../service/eventbus-service.js';


const homeTitleCmp = {
    props: [],
    name: 'home-title',
    template: `
        <div class="home-title flex align-center">
            <img src="./img/home-page.png"/>
            <h1>AppSus</h1>
        </div>
    `,
}
const aboutTitleCmp = {
    props: [],
    name: 'about-title',
    template: `
        <div class="about-title flex align-center">
            <img src="./img/about-us.png"/>
            <h1>About us</h1>
        </div>
    `
}

const bookTitleCmp = {
    props: [],
    name: 'books-title',
    template: `
        <div class="books-title flex align-center">
            <img src="./img/books.png"/>
            <h1>Miss Books</h1>
        </div>
    `
}


const emailTitleCmp = {
    props: [],
    name: 'email-title',
    template: `
        <div class="email-title flex align-center">
            <img src="./img/mail-box.png"/>
            <h1>Mister Email</h1>
        </div>
    `
}

const keepTitleCmp = {
    props: [],
    type: 'keep-title',
    template: `
        <div class="keep-title flex align-center">
            <img src="./img/keep.png"/>
            <h1>Miss Keep</h1>
        </div>
    `
}



export default {
    template: `
    <section class="nav-bar flex space-between">

        <component :is="currType"></component>

        <nav v-show="isNavOpen" class="links-nav-container grid">
            
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
        </nav>

        
        <img @click="toggleNavBar" class="header-activity-grid" src="./img/activity-grid.png"/>     
        
    </section> 
    `,
    data() {
        return {
            isNavOpen: false,
            currType: 'home-title',
        }
    },
    methods: {
        toggleNavBar() {
            this.isNavOpen = !this.isNavOpen;
        },
        onClick(type) {
            this.toggleNavBar();
            this.setCurrType(type);

        },
        setCurrType(type) {
            navBarService.updateTitle(type);
            this.currType = navBarService.getCurrTitle();
        }
    },
    created() {
        this.currType = navBarService.getCurrTitle();
        ebusService.$on('setCurrType', type => this.setCurrType(type));
    },

    components: {
        'email-title': emailTitleCmp,
        'keep-title': keepTitleCmp,
        'home-title': homeTitleCmp,
        'about-title': aboutTitleCmp,
        'books-title': bookTitleCmp
    }
}