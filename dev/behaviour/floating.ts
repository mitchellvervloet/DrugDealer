class Floating implements Behaviour {
    boat: DrugsBoat
    self: PoliceBoat
 
    constructor(policeBoat: PoliceBoat, drugsBoat: DrugsBoat) {
        this.boat = drugsBoat
        this.self = policeBoat
    }
 
    performBehaviour() {
        // console.log("speedin'")
        let xDistanceBetween = this.self.x - this.boat.x
        let yDistanceBetween = this.self.y - this.boat.y

        // console.log(xDistanceBetween + ' x ' + yDistanceBetween + ' y ' ) 
        console.log(Util.checkInRatio(this.self, this.boat, 100))

        if(Util.checkInRatio(this.self, this.boat, 100)) {
            console.log('in ratio')
            Util.setSpeed(this.self, this.boat.x - this.self.x, this.boat.y - this.self.y);
        } 

    }
 
    onFloating() {
        //
    }

    onPatrolling() {
        //
    }
 
    onSpeeding() {
        //
    }
 }