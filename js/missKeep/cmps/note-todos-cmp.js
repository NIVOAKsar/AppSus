import utilService from '/js/service/util-service.js'

export default {
    props: ['note'],
    type: 'note-todos',
    template: `
    <section class="note-section note-todos flex flex-col space-between">
        <ul v-for="item in note.content">
            <li>{{item}}</li>
        </ul>

        <div class="edit-nav grid">

            <img src="/img/keep/pin.png">
            <img src="/img/keep/check.png">
            <img src="/img/keep/colors.png">
            <img src="/img/keep/edit.png">
            <img @click="onCopy" src="/img/keep/copy.png">
            <img @click="onRemoveClick" src="/img/keep/trash.png">
 
        </div>

    </section>
    `,
    methods: {
        onRemoveClick() {
            this.$emit('removeNote', this.note.id);
        },
        onCopy() {
            utilService.copyStringToClipboard(this.note.content.join(','))
        }
    },
}