import ebusService from '../../service/eventbus-service.js';


export default {
    template: `
        <section class="email-filter flex justify-center">
            <div class="email-search-container">
                <button class="email-search" type="submit"><i class="fa fa-search"></i></button>
                <input class="email-search" type="text" placeholder="Search mail"
                @keyup="emitFilter" v-model.trim="filterBy.txt" />
            </div>

            <div class="selects-container">
                <select class="filter" @change="emitFilter" v-model="filterBy.status">
                    <option value="all">All</option>
                    <option value="read">Read</option>
                    <option value="unread">Unread</option>
                </select>         
            
                <select class="sort" @change="emitFilter" v-model="filterBy.sort">
                    <option value="none">Sort By</option>
                    <option value="title">Title</option>
                    <option value="date">Date</option>
                </select>
            </div>

        </section> 
    `,
    data() {
        return {
            filterBy: {
                txt: '',
                status: 'all',
                sort: 'none'
            }
        }
    },
    created() {
        ebusService.$on('updateFillter', () => this.emitFilter())
    },
    methods: {
        emitFilter() {
            this.$emit('on-filtered', this.filterBy);
        }
    }
}