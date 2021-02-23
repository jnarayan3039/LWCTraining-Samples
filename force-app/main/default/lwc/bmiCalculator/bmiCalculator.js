import { LightningElement } from 'lwc';

export default class BmiCalculator extends LightningElement {
    height;
    weight;

    bmiValue;
   
    // get bmiValue(){
    //     return Math.round(parseFloat(this.bmiValue));
    // }

    get bmi(){
        return `Rounded BMI value: ${this.bmiValue}`;
    }

    handleHeightChange(event){
        this.height = event.target.value;
    }

    handkeWeightChange(event){
        this.weight = event.target.value;
    }



    // handleChange(event){
    //     elementChanged = event.target.name;
    //     if(elementChanged === "height"){
    //         this.height = event.target.value;
    //     }else{
    //         this.weight = event.target.value;
    //     }
    // }

    handleCalc(event){
        this.bmiValue = Math.round(this.weight/(this.height * this.height));
    }
}