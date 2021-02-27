public inherited sharing class ContactDataController {
    public ContactDataController() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(){
       return [SELECT id, FirstName, LastName, Email from Contact limit 20];
        
        
    }

    @AuraEnabled
    public static List<Contact> getContactList(){
        return [SELECT id, FirstName, LastName, Email from Contact limit 20];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactsData(string name){
        string searchString = '%'+name+'%';
        return [SELECT id, FirstName, LastName, Email from Contact WHERE name like :searchString limit 20];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountInformation(string name){
        name = '%'+name+'%';
        return [SELECT id, Name, AnnualRevenue, 
                    (SELECT id, Name, StageName from Opportunities),
                    (SELECT id, FirstName, LastName, Email From Contacts) 
                    from Account Where Name like :name ];
    }
}
