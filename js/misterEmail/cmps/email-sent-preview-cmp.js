import emailService from '../service/email-service.js';


export default {
    props: ['email'],
    template: `
            <li class="email-preview clean-list flex space-between" :class="{isUnread:!email.isRead}">
                <div class="preview-title">{{email.from}}</div>
                <div class="preview-subject">{{email.subject}} - <span class="preview-content">{{email.content}}</span></div>
                <div class="preview-time">{{email.sentAt}}</div>
                <div v-if="isPreviewBtns" class="preview-btns flex">
                    <button @click.stop.prevent="onRemoveClick(email)" class="preview-remove" title="Remove"><img src="/img/trash.png"></button>
                </div>

                <button @click.stop.prevent="toggleBtns">...</button>
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
        onRemoveClick(email) {
            this.$emit('removeEmailEmit', email)
        },
        toggleBtns() {
            this.isPreviewBtns = !this.isPreviewBtns;
        }
    },

}