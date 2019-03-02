import utilService from '/js/service/util-service.js'

export default {
    props: ['note'],
    type: 'note-video',
    template: `
    <section class="note-section note-video flex flex-col space-between">
    <!-- <video width="320" height="240" controls>
        <source src="https://www.youtube.com/watch?v=0vTopF6wwZg" type="video/mp4">
        <source src="https://www.youtube.com/watch?v=0vTopF6wwZg" type="video/ogg">
        Your browser does not support the video tag.
    </video> -->
    <!-- <iframe width="420" height="315"
        src="http://www.youtube.com/embed/q3rhteIierY">
</iframe> -->
<iframe src="https://www.youtube.com/embed/OOy764mDtiA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<!-- <iframe src="https://www.youtube.com/embed/0vTopF6wwZg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
      
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
    methods: {
        onRemoveClick() {
            this.$emit('removeNote', this.note.id);
        },
        onCopy() {
            utilService.copyStringToClipboard(this.note.content)
        },
        onChangeBgColor(ev) {
            this.$emit('changeBgColor', ev.target.value, this.note.id);
        }
    },
}

// https://www.guidedogsvictoria.com.au/wp-content/themes/default/static/img/puppy.png