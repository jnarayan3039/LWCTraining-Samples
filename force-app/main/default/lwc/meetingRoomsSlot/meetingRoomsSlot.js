import { LightningElement, track } from 'lwc';

export default class MeetingRoomsSlot extends LightningElement {
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

}