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
var SpecialItems = (function (_super) {
    __extends(SpecialItems, _super);
    function SpecialItems(element, parent) {
        return _super.call(this, element, parent) || this;
    }
    SpecialItems.prototype.reset = function () {
        this.x = Math.random() * (window.innerWidth - this.width);
        this.y = Math.random() * (window.innerHeight - this.height);
    };
    SpecialItems.prototype.collided = function () {
        this.reset();
    };
    SpecialItems.prototype.update = function () {
        if (Util.checkCollision(this, Game.getInstance().monkey)) {
            this.collided();
        }
        _super.prototype.update.call(this);
    };
    return SpecialItems;
}(GameObject));
var Banana = (function (_super) {
    __extends(Banana, _super);
    function Banana(parent) {
        var _this = _super.call(this, "banana", parent) || this;
        _this.width = 15;
        _this.height = 15;
        _this.x = Math.random() * (window.innerWidth - _this.width);
        _this.y = Math.random() * (window.innerHeight - _this.height);
        return _this;
    }
    Banana.prototype.collided = function () {
        Game.getInstance().score++;
        Game.getInstance().relScore++;
        Game.getInstance().uiScore.innerHTML = "Score: " + Game.getInstance().score;
        Game.getInstance().nomnomnomSound.play();
        _super.prototype.reset.call(this);
    };
    Banana.prototype.update = function () {
        _super.prototype.update.call(this);
    };
    return Banana;
}(SpecialItems));
var Game = (function () {
    function Game() {
        this.gameobjects = new Array();
        this.specialitems = new Array();
        this.angriness = 0;
        this.score = 0;
        this.relScore = 0;
        this.paused = false;
        this.lives = 3;
        this.hitGuard = false;
        this.touchTree = false;
        this.nomnomnomSound = new Sound('sounds/nomnomnom.wav');
        this.loseLiveSound = new Sound('sounds/loselive.wav');
        this.blehSound = new Sound('sounds/bleh.mp3');
        this.minWidth = 0;
        this.maxWidth = window.innerWidth;
        this.maxHeight = window.innerHeight;
    }
    Game.prototype.init = function () {
        var _this = this;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        this.uiScore = document.querySelector(".score");
        this.uiLives = document.querySelector(".lives");
        this.pausedTextElement = document.querySelector('.pause');
        var parent = document.getElementById("container");
        this.monkey = new Monkey(parent);
        for (var g = 0; g < 5; g++) {
            this.gameobjects.push(new Guard(parent, this.monkey));
        }
        this.gameobjects.push(new Tree(parent));
        for (var b = 0; b < 5; b++) {
            this.specialitems.push(new Banana(parent));
        }
        for (var p = 0; p < 3; p++) {
            this.specialitems.push(new PotionScoreDown(parent));
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
        this.relScore++;
        this.uiScore.innerHTML = "Score: " + this.score;
        this.nomnomnomSound.play();
    };
    Game.prototype.loseLive = function () {
        this.lives--;
        this.uiLives.innerHTML = "Lives: " + this.lives;
        this.loseLiveSound.play();
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
                            this.monkey.resetPosition();
                            this.hitGuard = true;
                            this.loseLive();
                            cancelAnimationFrame(this.animation_id);
                            setTimeout(function () {
                                requestAnimationFrame(function () { return _this.gameLoop(); });
                            }, 500);
                        }
                    }
                    if (g instanceof Tree) {
                        if (Util.checkCollision(g, this.monkey)) {
                            this.monkey.sendMessage();
                        }
                    }
                }
                for (var _b = 0, _c = this.specialitems; _b < _c.length; _b++) {
                    var s = _c[_b];
                    s.update();
                }
                if (this.hitGuard) {
                    for (var _d = 0, _e = this.gameobjects; _d < _e.length; _d++) {
                        var g = _e[_d];
                        if (g instanceof Guard) {
                            g.reset();
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
        _this.monkey = monkey;
        _this.relScore = Game.getInstance().score;
        _this.monkey.subscribe(_this);
        _this.behaviour = new Watching(_this, _this.monkey);
        return _this;
    }
    Guard.prototype.notify = function () {
        clearInterval(this.interval);
        Game.getInstance().relScore = 0;
        this.interval = setInterval(function () {
            Game.getInstance().relScore = Game.getInstance().score;
        }, 100);
    };
    Guard.prototype.update = function () {
        this.relScore = Game.getInstance().relScore;
        var score = this.relScore;
        switch (true) {
            case (score == 0):
                this.behaviour = new Watching(this, this.monkey);
                break;
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
            case (score >= 2):
                if (Util.checkInRatio(this, this.monkey, 200)) {
                    this.behaviour = new Patrolling(this, this.monkey);
                }
                else {
                    this.behaviour = new Walking(this, this.monkey);
                }
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
    Guard.prototype.reset = function () {
        this.x = Math.floor(Math.random() * (window.innerWidth - this.width));
        this.y = Math.floor(Math.random() * (-150)) + (window.innerHeight - this.height);
    };
    return Guard;
}(GameObject));
var Monkey = (function (_super) {
    __extends(Monkey, _super);
    function Monkey(parent) {
        var _this = _super.call(this, "monkey", parent) || this;
        _this.observers = [];
        _this.speedLeft = 0;
        _this.speedRight = 0;
        _this.speedUp = 0;
        _this.speedDown = 0;
        _this.width = 25;
        _this.height = 40;
        _this.x = 20;
        _this.y = 20;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        return _this;
    }
    Monkey.prototype.subscribe = function (o) {
        this.observers.push(o);
    };
    Monkey.prototype.unsubscribe = function (o) {
        var indexOfO = this.observers.indexOf(o);
        if (indexOfO > -1) {
            this.observers.splice(indexOfO, 1);
        }
    };
    Monkey.prototype.sendMessage = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var c = _a[_i];
            c.notify();
        }
    };
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
var PotionScoreDown = (function (_super) {
    __extends(PotionScoreDown, _super);
    function PotionScoreDown(parent) {
        var _this = _super.call(this, "potionminus", parent) || this;
        _this.width = 15;
        _this.height = 22;
        _this.x = Math.random() * (window.innerWidth - _this.width);
        _this.y = Math.random() * (window.innerHeight - _this.height);
        return _this;
    }
    PotionScoreDown.prototype.collided = function () {
        Game.getInstance().score--;
        Game.getInstance().relScore--;
        Game.getInstance().uiScore.innerHTML = "Score: " + Game.getInstance().score;
        Game.getInstance().blehSound.play();
        _super.prototype.reset.call(this);
    };
    PotionScoreDown.prototype.update = function () {
        _super.prototype.update.call(this);
    };
    return PotionScoreDown;
}(SpecialItems));
var Sound = (function () {
    function Sound(source) {
        this.element = new Audio();
        this.element = document.createElement("audio");
        this.element.src = source;
    }
    Sound.prototype.play = function () {
        this.element.play();
    };
    return Sound;
}());
var Tree = (function (_super) {
    __extends(Tree, _super);
    function Tree(parent) {
        var _this = _super.call(this, "tree", parent) || this;
        _this.width = 70;
        _this.height = 70;
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
        if (Game.getInstance().relScore > 10) {
            this.self.speedmultiplier = 6;
        }
        console.log("patrolling");
        Util.setSpeed(this.self, this.monkey.x - this.self.x, this.monkey.y - this.self.y);
    };
    return Patrolling;
}());
var Walking = (function () {
    function Walking(guard, monkey) {
        this.monkey = monkey;
        this.self = guard;
        this.self.speedmultiplier = 5;
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
        this.self.xspeed = 0;
        this.self.yspeed = 0;
    };
    return Watching;
}());
//# sourceMappingURL=main.js.map