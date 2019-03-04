import utilService from '../../service/util-service.js';


export default {
    props: ['note', 'isPinned'],
    type: 'note-todos',
    template: `
    <section class="note-section note-todos flex flex-col space-between">
        <ul v-for="(todo, index) in note.content">
             <li>
                <div @click="onEditIconClick" class="on-edit-text" v-show="!isEditMode">{{todo}}</div>
                <textarea ref="textArea" class="edit-text" v-model="todos[index]" v-show="isEditMode">{{todo}}</textarea>   
                <span class="delete-todo">❌</span>
            </li>
        </ul>
        <div class="edit-nav grid">
            <img title="Pin" v-if="!isPinned" @click="onPinIconClick" src="./img/keep/pin.png"/>
            <img title="un-pin" v-else @click="onUnpinIconClick" src="./img/keep/unpin.png"/>
            <div>
                <label class="label-pic-color">
                    <img title="Color" src="./img/keep/colors.png">
                    <input @change="onPaintIconClick" type="color">
                </label>
            </div>
            <img title="Save" @click="onSubmitIconClick" src="./img/keep/check.png"/>
            <img title="Edit" @click="onEditIconClick" src="./img/keep/edit.png"/>
            <img title="Copy" @click="onCopyIconClick" src="./img/keep/copy.png"/>
            <img title="Remove" @click="onTrashIconClick" src="./img/keep/trash.png"/>

        </div> 

    </section>
    `,
    data() {
        return {
            todos: '',
            isEditMode: false,
        }
    },
    created() {
        this.todos = this.note.content;
    },
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
        onEditIconClick() {
            this.isEditMode = true
        },
        onSubmitIconClick() {
            this.isEditMode = false;
            this.$emit('updateNote', this.note.id, this.todos);
        },

    },
}