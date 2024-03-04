import{createApp, ref} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
const app = createApp({
    setup(){

    },

    data(){
        return{
           inputField: "",
           formerExpressions: [],
           errBoolean: false,
        }
    },

    methods:{
        evaluateString(){
            try{
                this.errBoolean = false;
                eval(this.inputField)
                this.formerExpressions.push(this.inputField);
                this.inputField = eval(this.inputField);
                console.log(this.formerExpressions);
            } 
            catch (error){
                this.errBoolean = true;
            }
            
        },

        backspace(){
            this.inputField = this.inputField.substring(0, this.inputField.length - 1);
        },

        undo(){
            this.inputField = this.formerExpressions.pop();
        }
    }
}).mount('#app')