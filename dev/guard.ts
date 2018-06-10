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

        switch(Game.getInstance().angriness) { 
            case 0: 
                //statements;
                this.behaviour = new Watching(this, this.monkey) 
                break; 
            
            case 1: 
                //statements; 
                console.log('1 angry man')

                this.behaviour = new Patrolling(this, this.monkey) 
                break; 
            
            case 2:
                console.log('2 angry man')
                this.behaviour = new Shooting(this, this.monkey) 
                break;
            
        } 

        this.behaviour.performBehaviour()
        this.behaviour.onWatching()
        this.behaviour.onPatrolling()
        this.behaviour.onShooting()

        // nu passen we de x en y positie aan met de snelheid
        this.x += this.xspeed;
        this.y += this.yspeed;

        super.update()

    }
}
