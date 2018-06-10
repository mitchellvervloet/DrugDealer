class Patrolling implements Behaviour {
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
    }
 }