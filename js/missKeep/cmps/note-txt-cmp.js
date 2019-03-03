import utilService from '/js/service/util-service.js'

export default {
    props: ['note', 'isPinned'],
    type: 'note-txt',
    template: `
    <section class="note-section note-txt flex flex-col space-between">
        <div @click="onEditIconClick" class="on-edit-text" v-show="!isEditMode">{{note.content}}</div>
        <textarea ref="textArea" @blur="onSubmitIconClick" class="edit-text" v-show="isEditMode" v-model="content">{{content}}</textarea>
        <div class="edit-nav grid">
            <img v-if="!isPinned" @click="onPinIconClick" src="/img/keep/pin.png"/>
            <img v-else @click="onUnpinIconClick" src="/img/keep/unpin.png"/>
            <div>
                <input @change="onPaintIconClick" type="color">
            </div>

            <img @click="onSubmitIconClick" src="/img/keep/check.png"/>
            <img @click="onEditIconClick" src="/img/keep/edit.png"/>
            <img @click="onCopyIconClick" src="/img/keep/copy.png"/>
            <img @click="onTrashIconClick" src="/img/keep/trash.png"/>

        </div> 
    </section>
    `,
    data() {
        return {
            content: this.note.content,
            isEditMode: false,
        }
    },
    methods: {
        onTrashIconClick() {
            this.$emit('removeNote', this.note.id);
        },
        onCopyIconClick() {
            utilService.copyStringToClipboard(this.note.content)
        },
        onPaintIconClick(ev) {
            this.$emit('changeBgColor', ev.target.value, this.note.id);
        },
        onPinIconClick() {
            this.$emit('pinNote', this.note.id);
        },
        onUnpinIconClick() {
            this.$emit('unpinNote', this.note.id);
        },
        onEditIconClick() {
            this.isEditMode = true
            setTimeout(() => this.$refs.textArea.focus());
        },
        onSubmitIconClick() {
            this.isEditMode = false;
            this.$emit('updateNote', this.note.id, this.content);
        },
    },
}