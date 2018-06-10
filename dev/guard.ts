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

        this.behaviour = new Floating(this, this.monkey)

        // setTimeout(function(){
        //     console.log("Angry: "+Game.instance.getAngriness())
        // }, 1000)

        // if (Game.getInstance().getAngriness()) {
        //     console.log(Game.getInstance().getAngriness())
        // }

    }

    update() {


        // if (Game.instance) {

        //     console.log(Game.instance.getAngriness())

        switch(Game.getInstance().angriness) { 
            case 0: 
                //statements;
                this.behaviour = new Floating(this, this.monkey) 
                break; 
            
            case 1: 
                //statements; 
                console.log('1 angry man')

                this.behaviour = new Patrolling(this, this.monkey) 
                break; 
            
            case 2:
                console.log('2 angry man')
                this.behaviour = new Speeding(this, this.monkey) 
                break;
            
        } 

        // }

        this.behaviour.performBehaviour()
        this.behaviour.onFloating()
        this.behaviour.onPatrolling()
        this.behaviour.onSpeeding()

        // nu passen we de x en y positie aan met de snelheid
        this.x += this.xspeed;
        this.y += this.yspeed;

        super.update()

    }
}
