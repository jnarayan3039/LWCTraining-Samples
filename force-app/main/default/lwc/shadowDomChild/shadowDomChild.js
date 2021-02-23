import { LightningElement } from 'lwc';

export default class ShadowDomChild extends LightningElement {

    handleHoverEvent(event){
        const h1Element = event.target;
        h1Element.value = "I am modified text";
    }

    handleBlur(event){
        event.target.value="";
    }
    changeColor(event){
        event.target.textContent = 'Stop';
        event.target.class = 'buttonHover';
    }
    
}