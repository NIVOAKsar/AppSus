import emailService from '../service/email-service.js';
import ebusService from '../../service/eventbus-service.js';

export default {
    template: `
        <section class="email-send">

            <form class="new-email flex flex-col">

                <div class="new-mail-header flex space-between align-center">
                    <h1 class="new-message-title">New Message</h1>
                    <h1 @click="closeForm" class="exit-new-message">&times;</h1>
                </div>

                <div class="new-mail-content flex flex-col">
                    <input placeholder="To:" class="message-to" type="text" v-model.trim="email.to">
                    <input placeholder="Subject:" class="subject-to" type="text" v-model.trim="email.subject">
                    <textarea class="content" v-model.trim="email.content"></textarea>
                </div>
                
                <button @click.prevent="onSubmit" class="btn-send" type="submit">Send</button>
            </form>
            
        </section>
    `,
    data() {
        return {
            email: {
                to: '',
                subject: '',
                content: '',
            }

        }
    },
    methods: {
        onSubmit() {
            emailService.addEmail(this.email);
            emailService.addSent(this.email);
            ebusService.$emit('updateUnread');
            this.$router.push('/email-sus/email-inbox');
        },
        closeForm() {
            this.$router.push('/email-sus/email-inbox');
        }
    },

}