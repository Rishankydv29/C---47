var player,playerImg;
var ground,groundImg;
var spike,spikeImg,spikeGroup;
var gameState="play";
var edges;
var invisibleGround;
var playerEnd;
var score;
var gameOver,gameOverImg;
var restart,restartImg;

function preload(){
  playerImg=loadAnimation("Player/p1.png","Player/p2.png","Player/p3.png","Player/p4.png",
  "Player/p5.png","Player/p6.png","Player/p7.png","Player/p8.png","Player/p9.png",
  "Player/p10.png","Player/p11.png","Player/p12.png","Player/p13.png","Player/p14.png",
  "Player/p15.png","Player/p16.png","Player/p17.png","Player/p18.png","Player/p19.png",
  "Player/p20.png");
  groundImg=loadImage("ground.jpg");
  spikeImg=loadImage("spike.png");
  playerEnd=loadAnimation("Player/p6.png")
  gameOverImg=loadImage("game-over-.png");
  restartImg=loadImage("restart.png");
}

function setup() {
  createCanvas(700,400);
  ground = createSprite(200, 200, 600, 400);
  ground.addImage(groundImg);
  ground.velocityX=-6;
ground.scale=1.8;

player=createSprite(50,100,50,50);
player.addAnimation("running",playerImg);
player.scale=0.5;
player.addAnimation("ending",playerEnd)
player.debug=false;
player.setCollider("rectangle",0,0,100,300)

invisibleGround=createSprite(0,380,700,20);
invisibleGround.visible=false;

gameOver=createSprite(350,200);
gameOver.addImage(gameOverImg);
gameOver.visible=false;
gameOver.scale=0.8;

restart=createSprite(650,350);
restart.addImage(restartImg);
restart.visible=false;
restart.scale=0.4;

edges=createEdgeSprites();
spikeGroup=new Group();
score=0

}

function draw() {
  background(0);
  if (gameState==="play"){
  score=score+Math.round(getFrameRate()/60)
  if (ground.x<200){
    ground.x=ground.width/2
  }
  if (keyDown("space")&&player.y>20){
    player.velocityY=-10;
  }
  player.velocityY=player.velocityY+0.5;

  player.collide(invisibleGround);
  player.collide(edges);
  spawnSpike();

  if (spikeGroup.isTouching(player)){
    gameState="end"
  }
}
else if (gameState==="end"){
  player.velocityX=0
  player.velocityY=0
  ground.velocityX=0
  gameOver.visible=true;
  restart.visible=true;
  player.changeAnimation("ending",playerEnd);
  spikeGroup.setVelocityXEach(0);
  spikeGroup.setLifetimeEach(-1);
}


  drawSprites();
  stroke("black")
  fill(255)
  textSize(20)
  text("Score: "+score,550,40 )
}

function spawnSpike(){
  if (frameCount%200===0){
    spike=createSprite(680,300,50,50);
    spike.velocityX=-6;
    spike.addImage(spikeImg);
    spike.scale=0.4;
    spike.lifetime=700;
    spikeGroup.add(spike)
    spike.debug=false;
  }
}