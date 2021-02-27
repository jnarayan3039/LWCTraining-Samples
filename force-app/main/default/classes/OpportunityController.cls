public inherited sharing class OpportunityController {
    
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunities() {
        return [SELECT Id, Name, StageName, Account.Name, Probability, Amount From Opportunity];
    }
}
