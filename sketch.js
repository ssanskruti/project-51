var canvas
var p1,p2
var obstacle1,obstacle2
//var racingImg
var s,f
var track
var database
var playerCount
var gameState
var form,player,game 
var bgImg
var pokemon1,pokemon2,pokemons
var allPlayers
var fuels,stars
var reset
var lifeImg

function preload(){
 p1=loadImage("./assets/eevee.png")
 p2=loadImage("./assets/pikachu.png")
 obstacle1=loadImage("./assets/obstacle1.png")
 obstacle2=loadImage("./assets/obstacle2.png")
// racingImg=loadImage("./assets/racingImg.png")
 s=loadImage("./assets/star.png")
 track=loadImage("./assets/track.png")
 bgImg=loadImage("./assets/bg.png")
 f=loadImage("./assets/fuel.png")
 lifeImg=loadImage("./assets/life.png")
}
function setup(){
 canvas=createCanvas(windowWidth,windowHeight)
 database=firebase.database()
 game=new Game()
 game.start()
 game.getState()

}
function draw(){
 background(bgImg)

 if(playerCount===2){
  game.update(1)
 }

 if(gameState===1){
  game.play()
 }
 
}
function windowResized(){
    resizeCanvas(windowWidth,windowHeight)
}