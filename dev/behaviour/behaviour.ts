interface Behaviour {
    boat: DrugsBoat
    self: PoliceBoat
    performBehaviour():void
    onFloating():void
    onPatrolling():void
    onSpeeding():void
}