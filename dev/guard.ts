/// <reference path="gameobject.ts"/>

class Guard extends GameObject {

    public behaviour: Behaviour
    private monkey:Monkey;

    constructor(parent: HTMLElement, monkey:Monkey) {

        super("guard", parent);
        this.width = 20;
        this.height = 20;
        this.x = Math.random() * (window.innerWidth - this.width);
        this.y = Math.random() * (window.innerHeight/2) + (window.innerHeight/2-this.height);

        console.log("police created")
        this.monkey = monkey

        this.behaviour = new Watching(this, this.monkey)

    }

    update() {

        let score = Game.getInstance().score
        switch(true) { 
            case (score < 2):
                if(Util.checkInRatio(this, this.monkey, 100)) {
                    this.behaviour = new Patrolling(this, this.monkey)
                } else {
                    this.behaviour = new Watching(this, this.monkey)
                }
                break;
            case (score >= 2 && score < 10): 
                //statements;
                if(Util.checkInRatio(this, this.monkey, 200)) {
                    this.behaviour = new Patrolling(this, this.monkey)
                } else {
                    this.behaviour = new Walking(this, this.monkey)
                }
                break; 
            
            case (score >= 10): 
                //statements; 
                console.log('1 angry man')

                this.behaviour = new Shooting(this, this.monkey) 
                break; 
            
        } 

        this.behaviour.performBehaviour()

        if (this.x > (Game.getInstance().maxWidth - this.width))
        {
            this.xspeed *= -1
        }
        if (this.y < 0 || this.y > (Game.getInstance().maxHeight - this.height))
        {
            this.yspeed *= -1
        }

        // nu passen we de x en y positie aan met de snelheid
        this.x += this.xspeed;
        this.y += this.yspeed;

        super.update()

    }
}
