import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
  data() {
    return {
      inputField: '',
      formerExpressions: [],
    };
  },
  computed: {

  },
  watch: {

  },
  methods: {
    backspace(){
      this.inputField = this.inputField.substring(0, this.inputField.length - 1);
    },
    calculateExpression(){
      try{ 
        this.formerExpressions.push(this.inputField);
        this.inputField = math.evaluate(this.inputField).toString();}
      catch (error){
        alert("not a valid expression")
      }

    },
    input(digit){
      this.inputField += digit;
    },

    undo(){
      this.inputField = this.formerExpressions.pop();
    }

  },
}).mount('#app') 
