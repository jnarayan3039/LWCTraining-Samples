import { LightningElement } from 'lwc';

export default class Greeting extends LightningElement {
     greet = 'World!';

     handleChange(event){
        this.greet = event.target.value;
     }
}