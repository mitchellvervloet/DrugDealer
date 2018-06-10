class Speeding implements Behaviour {
    boat: DrugsBoat
    self: PoliceBoat
 
    constructor(policeBoat: PoliceBoat, drugsBoat: DrugsBoat) {
        this.boat = drugsBoat
        this.self = policeBoat
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

        let xDistanceBetween = this.boat.x - this.self.x
        let yDistanceBetween = this.boat.y - this.self.y

        console.log((xDistanceBetween < 50) || (xDistanceBetween > -50) ) 

        if( ((xDistanceBetween > 50) || (xDistanceBetween > -50) && (yDistanceBetween > 50) || (yDistanceBetween > -50)) ) {
            console.log('in ratio')
            Util.setSpeed(this.self, this.boat.x - this.self.x, this.boat.y - this.self.y);
        }

    }
 }