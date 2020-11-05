<template>
  <div id="home">
   <gheader></gheader>
      <div class="main_container">
        <div v-if="user===false">
          <gseparator>Administratoriaus vardas - <span class="aname">{{aname}}</span></gseparator>
          <form @submit.prevent="nameSelect()">
          <input class="aname_input" type="text" v-model="nameholder">
          <input class="aname_submit" type="submit" value="Išsaugoti">
          </form>
        </div>
        <div v-if="user">
        <gseparator class="separator_form">Atsiliepimo forma</gseparator>
        <gform></gform>
        </div>
        <gseparator>Atsiliepimai</gseparator>
        <greview></greview>
      </div>
  </div>
</template>

<script>
import Gheader from '../components/Header.vue'
import Gseparator from '../components/Separator.vue'
import Gform from '../components/Form.vue'
import Greview from '../components/Reviews.vue'

export default {
  name: 'Home',

  components: { Gheader, Gseparator, Gform, Greview },

  data () {
    return {
      user: true,
      aname: "",
      nameholder: ""
    }
  },
  mounted() {
    if(localStorage.token)
    {
      this.user = false;
      this.aname = localStorage.aname;
    }
  },
  methods: {
    nameSelect() {
      this.aname = this.nameholder;
      localStorage.aname = this.nameholder;
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
@import '../style/style.css';
  .aname{
    color:#1E8CBE;
  }
  .aname_input {
    width: 30%;
    font-size: 1rem;
    padding: 0.5% 0.5%;
    margin-left: 1.5rem;
  }
  .aname_submit {
    background-color:#0054a6;
    color: #f2f2f2;
    font-size: 0.9rem;
    margin: 1.5rem 1rem;
    padding: 0.6rem 1.5rem;
    border: solid black 1px;
    border-radius: 4px;
    cursor: pointer;
  }
</style>