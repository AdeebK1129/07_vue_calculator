import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
  data() {
    return {
      inputField: '',
    };
  },
  computed: {

  },
  watch: {

  },
  methods: {
    backspace(){
      this.inputField = this.inputField.slice(0, -1);
    },
    calculateExpression(){
      this.inputField = math.evaluate(this.inputField);
    },
    input(digit){
      this.inputField += digit;
    },

  },
}).mount('#app') 
