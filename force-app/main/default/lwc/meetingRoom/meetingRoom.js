/**
 * @description       : 
 * @author            : Jayaprakash Thatiparthi
 * @group             : 
 * @last modified on  : 02-13-2021
 * @last modified by  : Jayaprakash Thatiparthi
 * Modifications Log 
 * Ver   Date         Author                    Modification
 * 1.0   02-13-2021   Jayaprakash Thatiparthi   Initial Version
**/
import { LightningElement, api } from 'lwc';

export default class MeetingRoom extends LightningElement {
    @api roomDetail = {
        'roomNumber': 'A-01',
        'capacity': 10,
        'resources': 'Available'
    }

    showDetail = false;
    
    @api
    showDetails(){
       if(this.showDetail===false){
           this.showDetail = true;
       }else{
           this.showDetail = false;
       }
    }

}