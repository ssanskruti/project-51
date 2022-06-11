class Game{
    constructor(){
      this.resetTitle=createElement("h2")
      this.resetButton=createButton("")
      this.leaderBoard=createElement("h2")
      this.leader1=createElement("h2")
      this.leader2=createElement("h2")
      this.playerMoving=false
    }
    getState(){
        database.ref("gameState").on("value",data=>{
          gameState=data.val()
        })
      }
    update(state){
       database.ref("/").update({
         gameState:state
       })
      }
    start(){
        player=new Player()
        playerCount=player.getCount()

        form=new Form();
        form.display()
        
        pokemon1=createSprite(width/2-50,height-100)
        pokemon1.addImage("pokemon1",p1)
        pokemon1.scale=0.6

        pokemon2=createSprite(width/2+100,height-100)
        pokemon2.addImage("pokemon2",p2)
        pokemon2.scale=0.6

        pokemons=[pokemon1,pokemon2]

        stars=new Group()
        fuels=new Group()
        this.addSprites(fuels,4,f,0.02)
        this.addSprites(stars,18,s,0.09)
    }

    handleElements(){
        form.hide()
        form.titleImg.position(40,50)
        this.resetTitle.html("Reset Game")
        this.resetTitle.class("resetText")
        this.resetTitle.position(width/2+200,40)
        this.resetButton.class("resetButton")
        this.resetButton.position(width/2+230,100)
        this.leaderBoard.html("Leader Board")
        this.leaderBoard.class("resetText")
        this.leaderBoard.position(width/3-60,40)
        this.leader1.class("leadersText")
        this.leader1.position(width/3-50,80)
        this.leader2.class("leadersText")
        this.leader2.position(width/3-50,130)
    }
    addSprites(spriteGroup,numberOfSprites,spriteImage,scale){
      for(var i=0;i<numberOfSprites;i++){
        var x,y
        x=random(width/2+150,width/2-150)
        y=random(-height*4.5,height-200)
        var sprite=createSprite(x,y)
        sprite.addImage(spriteImage)
        sprite.scale=scale
        spriteGroup.add(sprite)
      }
    }
    play(){
        this.handleResetButton()
        this.handleElements()
        player.getPokemonsAtEnd()
        Player.getPlayersInfo()
        if(allPlayers!==undefined){
         image(track,0,-height*5,width,height*6)
         this.showLeaderBoard()
         this.showLife()
         this.showFuel()
         var index=0
         for(var plr in allPlayers){
          index=index+1
          var x=allPlayers[plr].positionX
          var y=height-allPlayers[plr].positionY

          pokemons[index-1].position.x=x
          pokemons[index-1].position.y=y 
          
          if(index===player.index){
            stroke(10)
            fill("red")
            ellipse(x,y,80,80)
            this.handleFuel(index)
            this.handleStar(index)
            camera.position.x=width/2
            camera.position.y=pokemons[index-1].position.y
          }
         }
         if(keyIsDown(UP_ARROW)){
          player.positionY+=10
          player.update()
         }
         this.handlePlayerControls()
         if(player.positionY>3550){
          gameState=2
          player.rank+=1
          Player.updatePokemonsAtEnd(player.rank)
          player.update()
          this.showRank()
         }
         drawSprites()
        }
       
    }
   handleFuel(index){
      pokemons[index-1].overlap(fuels,function(collector,collected){
        player.fuel=185
        collected.remove()
      })
      if(player.fuel>0&&this.playerMoving){
        player.fuel-=0.3
       }
       if(player.fuel<=0){
        gameState=2
        this.gameOver()
       }
    }
    handleStar(index){
      pokemons[index-1].overlap(stars,function(collector,collected){
        player.score+=100
        player.update()
        collected.remove()
      })
    }
    handleResetButton(){
      this.resetButton.mousePressed(()=>{
        database.ref("/").set({
          playerCount:0,
          gameState:0,
          players:{}
        })
        window.location.reload()
      })
    }
    handlePlayerControls(){
      if(keyIsDown(UP_ARROW)){
        player.positionY+=10
        player.update()
        this.playerMoving=true
       }
       if(keyIsDown(LEFT_ARROW)&&player.positionX>width/3-50){
         player.positionX-=5
         player.update()
       }
       if(keyIsDown(RIGHT_ARROW)&&player.positionX<width/2+300){
         player.positionX+=5
         player.update()
       }
      
    }
    showLeaderBoard(){
      var leader1,leader2
      var players=Object.values(allPlayers)
      
      if(
        (players[0].rank===0&&players[1].rank===0)||players[0].rank===1
      ){
        leader1=players[0].rank+"&emsp;"+players[0].name+"&emsp;"+players[0].score
        leader2=players[1].rank+"&emsp;"+players[1].name+"&emsp;"+players[1].score
      }

      this.leader1.html(leader1)
      this.leader2.html(leader2)
    }
    showLife(){
      push()
      image(lifeImg,width/2-130,height-player.positionY-250,20,20)
      fill("white")
      rect(width/2-100,height-player.positionY-250,185,20)
      fill("red")
      rect(width/2-100,height-player.positionY-250,player.life,20)
      pop()
    }
    showFuel(){
      push()
      image(f,width/2-130,height-player.positionY-200,20,20)
      fill("white")
      rect(width/2-100,height-player.positionY-200,185,20)
      fill("orange")
      rect(width/2-100,height-player.positionY-200,player.fuel,20)
      pop()
    }
    showRank(){
      swal({
        title:`AWESOME!${"\n"}RANK${"\n"}${player.rank}${"\n"}SCORE:${player.score}`,
        text:"You Reached The Finish Line Successfully",
        imageUrl:"https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
        imageSize:"100x100",
        confirmButtonText:"OK"
      })
    }
    gameOver(){
      swal({
        title:`GAME OVER`,
        text:"OH NO!!! YOU LOST!!!",
        imageUrl:"https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize:"100x100",
        confirmButtonText:"THANKS FOR PLAYING"
      })
    }
}