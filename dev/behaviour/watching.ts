class Watching implements Behaviour {
    monkey: Monkey
    self: Guard
 
    constructor(guard: Guard, monkey: Monkey) {
        this.monkey = monkey
        this.self = guard
    }
 
    performBehaviour() {

        console.log('watching')

        this.self.xspeed = 0
        this.self.yspeed = 0

        // if(Util.checkInRatio(this.self, this.monkey, 100)) {
        //     console.log('in ratio')
        //     Util.setSpeed(this.self, this.monkey.x - this.self.x, this.monkey.y - this.self.y);
        // } 

    }
 
 }