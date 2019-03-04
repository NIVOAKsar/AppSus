
export default {
    props: ['email'],
    template: `
            <li @click.stop.prevent="onEmailClick(email)"
            class="email-preview clean-list flex space-between"
            :class="{isUnread:!email.isRead}">
            <div class="preview-text flex">
                <img class="user-preview" src="./img/user.png"/>
                <div class="niv">
                    <div class="niv2 flex">
                        <div class="preview-title">{{email.from}}</div>
                            <div class="preview-subject">{{email.subject}}
                                <!-- <span v-if="emailContent"> - </span> -->
                                <span class="preview-content">{{emailContent}}</span>
                            </div>
                            <div class="preview-time">{{email.sentAt}}</div>
                        </div>
                    </div>
                </div>

                <div class="preview-btn-to-open flex">
                    <div v-if="isPreviewBtns" class="preview-btns flex">
                        <button @click.stop.prevent="onRemoveClick(email)" class="preview-remove" title="Remove"><img src="./img/trash.png"/></button>
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
        this.emailContent = this.email.content;
        if (this.emailContent.length > 60) {
            this.emailContent = this.emailContent.substring(0, 39) + '...';
        }
    },
    methods: {
        onRemoveClick(email) {
            this.$emit('removeEmailEmit', email)
        },
        toggleBtns() {
            this.isPreviewBtns = !this.isPreviewBtns;
        },
        onMarkClick(email) {
            this.$emit('toggleMark', email)
        },
        onEmailClick(email) {
            if (!email.isRead) this.$emit('toggleMark', email)
        }
    },

}