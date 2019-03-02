import emailService from '../service/email-service.js';
import ebusService from '/js/service/eventbus-service.js';

export default {

    template: `
         <section class="email-details flex flex-col">
            <div class="email-details-nav self-start">
                <button @click="backToSent" title="Back to sent"><img src="/img/arrow-left.png"></button>
                <button @click.stop.prevent="onRemoveClick(email)" title="Remove"><img src="/img/trash.png"></button>
            </div>
            <div>
                <hr>
            </div>
            <h1 class="subject-toshow">{{email.subject}}</h1>
            <div class="details-header flex space-between">
                <h1>{{email.from}}</h1>
                <h1>{{email.sentAt}}</h1>
            </div>
            <div class="details-main">
                <h1>{{email.content}}</h1>
            </div>
            <div>
                <hr>
            </div>
            <div class="answer-container self-start">
                <button>Replay</button>
                <button>Forword</button>
            </div>
            <div>
                <hr>
            </div>
        </section>
    `,
    data() {
        return {
            email: null
        }
    },
    created() {
        this.id = this.$route.params.id;
        this.email = emailService.getEmailSentById(this.id);
    },
    methods: {
        backToSent() {
            this.$router.push('/email-sus/email-sent');
        },
        onRemoveClick(email) {
            // ebusService.$emit('removeEmailBus', email)

        }
    },
}