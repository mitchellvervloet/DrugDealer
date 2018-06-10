interface Behaviour {
    monkey: Monkey
    self: Guard
    performBehaviour():void
    onWatching():void
    onPatrolling():void
    onShooting():void
}