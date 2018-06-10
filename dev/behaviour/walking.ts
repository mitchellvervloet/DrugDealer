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
            this.self.xspeed = Math.floor(Math.random() * 2) -1
            this.self.yspeed = Math.floor(Math.random() * 2) -1

            //random generate minus or not
            this.self.xspeed *= Math.floor(Math.random() * 2) == 1 ? 1 : -1
            this.self.yspeed *= Math.floor(Math.random() * 2) == 1 ? 1 : -1
        }

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