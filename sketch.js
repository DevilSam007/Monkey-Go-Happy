var monkey, monkey_img, banana, banana_img, rock, rock_img,
  ground, score, reset, reset_img;
var monkeyGroup, rockGroup, bananaGroup;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
  monkey_img = loadAnimation("monkey_0.png", "monkey_1.png", "monkey_2.png", "monkey_3.png", "monkey_4.png", "monkey_5.png", "monkey_6.png", "monkey_7.png", "monkey_8.png");
  banana_img = loadImage("banana.png");
  rock_img = loadImage("obstacle.png");
  reset_img = loadImage("reset.png");

  monkeyGroup = new Group();
  rockGroup = new Group();
  bananaGroup = new Group();
}

function setup() {
  createCanvas(600, 400);
  monkey = createSprite(100, 350, 10, 10);
  monkey.addAnimation("running", monkey_img);
  monkey.scale = 0.1;
  monkeyGroup.add(monkey);

  reset = createSprite(300, 200, 10, 10);
  reset.addImage(reset_img);
  reset.scale = 0.5;

  ground = createSprite(300, 390, 700, 10);
  ground.visible = false;

  score = 0;
}

function draw() {
  background("white");

  text("SurvivalTime = " + score, 300, 10);

  if (gameState === PLAY) {

    if (keyDown("space") && monkey.y >= 350) {
      monkey.velocityY = -23;
    }

    score = score + Math.round(getFrameRate() / 60);

    monkey.velocityY = monkey.velocityY + 0.8;

    monkey.collide(ground);

    if (bananaGroup.isTouching(monkeyGroup)) {
      score = score + 10;
      bananaGroup.destroyEach();
    }

    Spawnbanana();
    Spawnrock();

    reset.visible = false;

    if (rockGroup.isTouching(monkeyGroup)) {
      gameState = END;
    }
  } else if (gameState === END) {
    monkeyGroup.setVelocityYEach(0);
    bananaGroup.setVelocityXEach(0);
    rockGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
    rockGroup.setLifetimeEach(-1);

    reset.visible = true;

    if (mousePressedOver(reset)) {
      gameState = PLAY;
      score = 0;
      bananaGroup.destroyEach();
      rockGroup.destroyEach();
    }

  }



  drawSprites();
}

function Spawnbanana() {
  if (frameCount % 100 === 0) {
    banana = createSprite(580, 200, 10, 10);
    banana.addImage(banana_img);
    banana.scale = 0.08;
    banana.velocityX = -5
    banana.y = Math.round(random(1, 200));
    banana.lifetime = 135;
    bananaGroup.add(banana);
  }
}

function Spawnrock() {
  if (frameCount % 120 === 0) {
    rock = createSprite(580, 350, 70, 70);
    rock.addImage(rock_img);
    rock.scale = 0.2;
    rock.velocityX = -10;
    rock.lifetime = 135;
    rockGroup.add(rock);
  }
}