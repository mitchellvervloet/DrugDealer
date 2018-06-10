class Watching implements Behaviour {
    monkey: Monkey
    self: Guard
 
    constructor(guard: Guard, monkey: Monkey) {
        this.monkey = monkey
        this.self = guard
    }
 
    performBehaviour() {
        // console.log("speedin'")
        let xDistanceBetween = this.self.x - this.monkey.x
        let yDistanceBetween = this.self.y - this.monkey.y

        // console.log(xDistanceBetween + ' x ' + yDistanceBetween + ' y ' ) 
        console.log(Util.checkInRatio(this.self, this.monkey, 100))

        if(Util.checkInRatio(this.self, this.monkey, 100)) {
            console.log('in ratio')
            Util.setSpeed(this.self, this.monkey.x - this.self.x, this.monkey.y - this.self.y);
        } 

    }
 
    onWatching() {
        //
    }

    onPatrolling() {
        //
    }
 
    onShooting() {
        //
    }
 }