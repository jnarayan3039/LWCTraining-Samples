import { LightningElement, track, wire } from 'lwc';
import getOpportunities from '@salesforce/apex/OpportunityController.getOpportunities';

const columns = [
    {label: 'Opportunity name', fieldName: 'Name', type: 'text'},
    {label: 'Amount', fieldName: 'Amount', type: 'currency', cellAttributes:
    { iconName: { fieldName: 'trendIcon' }, iconPosition: 'right' }},
    {label: 'Stage Name', fieldName: 'StageName'},
    {label: 'Account Name', fieldName: 'AccountName'}
];
export default class DisplayOpportunities extends LightningElement {

    @track Opportunities = [];
    columns = columns;
    @wire(getOpportunities)
    WiredOpportunities({error, data}){
        if(data){
            let opps = [];
            data.forEach(opp=>{
                opps.push({
                    Id: opp.Id,
                    Name: opp.Name,
                    StageName: opp.StageName,
                    Amount: opp.Amount,
                    trendIcon: opp.Amount>50000?'utility:up':'utility:down',
                    AccountName: opp.Account.Name
                });
            });
            this.Opportunities = JSON.parse(JSON.stringify(opps));
        }
    }

}