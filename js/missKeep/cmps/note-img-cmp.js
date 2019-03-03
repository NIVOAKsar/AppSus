
import utilService from '/js/service/util-service.js'

export default {
    props: ['note', 'isPinned'],
    type: 'note-img',
    template: `
    <section class="note-section note-img flex flex-col space-between">
    <img class="img-toshow" :src="note.content"/>
        <div class="edit-nav grid">
            <img v-if="!isPinned" @click="onPinIconClick" src="/img/keep/pin.png"/>
            <img v-else @click="onUnpinIconClick" src="/img/keep/unpin.png"/>
            <div>
                <label class="label-pic-color">
                    <img src="/img/keep/colors.png">
                    <input @change="onPaintIconClick" type="color">
                </label>
            </div>

            <img src="/img/keep/check.png"/>
            <img src="/img/keep/edit.png"/>
            <img @click="onCopyIconClick" src="/img/keep/copy.png"/>
            <img @click="onTrashIconClick" src="/img/keep/trash.png"/>

        </div> 
    </section>
    `,
    methods: {
        onTrashIconClick() {
            this.$emit('removeNote', this.note.id);
        },
        onCopyIconClick() {
            utilService.copyStringToClipboard(this.note.content)
        },
        onPaintIconClick(ev) {
            this.$emit('updateNoteColor', ev.target.value, this.note.id);
        },
        onPinIconClick() {
            this.$emit('pinNote', this.note.id);
        },
        onUnpinIconClick() {
            this.$emit('unpinNote', this.note.id);
        },
    },
}