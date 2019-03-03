import emailService from '../service/email-service.js';
import ebusService from '/js/service/eventbus-service.js';


export default {
    template: `
        <section class="email-sus flex flex-col">
            <img class="hamburger"
            src="../../img/hamburger.png" @click="isHamburgerOpen = !isHamburgerOpen">
            
            
            <div class="email-main flex">
                <div class="email-nav flex flex-col">
                    <button class="email-nav-link add-email" @click="onCompose">+ <span>COMPOSE</span></button>
                    <div class="email-nav-links" :class="{open : isHamburgerOpen}">
                        <router-link class="flex space-between" exact to="/email-sus/email-inbox"> 
                            <div @click="toggleHamburger">Inbox </div>
                            <div v-show="unread > 0" class="num-of-unread"> {{unread}}</div>
                        </router-link>
                        <router-link class="email-nav-link flex" exact to="/email-sus/email-sent">
                            <div @click="toggleHamburger">Sent</div>
                        </router-link>
                    </div>
                </div>
                <router-view></router-view>
            </div>
        </section>
        `,
    data() {
        return {
            unread: null,
            isHamburgerOpen: false,
        }
    },
    created() {
        this.$router.push('/email-sus/email-inbox');
        this.unread = emailService.getUnread();
        ebusService.$on('updateUnread', () => this.unread = emailService.getUnread());
    },
    destroyed() {
        // ebusService.$off('updateUnread');
    },
    methods: {
        onCompose() {
            this.$router.push('/email-sus/email-send');
        },
        toggleHamburger() {
            this.isHamburgerOpen = !this.isHamburgerOpen;
        }
    },

}