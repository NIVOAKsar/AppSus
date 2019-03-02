import utilService from '/js/service/util-service.js'

export default {
  props: ['note'],
  type: 'note-img',
  template: `
    <section class="note-section note-img flex flex-col space-between">
        <img :src="note.content"/>
      
        <div class="edit-nav grid">

          <img src="/img/keep/pin.png">
          <img src="/img/keep/check.png">
          <img src="/img/keep/colors.png">
          <img src="/img/keep/edit.png">
          <img @click="onCopy" src="/img/keep/copy.png">
          <img @click="onRemoveClick" src="/img/keep/trash.png">
 
        </div>


    </section>
    `,
  methods: {
    onRemoveClick() {
      this.$emit('removeNote', this.note.id);
    },
    onCopy() {
      utilService.copyStringToClipboard(this.note.content)
    }
  },
}

// https://www.guidedogsvictoria.com.au/wp-content/themes/default/static/img/puppy.png