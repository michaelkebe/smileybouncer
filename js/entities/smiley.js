Smiley.image = new Image();
Smiley.image.src = 'res/smiley1.svg';
Smiley.width = 50;
Smiley.height = 50;

Smiley.image.onload = function() {
  Smiley.cache = {};
  Smiley.cache.canvas = document.createElement('canvas');
  Smiley.cache.canvas.width = Smiley.width;
  Smiley.cache.canvas.height = Smiley.height;
  Smiley.cache.context = Smiley.cache.canvas.getContext('2d');
  Smiley.cache.context.drawImage(Smiley.image, 0, 0, Smiley.width, Smiley.height);
};

function Smiley(startX, startY) {
  var x = startX;
  var y = startY;
  var speedX = 0;
  var speedY = 0;

  function tick(game) {
    handleKeys();
    handleDeviceOrientation();
    handleFriction();
    move();
    bounceOffTheWall();

    function handleKeys() {
      if (38 in game.keysDown) {
        speedY--;
      }
      if (40 in game.keysDown) {
        speedY++;
      }
      if (37 in game.keysDown) {
        speedX--;
      }
      if (39 in game.keysDown) {
        speedX++;
      }
    }

    function handleDeviceOrientation() {
      if (game.beta && game.gamma) {
        speedY += game.beta / 5;
        speedX += game.gamma / 5;
      }
    }

    function handleFriction() {
      speedX *= game.friction;
      speedY *= game.friction;
    }

    function move() {
      x += speedX * 0.5;
      y += speedY * 0.5;
    }

    function bounceOffTheWall() {
      if (x + Smiley.width > game.canvas.width
        || x < 0) {
        speedX *= -1;
        x += speedX * 0.5;
      }
      if (y + Smiley.height > game.canvas.height
        || y < 0) {
        speedY *= -1;
        y += speedY * 0.5;
      }
    }
  }

  function render(ctx) {
    ctx.drawImage(Smiley.cache.canvas, x, y, Smiley.width, Smiley.height);
  }

  return {
    tick: tick,
    render: render
  }
}
