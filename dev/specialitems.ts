/// <reference path="gameobject.ts"/>

class SpecialItems extends GameObject {

    constructor(element:string, parent:HTMLElement) {
        super(element, parent);
    }

    reset() {
        this.x = Math.random() * (window.innerWidth - this.width)
        this.y = Math.random() * (window.innerHeight-this.height)
    }

    //If collided with monkey then call reset method for all extenders
    collided() { 
        this.reset()
    }

    update() {
        //check if collided with monkey
        if(Util.checkCollision(this, Game.getInstance().monkey) ){
            this.collided()
        }
        super.update()
    }

}