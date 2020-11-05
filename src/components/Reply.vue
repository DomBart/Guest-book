<template>
    <div class="reply_wrap">
    <form @submit.prevent="onSubmit">
        <div v-if="user" class="form_row">
                        <div class="reply_group">
                            <label for="form_name">Vardas</label>
                            <input type="text" class="form_name" v-model='first_name' maxlength="50" required>
                        </div>
                        <div class="reply_group">
                            <label for="form_surname">Pavardė</label>
                            <input type="text" class="form_surname" v-model='last_name' maxlength="50" required>
                        </div>
                        <div class="reply_group">
                            <label for="form_email">E-paštas</label>
                            <input type="email" class="form_email" v-model='email'  maxlength="50" required>
                        </div>
        </div>
        <div class="reply_group">
            <label for="reply_text"><slot></slot></label>
            <textarea class="reply_text" @keyup="wordCount" @keydown="preventType" v-model='content' maxlength="3000"></textarea>
            <p class="form_remaining">Liko žodžių: <span>{{remainword}}</span></p>
        </div>
        <input type="submit" class="reply_submit" :value='button'>
    </form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
        data() {
            return{
                first_name: "",
                last_name: "",
                email: "",
                content: "",
                maxword: 300,
                remainword: 300
            }
        },
        mounted() {
            if(this.edit){
                this.first_name = this.parent.first_name;
                this.last_name = this.parent.last_name;
                this.email = this.parent.email;
                this.content = this.parent.content;
            }else if(localStorage.userfname){
                this.first_name = localStorage.userfname;
                this.last_name = localStorage.userlname;
                this.email = localStorage.useremail;
            }
        },
        methods: {
            wordCount() {
                this.remainword = this.maxword - this.content.split(' ').length;
                this.generateErr = this.remainword <= 0;
            },
            preventType(evt){
                if (this.generateErr) {
                    if (evt.keyCode === 32) {
                        evt.preventDefault()
                        return
                    }
                }
            },
            onSubmit(){
                if(this.edit){
                    let reply = {
                        first_name : this.first_name,
                        last_name : this.last_name,
                        email : this.email,
                        content : this.content
                    }
                    axios.put('https://akademija.teltonika.lt/guestbook/index.php/reviews/'+this.parent.id, reply)
                    .then(this.$root.$emit('Edited'));
                }
                else if(this.user){
                    let reply = {
                        first_name : this.first_name,
                        last_name : this.last_name,
                        email : this.email,
                        content : this.content,
                        parent_id : this.parent.id
                    }
                    axios.post('https://akademija.teltonika.lt/guestbook/index.php/reviews/answer', reply)
                    .then(this.$root.$emit('Replied'));
                    this.replypassed = true;
                }else{
                    let config = {
                         headers: {
                            Authorization: 'Bearer ' + localStorage.token,
                        }
                    }
                    let reply = {
                        admin_name : localStorage.aname,
                        content : this.content,
                        parent_id : this.parent.id
                    }
                    axios.post('https://akademija.teltonika.lt/guestbook/index.php/reviews/adminanswer', reply, config)
                    .then(response => {
                        this.$root.$emit('Replied')
                    });
                }
            }
        },
        props: ['user', 'parent', 'edit', 'button']
}
</script>

<style scoped lang="scss">
$color1:#828282;
$color2:#0054A6;
.reply_wrap{
    padding-bottom: 5rem;
}
.reply_group{
    flex-grow: 2;
    padding-right: 3rem;
    margin-bottom: 1rem;
    .reply_group:last-child{
    padding-right: 0;
}
}
.reply_group input{
    width: 97%;
    font-size: 1rem;
    padding: 3% 1%;
}
.reply_group label{
    display: block;
    color: $color1;
    font-weight: 700;
    margin-bottom: 0.5rem;
}
.reply_text{
    width: 100%;
    height: 6rem;
    font-size: 1rem;
}
.reply_submit{
    float: right;
    background-color: $color2;
    color: #f2f2f2;
    font-size: 0.9rem;
    padding: 0.8rem 1.5rem;
    margin-right: 3rem;
    border: solid black 1px;
    border-radius: 4px;
    cursor: pointer;
}
.form_row{
            display: flex;
            flex-direction: row;
            width: 100%;
            justify-content: space-evenly;
            .form_row .input_group{
                flex-basis: 33%;
                flex-grow: 2;
                padding-right: 3rem;
                margin-bottom: 1rem;
                .form_row .input_group:last-child{
                    padding: 0;
                }
            }
}
.form_remaining {
    color: $color1;
}
</style>