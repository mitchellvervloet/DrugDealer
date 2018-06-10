class Speeding implements Behaviour {
    monkey: Monkey
    self: Guard
 
    constructor(guard: Guard, monkey: Monkey) {
        this.monkey = monkey
        this.self = guard
    }
 
    performBehaviour() {
        // console.log("speedin'")
    }
 
    onFloating() {
        //
    }

    onPatrolling() {
        //
    }
 
    onSpeeding() {
        //
        // deze regel code geeft de zombie de snelheid waarmee hij naar de kip beweegt

        let xDistanceBetween = this.monkey.x - this.self.x
        let yDistanceBetween = this.monkey.y - this.self.y

        console.log((xDistanceBetween < 50) || (xDistanceBetween > -50) ) 

        if( ((xDistanceBetween > 50) || (xDistanceBetween > -50) && (yDistanceBetween > 50) || (yDistanceBetween > -50)) ) {
            console.log('in ratio')
            Util.setSpeed(this.self, this.monkey.x - this.self.x, this.monkey.y - this.self.y);
        }

    }
 }