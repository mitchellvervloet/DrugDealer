"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameObject = (function () {
    function GameObject(tag, parent) {
        this.x = 0;
        this.y = 0;
        this.xspeed = 0;
        this.yspeed = 0;
        this.speedmultiplier = 1;
        this.div = document.createElement(tag);
        parent.appendChild(this.div);
    }
    GameObject.prototype.update = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return GameObject;
}());
var Banana = (function (_super) {
    __extends(Banana, _super);
    function Banana(parent) {
        var _this = _super.call(this, "banana", parent) || this;
        _this.width = 20;
        _this.height = 20;
        _this.x = Math.random() * (window.innerWidth - _this.width);
        _this.y = Math.random() * (window.innerHeight - _this.height);
        return _this;
    }
    Banana.prototype.resetBanana = function () {
        this.x = Math.random() * (window.innerWidth - this.width);
        this.y = Math.random() * (window.innerHeight - this.height);
    };
    Banana.prototype.update = function () {
        _super.prototype.update.call(this);
    };
    return Banana;
}(GameObject));
var Game = (function () {
    function Game() {
        this.gameobjects = new Array();
        this.angriness = 0;
        this.score = 0;
    }
    Game.prototype.init = function () {
        console.log("init game");
        this.ui = document.getElementsByTagName("ui")[0];
        var parent = document.getElementById("container");
        this.monkey = new Monkey(parent);
        for (var p = 0; p < 5; p++) {
            this.gameobjects.push(new Guard(parent, this.monkey));
        }
        for (var b = 0; b < 5; b++) {
            this.gameobjects.push(new Banana(parent));
        }
        this.gameLoop();
        console.log('if');
    };
    Game.prototype.scorePoint = function () {
        this.score++;
        this.ui.innerHTML = "Score: " + this.score;
    };
    Game.getInstance = function () {
        if (!Game.instance) {
            console.log("Not yet there!!");
            Game.instance = new Game();
        }
        return Game.instance;
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.monkey.update();
        var hitPolice = false;
        var hitBanana = false;
        for (var _i = 0, _a = this.gameobjects; _i < _a.length; _i++) {
            var g = _a[_i];
            g.update();
            if (g instanceof Guard) {
                if (Util.checkCollision(g, this.monkey)) {
                    hitPolice = true;
                    this.angriness++;
                    this.monkey.resetPosition();
                }
            }
            if (g instanceof Banana) {
                if (Util.checkCollision(g, this.monkey)) {
                    hitBanana = true;
                    g.resetBanana();
                    this.scorePoint();
                }
            }
        }
        if (this.angriness < 3) {
            requestAnimationFrame(function () { return _this.gameLoop(); });
        }
        else {
            console.log('hit policeBoat');
        }
    };
    return Game;
}());
window.addEventListener('load', function () {
    console.log('loaded');
    Game.getInstance().init();
});
var Guard = (function (_super) {
    __extends(Guard, _super);
    function Guard(parent, monkey) {
        var _this = _super.call(this, "guard", parent) || this;
        _this.width = 20;
        _this.height = 20;
        _this.x = Math.random() * (window.innerWidth - _this.width);
        _this.y = Math.random() * (window.innerHeight / 2) + (window.innerHeight / 2 - _this.height);
        console.log("police created");
        _this.monkey = monkey;
        _this.behaviour = new Watching(_this, _this.monkey);
        return _this;
    }
    Guard.prototype.update = function () {
        var score = Game.getInstance().score;
        switch (true) {
            case (score < 5):
                if (Util.checkInRatio(this, this.monkey, 100)) {
                    this.behaviour = new Patrolling(this, this.monkey);
                }
                else {
                    this.behaviour = new Watching(this, this.monkey);
                }
                break;
            case (score >= 5 && score < 10):
                if (Util.checkInRatio(this, this.monkey, 200)) {
                    this.behaviour = new Patrolling(this, this.monkey);
                }
                else {
                    this.behaviour = new Walking(this, this.monkey);
                }
                break;
            case (score >= 10):
                console.log('1 angry man');
                this.behaviour = new Shooting(this, this.monkey);
                break;
        }
        this.behaviour.performBehaviour();
        this.x += this.xspeed;
        this.y += this.yspeed;
        _super.prototype.update.call(this);
    };
    return Guard;
}(GameObject));
var Monkey = (function (_super) {
    __extends(Monkey, _super);
    function Monkey(parent) {
        var _this = _super.call(this, "monkey", parent) || this;
        _this.speedLeft = 0;
        _this.speedRight = 0;
        _this.speedUp = 0;
        _this.speedDown = 0;
        _this.width = 20;
        _this.height = 20;
        _this.x = 20;
        _this.y = 20;
        console.log("boat created");
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        return _this;
    }
    Monkey.prototype.onKeyDown = function (event) {
        switch (event.key) {
            case "ArrowLeft":
                this.speedLeft = 1.5;
                break;
            case "ArrowRight":
                this.speedRight = 1.5;
                break;
            case "ArrowUp":
                this.speedUp = 1.5;
                break;
            case "ArrowDown":
                this.speedDown = 1.5;
                break;
        }
    };
    Monkey.prototype.onKeyUp = function (event) {
        switch (event.key) {
            case "ArrowLeft":
                this.speedLeft = 0;
                break;
            case "ArrowRight":
                this.speedRight = 0;
                break;
            case "ArrowUp":
                this.speedUp = 0;
                break;
            case "ArrowDown":
                this.speedDown = 0;
                break;
        }
    };
    Monkey.prototype.resetPosition = function () {
        this.x = 20;
        this.y = 20;
    };
    Monkey.prototype.update = function () {
        this.x = this.x + this.speedRight - this.speedLeft;
        this.y = this.y + this.speedDown - this.speedUp;
        _super.prototype.update.call(this);
    };
    return Monkey;
}(GameObject));
var Util = (function () {
    function Util() {
    }
    Util.checkCollision = function (go1, go2) {
        return (go1.x < go2.x + go2.width &&
            go1.x + go1.width > go2.x &&
            go1.y < go2.y + go2.height &&
            go1.height + go1.y > go2.y);
    };
    Util.checkInRatio = function (go1, go2, ratio) {
        return (go1.x - go2.x + go2.width * 2 < ratio &&
            go2.x - go1.x + go1.width * 2 < ratio &&
            go1.y - go2.y + go2.height * 2 < ratio &&
            go2.y - go1.y + go1.height * 2 < ratio);
    };
    Util.setSpeed = function (go, xdist, ydist) {
        var distance = Math.sqrt(xdist * xdist + ydist * ydist);
        go.xspeed = xdist / distance;
        go.yspeed = ydist / distance;
        go.xspeed *= go.speedmultiplier;
        go.yspeed *= go.speedmultiplier;
    };
    return Util;
}());
var Patrolling = (function () {
    function Patrolling(guard, monkey) {
        this.monkey = monkey;
        this.self = guard;
    }
    Patrolling.prototype.performBehaviour = function () {
        console.log("patrolling");
        Util.setSpeed(this.self, this.monkey.x - this.self.x, this.monkey.y - this.self.y);
    };
    return Patrolling;
}());
var Shooting = (function () {
    function Shooting(guard, monkey) {
        this.monkey = monkey;
        this.self = guard;
    }
    Shooting.prototype.performBehaviour = function () {
        console.log("shooting");
    };
    return Shooting;
}());
var Walking = (function () {
    function Walking(guard, monkey) {
        this.monkey = monkey;
        this.self = guard;
    }
    Walking.prototype.performBehaviour = function () {
        this.self.xspeed = 1;
        this.self.yspeed = -1;
    };
    return Walking;
}());
var Watching = (function () {
    function Watching(guard, monkey) {
        this.monkey = monkey;
        this.self = guard;
    }
    Watching.prototype.performBehaviour = function () {
        console.log('watching');
        this.self.xspeed = 0;
        this.self.yspeed = 0;
    };
    return Watching;
}());
//# sourceMappingURL=main.js.map