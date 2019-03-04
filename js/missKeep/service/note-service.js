import utilService from '../../service/util-service.js';



const NOTES_KEY = 'NOTES';
const PINNED_KEY = 'PINNED';
var gNotes = [];
var gPinnedNotes = [];

_getQuery();

function _getQuery() {
    let storage = utilService.loadFromStorage(NOTES_KEY);
    if (storage) {
        gNotes = utilService.loadFromStorage(NOTES_KEY);
        gPinnedNotes = utilService.loadFromStorage(PINNED_KEY)
    } else {
        _createNotes();
        utilService.saveToStorage(NOTES_KEY, gNotes);
        utilService.saveToStorage(PINNED_KEY, gPinnedNotes);
    }
}

/*********************** NOTE ***********************/
function _createNote(content, type) {
    return {
        id: utilService.getRandomId(),
        type: type,
        timestamp: Date.now(),
        createdAt: new Date().toLocaleDateString(),
        content: content,
        bgColor: '#e7df97'
    }
}

function _createNotes() {
    gNotes = [];
    gPinnedNotes = [];
    addNote('lorem ipsum shmulik nuolllols', 'note-txt');
    addNote('finish sprint 3, finish sprint 4, finish coding academy, learn angular', 'note-todos');
    addNote('https://img.purch.com/h/1000/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA2OC8wOTUvb3JpZ2luYWwvZ2lyYWZmZS5qcGc=', 'note-img');
    addNote('https://www.youtube.com/watch?v=vr0qNXmkUJ8', 'note-video');
    addNote('Hello Worldddd', 'note-txt');
    addNote('https://c402277.ssl.cf1.rackcdn.com/photos/11552/images/hero_small/rsz_namibia_will_burrard_lucas_wwf_us_1.jpg?1462219623', 'note-img');
}

function addNote(content, type) {
    let concon = _convertContent(content, type); // converted content
    gNotes.push(_createNote(concon, type));
    utilService.saveToStorage(NOTES_KEY, gNotes);
}

function removeNote(noteId) {
    let idx = getNoteIdxById(noteId);
    gNotes.splice(idx, 1);
    utilService.saveToStorage(NOTES_KEY, gNotes);
}

function updateNote(noteId, content) {
    let note = getNoteById(noteId);
    note.content = content;
    utilService.saveToStorage(NOTES_KEY, gNotes);
}

function setNoteColor(color, noteId) {
    let note = getNoteById(noteId);
    note.bgColor = color;
    utilService.saveToStorage(NOTES_KEY, gNotes);
}

function getNoteById(noteId) {
    return gNotes.find(note => note.id === noteId);
}

function getNoteIdxById(noteId) {
    return gNotes.findIndex(note => note.id === noteId);
}

function getNotes() {
    return gNotes;
}

function getNotesFiltered(txt) {
    let filtered = gNotes.filter(note => {
        if (Array.isArray(note.content)) {
            return note.content.join(',').includes(txt);
        }
        return note.content.includes(txt);
    })
    return filtered;
}

/*********************** PINNED NOTE ***********************/

function pinNote(noteId) {
    let idx = getNoteIdxById(noteId);
    gPinnedNotes.push(gNotes.splice(idx, 1)[0]);
    utilService.saveToStorage(NOTES_KEY, gNotes);
    utilService.saveToStorage(PINNED_KEY, gPinnedNotes);
}

function unpinNote(noteId) {
    let idx = getPinnedNoteIdxById(noteId);
    gNotes.push(gPinnedNotes.splice(idx, 1)[0]);
    utilService.saveToStorage(NOTES_KEY, gNotes);
    utilService.saveToStorage(PINNED_KEY, gPinnedNotes);
}

function updatePinnedNote(noteId, content) {
    let note = getPinnedNoteById(noteId);
    note.content = content;
    utilService.saveToStorage(PINNED_KEY, gPinnedNotes);
}

function setPinnedNoteColor(color, noteId) {
    let note = getPinnedNoteById(noteId);
    note.bgColor = color;
    utilService.saveToStorage(PINNED_KEY, gPinnedNotes);
}

function removePinnedNote(noteId) {
    let idx = getPinnedNoteIdxById(noteId);
    gPinnedNotes.splice(idx, 1);
    utilService.saveToStorage(PINNED_KEY, gPinnedNotes);
}

function getPinnedNoteById(noteId) {
    return gPinnedNotes.find(note => note.id === noteId);
}

function getPinnedNoteIdxById(noteId) {
    return gPinnedNotes.findIndex(note => note.id === noteId);
}

function getPinnedNotes() {
    return gPinnedNotes;
}

function getPinNotesFiltered(txt) {
    let filtered = gPinnedNotes.filter(note => {
        if (Array.isArray(note.content)) {
            return note.content.join(',').includes(txt);
        }
        return note.content.includes(txt);
    })
    return filtered;
}

/*********************** TODO NOTE ***********************/


/*********************** OTHER ***********************/

function clearAllNotes() {
    gNotes = [];
    gPinnedNotes = [];
    utilService.saveToStorage(NOTES_KEY, gNotes);
    utilService.saveToStorage(PINNED_KEY, gPinnedNotes);
}

function _convertContent(content, type) {
    switch (type) {
        case 'note-todos':
            return content.split(',');
            break;
        case 'note-img':
            return content;
            break;
        case 'note-video':
            return utilService.getYoutubeUrlEmbed(content);
            break;
        default:
            return content;
            break;
    }
}

export default {
    addNote,
    removeNote,
    updateNote,
    setNoteColor,
    getNotes,
    removePinnedNote,
    pinNote,
    unpinNote,
    updatePinnedNote,
    setPinnedNoteColor,
    getPinnedNotes,
    clearAllNotes,
    getNotesFiltered,
    getPinNotesFiltered
}