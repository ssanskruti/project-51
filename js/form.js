class Form{
    constructor(){
      this.input=createInput("").attribute("placeholder","Enter Your Name")
      this.playButton=createButton("PLAY");
      this.titleImg=createImg("./assets/racingImg.png","game title");
      this.greeting=createElement("h2");
     }
     setElementsPosition(){
         this.titleImg.position(400,100)
         this.input.position(width/2-180,height/2-50)
         this.playButton.position(width/2-180,height/2)
         this.greeting.position(width/2-300,height/2-60)
     }
     setElementsStyle(){
      //  this.titleImg.class("gameTitle")
        this.input.class("customInput")
        this.playButton.class("customButton")
        this.greeting.class("greeting")
    }
     hide(){
         this.input.hide()
         this.playButton.hide()
         this.greeting.hide()
     }
     handleMousePressed(){
        this.playButton.mousePressed(()=>{
            this.input.hide()
            this.playButton.hide()
            var message=`Hello ${this.input.value()} </br> wait for another player to join...`
            this.greeting.html(message)
            player.name=this.input.value()
            playerCount+=1
            player.index=playerCount
            player.addPlayer()
            player.updateCount(playerCount)
        })
     }
     display(){
         this.setElementsPosition();
         this.handleMousePressed()
         this.setElementsStyle()
     }
}