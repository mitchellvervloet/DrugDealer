/// <reference path="gameobject.ts"/>

class Tree extends GameObject {

    constructor(parent: HTMLElement) {
        
        super("tree", parent);
        this.width = 75;
        this.height = 75;
        this.x = Math.random() * (window.innerWidth - this.width);
        this.y = Math.random() * (window.innerHeight-this.height);

    }

    update() {

        super.update();

    }

}