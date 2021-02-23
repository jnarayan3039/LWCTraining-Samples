import { LightningElement } from 'lwc';
import logos from '@salesforce/resourceUrl/logos';
export default class StaticResourceSample extends LightningElement {
    //image = `${logos}/images/home1.jpg`;
    imageData = [logos + '/images/home1.jpg', logos + '/images/home2.jpg',logos + '/images/home3.jpg'];

}