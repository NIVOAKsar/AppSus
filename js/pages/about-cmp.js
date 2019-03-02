export default {
    template: `
        <section>
            <h1>About Us</h1>
            <router-link exact to="/">Go Back Home</router-link>
            <button @click="sendFeedback">Send Feedback</button>
        </section>`,
    methods: {
        sendFeedback() {
            console.log('Sedning your Feedback');
            setTimeout(() => {
                // this.$router.push('/')
                this.$router.go(-1)
            }, 1000)
        }
    }

}