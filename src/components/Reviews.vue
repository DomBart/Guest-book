<template>
<div>
<ul class="review_block">
<li class="review_container" v-bind="list.id" v-for="item in list.slice(offset, pageItems)" :key="item.id">
<review v-bind:list="item" v-bind:parent='true'></review>
</li>
</ul>
<paginate
    :page-count=pageCount
    :click-handler="clickCallback"
    :prev-text="'Prev'"
    :next-text="'Next'"
    :next-class="'next_item'"
    :prev-class="'prev_item'"
    :container-class="'pagination'"
    :page-class="'page_item'">
</paginate>
</div>
</template>

<script>

import axios from 'axios'
import Paginate from 'vuejs-paginate'
import Review from './Review'
import Vue from 'vue'

Vue.component('paginate', Paginate)
Vue.component('review', Review)

export default {
    data() {
        return{ 
        pageCount: 0,
        list:[],
        offset: 0,
        pageItems: 12,
        rate: 0,
        admin: false
        }
    },
    mounted()
    {
    if(localStorage.token)
    {
      this.admin = true;
    }
    this.getReviews();
    this.$root.$on('Submited', () => {
            this.getReviews();
        });
    },
    methods: {
        clickCallback(pageNum){
            this.pageItems = pageNum * 12;
            this.offset = (pageNum * 12) - 12;
        },
        getReviews(){
            console.log("reviews loaded");
            axios.get('https://akademija.teltonika.lt/guestbook/index.php/reviews')
            .then((resp) => {
                this.list = resp.data.reviews;
                if(resp.data.reviews.length % 12 == 0)
                {
                    this.pageCount = Math.floor(resp.data.reviews.length / 12);
                }
                else
                {
                    this.pageCount = Math.floor(resp.data.reviews.length / 12) + 1;
                }
            })
        },
    },
}
</script>

<style>
.review_block{
    list-style-type: none;
}
.pagination{
    display: flex;
    flex-direction: row;
    list-style-type: none;
    justify-content: center;
    padding-bottom: 2rem;
    color: #4F4F4F;
    font-size: 1.2rem;
}
.next_item a{
    padding: 5px;
    margin: 3px;
}
.prev_item a{
    padding: 5px;
    margin: 3px;
}
.page_item a{
    padding: 5px;
    margin: 3px;
}
.active a{
  color:#0054A6;
  font-weight: 700;
}
</style>