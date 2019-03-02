import noteService from '../service/note-service.js'
import noteTxt from '../cmps/note-txt-cmp.js'
import noteTodos from '../cmps/note-todos-cmp.js'
import noteImg from '../cmps/note-img-cmp.js'
import noteVideo from '../cmps/note-video-cmp.js'

export default {
    template: `
        <section class="keep-sus flex flex-col">

            <div class="keep-main">

                <div class="choose-container flex justify-center">
                    <select v-model="currType">
                        <option value="note-txt">Text Note</option>
                        <option value="note-todos">Todos Note</option>
                        <option value="note-img">Img Note</option>
                        <option value="note-video">Video Note</option>
                    </select> 
                    <input v-model.trim="currInput" @keyup.enter="onSubmit" placeholder="What's on your mind..."/>
                </div>
                
                <ul class="notes-container clean-list grid">
                    <li class="note" v-for="note in getNotes">
                        <component @removeNote="onRemoveNote" :note="note" :is="note.type"></component> 
                    </li>
                </ul>
            </div>
        </section>`,
    data() {
        return {
            notes: noteService.getNotes(),
            currInput: '',
            currType: 'note-txt',
        }
    },
    methods: {
        onSubmit() {
            noteService.addNote(this.currInput, this.currType);
            this.notes = noteService.getNotes();
        },
        onRemoveNote(noteId) {
            noteService.removeNote(noteId);
            this.notes = noteService.getNotes();
            console.log(this.notes);

            // console.log(this.notes)
        }
    },
    computed: {
        getNotes() {
            return this.notes;
        }
    },
    components: {
        noteTxt,
        noteTodos,
        noteImg,
        noteVideo
    }
}