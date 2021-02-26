import StayInTouchSubject from '@salesforce/schema/User.StayInTouchSubject';
import { LightningElement, track } from 'lwc';

export default class SnakeGame extends LightningElement {
    score = 0;
    highScore = 0;

    blockSize = 20;
    localStorage;
    @track gameBlocks = [];

    renderComplete = false;

    xSpeed = 1;
    ySpeed = 0;

    xHead = 0;
    yHead = 0;

    xMax;
    yMax;

    tail = [];
    
    showOverlay = true;
    gameOver = false;

    speed = 1;
    intervalObj;

    connectedCallback(){
            this.highScore = localStorage.getItem('lwc_snake_high')?localStorage.getItem('lwc_snake_high'):0;
    }

    disconnectedCallback(){
    }

    get displaySpeed(){
        return this.speed.toFixed(1);
    }

    startGame(){
        this.showOverlay = false;
        this.intervalObj = setInterval(() => {
            this.move();
        }, 300/this.speed);
    }

    addSpeed(){
        this.speed = this.speed + 0.1;
        clearInterval(this.intervalObj);
        this.startGame();
    }

    move(){
        const lastElement = this.tail[this.tail.length-1];
        if(lastElement !== `${this.xHead}:${this.yHead}`){
            this.tail.push(`${this.xHead}:${this.yHead}`);
            const removedElement = this.tail.shift();
            //let curPosindex = this.gameBlocks.findIndex(x => x.id === `${this.xHead}:${this.yHead}`);
            const curPosindex = this.gameBlocks.findIndex(x => x.id === removedElement);
            this.gameBlocks[curPosindex].snake = false;
            this.gameBlocks[curPosindex].class = '';
        }
        

        this.xHead += this.xSpeed;
        this.yHead += this.ySpeed;

        if(this.xHead >= this.xMax){
            this.xHead = 0;
        }

        if(this.xHead < 0){
            this.xHead = this.xMax - 1;
        }

        if(this.yHead >= this.yMax){
            this.yHead = 0;
        }

        if(this.yHead < 0){
            this.yHead = this.yMax - 1;
        }

        if(this.tail.includes(`${this.xHead}:${this.yHead}`)){
            // alert("Gave Over");
            // this.tail = [];
            // this.xHead = 0;
            // this.yHead = 0;
            this.exitGame();
        }else{
            const newPosindex = this.gameBlocks.findIndex(x => x.id === `${this.xHead}:${this.yHead}`);
            this.gameBlocks[newPosindex].snake = true;
            this.gameBlocks[newPosindex].class = 'snake';
            if(this.gameBlocks[newPosindex].food){
                this.score++;
                if(this.score > this.highScore){
                    this.highScore = this.score;
                    localStorage.setItem('lwc_snake_high', this.highScore);
                }
                this.addSpeed();
                this.tail.push(`${this.xHead}:${this.yHead}`);
                this.gameBlocks[newPosindex].food = false;
                this.generateFood();
    
            }
        }
     
    }

    addKeyboardControls(){
        window.addEventListener("keydown", (e)=>this.handleKeyboardEvents(e));
    }

    removeKeyboardControls(){
        window.removeEventListener("keydown",(e)=>this.handleKeyboardEvents(e));
    }

    handleKeyboardEvents(e){
        e.preventDefault();
            switch(e.key) {
                case "ArrowUp":
                    this.xSpeed = 0;
                    this.ySpeed = -1;
                    break;
                case "ArrowDown":
                    this.xSpeed = 0;
                    this.ySpeed = 1;
                    break;
                case "ArrowRight":
                    this.xSpeed = 1;
                    this.ySpeed = 0;
                    break;
                    default:
                case "ArrowLeft":
                    this.xSpeed = -1;
                    this.ySpeed = 0;
                    break;  
              }
    }


    generateFood(){
        const xFood = Math.floor(Math.random() * this.xMax);
        const yFood = Math.floor(Math.random() * this.yMax);

        if(!this.tail.includes(`${xFood}:${yFood}`)){
            const foodPosindex = this.gameBlocks.findIndex(x => x.id === `${xFood}:${yFood}`);
            this.gameBlocks[foodPosindex].food = true;
            this.gameBlocks[foodPosindex].class = 'food';
        }else{
            this.generateFood();
        }
    }

    renderGameBlocks(){
        
            const gameContainerEl = this.template.querySelector(".game-container");
            let eWidth = gameContainerEl.clientWidth;
            let eHeight = gameContainerEl.clientHeight;

            this.xMax = Math.floor(eWidth/this.blockSize);
            this.yMax = Math.floor(eHeight/this.blockSize);
            
            let tempBlocks = [];
            for(let y=0; y<this.yMax; y++){
                for(let x=0;x<this.xMax; x++){
                    let obj;
                    if(x===0 && y===0){
                        obj = {id: `${x}:${y}`, snake:true, food: false, class:'snake'};
                    }else{
                        obj = {id: `${x}:${y}`, snake:false, food: false, class:''};
                    }
                    
                    tempBlocks.push(obj);
                }
            }
            this.gameBlocks = tempBlocks;
    }

    renderedCallback(){
        if(!this.renderComplete){
            this.renderComplete = true;
            this.renderGameBlocks();
            this.addKeyboardControls();
            this.generateFood();
            window.addEventListener('resize', ()=>{
                this.resetGameMetrics();
                this.showOverlay = true;
                this.gameOver = false;
            });
        }
    }

    resetGameMetrics(){
        this.xSpeed = 1;
        this.ySpeed = 0;

        this.xHead = 0;
        this.yHead = 0;

        this.tail = [];

        this.score = 0;
        this.speed = 1;

        this.renderGameBlocks();
        this.generateFood();
        clearInterval(this.intervalObj);
    }

    resetGame(){
        this.resetGameMetrics();
        this.startGame();
    }

    exitGame(){
        this.showOverlay = true;
        this.gameOver = true;
        clearInterval(this.intervalObj);
    }
}