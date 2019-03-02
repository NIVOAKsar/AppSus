import myRoutes from './routes.js';
import navCmp from './cmps/nav-cmp.js';
import footerCmp from './cmps/footer-cmp.js';


const myRouter = new VueRouter({ routes: myRoutes })

window.vueApp = new Vue({
    el: '#app',
    data: {
        str: 'Hello Vue!',
    },
    computed: {

    },
    methods: {

    },
    router: myRouter,
    components: {
        navCmp,
        footerCmp

    }
});