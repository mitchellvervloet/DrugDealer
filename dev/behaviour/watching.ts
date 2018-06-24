class Watching implements Behaviour {
    monkey: Monkey
    self: Guard
 
    constructor(guard: Guard, monkey: Monkey) {
        this.monkey = monkey
        this.self = guard
    }
 
    //just looking around
    performBehaviour() {

        this.self.xspeed = 0
        this.self.yspeed = 0

    }
 
 }