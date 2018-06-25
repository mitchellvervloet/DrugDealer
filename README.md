# MonkeyChase - Mitchell Vervloet (naam was eerst DrugDealer)
Deze game is ontwikkeld voor de herkansing van het vak Applying Design Patterns in Game Development.
@Copyright - Mitchell Vervloet

## Inleiding
Deze game is een game waarbij de gebruiker met zijn pijltjestoetsen de aap moet besturen in de dierentuin. Er kunnen punten verzameld worden door bananen te verzamelen. Door vergif op te pakken, gaat er een punt vanaf. Er zijn bewakers die op zoek zijn naar de aap om hem te pakken te krijgen. Je kunt je voor eventjes verschuilen in een boom als je die op tijd kan bereiken! De bewakers gaan steeds harder lopen, dus probeer ze af te schudden!! Je kan ook uit het beeld lopen waardoor je er aan de andere kant uitkomt, dit kunnen de bewakers niet dus pak je voordeel en pak je highscore!

## Speelbare game

Link naar de online speelbare game: https://mitchellvervloet.github.io/DrugDealer/

## Installatie

Om dit project te clonen, editen en runnen zijn geen speciale handelingen nodig. Je kopieert het project, zorgt dat je een locale webserver hebt draaien en ga naar de folder van het project. Hier ga je naar de index.html file, waardoor je het project draaiende kan zien.

## Klassendiagram

![Klik voor UML](https://github.com/mitchellvervloet/DrugDealer/blob/master/docs/img/uml.png)

## Pull request

Link naar de pull request:
https://github.com/duncanteege/theminimalist/pull/1

### Waarom ik de additions heb gedaan:
- Ik heb de strategy toegepast. Hij had al een kleine opzet gemaakt, maar ik heb het helemaal uitgewerkt. Ik heb hier gekozen voor de strategy, omdat de 'square' een behaviour moet hebben waarin hij 'speedup' en 'slowdown'.
- Ik heb Polymorfisme toegevoegd als 'gameobject'. Ik heb dat hier gedaan omdat elk object getekend moet worden in de game.
- Ik heb een Util class toegevoegd met een check voor de collision. Uit een gesprek met Duncan bleek dat hij iets met collision gaat doen, dus dat heb ik erin gezet. Hierbij checkt de collision of de 2 meegegeven objecten elkaar raken.

## Peer review

Link naar de peer review:
https://github.com/duncanteege/theminimalist/issues/4

## Singleton

Het singleton zit verwerkt in deze game op de volgende manier.

Er wordt een public property van het type "Game" aangemaakt om de  instantie in op te slaan
`public static instance: Game`

Met behulp van een public static method, genaamd getInstance, wordt er gekeken op er al een instantie van Game is. Als die er niet is, wordt er een nieuwe instantie aangemaakt en in de property instance gezet. Als er al wel een instantie is die in de property instance is gezet, dan zal er niks gebeuren. Er kan daarom maar 1 Game instantie aangemaakt worden
```
public static getInstance() {if (!Game.instance) {
     Game.instance = new Game()
   }
   return Game.instance
}
```

Op window on load wordt de method getInstance aangeroepen. Op deze manier wordt er op het begin 1 Game gemaakt en zal er geen tweede game gemaakt worden. Ik heb hier trouwens gekozen voor om met een init functie de objecten allemaal aan te maken, omdat de game anders elke keer in een loop bleef van de getInstance method. De Game.getInstance() uit de objecten werd namelijk eerder aangeroepen dan die hier
```
window.addEventListener('load', () => {
    Game.getInstance().init()
})
```

## Polymorfisme

### nummer 1
Het Polymorfisme heb ik teruggevonden in de vorm van een GameObject die ge-extend wordt door alle objecten die getekend moeten worden in de Game. In het gameobject wordt de meegegeven 'tag' in de 'parent' gestopt voor elk object die hem extend. Elk object moet ook getekend worden dus dit is erg handig. Daarnaast wordt het object ook echt getekend door middel van de update. De class GameObject ziet er als volgt uit:
```
class GameObject {

    class GameObject {
    
    public div: HTMLElement
    public x:number = 0
    public y:number = 0
    public width:number
    public height:number
    public xspeed:number = 0
    public yspeed:number = 0
    public speedmultiplier:number = 1
    
    constructor(tag:string, parent:HTMLElement) {
        this.div = document.createElement(tag)
        parent.appendChild(this.div)
    }

    public update():void {
        this.div.style.transform = "translate("+this.x+"px, "+this.y+"px)"
    }
}

}
```

Er is te zien dat er een aantal standaard properties zijn die meegegeven worden. Per object kan er dan bepaald worden wat de waardes zullen zijn, maar er staat vast in het GameObject dat de objecten die dit extenden, dit moeten bevatten.

Een voorbeeld van een Object die GameObject extend is 'Monkey':
`class Monkey extends GameObject implements Subject`

De properties die het object moeten bezitten, worden in de class toegekend. Met behulp van de super() aan te roepen kan de 'tag' en de 'parent' meegegeven worden. 
`super("monkey", parent)`

In de update functie moet ook de update functie van de super aangeroepen worden:
`super.update()`

### nummer 2
Het Polymorfisme heb ik in nummer 2 teruggevonden in de vorm van een specialItem die ge-extend wordt door alle objecten die een speciale functie hebben als een 'powerup' of een 'powerdown'. Omdat het special item ook weer gameobject extend moet er aan de super van specialItem de gewenste gegevens meeggegeven worden die de super van Gameobject nodig heeft. Dit zijn dus ook de 'tag' en de 'parent'. De class GameObject ziet er als volgt uit:
```
class SpecialItems extends GameObject {

    constructor(element:string, parent:HTMLElement) {
        super(element, parent);
    }

    reset() {
        this.x = Math.random() * (window.innerWidth - this.width)
        this.y = Math.random() * (window.innerHeight-this.height)
    }

    //If collided with monkey then call reset method for all extenders
    collided() { 
        this.reset()
    }

    update() {
        //check if collided with monkey
        if(Util.checkCollision(this, Game.getInstance().monkey) ){
            this.collided()
        }
        super.update()
    }

}
```

De belangrijkste functie van deze polymorfisme, is het makkelijk maken van het koppelen van een powerup aan de collision met de monkey. Voor de toekomst kunnen er op deze manier gemakkelijk nog meerdere items toegevoegd worden!

Een voorbeeld van een Object die SpecialItems extend is 'Banana':
`class Banana extends SpecialItems`

Hier zie je de collided functie die voor elke object anders kan zijn:
```
//If collided with monkey then this happens
  collided() {
      Game.getInstance().score++
      Game.getInstance().relScore++
      Game.getInstance().uiScore.innerHTML = "Score: " + Game.getInstance().score
      Game.getInstance().nomnomnomSound.play()
      super.reset()
  }
```

## Strategy

Het strategy pattern zit verwerkt in de game. Dit is te zien bij de verschillende types behaviour de "guard" heeft.
In de guard wordt er een behaviour propert aangemaakt en daarbij wordt een Bevhaviour gekoppeld.

Ik heb hiervoor een interface behaviour aangemaakt. Hierin is te zien dat de monkey meegegeven wordt en dat de guard zelf ook in een property verwacht wordt. Uiteraard is er een method die de behaviour uit moet voeren 'performBehaviour':
```
interface Behaviour {
    monkey: Monkey
    self: Guard
    performBehaviour():void
}
```

Binnen de verschillende behaviours is te zien wat er uitgevoerd moet worden. De behaviours moeten wel de interface implementeren. Dit wordt gedaan op de volgende manier:
`class Patrolling implements Behaviour`
`class Walking implements Behaviour`
`class Watching implements Behaviour`

Hier wordt de property aangemaakt van het type behaviour in de Guard:
`public behaviour: Behaviour`

Hier wordt de property gevuld met een behaviour in de Guard:
`this.behaviour = new Watching(this, this.monkey)`

Aan de hand van een switch case wordt er van behaviour gewisseld in de Guard:
```
switch(true) { 
                case (score == 0):
                    this.behaviour = new Watching(this, this.monkey)
                    break;
                case (score < 2):
                    if(Util.checkInRatio(this, this.monkey, 200)) {
                        this.behaviour = new Patrolling(this, this.monkey)
                    } else {
                        this.behaviour = new Watching(this, this.monkey)
                    }
                    break;
                case (Math.floor(this.monkey.x) <= 0 || Math.floor(this.monkey.x) >= Math.floor(Game.getInstance().maxWidth - this.monkey.width) || Math.floor(this.monkey.y) <= 0 || Math.floor(this.monkey.y) >= Math.floor(Game.getInstance().maxHeight - this.monkey.height)):
                    this.behaviour = new Walking(this, this.monkey)
                    break;
                case (score >= 2): 
                    //statements;
                    if(Util.checkInRatio(this, this.monkey, 200)) 
                    {
                        this.behaviour = new Patrolling(this, this.monkey)
                    } 
                    else {
                        this.behaviour = new Walking(this, this.monkey)
                    }
                    break; 
                
            } 
```

Ik heb het hier toegepast omdat de Guard meerdere behaviours moet hebben aan de hand van factoren uit de omgeving. Denk hierbij aan de score of de locatie van de Monkey. Hierbij is het Strategy Pattern een erg gemakkelijke en mooie oplossing.

## Observer

Voor de observer maak ik gebruik van de Monkey die ervoor zorgt dat er een berichtje gestuurd kan worden naar de observers die zich subscriben bij de Monkey.

Voor dit pattern heb ik twee interfaces gemaakt. Eentje voor de Subject --> Monkey en eentje voor Observers --> Guards.

Hier kan je de interface voor de Subject zien. Hierin is te zien dat de Subject dus de Monkey een Subscribe method moet hebben, een unsubscribe method en een array waarin alle observers gezet kunnen worden met behulp van de subscribe method.
```
interface Subject {
    observers:Observer[]
    subscribe(o: Observer):void
    unsubscribe(o: Observer):void
}
```

De observers bezitten dan een notify method die aangeroepen wordt vanuit het Subject. Deze Notify method bavat het gedrag dat er gedaan moet worden.  Zo ziet de interface voor de Observers eruit:
```
interface Observer {
    notify(p:string):void
}
```

Hier is te zien dat de Monkey de interface van Subject meot implementeren
`class Monkey extends GameObject implements Subject`
En hier is te zien hoe hij alle observers op de hoogte houd met de sendMessage method die de Notify method in de Observers aanroept
```
//send message mthod to notify all subscribers
    public sendMessage() {
        for (let c of this.observers) {
            c.notify()
        }
    }
```

De method sendMessage van de Monkey moet wel aangeroepen worden. Dit gebeurt in de Game als de Monkey tegen de boom aankomt. Dit betekent dat hij aan het verschuilen is voor de bewakers.
```
if(Util.checkCollision(g, this.monkey) ){
                            this.monkey.sendMessage()
                        }
```

Ik heb voor een observer pattern gekozen voor de Monkey Als subject, zodat er straks nog meer verschillende Guards kunnen luisteren naar de locatie van de Monkey. Er gebeurt namelijk pas iets als de Monkey zich verschuilt en dus zullen alle verschillende Guards die er in de toekomst geimplementeerd kunnen worden, hierop reageren.


## Gameplay componenten

### Game component 1
Ik heb twee Game componenten in mijn game verwerkt. De eerste hiervan is het toevoegen van geluiden. Hiervoor heb ik met wat hulp van een klasgenootje gebruik gemaakt van een aparte class voor alle sounds. Ik had dit eerst in elke object apart gedaan, maar met behulp van dit object is het veel gemakkelijker om een nieuwe audio aan te maken en aan te roepen. Het bespaart heel wat regels code.
```
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
```

### Game component 2
nvt helaas

