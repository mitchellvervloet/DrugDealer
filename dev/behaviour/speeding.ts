class Speeding implements Behaviour {
    public drugsBoat: DrugsBoat
 
    constructor(drugsBoat: DrugsBoat) {
        this.drugsBoat = drugsBoat
    }
 
    performBehaviour() {
        console.log("speedin'")
    }
 
    onPatrolling() {
        //
    }
 
    onSpeeding() {
        //
    }
 }