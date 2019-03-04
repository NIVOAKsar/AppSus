
export default {
    props: ['email'],
    template: `
            <li class="email-preview clean-list flex space-between"
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
                    <div v-if="showButtons" class="preview-btns flex">
                        <button @click.stop.prevent="onRemoveIconClick(email)" class="preview-remove" title="Remove"><img src="./img/trash.png"/></button>
                        <button @click.stop.prevent="onRestoreIconClick(email)" class="preview-restore" title="Restore"><img src="./img/restore.png"/></button>
                    </div>
                    <button @click.stop.prevent="onElipsIconClick">...</button>
                </div>
            </li>
    `,
    data() {
        return {
            showButtons: false
        }
    },
    created() {
        this.emailContent = this.email.content;
        if (this.emailContent.length > 60) this.emailContent = this.emailContent.substring(0, 39) + '...';
    },
    methods: {
        onRestoreIconClick(email) {
            this.$emit('restoreEmail', email);
        },
        onRemoveIconClick(email) {
            this.$emit('removeEmail', email)
        },
        onElipsIconClick() {
            this.showButtons = !this.showButtons;
        },

    },

}