import utilService from '/js/service/util-service.js'

export default {
    props: ['note', 'isPinned'],
    type: 'note-txt',
    template: `
    <section class="note-section note-txt flex flex-col space-between">
        <div @click="onClick" class="on-edit-text" v-show="!isEditMode">{{note.content}}</div>
        <textarea ref="textArea" @blur="onBlur" class="edit-text" v-show="isEditMode" v-model="content">{{content}}</textarea>
        <div class="edit-nav grid">
            <img v-if="!isPinned" @click="onPinClick" src="/img/keep/pin.png"/>
            <img v-else @click="onUnpinClick" src="/img/keep/unpin.png"/>
            <div>
                <input @change="onChangeBgColor" type="color">
                <!-- <img class="img-color" src="/img/keep/colors.png"> -->
            </div>
            <img @click="isEditMode = false" src="/img/keep/check.png"/>
            <img @click="isEditMode = true" src="/img/keep/edit.png"/>
            <img @click="onCopy" src="/img/keep/copy.png"/>
            <img @click="onRemoveClick" src="/img/keep/trash.png"/>

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
        onRemoveClick() {
            this.$emit('removeNote', this.note.id);
        },
        onCopy() {
            utilService.copyStringToClipboard(this.note.content)
        },
        onChangeBgColor(ev) {
            this.$emit('changeBgColor', ev.target.value, this.note.id);
        },
        onBlur() {
            this.isEditMode = false;
        },
        onClick() {
            this.isEditMode = true;
            setTimeout(() => this.$refs.textArea.focus());
        },
        onPinClick() {
            this.$emit('pinNote', this.note.id);
        },
        onUnpinClick() {
            this.$emit('unpinNote', this.note.id);
        }
    },
}