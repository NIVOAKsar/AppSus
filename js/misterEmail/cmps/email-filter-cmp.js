import emailService from '../service/email-service.js';

export default {
    template: `
        <section class="email-filter flex justify-center">
            <!-- <div class="filters-container">  -->
            <div class="search-container">
                <button class="search" type="submit"><i class="fa fa-search"></i></button>
                <input class="search" type="text" placeholder="Search mail"
                @keyup="emitFilter" v-model.trim="filterBy.txt" />
            </div>

            <div class="selects-container">
                <select class="filter" @change="emitFilter" v-model="filterBy.status">
                    <option value="all">All</option>
                    <option value="read">Read</option>
                    <option value="unread">Unread</option>
                </select>         

            <!-- </div> -->
            
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
    methods: {
        emitFilter() {
            this.$emit('on-filtered', this.filterBy);
        }
    }
}