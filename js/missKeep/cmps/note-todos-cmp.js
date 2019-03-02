import utilService from '/js/service/util-service.js'

export default {
    props: ['note'],
    type: 'note-todos',
    template: `
    <section class="note-section note-todos flex flex-col space-between">
        <ul v-for="item in note.content">
            <li>
                <div @click="onClick" v-show="!isEditMode">{{item}}</div>
                <textarea ref="textArea" v-show="isEditMode">{{item}}</textarea>
            </li>
        </ul>

        <div class="edit-nav grid">

            <img src="/img/keep/pin.png">
            <img src="/img/keep/check.png">
            <div>
                <input @change="onChangeBgColor" type="color">
                <!-- <img src="/img/keep/colors.png"> -->
            </div>
            <img src="/img/keep/edit.png">
            <img @click="onCopy" src="/img/keep/copy.png">
            <img @click="onRemoveClick" src="/img/keep/trash.png">
 
        </div>

    </section>
    `,
    data() {
        return {
            isEditMode: false,
        }
    },
    methods: {
        onRemoveClick() {
            this.$emit('removeNote', this.note.id);
        },
        onCopy() {
            utilService.copyStringToClipboard(this.note.content.join(','))
        },
        onChangeBgColor(ev) {
            this.$emit('changeBgColor', ev.target.value, this.note.id);
        },
        onClick() {
            this.isEditMode = true;
            setTimeout(() => this.$refs.textArea.focus());
        }
    },
}