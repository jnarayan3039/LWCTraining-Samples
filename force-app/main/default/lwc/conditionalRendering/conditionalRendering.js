import { LightningElement } from 'lwc';

export default class ConditionalRendering extends LightningElement {
    checkboxSelected = false;

    handleCheckbox(event){
        console.log(event.target.checked);
        this.checkboxSelected = event.target.checked;
    }
}