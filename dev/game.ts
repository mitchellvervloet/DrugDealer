class Game {

    private static instance: Game

    private monkey: Monkey
    // private policeBoats:Array<PoliceBoat> = new Array<PoliceBoat>()
    // private bananas:Array<Banana> = new Array<Banana>()
    private gameobjects:Array<GameObject> = new Array<GameObject>()

    public angriness:number = 0
    public score:number = 0

    public minWidth:number
    public maxWidth:number
    public maxHeight:number

    private ui:HTMLElement

    constructor () {

        this.minWidth = 0
        this.maxWidth = window.innerWidth
        this.maxHeight = window.innerHeight

    }

    public init(){
        console.log("init game")

        this.ui = document.getElementsByTagName("ui")[0];

        let parent = document.getElementById("container")!

        this.monkey = new Monkey(parent)

        for(let p = 0; p<1; p++){
            this.gameobjects.push(new Guard(parent, this.monkey))
        }

        for(let b = 0; b<5; b++){
            this.gameobjects.push(new Banana(parent))
        }



        // this.policeBoats.push(new PoliceBoat(parent))

        this.gameLoop()

        console.log('if')
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

        this.monkey.update()

        let hitPolice = false
        let hitBanana = false
        // for(let p of this.policeBoats){
        //     p.update()
        //     if(Util.checkCollision(p, this.drugsBoat) ){
        //         hitPolice = true
        //         this.angriness++
        //         this.drugsBoat.resetPosition()
        //     }
        // }

        for(let g of this.gameobjects){
            g.update()

            if(g instanceof Guard) {

                if(Util.checkCollision(g, this.monkey) ){
                    hitPolice = true
                    this.angriness++
                    this.monkey.resetPosition()
                }

            }

            if(g instanceof Banana) {
                if(Util.checkCollision(g, this.monkey) ){
                    hitBanana = true
                    g.resetBanana()
                    this.scorePoint()
                }
            }
            
        }

        // loop gaat door als we geen zombie raken 
        if(this.angriness < 3) {
            requestAnimationFrame(() => this.gameLoop())
        } else {
            console.log('hit policeBoat')
        }

    }

}

window.addEventListener('load', () => {
    console.log('loaded')
    Game.getInstance().init()
})