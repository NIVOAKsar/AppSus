import utilService from '/js/service/util-service.js'

export default {
    props: ['note', 'isPinned'],
    type: 'note-img',
    template: `
    <section class="note-section note-img flex flex-col space-between">
        <img :src="note.content"/>
        <div class="edit-nav grid">
            <img v-if="!isPinned" @click="onPinClick" src="/img/keep/pin.png"/>
            <img v-else @click="onUnpinClick" src="/img/keep/unpin.png"/>
            <div>
                <input @change="onChangeBgColor" type="color">
                <!-- <img class="img-color" src="/img/keep/colors.png"> -->
            </div>
            <img src="/img/keep/check.png"/>
            <img src="/img/keep/edit.png"/>
            <img @click="onCopy" src="/img/keep/copy.png"/>
            <img @click="onRemoveClick" src="/img/keep/trash.png"/>

        </div> 

    </section>
    `,
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
        onPinClick() {
            this.$emit('pinNote', this.note.id);
        },
        onUnpinClick() {
            this.$emit('unpinNote', this.note.id);
        }
    },
}