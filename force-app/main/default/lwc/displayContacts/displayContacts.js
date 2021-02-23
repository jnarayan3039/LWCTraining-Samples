import { LightningElement,track } from 'lwc';

export default class DisplayContacts extends LightningElement {
    
    page=1;
    startIndex= 0;
    endIndex = 3;
    count = 3;
    contacts=[
        {
            firstName: 'Jayaprakash',
            lastName: 'Thatiparthi',
            email: 'jp.narayan@gmail.com',
        },
        {
            firstName: 'Umesh',
            lastName: 'Vajpayee',
            email: 'umesh.vajpayee@gmail.com',
        },
        {
            firstName: 'Kishore',
            lastName: 'Kumar',
            email: 'kishore.kumar@gmail.com',
        },
        {
            firstName: 'Himanshu',
            lastName: 'Pandit',
            email: 'himanshu.pandit@gmail.com',
        },
        {
            firstName: 'Sean',
            lastName: 'Murphy',
            email: 'sean.murphy@gmail.com',
        },
        {
            firstName: 'John',
            lastName: 'Leader',
            email: 'john.leader@gmail.com',
        },
        {
            firstName: 'Arundhathi',
            lastName: 'Kalpesha',
            email: 'arundhathi.kalpesha@gmail.com',
        },
        {
            firstName: 'Anitha',
            lastName: 'Arumugam',
            email: 'anitha.arumugam@gmail.com',
        },
        {
            firstName: 'Lakshmi',
            lastName: 'Ranjani',
            email: 'lakshmi.ranjani@gmail.com',
        },
        {
            firstName: 'Elon',
            lastName: 'Musk',
            email: 'elon.musk@gmail.com',
        },
        {
            firstName: 'Michael',
            lastName: 'Raju',
            email: 'michael.raju@gmail.com',
        },
        {
            firstName: 'Leela',
            lastName: 'Bansar',
            email: 'leela.bansal@gmail.com',
        },
        {
            firstName: 'Aparajitha',
            lastName: 'Mohanti',
            email: 'aparajitha.mohanti@gmail.com',
        },
        {
            firstName: 'Narender',
            lastName: 'Damodar',
            email: 'narender.damodar@gmail.com',
        },
        {
            firstName: 'Vignesh',
            lastName: 'Nayak',
            email: 'vignesh.nayak@gmail.com',
        },
        {
            firstName: 'Muumun',
            lastName: 'Sen',
            email: 'munmum.senn@gmail.com',
        },
        {
            firstName: 'Lalitha',
            lastName: 'Ragamala',
            email: 'lalitha.ragamala@gmail.com',
        },
    ];

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