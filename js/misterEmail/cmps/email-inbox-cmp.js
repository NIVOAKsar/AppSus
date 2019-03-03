import emailService from '../service/email-service.js';
import emailFilter from '../cmps/email-filter-cmp.js';
import emailPreview from '../cmps/email-preview-cmp.js';
import emailDetails from '../cmps/email-details-cmp.js';
import ebusService from '/js/service/eventbus-service.js';


export default {
    template: `
        <section class="email-inbox">
            <email-filter @on-filtered="onFiltered"></email-filter>
            <ul class="inbox-mails-container flex col-reverse">
                <li class="email clean-list" v-for="email in emails" :key="email.id">
                    <email-preview 
                        @click.native="onShowDetails(email.id)" 
                        @toggleMark="onToggleMark" 
                        @removeEmailEmit="onRemoveEmail"
                        class="flex" 
                        :email="email">
                    </email-preview>
                    <router-view></router-view>
                </li>
            </ul>
            
        </section>

        `,
    data() {
        return {
            emails: emailService.getEmails(),
        }
    },
    methods: {
        onRemoveEmail(email) {
            if (!email.isRead) {
                emailService.removeUnread();
                ebusService.$emit('updateUnread');
            }
            emailService.moveToTrash(email.id);

            this.$router.push('/email-sus/email-inbox');
            this.emails = emailService.getEmails();
        },
        onToggleMark(email) {
            if (!email.isRead) {
                emailService.unmark(email.id);
                emailService.removeUnread();
            } else {
                emailService.mark(email.id);
                emailService.addUnread();
            }
            ebusService.$emit('updateUnread');
            this.emails = emailService.getEmails();
        },
        onShowDetails(id) {
            this.$router.push('/email-sus/email-details/' + id);
        },
        onFiltered(filterBy) {
            let filtered = emailService.getEmailsFiltered(filterBy);
            this.emails = filtered;
        },
    },
    components: {
        emailFilter,
        emailPreview,
        emailDetails,
    },

}