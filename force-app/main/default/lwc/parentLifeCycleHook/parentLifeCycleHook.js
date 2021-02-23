import { LightningElement } from 'lwc';

export default class ParentLifeCycleHook extends LightningElement {
    constructor(){
        super();
        console.log("In Parent Contructor");
    }

    connectedCallback(){
        console.log("In Parent Connected Callback");
    }

    renderedCallback(){
        console.log("In Parent Rendered Callback");
    }

    disconnectedCallback(){
        console.log("In Parent Disconnected Callback");
    }
}