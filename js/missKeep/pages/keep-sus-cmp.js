import noteService from '../service/note-service.js'
import noteTxt from '../cmps/note-txt-cmp.js'
import noteTodos from '../cmps/note-todos-cmp.js'
import noteImg from '../cmps/note-img-cmp.js'
import noteVideo from '../cmps/note-video-cmp.js'

export default {
    template: `
        <section class="keep-sus">

            <div class="keep-main flex flex-col align-center">

                <div class="keep-search-container">
                    <button class="keep-search" type="submit"><i class="fa fa-search"></i></button>
                    <input class="keep-search" type="text" placeholder="Search for a note..."/>
                </div>

                <div class="choose-container flex space-around">
                    
                    <input v-model.trim="currInput" @keyup.enter="onSubmit" placeholder="What's on your mind..."/>
                    
                    <div class="icons-container">
                        <img @click="changeCurrType('note-txt', $event)" ref="txt" title="Text Note" src="/img/keep/text.png">
                        <img @click="changeCurrType('note-todos', $event)" title="Todo Note" src="/img/keep/todo.png">
                        <img @click="changeCurrType('note-img', $event)" title="Image Note" src="/img/keep/image.png">
                        <img @click="changeCurrType('note-video', $event)" title="Video Note" src="/img/keep/video.png">
                        <img @click="changeCurrType('note-audio', $event)" title="Audio Note" src="/img/keep/audio.png">
                        <img @click="changeCurrType('note-map', $event)" title="Map Note" src="/img/keep/map.png">
                    </div>
                    <img class="keep-trash" @click="clearAll" title="Clear All" src="/img/keep/trash.png">
                    
                </div>
                
            </div>
            
            <ul class="notes-container clean-list grid">
                <li class="note" :style="{backgroundColor : note.bgColor}" v-for="note in getNotes">
                    <component @changeBgColor="changeBgColor" @removeNote="onRemoveNote" :note="note" :is="note.type"></component> 
                </li>
            </ul>
            
        </section>`,
    data() {
        return {
            notes: noteService.getNotes(),
            currInput: '',
            currType: 'note-txt',
            currIcon: ''
        }
    },
    mounted() {
        this.currIcon = this.$refs.txt;
        this.currIcon.style.opacity = 1;
    },
    methods: {
        onSubmit() {
            noteService.addNote(this.currInput, this.currType);
            this.notes = noteService.getNotes();
            this.currInput = '';
        },
        onRemoveNote(noteId) {
            noteService.removeNote(noteId);
            this.notes = noteService.getNotes();
        },
        changeCurrType(type, ev) {
            this.currType = type;
            this.currIcon.style.opacity = 0.5;
            this.currIcon = ev.target;
            this.currIcon.style.opacity = 1;
        },
        clearAll() {
            if (confirm('Are you sure you want to delete all notes???')) {
                noteService.clearAllNotes();
                this.notes = noteService.getNotes();
            }
        },
        changeBgColor(color, noteId) {
            noteService.setBgColor(color, noteId);
            this.notes = noteService.getNotes();
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