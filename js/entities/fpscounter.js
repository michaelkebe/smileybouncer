function FPSCounter() {
  var lastTimestamp = 0;
  var frameCount = 0;
  var fps = 0;
  var interval = 1000;

  function tick() {
    var now = Date.now();
    frameCount++;

    if ((now - lastTimestamp) >= interval) {
      var rate = frameCount / ((now - lastTimestamp) / interval);
      fps = rate.toFixed(1);
      frameCount = 0;
      lastTimestamp = now;
    }
  }

  function render(ctx) {
    ctx.save();
    ctx.font = "30px serif";
    ctx.fillText(fps + " FPS", 20, 30);
    ctx.restore();
  }

  return {
    tick: tick,
    render: render
  }
}
