class Shooting implements Behaviour {
    monkey: Monkey
    self: Guard
 
    constructor(guard: Guard, monkey: Monkey) {
        this.monkey = monkey
        this.self = guard
    }
 
    performBehaviour() {

        console.log("shooting")
        
    
    }
 
 }