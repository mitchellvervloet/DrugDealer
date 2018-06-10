/// <reference path="gameobject.ts"/>

class Banana extends GameObject {

    constructor(parent: HTMLElement) {
        
        super("banana", parent);
        this.width = 20;
        this.height = 20;
        this.x = Math.random() * (window.innerWidth - this.width);
        this.y = Math.random() * (window.innerHeight-this.height);


    }

    resetBanana() {

        this.x = Math.random() * (window.innerWidth - this.width)
        this.y = Math.random() * (window.innerHeight-this.height)

    }

    update() {

        super.update();


    }

}