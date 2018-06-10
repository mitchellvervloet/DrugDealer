class Patrolling implements Behaviour {
    monkey: Monkey
    self: Guard
 
    constructor(guard: Guard, monkey: Monkey) {
        this.monkey = monkey
        this.self = guard
    }
 
    performBehaviour() {
        console.log("patrolling")
        Util.setSpeed(this.self, this.monkey.x - this.self.x, this.monkey.y - this.self.y);

    }
 
 }