"use strict";
var DrugsBoat = (function () {
    function DrugsBoat() {
        console.log("boat created");
        this.behaviour = new Patrolling(this);
    }
    DrugsBoat.prototype.update = function () {
        this.behaviour.performBehaviour();
    };
    return DrugsBoat;
}());
var Game = (function () {
    function Game() {
        this.drugsBoat = new DrugsBoat();
        this.gameLoop();
    }
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.drugsBoat.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
window.addEventListener("load", function () {
    Game.getInstance();
});
var Patrolling = (function () {
    function Patrolling(drugsBoat) {
        this.drugsBoat = drugsBoat;
    }
    Patrolling.prototype.performBehaviour = function () {
        console.log("patrollin'");
    };
    Patrolling.prototype.onPatrolling = function () {
    };
    Patrolling.prototype.onSpeeding = function () {
    };
    return Patrolling;
}());
var Speeding = (function () {
    function Speeding(drugsBoat) {
        this.drugsBoat = drugsBoat;
    }
    Speeding.prototype.performBehaviour = function () {
        console.log("speedin'");
    };
    Speeding.prototype.onPatrolling = function () {
    };
    Speeding.prototype.onSpeeding = function () {
    };
    return Speeding;
}());
//# sourceMappingURL=main.js.map