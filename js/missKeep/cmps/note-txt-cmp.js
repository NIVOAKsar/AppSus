import utilService from '/js/service/util-service.js'

export default {
    props: ['note'],
    type: 'note-txt',
    template: `
    <section class="note-section note-txt flex flex-col space-between">

        <div class="on-edit-text" v-if="!isEditMode">{{content}}</div>
        <textarea class="edit-text" v-else="isEditMode" v-model="content" >{{content}}</textarea>

        <div class="edit-nav grid">
            <img src="/img/keep/pin.png">
            <img src="/img/keep/colors.png">
            <img @click="isEditMode = false" src="/img/keep/check.png">
            <img @click="isEditMode = true" src="/img/keep/edit.png">
            <img @click="onCopy" src="/img/keep/copy.png">
            <img @click="onRemoveClick" src="/img/keep/trash.png">

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
        }
    },
    computed: {
        getContent() {
            // return this.note.content;
        }
    }
}