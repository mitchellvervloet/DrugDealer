class Game {

    private static instance: Game

    private drugsBoat: DrugsBoat

    constructor() {
        this.drugsBoat = new DrugsBoat()
        this.gameLoop()
    }

    public static getInstance() {
        if (!Game.instance) {
            Game.instance = new Game()
        }
        return Game.instance
    }

    //Gameloop
    private gameLoop() {
        this.drugsBoat.update()
        requestAnimationFrame(() => this.gameLoop())
    }
}

window.addEventListener("load", () => {
    Game.getInstance()
})
