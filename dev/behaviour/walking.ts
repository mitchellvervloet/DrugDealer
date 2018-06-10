class Walking implements Behaviour {

    monkey: Monkey;    
    self: Guard;

    constructor(guard: Guard, monkey: Monkey) {
        this.monkey = monkey
        this.self = guard
    }

    performBehaviour(): void {

        this.self.xspeed = 1
        this.self.yspeed = -1

    }




}