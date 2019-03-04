import utilService from '../../service/util-service.js';


export default {
    props: ['note', 'isPinned'],
    type: 'note-img',
    template: `
    <section class="note-section note-img flex flex-col space-between">
    <img class="img-toshow" :src="note.content"/>
        <div class="edit-nav grid">
            <img title="Pin" v-if="!isPinned" @click="onPinIconClick" src="../../../img/keep/pin.png"/>
            <img title="un-pin" v-else @click="onUnpinIconClick" src="../../../img/keep/unpin.png"/>
            <div>
                <label class="label-pic-color">
                    <img src="../../../img/keep/colors.png"/>
                    <input @change="onPaintIconClick" type="color"/>
                </label>
            </div>

            <img title="Save" src="../../../img/keep/check.png"/>
            <img title="Edit" src="../../../img/keep/edit.png"/>
            <img title="Copy" @click="onCopyIconClick" src="../../../img/keep/copy.png"/>
            <img title="Remove" @click="onTrashIconClick" src="../../../img/keep/colors.png"/>

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