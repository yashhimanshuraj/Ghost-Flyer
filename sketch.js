var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() 
{
  createCanvas(600, 600);
  spookySound.loop()
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(200,100,50,50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}



function draw() {
  background("black");
 
  if(gameState==="play")
  {

  

  if(tower.y > 400){
      tower.y = 300
}
if(keyDown("left_arrow"))
  { 
    ghost.x  = ghost.x-5;
  }
  if(keyDown("right_arrow"))
  {
    ghost.x = ghost.x+5;
  }
  if(keyDown("space"))
  {
    ghost.velocityY = -5;
  }
  ghost.velocityY = ghost.velocityY +0.8;
  if(climbersGroup.isTouching(ghost))
  {
    ghost.velocityY = 0
  }
    SpawnDoors()
    if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600)
  {
    gameState = "end"
  }

    drawSprites();
  }
  if(gameState==="end")
  {
    fill("Cyan");
    textSize(20);
    stroke("green");
    text("GAME OVER ",250,300);
  }
}
function SpawnDoors()
{
  if(frameCount%300===0)
  {
    door = createSprite(300,-50);
    door.addImage(doorImg);
    climber = createSprite(300,-10);
    climber.addImage(climberImg);
    invisibleBlock = createSprite(300,15);
    invisibleBlock.width = climber.width
    invisibleBlock.height = 2
    door.x = Math.round(random(100,400))
    door.velocityY = 2;
    climber.x = door.x;
    invisibleBlock.x = door.x;
    climber.velocityY = 2;
    invisibleBlock.velocityY = 2;
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;
    ghost.depth = door.depth;
    ghost.depth+=1;
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.debug = true;
  }
}
