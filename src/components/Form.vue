<template>
    <form class="review_form" @submit.prevent="onSubmit">
                    <div class="form_row">
                        <div class="input_group">
                            <label for="form_name">Vardas</label>
                            <input type="text" class="form_name" v-model='form.first_name' maxlength="50"  required>
                        </div>
                        <div class="input_group">
                            <label for="form_surname">Pavardė</label>
                            <input type="text" class="form_surname" v-model='form.last_name'  maxlength="50"  required>
                        </div>
                        <div class="input_group">
                            <label for="form_email">E-paštas</label>
                            <input type="email" class="form_email" v-model='form.email'  maxlength="50"  required>
                        </div>
                    </div>
                    <div class="input_group">
                        <label for="form_text">Atsiliepimas</label>
                        <textarea class="form_text" @keyup="wordCount" v-model='form.content' @keydown="preventType" maxlength="3000"></textarea>
                        <p class="form_remaining">Liko žodžių: <span>{{remainword}}</span></p>
                    </div>
                    <input type="submit" class="form_submit" value="SIŲSTI">
                <alert v-if="passed" v-bind:push="''">Atsiliepimas įrašytas!</alert>
    </form>
</template>

<script>
import axios from 'axios'
import Alert from './Alert.vue'
class Form {
    constructor(data) {
        for( let field in data) {
            this[field] = data[field];
        }
    }

    data() {
        let data = Object.assign({}, this);

        delete data.originalData;

        delete data.errors

        return data;
    }

    reset() {
        this.data = {};
    }

    submit(requestType, url) {
        axios.post(url,this.data())
        .then(this.onSuccess)
    }
}

export default {
    data () {
        return{
        form: new Form({
        content: '',
        first_name: '',
        last_name: '',
        email: '',
        }),
        maxword: 300,
        remainword: 300,
        generateErr: false,
        passed: false
        }
    },
    mounted() {
        if(localStorage.userfname){
            this.form.first_name = localStorage.userfname;
            this.form.last_name = localStorage.userlname;
            this.form.email = localStorage.useremail;
        }
        this.$root.$on('Close', () => {
            this.passed = false;
            this.form.content = '';
        });
    },
    methods: {
            onSubmit() {
                localStorage.userfname = this.form.first_name;
                localStorage.userlname = this.form.last_name;
                localStorage.useremail = this.form.email;
                this.form.submit('POST','https://akademija.teltonika.lt/guestbook/index.php/reviews');
                this.passed = true;
            },
            onSuccess(response) {
                alert(response.data.message);
                form.reset();
            },
            wordCount() {
                this.remainword = this.maxword - this.form.content.split(' ').length;
                this.generateErr = this.remainword <= 0;
            },
            preventType(evt){
                if (this.generateErr) {
                    if (evt.keyCode === 32) {
                        evt.preventDefault()
                        return
                    }
                }
            }
        },
    components: { Alert }
}
</script>

<style scoped lang="scss">
$color1:#828282;
$color2:#0054A6;
        .form_row{
            display: flex;
            flex-direction: row;
            width: 100%;
            justify-content: space-evenly;
        }
        .form_row .input_group{
            flex-basis: 33%;
            flex-grow: 2;
            padding-right: 3rem;
            margin-bottom: 1rem;
        }
        .form_row .input_group:last-child{
            padding: 0;
        }
        .input_group input{
            width: 97%;
            font-size: 1rem;
            padding: 3% 1%;
        }
        .input_group label{
            display: block;
            color: $color1;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }
        textarea {
            width: 99.5%;
            height: 5rem;
            font-size: 1rem;
        }
        .form_remaining {
            color: $color1;
        }
        .form_submit{
            background-color: $color2;
            color: #f2f2f2;
            font-size: 0.9rem;
            margin: 1.5rem 0rem;
            float: right;
            padding: 0.8rem 2rem;
            border: solid black 1px;
            border-radius: 4px;
            cursor: pointer;
        }
</style>