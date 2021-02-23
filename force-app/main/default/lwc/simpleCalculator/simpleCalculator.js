import { LightningElement } from 'lwc';

export default class SimpleCalculator extends LightningElement {
    firstNumber;
    secondNumber;
    isShowValueSelected;

    operationsPerformed = [];
    result;

    handleChange(event){
        let targetElement = event.target.name;

        if(targetElement === "firstNumber"){
            this.firstNumber = event.target.value;
        }
        if(targetElement === "secondNumber"){
            this.secondNumber = event.target.value;
        }
    }

    handleAddition(){ 
        //this.result = 'Sum of '+this.firstNumber + ' and ' + this.secondNumber +' is ' + (parseInt(this.firstNumber) + parseInt(this.secondNumber));
        //Template Literal
        this.result = `Sum of ${this.firstNumber} and ${this.secondNumber} is ${parseInt(this.firstNumber) + parseInt(this.secondNumber)}`;
        this.operationsPerformed.push(this.result);
    }
    handleSubstraction(){ 
        //this.result = 'Sum of '+this.firstNumber + ' and ' + this.secondNumber +' is ' + (parseInt(this.firstNumber) + parseInt(this.secondNumber));
        //Template Literal
        this.result = `Difference of ${this.firstNumber} and ${this.secondNumber} is ${parseInt(this.firstNumber) - parseInt(this.secondNumber)}`;
        this.operationsPerformed.push(this.result);
    }
    handleMultiplication(){ 
        //this.result = 'Product of '+this.firstNumber + ' and ' + this.secondNumber +' is ' + (parseInt(this.firstNumber) + parseInt(this.secondNumber));
        //Template Literal
        this.result = `Product of ${this.firstNumber} and ${this.secondNumber} is ${parseInt(this.firstNumber) * parseInt(this.secondNumber)}`;
        this.operationsPerformed.push(this.result);
    }
    handleDivision(){ 
        //this.result = 'Sum of '+this.firstNumber + ' and ' + this.secondNumber +' is ' + (parseInt(this.firstNumber) + parseInt(this.secondNumber));
        //Template Literal
        this.result = `Quotient when ${this.firstNumber} is divided by  ${this.secondNumber} is ${parseInt(this.firstNumber) / parseInt(this.secondNumber)}`;
        this.operationsPerformed.push(this.result);
    }

    handleShowValues(event){
        this.isShowValueSelected = event.target.checked;
    }

}