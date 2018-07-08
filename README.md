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

### Overerving - nummer 1
Overerving wordt toegepast in de vorm van een GameObject die ge-extend wordt door alle objecten die getekend moeten worden in de Game. Elk object moet ook getekend worden dus dit is erg handig. Naast dat het GameObject bepaald welke methods er moeten zitten in de classes die extenden, kan elke class een eigen definitie in de methods zetten. Het is erg handig als bepaalde classes van een zelfde class extenden, omdat je ze dan allemaal in 1 keer kan aanroepen. Dit heb ik gedaan door alle gameobjecten in een array te zetten en ze daarna met een for aan te roepen. Dit is hieronder te zien:
```
for(let g of this.gameobjects){
                    g.update()
```

### Overerving - nummer 2
Overerving wordt in voorbeeld 2 toegepast in de vorm van een specialItem die ge-extend wordt door alle objecten die een speciale functie hebben als een 'powerup' of een 'powerdown'. Op deze manier kan je elke class duidelijk maken dat ze een method moeten bezitten die de special method uitvoeren. Ook in dit geval kunnen alle special items in 1 keer aangeroepen worden als ze in 1 array gezet worden. Daar heb ik hier ook voor gekozen. Ik kan zo gemakkelijk op elke collision van een special items met de Monkey dezelfde class aanroepen. Dit is hieronder te zien. 
```
for(let s of this.specialitems){
                    s.update()
                }
```

Zoals te zien is, wordt voor elk special item de update functie aangeroepen. De inhoud van deze functie zal voor elke class verschillen.

### Type guards
Een ander onderdeel van Polymorfisme is Type Guards. Ik heb gebruik gemaakt van de Type Guards om te checken of het object, uit de array gameobjecten, waarmee de Monkey collide van een bepaald type is. Ik het geval hieronder kijk ik of het type van de class Tree is.
```
if(g instanceof Tree) {

                        //OBSERVER --> if the monkey collides with tree then send message
                        if(Util.checkCollision(g, this.monkey) ){
                            this.monkey.sendMessage()
                        }

                    }
```

Zoals je kan zien kan ik een method aanroepen die alleen voor een bepaalde class uitgevoerd hoeft te worden.

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

