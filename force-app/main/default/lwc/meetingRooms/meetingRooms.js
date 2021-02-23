import { LightningElement, track } from 'lwc';

export default class MeetingRooms extends LightningElement {
    @track rooms = [
        {
        'roomNumber': 'A-01',
        'capacity': 10,
        'resources': 'Available'
        },
        {
        'roomNumber': 'A-02',
        'capacity': 20,
        'resources': 'Available'
        },
        {
        'roomNumber': 'A-03',
        'capacity': 2,
        'resources': 'Not Available'
        },
        {
        'roomNumber': 'A-04',
        'capacity': 25,
        'resources': 'Available'
        }
    ];

    handleClick(){
        this.rooms[1].roomNumber = "A-05";
    }

    handleChange(){
        console.log(this.template.querySelectorAll("c-meeting-room"));
        let meetingRooms = this.template.querySelectorAll("c-meeting-room");
        
         meetingRooms.forEach((room) => {
            room.showDetails();
         });
    }
}