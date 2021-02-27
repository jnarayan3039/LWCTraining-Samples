import { LightningElement } from 'lwc';
import getContactList from '@salesforce/apex/ContactDataController.getContactList';
export default class ApexImperativeMethod extends LightningElement {

    contacts;
    error;

    handleClick(){
        getContactList()
        .then((result)=>{
            this.contacts = result;
        })
        .catch((error)=>{
            this.error = error;
        });
    }
}