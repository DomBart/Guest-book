<template>
<div>
<ul class="review_block">
<li class="review_container">
<div class="info_wrap">
<img class="user_avatar" :src='list.avatar_url' alt="Avatar">
<div class="user_wrap">
<div class="row_wrap">
    <h1 class="user_name">
        {{list.first_name}} {{list.last_name}}
    </h1>
    <div v-if="parent" @click="updateRating(list.id)">
    <star-rating v-bind:rating="list.calculated_rating" @rating-selected="setRating"></star-rating>
    </div>
</div>
<span class="user_date">{{list.created_at}}</span>
</div>
<div class="review_controls" v-if="last">
    <span class="review_reply" @click="replyToggle">Reply</span>
    <img class="review_edit" src="../assets/edit.svg" alt="Edit" @click="editToggle">
    <img class="review_delete" src="../assets/delete.svg" alt="Delete" @click="deleteReview(list.id)">
</div>
</div>
<p class="review_content">
    {{list.content}}
</p>
<div v-if="child.id">
    <review v-bind:list="child"></review>
</div>
</li>
<div>
    <reply v-if="admin===true && reply" v-bind:user="false" v-bind:parent="list" v-bind:edit="false" v-bind:button="'ATSAKYTI'">Admin atsiliepimas</reply>
    <reply v-if="admin===false && reply" v-bind:user="true" v-bind:parent="list" v-bind:edit="false" v-bind:button="'ATSAKYTI'">Komentaras</reply>
</div>
<div>
    <reply v-if='admin===true && edit' v-bind:user="false" v-bind:parent="list" v-bind:edit="true" v-bind:button="'IŠSAUGOTI'">Admin atsiliepimas</reply>
    <reply v-if="admin===false && edit" v-bind:user="true" v-bind:parent="list" v-bind:edit="true" v-bind:button="'IŠSAUGOTI'">Komentaras</reply>
</div>
</ul>
<alert v-if="editpass" v-bind:push="''">Įrašas sėkmingai redaguotas!</alert>
<alert v-if="replypass" v-bind:push="''">Komentaras įrašytas!</alert>
<alert v-if="deletepass" v-bind:push="''">Komentaras ištrintas!</alert>
</div>
</template>

<script>
import axios from 'axios'
import Stars from 'vue-star-rating'
import Review from './Review'
import Reply from './Reply'
import Alert from './Alert.vue'
import Vue from 'vue'

Vue.component('star-rating', Stars)
Vue.component('review', Review)
Vue.component('reply', Reply)
Vue.component('alert', Alert)

export default {
    data () {
        return {
            child: [],
            rate: 0,
            last: true,
            reply: false,
            edit: false,
            admin: false,
            replypass: false,
            editpass: false,
            deletepass: false,
        }
    },
    mounted()
    {
    if(this.list.child[0])
    {
        this.child = this.list.child[0];
        this.last = false;
    }
    if(localStorage.token)
    {
        this.admin = true;
    }
    this.$root.$on('Replied', () => {
        this.replypass = true;
    });
    this.$root.$on('Edited', () => {
        this.editpass = true;
    });
    this.$root.$on('Close', () => {
            this.editpass = false;
            this.replypass = false;
            this.edit = false;
            this.reply = false;
            this.deletepass = false;
    });
    },
    methods: {
        setRating(rating){
            this.rate = rating;
        },
        updateRating(id){
            axios.post('https://akademija.teltonika.lt/guestbook/index.php/reviews/' + id + '?rate=' + this.rate)
            .then(response => {
            this.$root.$emit('Submited');
            });
        },
        deleteReview(id){
            axios.delete('https://akademija.teltonika.lt/guestbook/index.php/reviews/' + id)
            .then(response => {
            this.deletepass = true;
            });
        },
        replyToggle(){
            if(this.edit)
            {
                this.editToggle();
                this.replyToggle();
            }
            else if(this.reply === false)
            {
            this.reply = true;
            }
            else this.reply = false;
        },
        editToggle(){
            if(this.reply)
            {
                this.replyToggle();
                this.editToggle(); 
            }
            else if(this.edit === false)
            {
            this.reply = false;
            this.edit = true;
            }
            else this.edit = false;
        }
    },
    props: ['list','parent']

}
</script>

<style lang="scss">
.info_wrap{
    display: flex;
    flex-direction: row;
}
.user_wrap{
    display: flex;
    flex-direction: column;
}
.user_avatar{
    height: 3.5rem;
    width: 3.5rem;
    padding-right: 1rem;
}
.row_wrap{
    display: flex;
    flex-direction: row;
}
.user_name{
    margin: 0;
    color: #4F4F4F;
    font-size: 1.5rem;
    font-weight: 400;
}
.user_review{
    padding-left: 1rem;
    height: 1rem;
    width: 1rem;
    margin: auto;
}
.vue-star-rating{
    padding-left: 0.8rem;
}
.vue-star-rating-star{
    height: 1.2rem;
    width: 1.2rem;
    padding-right: 0.3rem;
}
.vue-star-rating-rating-text{
    display: none;
}
.user_date{
    margin-top: 0.2rem;
    font-size: 1.2rem;
    color:#BDBDBD;
}
.review_content{
    color: #828282;
    font-size: 1.5rem;
}
.review_content:last-child{
    padding-bottom: 2rem;
}
.review_controls{
    display: flex;
    margin-left: auto;
    flex-direction: row;
}
.review_reply{
    color:#0054A6;
    margin: auto;
    cursor: pointer;
}
.review_reply:hover{
    font-weight: 700;
}
.review_delete, .review_edit{
    height: 1.4em;
    margin: auto;
    padding-left: 0.7rem;
    cursor: pointer;
}
</style>