import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactDataController.getContactsData';
const DELAY = 500;
export default class SearchContacts extends LightningElement {

    searchString;
    delayTimeout;
    @wire(getContacts, {name : '$searchString'})
    contacts;

    handleTextChange(event){
        console.log(event.target.value);
        const searchKey = event.target.value;
        window.clearTimeout(this.delayTimeout);
        this.delayTimeout=setTimeout(()=>{
            this.searchString = searchKey;
        },DELAY)
        //this.searchString = searchKey;
    }

}