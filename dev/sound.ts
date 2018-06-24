class Sound {
    private element = new Audio();
    constructor(source: string) {
        this.element = document.createElement("audio")
        this.element.src = source
    }
    play() {
        this.element.play()
    }
}