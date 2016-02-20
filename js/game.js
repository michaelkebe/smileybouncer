window.onload = function () {
  window.game = {};

  game.canvas = document.getElementById('canvas');
  game.canvas.width = 640;
  game.canvas.height = 480;

  game.ctx = game.canvas.getContext('2d');

  game.keysDown = {};
  game.entities = [];
  game.entities.push(new FPSCounter());

  game.friction = 0.995;

  addEventListeners();
  gameLoop();

  function gameLoop() {
    tick();
    render();
    requestAnimationFrame(gameLoop);
  }

  function tick() {
    game.entities.forEach(function (entity) {
      entity.tick(game);
    });
  }

  function clear() {
    game.ctx.save();
    game.ctx.fillStyle = '#FFFFFF';
    game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
    game.ctx.restore();
  }

  function render() {
    clear();
    game.entities.forEach(function (entity) {
      entity.render(game.ctx);
    });
  }

  function addEventListeners() {
    window.addEventListener('deviceorientation', function (e) {
      game.beta = e.beta;
      game.gamma = e.gamma;
    }, false);

    window.addEventListener('keydown', function (e) {
      game.keysDown[e.keyCode] = true;
    }, false);

    window.addEventListener('keyup', function (e) {
      delete game.keysDown[e.keyCode];
    }, false);

    game.canvas.addEventListener('click', function () {
      addSmiley();
    }, false);
  }

  function addSmiley() {
    var x = Math.random() * (game.canvas.width - 100);
    var y = Math.random() * (game.canvas.height - 100);
    game.entities.push(new Smiley(x, y));
  }
};
