/// <reference path="gameobject.ts"/>

class Guard extends GameObject implements Observer {

    public behaviour: Behaviour
    private monkey:Monkey;

    //to know behavour guard
    private relScore:number

    //to save the interval
    private interval

    constructor(parent: HTMLElement, monkey:Monkey) {

        super("guard", parent);

        this.width = 25;
        this.height = 42;
        this.x = Math.floor(Math.random() * (window.innerWidth - this.width));
        this.y = Math.floor(Math.random() * (window.innerHeight/2) + (window.innerHeight/2-this.height));
        this.speedmultiplier = 5        

        this.monkey = monkey

        //save current score in relative score
        this.relScore = Game.getInstance().score

        //subscribe on monkeys list for getting notified
        this.monkey.subscribe(this);

        //behaviour of guarf
        this.behaviour = new Watching(this, this.monkey)

    }

    //notify method to run code when message is send from monkey.
    public notify() {
        clearInterval(this.interval)
        Game.getInstance().relScore = 0

        this.interval =  setInterval(function(){
            Game.getInstance().relScore = Game.getInstance().score
        }, 100)
    }

    update() {

        //Make sure relative score is up to date with score from game
        this.relScore = Game.getInstance().relScore

        //switch case to know behaviour of guard on score points
        let score = this.relScore
            switch(true) { 
                case (score == 0):
                    this.behaviour = new Watching(this, this.monkey)
                    break;
                case (score < 2):
                    if(Util.checkInRatio(this, this.monkey, 200)) {
                        this.behaviour = new Patrolling(this, this.monkey)
                    } else {
                        this.behaviour = new Watching(this, this.monkey)
                    }
                    break;
                case (Math.floor(this.monkey.x) <= 0 || Math.floor(this.monkey.x) >= Math.floor(Game.getInstance().maxWidth - this.monkey.width) || Math.floor(this.monkey.y) <= 0 || Math.floor(this.monkey.y) >= Math.floor(Game.getInstance().maxHeight - this.monkey.height)):
                    this.behaviour = new Walking(this, this.monkey)
                    break;
                case (score >= 2): 
                    //statements;
                    if(Util.checkInRatio(this, this.monkey, 200)) 
                    {
                        this.behaviour = new Patrolling(this, this.monkey)
                    } 
                    else {
                        this.behaviour = new Walking(this, this.monkey)
                    }
                    break; 
                
            } 

            //change direction when collides with window borders
        if (Math.floor(this.x) <= 0 || Math.floor(this.x) >= Math.floor(Game.getInstance().maxWidth - this.width))
            {
                this.xspeed *= -1
            }
            if (Math.floor(this.y) <= 0 || Math.floor(this.y) >= Math.floor(Game.getInstance().maxHeight - this.height))
            {
                this.yspeed *= -1
            }

        this.behaviour.performBehaviour()
    
        //change sprite on direction
            switch(true) {
                case (this.xspeed > 0):
                    this.width = 16;
                    this.div.style.width = "16px"
                    this.div.style.backgroundPosition = "-139px 0"
    
                    if (this.yspeed > 0) {
                        this.width = 21;
                        this.div.style.width = "21px"
                        this.div.style.backgroundPosition = "-157px 0"
                    } else if (this.yspeed < 0) {
                        this.width = 21;
                        this.div.style.width = "21px"
                        this.div.style.backgroundPosition = "-115px 0"
                    }
    
                    break;
                case (this.xspeed < 0):
                    this.width = 16;
                    this.div.style.width = "16px"
                    this.div.style.backgroundPosition = "-49px 0"
                    
                    if (this.yspeed > 0) {
                        this.width = 21;
                        this.div.style.width = "21px"
                        this.div.style.backgroundPosition = "-26px 0"
                    } else if (this.yspeed < 0) {
                        this.width = 21;
                        this.div.style.width = "21px"
                        this.div.style.backgroundPosition = "-67px 0"
                    }
    
                    break;
            }
    
            // nu passen we de x en y positie aan met de snelheid
            this.x += this.xspeed;
            this.y += this.yspeed;
    
            super.update()

    }

    //reset location method
    reset() {
        this.x = Math.floor(Math.random() * (window.innerWidth - this.width));
        this.y = Math.floor(Math.random() * (-150)) + (window.innerHeight  - this.height);
    }
}
