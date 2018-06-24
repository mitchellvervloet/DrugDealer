/// <reference path="specialitems.ts"/>

class PotionScoreDown extends SpecialItems {

    constructor(parent: HTMLElement) {
        super("potionminus", parent);
        this.width = 15;
        this.height = 22;
        this.x = Math.random() * (window.innerWidth - this.width);
        this.y = Math.random() * (window.innerHeight - this.height);
    }

    //If collided with monkey then this happens
    collided() {
        Game.getInstance().score--
        Game.getInstance().relScore--
        Game.getInstance().uiScore.innerHTML = "Score: " + Game.getInstance().score
        Game.getInstance().blehSound.play()
        super.reset()
    }

    update() {
        super.update();
    }

}