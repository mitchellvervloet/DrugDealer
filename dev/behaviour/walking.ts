class Walking implements Behaviour {

    monkey: Monkey;    
    self: Guard;

    constructor(guard: Guard, monkey: Monkey) {
        this.monkey = monkey
        this.self = guard
    }

    performBehaviour(): void {

        if (this.self.xspeed === 0 || this.self.yspeed === 0) {
            //random number between 0 and 1
            this.self.xspeed = Math.floor(Math.random() * 6) -1
            this.self.yspeed = Math.floor(Math.random() * 6) -1

            //random generate minus or not
            this.self.xspeed *= Math.floor(Math.random() * 2) == 1 ? 1 : -1
            this.self.yspeed *= Math.floor(Math.random() * 2) == 1 ? 1 : -1
        }

    }

}