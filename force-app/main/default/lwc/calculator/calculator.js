import MailingPostalCode from '@salesforce/schema/Contact.MailingPostalCode';
import { LightningElement } from 'lwc';

export default class Calculator extends LightningElement {
    
row1 = ["1","2","3","R"];
row2 = [4,5,6,"+"];
row3 = [7,8,9,"--"];
row4 = [0,"*","/","="];

currentValue=0;
memorizedValue = 0;
lastClickedArithmaticButton;
lastClickedEqualsButton;
handleClick(event){
        console.log(event.target.label);
        let clickedValue = event.target.label;
        console.log(clickedValue);
        //let textValue = this.template.querySelector(".txtResult");
        if(isNaN(clickedValue)===false){
             if(this.currentValue===0){
                this.currentValue = clickedValue;
             }else{
                this.currentValue = this.currentValue + clickedValue; 
             }
             //textValue.value = this.currentValue;  
        }else{
             if(clickedValue!=='='){
                
                if(clickedValue === "R"){
                        this.memorizedValue = 0;
                        this.currentValue = 0;
                        //textValue.value= this.currentValue;
                        return;
                }
                if(clickedValue === "+"){
                        if(this.lastClickedEqualsButton!=="=")
                        this.memorizedValue = Number(this.memorizedValue) + Number(this.currentValue);
                        this.lastClickedArithmaticButton = "+";
                        this.lastClickedEqualsButton=undefined;
                }
                else if(clickedValue === "--"){
                        if(this.lastClickedEqualsButton!=="=")
                        this.memorizedValue = Number(this.memorizedValue) - Number(this.currentValue);
                        this.lastClickedArithmaticButton = "--";
                        this.lastClickedEqualsButton=undefined;
                }else if(clickedValue === "*"){
                        if(this.lastClickedEqualsButton!=="=")
                        this.memorizedValue = Number(this.memorizedValue) * Number(this.currentValue);  
                        this.lastClickedArithmaticButton = "*";  
                        this.lastClickedEqualsButton=undefined;
                }else if(clickedValue === "/"){
                        if(this.lastClickedEqualsButton!=="=")
                        this.memorizedValue = Number(this.memorizedValue) / Number(this.currentValue);  
                        this.lastClickedArithmaticButton = "/"; 
                        this.lastClickedEqualsButton=undefined;
                }
                this.currentValue = 0;  
                console.log("LastClicked:"+this.lastClickedArithmaticButton);
                console.log("memorized value:"+this.memorizedValue);
                console.log("CurrentValue:"+this.currentValue);
                //textValue.value = this.currentValue;       
             }else{
                
                if(this.lastClickedArithmaticButton===undefined || this.lastClickedArithmaticButton === "+"){
                        this.memorizedValue = Number(this.memorizedValue) + Number(this.currentValue);
                }else if(this.lastClickedArithmaticButton === "--"){
                        this.memorizedValue = Number(this.memorizedValue) - Number(this.currentValue);   
                }else if(this.lastClickedArithmaticButton === "*"){
                        this.memorizedValue = Number(this.memorizedValue) * Number(this.currentValue);   
                }else if(this.lastClickedArithmaticButton === "/"){
                        this.memorizedValue = Number(this.memorizedValue) / Number(this.currentValue);   
                }else{

                }
                this.currentValue = this.memorizedValue; 
                //this.memorizedValue = 0;
                this.lastClickedEqualsButton = "=";
                //textValue.value = this.currentValue;  
                console.log("LastClicked:"+this.lastClickedArithmaticButton);
                console.log("memorized value:"+this.memorizedValue);
                console.log("CurrentValue:"+this.currentValue);
             }
        }
}
connectedCallback(){
        const inputAligncenter = document.createElement('style');
        inputAligncenter.innerText = `.input-text-align_right input{ text-align: right!important; }`;
        document.body.appendChild(inputAligncenter);
}

}