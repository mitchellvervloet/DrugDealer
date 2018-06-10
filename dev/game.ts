class Game {

    private static instance: Game

    private monkey: Monkey
    private gameobjects:Array<GameObject> = new Array<GameObject>()

    public angriness:number = 0
    public score:number = 0
    public paused: boolean = false
    public lives:number = 3

    public minWidth:number
    public maxWidth:number
    public maxHeight:number

    private ui:HTMLElement
    private pausedTextElement:HTMLElement

    constructor () {

        this.minWidth = 0
        this.maxWidth = window.innerWidth
        this.maxHeight = window.innerHeight


    }

    public init(){
        console.log("init game")

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))

        this.ui = document.getElementsByTagName("ui")[0];
        this.pausedTextElement = document.querySelector('.pause')

        let parent = document.getElementById("container")!

        this.monkey = new Monkey(parent)

        for(let p = 0; p<5; p++){
            this.gameobjects.push(new Guard(parent, this.monkey))
        }

        for(let b = 0; b<5; b++){
            this.gameobjects.push(new Banana(parent))
        }

        for(let t = 0; t<8; t++){
            this.gameobjects.push(new Tree(parent))
        }

        this.gameLoop()

        console.log('if')
    }

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

    public scorePoint() {
        this.score ++
        this.ui.innerHTML = "Score: " + this.score

    }

    public static getInstance() {

        if (!Game.instance) {
            console.log("Not yet there!!")
            Game.instance = new Game()
        }
        return Game.instance
    }

    //Gameloop
    private gameLoop() {

        if(!this.paused) {

            this.pausedTextElement.classList.remove('show')

            if(this.lives > 0) {

                this.monkey.update()
    
                for(let g of this.gameobjects){
                    g.update()

                    if(g instanceof Guard) {

                        if(Util.checkCollision(g, this.monkey) ){
                            this.angriness++
                            this.monkey.resetPosition()
                        }

                    }

                    if(g instanceof Banana) {
                        if(Util.checkCollision(g, this.monkey) ){
                            g.resetBanana()
                            this.scorePoint()
                        }
                    }
                    
                }

            }

        } else {

            this.paused = true;
            this.pausedTextElement.classList.add('show')

        }

        requestAnimationFrame(() => this.gameLoop())

    }

}

window.addEventListener('load', () => {
    console.log('loaded')
    Game.getInstance().init()
})