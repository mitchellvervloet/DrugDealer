class Patrolling implements Behaviour {
   public drugsBoat: DrugsBoat

   constructor(drugsBoat: DrugsBoat) {
       this.drugsBoat = drugsBoat
   }

   performBehaviour() {
       console.log("patrollin'")
   }

   onPatrolling() {
       //
   }

   onSpeeding() {
       //
   }
}