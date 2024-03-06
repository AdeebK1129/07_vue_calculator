import{createApp, ref} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import { evaluate } from 'https://unpkg.com/mathjs@12.4.0/lib/browser/math.js'

const app = createApp({
    setup(){

    },

    data(){
        return{
           inputField: "",
           formerExpressions: [],
        }
    },

    methods:{
        evaluateString(){
            try{
                // eval(this.inputField)
                this.formerExpressions.push(this.inputField);
                this.inputField = eval(this.inputField);
                console.log(this.formerExpressions);
            } 
            catch (error){
                alert("Not a valid expression")
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