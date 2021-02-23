import { LightningElement,track } from 'lwc';
import {getContacts} from 'c/utility';
export default class ModuleSample extends LightningElement {
    
    page=1;
    startIndex= 0;
    endIndex = 3;
    count = 3;
    contacts=getContacts(20);

    @track contactsToDisplay = [];

    constructor(){
        super();
        // this.contactsToDisplay = this.contacts.filter(contact=>{
        //     return this.contacts.indexOf(contact)>=this.startIndex && this.contacts.indexOf(contact)<this.endIndex;
        //  });
         this.contactsToDisplay = this.contacts.slice(this.startIndex, this.endIndex);
    }

    previousHandler(event) {
        if (this.page > 1) {
            this.page = this.page - 1;
            this.endIndex = this.startIndex;
            this.startIndex = this.startIndex-this.count;
            console.log(this.startIndex, this.endIndex);
            // this.contactsToDisplay = this.contacts.filter(contact=>{
            //    return this.contacts.indexOf(contact)>=this.startIndex && this.contacts.indexOf(contact)<this.endIndex;
            // });
            this.contactsToDisplay = this.contacts.slice(this.startIndex, this.endIndex);
           
        }else{
            event.target.disabled;
        }
    }

    nextHandler() {
        this.page = this.page + 1;
        this.startIndex = this.endIndex;
        this.endIndex = this.endIndex+this.count;
        // this.contactsToDisplay = this.contacts.filter(contact=>{
        //     return this.contacts.indexOf(contact)>=this.startIndex && this.contacts.indexOf(contact)<this.endIndex;
        //  });
         this.contactsToDisplay = this.contacts.slice(this.startIndex, this.endIndex);
         
    }
}