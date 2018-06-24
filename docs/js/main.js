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
        this.paused = false;
        this.lives = 3;
        this.hitGuard = false;
        this.minWidth = 0;
        this.maxWidth = window.innerWidth;
        this.maxHeight = window.innerHeight;
    }
    Game.prototype.init = function () {
        var _this = this;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        this.ui = document.getElementsByTagName("ui")[0];
        this.pausedTextElement = document.querySelector('.pause');
        var parent = document.getElementById("container");
        this.monkey = new Monkey(parent);
        for (var p = 0; p < 5; p++) {
            this.gameobjects.push(new Guard(parent, this.monkey));
        }
        for (var t = 0; t < 8; t++) {
            this.gameobjects.push(new Tree(parent));
        }
        for (var b = 0; b < 5; b++) {
            this.gameobjects.push(new Banana(parent));
        }
        this.gameLoop();
    };
    Game.prototype.onKeyDown = function (event) {
        switch (event.key) {
            case "Escape":
                if (this.paused) {
                    this.paused = false;
                }
                else {
                    this.paused = true;
                }
                break;
            default:
                break;
        }
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
        this.animation_id = requestAnimationFrame(function () { return _this.gameLoop(); });
        if (!this.paused) {
            this.pausedTextElement.classList.remove('show');
            if (this.lives > 0) {
                this.hitGuard = false;
                this.monkey.update();
                for (var _i = 0, _a = this.gameobjects; _i < _a.length; _i++) {
                    var g = _a[_i];
                    g.update();
                    if (g instanceof Guard) {
                        if (Util.checkCollision(g, this.monkey)) {
                            this.angriness++;
                            this.monkey.resetPosition();
                            this.hitGuard = true;
                            this.lives--;
                            cancelAnimationFrame(this.animation_id);
                            setTimeout(function () {
                                requestAnimationFrame(function () { return _this.gameLoop(); });
                            }, 500);
                        }
                        if (this.hitGuard) {
                            g.resetPosition();
                        }
                    }
                    if (g instanceof Banana) {
                        if (Util.checkCollision(g, this.monkey)) {
                            g.resetBanana();
                            this.scorePoint();
                        }
                    }
                }
            }
        }
        else {
            this.paused = true;
            this.pausedTextElement.classList.add('show');
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
        _this.width = 25;
        _this.height = 42;
        _this.x = Math.floor(Math.random() * (window.innerWidth - _this.width));
        _this.y = Math.floor(Math.random() * (window.innerHeight / 2) + (window.innerHeight / 2 - _this.height));
        _this.speedmultiplier = 5;
        console.log("police created");
        _this.monkey = monkey;
        _this.behaviour = new Watching(_this, _this.monkey);
        return _this;
    }
    Guard.prototype.update = function () {
        var score = Game.getInstance().score;
        switch (true) {
            case (score < 2):
                if (Util.checkInRatio(this, this.monkey, 200)) {
                    this.behaviour = new Patrolling(this, this.monkey);
                }
                else {
                    this.behaviour = new Watching(this, this.monkey);
                }
                break;
            case (Math.floor(this.monkey.x) <= 0 || Math.floor(this.monkey.x) >= Math.floor(Game.getInstance().maxWidth - this.monkey.width) || Math.floor(this.monkey.y) <= 0 || Math.floor(this.monkey.y) >= Math.floor(Game.getInstance().maxHeight - this.monkey.height)):
                this.behaviour = new Walking(this, this.monkey);
                break;
            case (score >= 2 && score < 10):
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
        if (Math.floor(this.x) <= 0 || Math.floor(this.x) >= Math.floor(Game.getInstance().maxWidth - this.width)) {
            this.xspeed *= -1;
        }
        if (Math.floor(this.y) <= 0 || Math.floor(this.y) >= Math.floor(Game.getInstance().maxHeight - this.height)) {
            this.yspeed *= -1;
        }
        this.behaviour.performBehaviour();
        switch (true) {
            case (this.xspeed > 0):
                this.width = 16;
                this.div.style.width = "16px";
                this.div.style.backgroundPosition = "-139px 0";
                if (this.yspeed > 0) {
                    this.width = 21;
                    this.div.style.width = "21px";
                    this.div.style.backgroundPosition = "-157px 0";
                }
                else if (this.yspeed < 0) {
                    this.width = 21;
                    this.div.style.width = "21px";
                    this.div.style.backgroundPosition = "-115px 0";
                }
                break;
            case (this.xspeed < 0):
                this.width = 16;
                this.div.style.width = "16px";
                this.div.style.backgroundPosition = "-49px 0";
                if (this.yspeed > 0) {
                    this.width = 21;
                    this.div.style.width = "21px";
                    this.div.style.backgroundPosition = "-26px 0";
                }
                else if (this.yspeed < 0) {
                    this.width = 21;
                    this.div.style.width = "21px";
                    this.div.style.backgroundPosition = "-67px 0";
                }
                break;
        }
        this.x += this.xspeed;
        this.y += this.yspeed;
        _super.prototype.update.call(this);
    };
    Guard.prototype.resetPosition = function () {
        this.x = Math.floor(Math.random() * (window.innerWidth - this.width));
        this.y = Math.floor(Math.random() * (window.innerHeight / 2) + (window.innerHeight / 2 - this.height));
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
        _this.width = 25;
        _this.height = 40;
        _this.x = 20;
        _this.y = 20;
        console.log("boat created");
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        return _this;
    }
    Monkey.prototype.onKeyDown = function (event) {
        switch (event.key) {
            case "ArrowUp":
                this.speedUp = 5.5;
                break;
            case "ArrowDown":
                this.speedDown = 5.5;
                break;
            case "ArrowLeft":
                this.speedLeft = 5.5;
                break;
            case "ArrowRight":
                this.speedRight = 5.5;
                break;
        }
    };
    Monkey.prototype.onKeyUp = function (event) {
        switch (event.key) {
            case "ArrowUp":
                this.speedUp = 0;
                break;
            case "ArrowDown":
                this.speedDown = 0;
                break;
            case "ArrowLeft":
                this.speedLeft = 0;
                break;
            case "ArrowRight":
                this.speedRight = 0;
                break;
        }
    };
    Monkey.prototype.resetPosition = function () {
        this.x = 20;
        this.y = 20;
    };
    Monkey.prototype.update = function () {
        switch (true) {
            case (this.x < 0):
                this.x = window.innerWidth;
                break;
            case (this.x > window.innerWidth):
                this.x = 0;
                break;
            case (this.y > window.innerHeight):
                this.y = 0;
                break;
            case (this.y < 0):
                this.y = window.innerHeight;
                break;
        }
        switch (true) {
            case (this.speedLeft > 0):
                this.width = 34;
                this.div.style.width = "34px";
                this.div.style.backgroundPosition = "0 -56px";
                break;
            case (this.speedRight > 0):
                this.width = 34;
                this.div.style.width = "34px";
                this.div.style.backgroundPosition = "0 -104px";
                break;
            case (this.speedDown > 0):
                this.width = 25;
                this.height = 40;
                this.div.style.width = "25px";
                this.div.style.height = "40px";
                this.div.style.backgroundPosition = "-4px 0";
                break;
            case (this.speedUp > 0):
                this.width = 25;
                this.height = 30;
                this.div.style.width = "25px";
                this.div.style.height = "30px";
                this.div.style.backgroundPosition = "-4px -154px";
                break;
        }
        this.x = this.x + this.speedRight - this.speedLeft;
        this.y = this.y + this.speedDown - this.speedUp;
        _super.prototype.update.call(this);
    };
    return Monkey;
}(GameObject));
var Tree = (function (_super) {
    __extends(Tree, _super);
    function Tree(parent) {
        var _this = _super.call(this, "tree", parent) || this;
        _this.width = 75;
        _this.height = 75;
        _this.x = Math.random() * (window.innerWidth - _this.width);
        _this.y = Math.random() * (window.innerHeight - _this.height);
        return _this;
    }
    Tree.prototype.update = function () {
        _super.prototype.update.call(this);
    };
    return Tree;
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
        if (this.self.xspeed === 0 || this.self.yspeed === 0) {
            this.self.xspeed = Math.floor(Math.random() * 6) - 1;
            this.self.yspeed = Math.floor(Math.random() * 6) - 1;
            this.self.xspeed *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
            this.self.yspeed *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
        }
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