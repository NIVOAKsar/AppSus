import utilService from '/js/service/util-service.js'

export default {
    props: ['note'],
    type: 'note-txt',
    template: `
    <section class="note-section note-txt flex flex-col space-between">

        <div @click="onClick" class="on-edit-text" v-show="!isEditMode">{{content}}</div>
        <textarea ref="textArea" @blur="onBlur" class="edit-text" v-show="isEditMode" v-model="content">{{content}}</textarea>

        <div class="edit-nav grid">
            <img src="/img/keep/pin.png">
            <div>
                <input @change="onChangeBgColor" type="color">
                <!-- <img class="img-color" src="/img/keep/colors.png"> -->
            </div>
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
        }
    },
    computed: {


    }
}