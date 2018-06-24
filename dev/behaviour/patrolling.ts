class Patrolling implements Behaviour {
    monkey: Monkey
    self: Guard
 
    constructor(guard: Guard, monkey: Monkey) {
        this.monkey = monkey
        this.self = guard
    }
 
    //running behind monkey
    performBehaviour() {

        //run faster
        if (Game.getInstance().relScore > 10) {
            this.self.speedmultiplier = 6;
        }

        console.log("patrolling")
        Util.setSpeed(this.self, this.monkey.x - this.self.x, this.monkey.y - this.self.y);

    }
 
 }