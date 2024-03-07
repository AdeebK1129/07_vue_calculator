import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
  data() {
    return {
      inputField: '',
      undoStack: [],
      redoStack: [],
    };
  },
  computed: {
    convertExpression() {
      return this.inputField.replace(/π/g, 'pi').replace(/√/g, 'sqrt');
    }
  },
  watch: {
    inputField(newVal, oldVal) {
      const validInputPattern = /^[0-9π().+\-/*^%pq√]*$/;
      if (!validInputPattern.test(newVal)) {
        alert('Invalid input. Only numbers, parentheses, and basic operators are accepted.');
        this.inputField = oldVal; 
      } else {
        if (newVal.includes('p')) {
          this.inputField = newVal.replace(/p/g, 'π');
        }
        if (newVal.includes('q')) {
          this.inputField = newVal.replace(/q/g, '√(');
        }
      }
    }
  },
  methods: {
    backspace(){
      this.inputField = this.inputField.slice(0, -1);
    },
    calculateExpression() {
      this.undoStack.push(this.inputField); 
      try {
        this.inputField = math.evaluate(this.convertExpression).toString();
        this.redoStack = []; 
      } catch (error) {
        console.error('Invalid expression:', error);
        alert('Invalid expression');
      }
    },
    input(digit){
      this.inputField += digit;
    },
    clear(){
      this.inputField = '';
    },
    undo() {
      if (this.undoStack.length > 0) {
        const lastExpression = this.undoStack.pop();
        this.redoStack.push(this.inputField); 
        this.inputField = lastExpression; 
      }
    },
    
    redo() {
      if (this.redoStack.length > 0) {
        const lastUndoneExpression = this.redoStack.pop();
        this.undoStack.push(this.inputField); 
        this.inputField = lastUndoneExpression; 
      }
    },
  },
}).mount('#app') 
