import emailService from '../service/email-service.js';


export default {
    props: ['email'],
    template: `
            <li @click.stop.prevent="onEmailClick(email)"
            class="email-preview clean-list flex space-between"
            :class="{isUnread:!email.isRead}">
                <div class="preview-text flex space-between">
                    <div class="preview-title">{{email.from}}</div>
                    <div class="preview-subject">{{email.subject}} - <span class="preview-content">{{email.content}}</span></div>
                    <div class="preview-time">{{email.sentAt}}</div>
                </div>

                <div class="preview-btn-to-open flex">
                    <div v-if="isPreviewBtns" class="preview-btns flex">
                        <button @click.stop.prevent="onRemoveClick(email)" class="preview-remove" title="Remove"><img src="/img/trash.png"></button>
                        <button @click.stop.prevent="onMarkClick(email)" title="Mark as unread"><img src="/img/envelope.png"></button>
                    </div>

                    <button @click.stop.prevent="toggleBtns">...</button>
                </div>
            </li>
    `,
    data() {
        return {
            isPreviewBtns: false
        }
    },
    created() {

    },
    methods: {
        onEmailClick(email) {
            if (!email.isRead) this.$emit('toggleMark', email)
        },
        onRemoveClick(email) {
            this.$emit('removeEmailEmit', email)
        },
        onMarkClick(email) {
            this.$emit('toggleMark', email)
        },
        toggleBtns() {
            this.isPreviewBtns = !this.isPreviewBtns;
        }
    },

}