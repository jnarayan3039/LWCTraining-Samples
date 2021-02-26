/*eslint no-console: “error”*/
import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { loadScript } from 'lightning/platformResourceLoader';
import JSUtility from '@salesforce/resourceUrl/js';
const columns = [
    { label: 'Topic', fieldName: 'Topic' },
    { label: 'SubTopic', fieldName: 'SubTopic'},
    { label: 'YoutubeVideo', fieldName: 'YoutubeVideo', type: 'url' },
    { label: 'Day', fieldName: 'Day'}
];
export default class ImportFromExcel extends LightningElement {
    @track videos = [];
    isLoading = false;
    MAX_FILE_SIZE = 5000000; //Max file size 5.0 MB
    filesUploaded = [];
    file;
    fileContents;
    fileReader;
    content;
    jsUtilityInitialized = false;
    fileName;
    disabled;
    @track fileHeaders = [];
    connectedCallback(){
        this.initXL();
    }

    handleFileUploaded(event) {
        event.stopPropagation();
        event.preventDefault();
        if (event.target.files.length > 0) {
            this.filesUploaded = event.target.files;
            this.fileName = event.target.files[0].name;
            this.file = this.filesUploaded[0];
            if (this.file.size > this.MAX_FILE_SIZE) {
                this.fileName = 'File Size is to long. File size should be less then 5MB';
            } else {
                //this.initXL(this.file);
                //this.videos = this.parseExcel(this.file);
                this.parseExcel(this.file)
                .then((excelFile) => {
                    var yVideos = excelFile.xlsx;
                    this.videos = JSON.parse(yVideos);
                    this.fileHeaders = excelFile.headers;
                    //this.pooulateTable(this.videos)
                })
                .catch((exceptionMessage) => {
                    //this.throwExceptionEvent(cmp, exceptionMessage);

                })
                .finally(() => {
                    //this.enableExcelInput(cmp);
                })
            }
        }
    }

    initXL = () => {
        if(this.jsUtilityInitialized){
            return;
        }
        Promise.all([
            loadScript(this, JSUtility + '/JSUtilities/jszip.js'), 
            loadScript(this, JSUtility + '/JSUtilities/xlsx.full.min.js'),
            loadScript(this, JSUtility + '/JSUtilities/xlsx.js')
        ])
        .then(()=>{
            this.jsUtilityInitialized = true;
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error loading JSUtility',
                    message: error.message,
                    variant: 'error'
                })
            );
        });
    }

    // parseExcel = (file) => {
    //     var reader = new FileReader();
    //     var json_object;
    //     //var XLSX = window.XLSX;
    //     reader.onload = function(e) {
    //         var data = e.target.result;
    //         var workbook = XLSX.read(data, {
    //         type: 'binary'
    //         });
    //         //var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[workbook.SheetNames[0]]);
    //         var XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
    //         console.log(XL_row_object);
    //         json_object = JSON.stringify(XL_row_object);
    //         console.log(JSON.parse(json_object));
    //         //this.youtubeVideos = json_object;
    //         //console.log(this.youtubeVideos);
    //     };
    
    //     reader.onerror = function(ex) {
    //         console.log(ex);
    //     };
    
    //     return reader.readAsBinaryString(file);
    //     //return json_object;
    // }

    parseExcel(file) {
        return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        var json_object;
        reader.onload = function(e) {
            var data = e.target.result;
            var workbook = XLSX.read(data, {
            type: 'binary'
            });
            try{
                var headers = [];
                var sheet = workbook.Sheets[workbook.SheetNames[0]];
                var range = XLSX.utils.decode_range(sheet['!ref']);
                var C, R = range.s.r; /* start in the first row */
                /* walk every column in the range */
                for(C = range.s.c; C <= range.e.c; ++C) {
                    var cell = sheet[XLSX.utils.encode_cell({c:C, r:R})] /* find the cell in the first row */
        
                    var hdr = "UNKNOWN " + C; // <-- replace with your desired default 
                    if(cell && cell.t) hdr = XLSX.utils.format_cell(cell);
        
                    headers.push(hdr);
                }
                 console.log(headers);
                 resolve({
                     "fileName": "fileName",
                     "xlsx" : JSON.stringify(XLSX.utils.sheet_to_row_object_array(workbook.Sheets[workbook.SheetNames[0]])),
                     "headers": headers
                 });

            }catch(error){
                reject(error);
                console.log(error);
            }
        };
    
        reader.onerror = function(ex) {
            console.log(ex);
        };
    
        reader.readAsBinaryString(file);
        });
    }

    getHeaderRow(sheet){
        console.log("inside header row"+sheet);
        var headers = [];
        var range = XLSX.utils.decode_range(sheet['!ref']);
        var C, R = range.s.r; /* start in the first row */
        /* walk every column in the range */
        for(C = range.s.c; C <= range.e.c; ++C) {
            var cell = sheet[XLSX.utils.encode_cell({c:C, r:R})] /* find the cell in the first row */

            var hdr = "UNKNOWN " + C; // <-- replace with your desired default 
            if(cell && cell.t) hdr = XLSX.utils.format_cell(cell);

            headers.push(hdr);
        }
        return headers;
    }
    
}

