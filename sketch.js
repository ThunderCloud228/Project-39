var runner, runnerImg;
var redCyclist, redCyclistImg, redCyclistG;
var yellowCyclist, yellowCyclistImg, yellowCyclistG;
var road, roadImg;
var bellSound;

var gameState = "play";
var edges;
var lives = 3;

function preload() {
  runnerImg = loadAnimation("Images/runner1.png", "Images/runner2.png");
  redCyclistImg = loadAnimation("Images/redCyclist1.png", "Images/redCyclist2.png");
  yellowCyclistImg = loadAnimation("Images/yellowCyclist1.png", "Images/yellowCyclist2.png");
  roadImg = loadImage("Images/road.png");
  bellSound = loadSound("Sound/bell.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  road = createSprite(width/2,height/2,10,10);
  road.addImage("road", roadImg);
  road.velocityX = -5;
  
  runner = createSprite(width/2,height-75,10,10);
  runner.addAnimation("runner", runnerImg);
  runner.scale = 0.075;
  runner.setCollider("rectangle",-32,0,1150,1300);
  //runner.debug = true;
  
  redCyclistG = new Group();
  yellowCyclistG = new Group();
  
  bellSound.loop();
}

function draw() {
  background("black");
  
  edges = createEdgeSprites();
  runner.bounceOff(edges);
  
  if(gameState === "play") {
    if(road.x < 0) {
      road.x = width;
    }
    
    if(keyDown(UP_ARROW) || keyDown("w")) {
      runner.y = runner.y - 4;
    }
    
    if(keyDown(LEFT_ARROW) || keyDown("a")) {
      runner.x = runner.x - 3;
    }
    
    if(keyDown(DOWN_ARROW) || keyDown("s")) {
      runner.y = runner.y + 4;
    }
    
    if(keyDown(RIGHT_ARROW) || keyDown("d")) {
      runner.x = runner.x + 3;
    }
    
    spawnRedCycles();
    spawnYellowCycles();
    drawSprites();
    textSize(20);
    fill("green");
    text("Lives: "+ lives, width-95, 40);

    camera.position.x = runner.x;
    camera.position.y = runner.y;
    
    if(redCyclistG.isTouching(runner) || yellowCyclistG.isTouching(runner)) {
      reset();
    }
    
    if(lives === 0) {
      gameState = "end"
    }
    
    if(runner.y <= 50) {
      gameState = "win";
    }
  }
  if(gameState === "end") {
    textSize(50);
    fill("yellow");
    strokeWeight(25);
    stroke("red");
    text("Game Over", (width/2)-130, (height/2)-20);
    
    textSize(25);
    noStroke();
    fill("blue");
    text("Press 'SPACE' to Restart", (width/2)-137, (height/2)+50);
    
    camera.position.x = width/2;
    camera.position.y = height/2;

    if(keyDown("space")) {
      reset();
      restart();
    }
  }
  if(gameState === "win"){
    textSize(50);
    fill("yellow");
    strokeWeight(25);
    stroke("red");
    text("You Win!", (width/2)-100, (height/2)-20);
    
    textSize(25);
    noStroke();
    fill("blue");
    text("Press 'SPACE' to Restart", (width/2)-137, (height/2)+50);
    
    camera.position.x = width/2;
    camera.position.y = height/2;
    
    if(keyDown("space")) {
      restart();
    }
  }
}

function spawnRedCycles() {
  if(frameCount%70 === 0) {
    redCyclist = createSprite(width + 120, (height/2) - 120,10,10);
    redCyclist.addAnimation("redCyclist", redCyclistImg);
    redCyclist.scale = 0.1;
    redCyclist.velocityX = -10;
    redCyclist.lifetime = width;
    redCyclistG.add(redCyclist);
    redCyclist.setCollider("rectangle",0,0,1000,1000);
    //redCyclist.debug = true;
  }
}

function spawnYellowCycles() {
  if(frameCount%80 === 0) {
    yellowCyclist = createSprite(-120, (height/2) + 100,10,10);
    yellowCyclist.addAnimation("yellowCyclist", yellowCyclistImg);
    yellowCyclist.scale = 0.1;
    yellowCyclist.velocityX = 10;
    yellowCyclist.lifetime = width;
    yellowCyclistG.add(yellowCyclist);
    yellowCyclist.setCollider("rectangle",0,0,1000,1000);
    //yellowCyclist.debug = true;
  }
}

function reset() {
  redCyclistG.destroyEach();
  yellowCyclistG.destroyEach();
  runner.x = width/2;
  runner.y = height-75;
  lives = lives - 1;
}

function restart() {
  gameState = "play";
  runner.x = width/2;
  runner.y = height-75;
  lives = 3;
}
