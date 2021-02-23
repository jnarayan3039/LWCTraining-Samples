import { LightningElement,api } from 'lwc';

export default class MeetingRoomEvents extends LightningElement {
    @api roomDetail = {
        'roomNumber': 'A-01',
        'capacity': 10,
        'resources': 'Available'
    }

    handleTileClick(){
        const tileClickEvent = new CustomEvent('tileclick', {detail: this.roomDetail});
        this.dispatchEvent(tileClickEvent);
    }

}