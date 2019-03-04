import emailService from '../service/email-service.js';
import emailFilter from '../cmps/email-filter-cmp.js';
import emailTrashPreview from '../cmps/email-trash-preview-cmp.js';
import emailTrashDetails from '../cmps/email-trash-details-cmp.js';


export default {
    template: `
        <section class="email-trash">
        <email-filter @on-filtered="onFiltered"></email-filter>
            <ul class="inbox-mails-container flex col-reverse">
                <li class="email clean-list" v-for="email in emails" :key="email.id">
                    <email-trash-preview 
                        class="flex" 
                        :email="email"
                        @click.native="onShowDetails(email.id)"
                        @restoreEmail="onRestoreEmail"
                        @removeEmail="onRemoveEmail">
                    </email-trash-preview>
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
        this.emails = emailService.getEmailsTrash();
    },
    methods: {
        onRemoveEmail(email) {
            emailService.removeTrash(email.id);
        },
        onRestoreEmail(email) {
            emailService.restoreTrash(email.id);
        },
        onShowDetails(id) {
            this.$router.push('/email-sus/email-trash-details/' + id);
        },
        onFiltered(filterBy) {
            let filtered = emailService.getEmailsTrashFiltered(filterBy);
            this.emails = filtered;
        }

    },
    components: {
        emailFilter,
        emailTrashPreview,
        emailTrashDetails,
    },

}