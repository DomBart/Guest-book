<template>
<div class="modal_container">
    <div class="login_modal">
        <form class="login_form" @submit.prevent="loginSubmit">
        <gseparator>Admin Login</gseparator>
        <div class="input_group">
             <label for="password_label">Password</label>
             <input type="password" class="pass_input" v-model='pass' required>
        </div>
        <span class="failed_text" v-if="failed">Login failed</span>
        <input type="submit" class="pass_submit" value="SIŲSTI">
        </form>
    </div>
    <alert v-if="passed" v-bind:push="'/'">Prisijungimas sėkmingas!</alert>
</div>
</template>

<script>
import Gseparator from '../components/Separator.vue'
import axios from 'axios'
import Alert from '../components/Alert.vue'

export default {
  data () {
    return {
        pass: '',
        failed: false,
        passed: false
    }
  },
    components: { Gseparator, Alert },
    methods: {
            loginSubmit() {
                axios.post('https://akademija.teltonika.lt/guestbook/index.php/login?password=' + this.pass)
                .then((response) => {
                    this.failed = false;
                    this.passed = true;
                    localStorage.token = response.data.token;
                    localStorage.aname = "Administratorius";
                })
                .catch((error) => {
                this.failed = true;
                })
            }
    }
}
</script>

<style>
.modal_container{
    height: 70vh;
    width: 100%;
    display: flex;
}
.login_modal{
  width: 400px;
  height: 350px;
  background: #ffffff;
  margin: auto;
  justify-content: center;
  padding: 2rem;
  align-items: center;
    -webkit-box-shadow: 0px 0px 10px 3px rgba(199,199,199,1);
    -moz-box-shadow: 0px 0px 10px 3px rgba(199,199,199,1);
    box-shadow: 0px 0px 10px 3px rgba(199,199,199,1);
}
.input_group input{
    width: 97%;
    font-size: 1rem;
    padding: 3% 1%;
}
.input_group label{
    display: block;
    color: #828282;
    font-weight: 700;
    margin-bottom: 0.5rem;
}
.pass_submit{
    background-color: #0054A6;
    color: #f2f2f2;
    font-size: 0.9rem;
    margin: 1.5rem 0rem;
    float: right;
    padding: 0.6rem 2rem;
    border: solid black 1px;
    border-radius: 4px;
    cursor: pointer;
}
.failed_text{
    display: inline;
    position: relative;
    color: red;
    top: 0.5rem;
    font-weight: 700;
}
</style>