class Game {

    //instance property aanmaken voor singleton
    private static instance: Game

    //alle objecten in een property aanmaken
    public monkey: Monkey
    public gameobjects:Array<GameObject> = new Array<GameObject>()
    public specialitems:Array<SpecialItems> = new Array<SpecialItems>()

    //some game states
    public angriness:number = 0
    public score:number = 0
    public relScore:number = 0
    public paused: boolean = false
    public lives:number = 3
    public hitGuard: boolean = false
    public touchTree:boolean = false

    //window numbers
    public minWidth:number
    public maxWidth:number
    public maxHeight:number

    //some ui shit
    public uiScore:HTMLElement
    public uiLives:HTMLElement
    private pausedTextElement:HTMLElement
    private dead:boolean = false

    //loop
    private animation_id;

    //sounds
    public nomnomnomSound = new Sound('sounds/nomnomnom.wav');
    public loseLiveSound = new Sound('sounds/loselive.wav');
    public blehSound = new Sound('sounds/bleh.mp3');

    constructor () {

        this.minWidth = 0
        this.maxWidth = window.innerWidth
        this.maxHeight = window.innerHeight

    }

    public init(){

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))

        this.uiScore = document.querySelector(".score")
        this.uiLives = document.querySelector(".lives")
        this.pausedTextElement = document.querySelector('.pause')

        let parent = document.getElementById("container")!
        this.monkey = new Monkey(parent)
        for(let g = 0; g<5; g++) {
            this.gameobjects.push(new Guard(parent, this.monkey))
        }
        this.gameobjects.push(new Tree(parent))
        for(let b = 0; b<5; b++) {
            this.specialitems.push(new Banana(parent))
        }
        for(let p = 0; p<3; p++) {
            this.specialitems.push(new PotionScoreDown(parent))
        }

        let newGame = document.querySelector(".restart");
        newGame.addEventListener("click", () => this.newGame())

        this.gameLoop()

    }

    //Reload page if clicked on start new game button on dead screen
    public newGame() {
        location.reload()
    }

    //Pause method for pausing game with esc button
    public onKeyDown(event: KeyboardEvent): void {
        switch (event.key) {
            case "Escape":
    
                if (this.paused) {
                    this.paused = false
                } else {
                    this.paused = true
                }

                break
            default:
                break
        }
    }

    // if a point is scored do this
    public scorePoint() {
        this.score ++
        this.relScore ++
        this.uiScore.innerHTML = "Score: " + this.score
        this.nomnomnomSound.play()
    }

    //When a live is lost, do this
    public loseLive() {
        this.lives--
        this.uiLives.innerHTML = "Lives: " + this.lives
        this.loseLiveSound.play()
    }

    //SINGLETON PATTERN --> to be sure there will be 1 Game
    public static getInstance() {

        if (!Game.instance) {
            Game.instance = new Game()
        }
        return Game.instance
    }

    //Gameloop
    private gameLoop() {

        this.animation_id = requestAnimationFrame(() => this.gameLoop())

        //if the game isnt paused, execute all game elements
        if(!this.paused) {

            this.pausedTextElement.classList.remove('show')

            //if the monkey is still alive
            if(this.lives > 0) {

                this.hitGuard = false

                this.monkey.update()
    
                for(let g of this.gameobjects){
                    g.update()

                    if(g instanceof Guard) {

                        //If a guard collides with the monkey, then monkey replaces and loses live
                        if(Util.checkCollision(g, this.monkey) ){
                            this.monkey.resetPosition()
                            this.hitGuard = true
                            this.loseLive()

                            //Reset positions so ive the user some time
                            cancelAnimationFrame(this.animation_id)
                            setTimeout(() => {
                                requestAnimationFrame(() => this.gameLoop())
                            }, 500)

                        }

                    }

                    if(g instanceof Tree) {

                        //OBSERVER --> if the monkey collides with tree then send message
                        if(Util.checkCollision(g, this.monkey) ){
                            this.monkey.sendMessage()
                        }

                    }
                    
                }

                for(let s of this.specialitems){
                    s.update()
                }

                //reset all guards positions if collided
                if(this.hitGuard) {
                    for(let g of this.gameobjects){
                        if(g instanceof Guard) {
                            g.reset()
                        }
                    }
                }

            } else {

                this.dead = true
                let gameoverContainer = document.querySelector('.gameover')
                let deadScore = document.querySelector('.gameover .title-s')

                gameoverContainer.classList.add('show')
                deadScore.innerHTML = "Your score is: " + this.score

            }

        } else {

            //show pause menu when paused
            this.paused = true;
            this.pausedTextElement.classList.add('show')

        }

    }

}

window.addEventListener('load', () => {
    Game.getInstance().init()
})