import emailService from '../service/email-service.js';
import ebusService from '../../service/eventbus-service.js';


export default {

    template: `
         <section class="email-details flex flex-col">
            <div class="email-details-nav self-start">
                <button @click="backToInbox" title="Back to inbox"><img src="./img/arrow-left.png"/></button>
                <button @click.stop.prevent="onRemoveClick(email)" title="Remove"><img src="./img/trash.png"/></button>
            </div>
            <div>
                <hr>
            </div>

            <h1 class="subject-toshow self-start">Subject: {{email.subject}}</h1>

            <div>
                <hr>
            </div>
            
            <div class="details-header flex space-between">
                <h1 class="from-toshow"><img src="./img/user.png"/> {{email.from}}</h1>
                <h1 class="date-toshow">{{email.sentAt}}</h1>
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
        this.email = emailService.getEmailById(this.id);
    },
    methods: {
        backToInbox() {
            this.$router.push('/email-sus/email-inbox');
        },
        onRemoveClick(email) {
            if (!email.isRead) {
                emailService.removeUnread();
                ebusService.$emit('updateUnread');
            }
            emailService.addTrash(email.id);
            this.$router.push('/email-sus/email-inbox');

        }
    },
}