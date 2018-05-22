class DrugsBoat {

    public behaviour: Behaviour
    constructor() {
        console.log("boat created")
        this.behaviour = new Patrolling(this)
    }
    update() {
        this.behaviour.performBehaviour()
    }
}
