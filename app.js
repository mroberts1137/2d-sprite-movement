/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = (canvas.width = 500);
const CANVAS_HEIGHT = (canvas.height = 600);

const TICK_SPEED = 1;
const SPRITE_SCALE = 2;

const numberOfEnemy1 = 5;
const numberOfEnemy2 = 5;
const numberOfEnemy3 = 5;
const numberOfEnemy4 = 5;
let gameFrame = 0;

//////////////////////////////////////////////////////////////////
// CLASS DEFINITIONS
//////////////////////////////////////////////////////////////////

class Enemy {
  constructor(x, y) {
    this.showBorder = false;
    this.image = new Image();
    (this.x = x), (this.y = y);
    this.frame = 0;
    this.animationSpeed = Math.floor(Math.random() * 4) + 1;
  }

  update() {
    this.move();
    this.animateFrame();

    // out-of-bounds
    if (this.x > CANVAS_WIDTH) this.x = -this.width;
    if (this.x < -this.width) this.x = CANVAS_WIDTH;
    if (this.y > CANVAS_HEIGHT) this.y = -this.height;
    if (this.y < -this.height) this.y = CANVAS_HEIGHT;
  }
  move() {}
  animateFrame() {
    if (gameFrame % (TICK_SPEED * this.animationSpeed) === 0)
      this.frame > this.animationFrames ? (this.frame = 0) : this.frame++;
  }
  draw() {
    if (this.showBorder)
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

class Bat extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.image.src = 'assets/enemy1.png';
    this.behavior = 'shake';
    this.spriteWidth = 293;
    this.spriteHeight = 155;
    this.maxSpeed = 10;
    this.animationFrames = 4;

    this.width = this.spriteWidth / SPRITE_SCALE;
    this.height = this.spriteHeight / SPRITE_SCALE;

    this.speed = (Math.random() * 2 - 1) * this.maxSpeed;
    this.direction = Math.random() * 360;
  }

  move() {
    this.direction = Math.random() * 360;
    this.x += this.speed * Math.cos((this.direction * Math.PI) / 180);
    this.y -= this.speed * Math.sin((this.direction * Math.PI) / 180);
  }
}

class Bat2 extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.image.src = 'assets/enemy2.png';
    this.behavior = 'leftSine';
    this.spriteWidth = 266;
    this.spriteHeight = 188;
    this.maxSpeed = 10;
    this.animationFrames = 4;

    this.width = this.spriteWidth / SPRITE_SCALE;
    this.height = this.spriteHeight / SPRITE_SCALE;

    this.speed = Math.random() * this.maxSpeed;
    this.direction = 180;
    this.amplitude = 10 * Math.random();
    this.angularSpeed = 10 * Math.random();
    this.angle = 0;
  }

  move() {
    this.x += this.speed * Math.cos((this.direction * Math.PI) / 180);
    this.y -= this.amplitude * Math.sin(((this.angle % 360) * Math.PI) / 180);
    this.angle += this.angularSpeed;
  }
}

class Ghost extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.image.src = 'assets/enemy3.png';
    this.behavior = 'leftSine';
    this.spriteWidth = 218;
    this.spriteHeight = 177;
    this.maxSpeed = 10;
    this.animationFrames = 4;

    this.width = this.spriteWidth / SPRITE_SCALE;
    this.height = this.spriteHeight / SPRITE_SCALE;

    this.angularSpeed = 4 * Math.random() + 1;
    this.angle = 0;
    this.nx = 1;
    this.ny = 2;
  }

  move() {
    this.x =
      ((CANVAS_WIDTH - this.width) / 2) *
      (Math.sin((this.nx * (this.angle % 360) * Math.PI) / 180) + 1);
    this.y =
      ((CANVAS_HEIGHT - this.height) / 2) *
      (Math.sin((this.ny * (this.angle % 360) * Math.PI) / 180) + 1);
    this.angle += this.angularSpeed;
  }
}

class Wheel extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.image.src = 'assets/enemy4.png';
    this.behavior = 'leftSine';
    this.spriteWidth = 213;
    this.spriteHeight = 213;
    this.maxSpeed = 10;
    this.animationFrames = 7;

    this.width = this.spriteWidth / SPRITE_SCALE;
    this.height = this.spriteHeight / SPRITE_SCALE;

    this.moveInterval = Math.floor(Math.random() * 200 + 50);
    this.newX = this.x;
    this.newY = this.y;
  }

  move() {
    if (gameFrame % this.moveInterval === 0) {
      this.newX = Math.random() * (CANVAS_WIDTH - this.width);
      this.newY = Math.random() * (CANVAS_HEIGHT - this.height);
    }
    let dx = this.x - this.newX;
    let dy = this.y - this.newY;
    this.x -= dx / 20;
    this.y -= dy / 20;
  }
}

//////////////////////////////////////////////////////////////////
// GAME START
//////////////////////////////////////////////////////////////////

const objects = [];
for (let i = 0; i < numberOfEnemy1; i++) {
  objects.push(
    new Bat(Math.random() * CANVAS_WIDTH, Math.random() * CANVAS_HEIGHT)
  );
}
for (let i = 0; i < numberOfEnemy2; i++) {
  objects.push(
    new Bat2(Math.random() * CANVAS_WIDTH, Math.random() * CANVAS_HEIGHT)
  );
}
for (let i = 0; i < numberOfEnemy3; i++) {
  objects.push(
    new Ghost(Math.random() * CANVAS_WIDTH, Math.random() * CANVAS_HEIGHT)
  );
}
for (let i = 0; i < numberOfEnemy4; i++) {
  objects.push(
    new Wheel(Math.random() * CANVAS_WIDTH, Math.random() * CANVAS_HEIGHT)
  );
}

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  objects.forEach((object) => {
    object.update();
    object.draw();
  });
  gameFrame++;
  requestAnimationFrame(animate);
}

//////////////////////////////////////////////////////////////////
// GAME LOOP
//////////////////////////////////////////////////////////////////

animate();
