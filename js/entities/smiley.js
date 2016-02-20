function Smiley(startX, startY) {
  var x = startX || 0;
  var y = startY || 0;
  var speedX = 0;
  var speedY = 0;

  var img = new Image();
  img.width = 100;
  img.height = 100;
  img.src = 'res/smiley1.svg';

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
      if (x + img.width > game.canvas.width
        || x < 0) {
        speedX *= -1;
        x += speedX * 0.5;
      }
      if (y + img.height > game.canvas.height
        || y < 0) {
        speedY *= -1;
        y += speedY * 0.5;
      }
    }
  }

  function render(ctx) {
    ctx.drawImage(img, x, y, img.width, img.height);
  }

  return {
    tick: tick,
    render: render
  }
}
