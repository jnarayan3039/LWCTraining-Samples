import { LightningElement } from 'lwc';

export default class ChildLifecycleHook extends LightningElement {
    constructor(){
        super();
        console.log("In Child Contructor");
    }

    connectedCallback(){
        console.log("In Child Connected Callback");
    }

    renderedCallback(){
        console.log("In Child Rendered Callback");
    }

    disconnectedCallback(){
        console.log("In Child Disconnected Callback");
    }
}