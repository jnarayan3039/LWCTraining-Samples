import { LightningElement, track, wire } from 'lwc';
import getAccountInformation from '@salesforce/apex/ContactDataController.getAccountInformation';
const contactColumns = [
    { label: 'First Name', fieldName: 'FirstName' },
    { label: 'Last Name', fieldName: 'LastName' },
    { label: 'Email', fieldName: 'Email', type:'email'}
];

const oppColumns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Stage', fieldName: 'StageName' }
];
export default class AccountDataDisplay extends LightningElement {
    conColumns = contactColumns;
    opptyColumns = oppColumns;
    searchString="test";
    @track account;
    activeSections = ['Contacts','Opportunities'];
    
    @wire(getAccountInformation, {name: '$searchString'})
    WiredResults({error, data}){
         if(data){
             this.account = data;
         }
    }

    setSearchString(){
        console.log(this.template.querySelector(".search").value);
        this.searchString = this.template.querySelector(".search").value;
    }
}