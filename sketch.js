var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score, Game_Over, RestartImg, Game_OverImg, Restart;
var gameState = "play";
var cloudGroup, cactusGroup;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  Game_OverImg = loadImage("gameOver.png");
  RestartImg = loadImage("restart.png");
  trex_collided = loadAnimation("trex_collided.png");
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided);
  trex.scale = 0.5;
  trex.setCollider("circle",0,0,60);
 // trex.debug = true;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  Game_Over = createSprite(300,100,40,20);
  Game_Over.addImage("gameOver",Game_OverImg);
  Game_Over.scale = 1.9;
  
  Restart = createSprite(300,125,30,10);
  Restart.addImage("restart",RestartImg);
  Restart.scale = 0.4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudGroup = new Group();  
  cactusGroup = new Group();
  
  Game_Over.visible = false;
  Restart.visible = false;
  
  score = 0;
}

function draw() 
{
  background(180);
  
  text("Score: "+ score, 500,50);
  
     if(gameState === "play")
      {
         ground.velocityX = -6 - score/300;
        
        score = score + Math.round(getFrameRate()/60);
        
         if(keyDown("space")&& trex.y >= 160) 
         {
            trex.velocityY = -13;
         }
        
        if (ground.x < 0)
         {
            ground.x = ground.width/2;
        }
                      
        //spawn the clouds
        spawnClouds();

        //spawn obstacles on the ground
        spawnObstacles();
        
          if( cactusGroup.isTouching (trex))
          {
            gameState = "end" ;
            
          }         
      }
  
  
    else if(gameState === "end")
    {
      ground.velocityX = 0
      cactusGroup.setVelocityXEach(0);
      cloudGroup.setVelocityXEach(0);
      cactusGroup.setLifetimeEach(-1);
      cloudGroup.setLifetimeEach(-1);
      Game_Over.visible = true;
      Restart.visible = true;
      trex.changeAnimation("collided" , trex_collided);
      if(mousePressedOver(Restart)){
        reset();
      }
      
    }
  
  trex.velocityY = trex.velocityY + 0.8
  
  trex.collide(invisibleGround);
    
  drawSprites();
}

function reset(){
  Game_Over.visible = false;
  Restart.visible = false;
  score = 0;
  cactusGroup.destroyEach();
  cloudGroup.destroyEach();
  gameState = "play";
  trex.changeAnimation("running", trex_running);
} 


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6 - score/300;
   
   cactusGroup.add(obstacle);

   
    // //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
 }
}




function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3 - score/300;
    
    cloudGroup.add(cloud);
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
  
}