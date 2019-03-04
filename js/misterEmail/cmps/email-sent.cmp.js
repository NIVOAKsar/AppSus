import emailService from '../service/email-service.js';
import emailFilter from '../cmps/email-filter-cmp.js';
import emailSentPreview from '../cmps/email-sent-preview-cmp.js';
import emailSentDetails from '../cmps/email-sent-details-cmp.js';


export default {
    template: `
        <section class="email-sent">
            <email-filter @on-filtered="onFiltered"></email-filter>

            <ul class="inbox-mails-container flex col-reverse">
                <li class="email clean-list" v-for="email in emails" :key="email.id">
                    <email-sent-preview 
                        @click.native="onShowDetails(email.id)"
                        @removeEmailEmit="onRemoveSent"
                        class="flex" 
                        :email="email">
                    </email-sent-preview>
                    <router-view></router-view>
                </li>
            </ul>
            
        </section>

        `,
    data() {
        return {
            emails: null,
        }
    },

    created() {
        this.emails = emailService.getEmailsSent();
    },
    methods: {
        onRemoveSent(email) {
            emailService.removeSent(email.id);
            this.$router.push('/email-sus/email-sent');
            this.emails = emailService.getEmailsSent();
        },
        onShowDetails(id) {
            this.$router.push('/email-sus/email-sent-details/' + id);
        },
        onFiltered(filterBy) {
            let filtered = emailService.getEmailsSentFiltered(filterBy);
            this.emails = filtered;
        },
    },
    components: {
        emailFilter,
        emailSentPreview,
        emailSentDetails,
    },

}