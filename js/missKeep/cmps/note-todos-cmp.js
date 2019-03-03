// import utilService from '/js/service/util-service.js'

// export default {
//     props: ['note'],
//     type: 'note-todos',
//     template: `
//     <section class="note-section note-todos flex flex-col space-between">
//         <ul v-for="item in note.content">
//             <li>
//                 <div @click="onClick" v-show="!isEditMode">{{item}}</div>
//                 <textarea ref="textArea" v-show="isEditMode">{{item}}</textarea>
//             </li>
//         </ul>

//         <div class="edit-nav grid">

//             <img src="/img/keep/pin.png">
//             <img src="/img/keep/check.png">
//             <div>
//                 <input @change="onChangeBgColor" type="color">
//                 <!-- <img src="/img/keep/colors.png"> -->
//             </div>
//             <img src="/img/keep/edit.png">
//             <img @click="onCopy" src="/img/keep/copy.png">
//             <img @click="onRemoveClick" src="/img/keep/trash.png">

//         </div>

//     </section>
//     `,
//     data() {
//         return {
//             isEditMode: false,
//         }
//     },
//     methods: {
//         onRemoveClick() {
//             this.$emit('removeNote', this.note.id);
//         },
//         onCopy() {
//             utilService.copyStringToClipboard(this.note.content.join(','))
//         },
//         onChangeBgColor(ev) {
//             this.$emit('changeBgColor', ev.target.value, this.note.id);
//         },
//         onClick() {
//             this.isEditMode = true;
//             setTimeout(() => this.$refs.textArea.focus());
//         }
//     },
// }
import utilService from '/js/service/util-service.js'

export default {
    props: ['note', 'isPinned'],
    type: 'note-todos',
    template: `
    <section class="note-section note-todos flex flex-col space-between">
        
        <ul v-for="(item, index) in note.content">
             <li>
                <div @click="onClick" class="on-edit-text" v-show="!isEditMode">{{item}}</div>
                <textarea ref="textArea" class="edit-text" v-model="items[index]" v-show="isEditMode">{{item}}</textarea>
            </li>
        </ul>
        <div class="edit-nav grid">
            <img v-if="!isPinned" @click="onPinClick" src="/img/keep/pin.png"/>
            <img v-else @click="onUnpinClick" src="/img/keep/unpin.png"/>
            <div>
                <input @change="onChangeBgColor" type="color">
                <!-- <img class="img-color" src="/img/keep/colors.png"> -->
            </div>
            <img @click="isEditMode = false" src="/img/keep/check.png"/>
            <img @click="isEditMode = true" src="/img/keep/edit.png"/>
            <img @click="onCopy" src="/img/keep/copy.png"/>
            <img @click="onRemoveClick" src="/img/keep/trash.png"/>

        </div> 

    </section>
    `,
    data() {
        return {
            items: '',
            isEditMode: false,
        }
    },
    created() {
        this.items = this.note.content;
    },
    methods: {
        onRemoveClick() {
            this.$emit('removeNote', this.note.id);
        },
        onCopy() {
            utilService.copyStringToClipboard(this.note.content)
        },
        onClick() {
            this.isEditMode = true;
            // setTimeout(() => this.$refs.textArea.focus());
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