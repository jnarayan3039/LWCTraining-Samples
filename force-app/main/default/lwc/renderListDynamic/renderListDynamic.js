import { LightningElement } from 'lwc';

export default class RenderListDynamic extends LightningElement {
    countries = ["India", "Australia","NewZealand","America"];

    handleClick(event){
        console.log("insider render");
       let txtElement = this.template.querySelector('.txtValue');
       this.countries = txtElement.value.split(",");
    }
}