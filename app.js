import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
  data() {
    return {
      inputField: '',
      undoStack: [],
      redoStack: [],
      isDirectInput: false,
      equationHistory: [],
    };
  },
  computed: {
    convertExpression() {
      return this.inputField.replace(/π/g, 'pi').replace(/√/g, 'sqrt');
    }
  },
  watch: {
    inputField(newVal, oldVal) {
      if (this.isDirectInput) {
        const validInputPattern = /^[0-9π().+\-/*^%pqe√]*$/;
        if (!validInputPattern.test(newVal)) {
          alert('Invalid input and/or invalid expression. Only numbers, parentheses, and basic operators are accepted.');
          this.inputField = oldVal;
          this.isDirectInput = false;
          return; 
        } 
        if (newVal.includes('p')) {
          this.inputField = newVal.replace(/p/g, 'π');
        }
        if (newVal.includes('q')) {
          this.inputField = newVal.replace(/q/g, '√(');
        }
        this.undoStack.push(oldVal);
        this.isDirectInput = false;
      }
    }
  },
  methods: {
    backspace(){
      this.recordUserInput();
      this.inputField = this.inputField.slice(0, -1);
    },
    calculateExpression() {
      try {
        const result = math.evaluate(this.convertExpression).toString();
        this.equationHistory.unshift({ expression: this.inputField, result: result });
        if (this.equationHistory.length > 3) {
          this.equationHistory.pop();
        }
        this.inputField = result;
        this.redoStack = [];
      } catch (error) {
        console.error('Invalid expression:', error);
        alert('Invalid expression');
      }
    },
    input(digit){
      this.recordUserInput();
      this.inputField += digit;
    },
    clear(){
      this.recordUserInput();
      this.inputField = '';
    },
    undo() {
      if (this.undoStack.length > 0) {
        const lastExpression = this.undoStack.pop();
        this.redoStack.push(this.inputField);
        this.inputField = lastExpression; 
        this.isDirectInput = false;
      }
    },
    redo() {
      if (this.redoStack.length > 0) {
        const lastUndoneExpression = this.redoStack.pop();
        this.undoStack.push(this.inputField);
        this.inputField = lastUndoneExpression;
        this.isDirectInput = false;
      }
    },
    handleKeydown(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.calculateExpression();
      } else {
        this.recordUserInput();
      }
    },
    focusTextarea() {
      this.$refs.inputRef.focus();
    },
    recordUserInput() {
      this.isDirectInput = true;
    }
  },
}).mount('#app');
