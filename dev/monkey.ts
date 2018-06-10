/// <reference path="gameobject.ts"/>

class Monkey extends GameObject {

    // public behaviour: Behaviour
    private speedLeft: number = 0
    private speedRight: number = 0
    private speedUp: number = 0
    private speedDown: number = 0

    constructor(parent: HTMLElement) {

        super("monkey", parent);
        this.width = 20;
        this.height = 20;
        this.x = 20
        this.y = 20

        console.log("boat created")
        // this.behaviour = new Patrolling(this)

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))

    }

    onKeyDown(event: KeyboardEvent): void {
        switch (event.key) {
            case "ArrowLeft":
                this.speedLeft = 1.5
                break
            case "ArrowRight":
                this.speedRight = 1.5
                break
            case "ArrowUp":
                this.speedUp = 1.5
                break
            case "ArrowDown":
                this.speedDown = 1.5
                break

        }
    }

    onKeyUp(event: KeyboardEvent): void {
        switch (event.key) {
            case "ArrowLeft":
                this.speedLeft = 0
                break
            case "ArrowRight":
                this.speedRight = 0
                break
            case "ArrowUp":
                this.speedUp = 0
                break
            case "ArrowDown":
                this.speedDown = 0
                break
        }
    }

    resetPosition() {
        this.x = 20
        this.y = 20
    }

    update() {

        // this.behaviour.performBehaviour()

        this.x = this.x + this.speedRight - this.speedLeft
        this.y = this.y + this.speedDown - this.speedUp
        super.update()

    }
}
