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

                    <img class="select-menu" src="/img/keep/htree-dots.png">
                    
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
                <!-- <div class="icons-container-mobile">
                    <img @click="changeCurrType('note-txt', $event)" ref="txt" title="Text Note" src="/img/keep/text.png">
                    <img @click="changeCurrType('note-todos', $event)" title="Todo Note" src="/img/keep/todo.png">
                    <img @click="changeCurrType('note-img', $event)" title="Image Note" src="/img/keep/image.png">
                    <img @click="changeCurrType('note-video', $event)" title="Video Note" src="/img/keep/video.png">
                    <img @click="changeCurrType('note-audio', $event)" title="Audio Note" src="/img/keep/audio.png">
                    <img @click="changeCurrType('note-map', $event)" title="Map Note" src="/img/keep/map.png">
                </div> -->
                
            </div>
            <h1>Pinned Notes:</h1>
            <ul class="notes-container clean-list grid">
                <li class="note" :style="{backgroundColor : note.bgColor}" v-for="note in pinnedNotes">
                    <component @unpinNote="onUnpinNote" @changeBgColor="changeBgColor" @removeNote="onRemovePinnedNote" :note="note" :isPinned="true" :is="note.type"></component> 
                </li>
            </ul>

            <br/><br/>

            <h1>Regular Notes:</h1>
            <ul class="notes-container clean-list grid">
                <li class="note" :style="{backgroundColor : note.bgColor}" v-for="note in notes">
                    <component @updateNote="onUpdateNote" @pinNote="onPinNote" @changeBgColor="changeBgColor" @removeNote="onRemoveNote" :note="note" :isPinned="false" :is="note.type"></component> 
                </li>
            </ul>
            
        </section>`,
    data() {
        return {
            notes: noteService.getNotes(),
            pinnedNotes: noteService.getPinnedNotes(),
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
        /*********************** NOTE ***********************/

        onSubmit() {
            noteService.addNote(this.currInput, this.currType);
            this.notes = noteService.getNotes();
            this.currInput = '';
        },
        onPinNote(noteId) {
            noteService.pinNote(noteId);
            this.notes = noteService.getNotes();
            this.pinnedNotes = noteService.getPinnedNotes();
        },
        onUpdateNote(noteId, content) {
            noteService.updateNote(noteId, content);
            this.notes = noteService.getNotes();
        },

        onRemoveNote(noteId) {
            noteService.removeNote(noteId);
            this.notes = noteService.getNotes();
            console.log(this.notes);
        },
        changeBgColor(color, noteId) {
            noteService.setBgColor(color, noteId);
            this.notes = noteService.getNotes();
        },

        /*********************** PINNED NOTE ***********************/
        onUnpinNote(noteId) {
            noteService.unpinNote(noteId);
            this.notes = noteService.getNotes();
            this.pinnedNotes = noteService.getPinnedNotes();
        },
        onUpdatePinNote() {

        },
        onRemovePinnedNote(noteId) {
            noteService.removePinnedNote(noteId);
            this.pinnedNotes = noteService.getPinnedNotes();
        },

        /*********************** OTHER ***********************/
        clearAll() {
            if (confirm('Are you sure you want to delete all notes???')) {
                noteService.clearAllNotes();
                this.notes = noteService.getNotes();
                this.pinnedNotes = noteService.getPinnedNotes();
            }
        },

        changeCurrType(type, ev) {
            this.currType = type;
            this.currIcon.style.opacity = 0.5;
            this.currIcon = ev.target;
            this.currIcon.style.opacity = 1;
        },


    },
    components: {
        noteTxt,
        noteTodos,
        noteImg,
        noteVideo
    }
}