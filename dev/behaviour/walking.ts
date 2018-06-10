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

        if (Math.floor(this.self.x) <= 0 || Math.floor(this.self.x) >= Math.floor(Game.getInstance().maxWidth - this.self.width))
        {
            this.self.xspeed *= -1
        }
        if (Math.floor(this.self.y) <= 0 || Math.floor(this.self.y) >= Math.floor(Game.getInstance().maxHeight - this.self.height))
        {
            this.self.yspeed *= -1
        }

    }

}