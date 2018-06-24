/// <reference path="gameobject.ts"/>

class Monkey extends GameObject implements Subject {

    public observers: Observer[] = [];

    private speedLeft: number = 0
    private speedRight: number = 0
    private speedUp: number = 0
    private speedDown: number = 0

    constructor(parent: HTMLElement) {

        super("monkey", parent);
        this.width = 25;
        this.height = 40;
        this.x = 20
        this.y = 20

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))

    }

    //OBSERVER --> Subscribe method so subscribers can get notified
    subscribe(o: Observer): void {
        this.observers.push(o)
    }

    //OBSERVER --> Unsubscribe method so subscribers can get of the list of subscribers
    unsubscribe(o: Observer): void {
        let indexOfO = this.observers.indexOf(o)
        if (indexOfO > -1) {
            this.observers.splice(indexOfO, 1);
        }
    }

    //send message mthod to notify all subscribers
    public sendMessage() {
        for (let c of this.observers) {
            c.notify()
        }
    }

    //movement
    onKeyDown(event: KeyboardEvent): void {
        switch (event.key) {
            case "ArrowUp":
                this.speedUp = 5.5
                break
            case "ArrowDown":
                this.speedDown = 5.5
                break
            case "ArrowLeft":
                this.speedLeft = 5.5
                break
            case "ArrowRight":
                this.speedRight = 5.5
                break
        }
    }

    //movement
    onKeyUp(event: KeyboardEvent): void {
        switch (event.key) {
            case "ArrowUp":
                this.speedUp = 0
                break
            case "ArrowDown":
                this.speedDown = 0
                break
            case "ArrowLeft":
                this.speedLeft = 0
                break
            case "ArrowRight":
                this.speedRight = 0
                break
        }
    }

    //reset method for position
    resetPosition() {
        this.x = 20
        this.y = 20
    }

    update() {

        //To know if monkey is out of screen and draw it on the other side
        switch(true) {
            case (this.x < 0):
                this.x = window.innerWidth
                break;
            case (this.x > window.innerWidth):
                this.x = 0
                break;
            case (this.y > window.innerHeight):
                this.y = 0
                break;
            case (this.y < 0):
                this.y = window.innerHeight
                break;
        }

        //change sprite for direction
        switch(true) {
            case (this.speedLeft > 0):
                this.width = 34;
                this.div.style.width = "34px"
                this.div.style.backgroundPosition = "0 -56px"
                break;
            case (this.speedRight > 0):
                this.width = 34;
                this.div.style.width = "34px"
                this.div.style.backgroundPosition = "0 -104px"
                break;
            case (this.speedDown > 0):
                this.width = 25;
                this.height = 40;
                this.div.style.width = "25px"
                this.div.style.height = "40px"
                this.div.style.backgroundPosition = "-4px 0"
                break;
            case (this.speedUp > 0):
                this.width = 25;
                this.height = 30;
                this.div.style.width = "25px"
                this.div.style.height = "30px"
                this.div.style.backgroundPosition = "-4px -154px"
                break;
        }

        this.x = this.x + this.speedRight - this.speedLeft
        this.y = this.y + this.speedDown - this.speedUp
        super.update()

    }
}
