// GHOSTRUNNER PX — Mini-jeu cryogénique intégré

(function () {
  const root = document.getElementById("ghostrunner");
  if (!root) return;

  const canvas = document.createElement("canvas");
  canvas.width = 420;
  canvas.height = 160;
  canvas.style.border = "1px solid #00ffe1";
  canvas.style.background = "#000";
  canvas.style.marginTop = "30px";
  root.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  let px = { x: 30, y: 100, w: 20, h: 20 };
  let velocity = 2;
  let obstacles = [];
  let frame = 0;
  let gameOver = false;
  let score = 0;

  function drawPX() {
    ctx.fillStyle = "#00ffe1";
    ctx.fillRect(px.x, px.y, px.w, px.h);
  }

  function drawObstacles() {
    ctx.fillStyle = "#ff1d8e";
    obstacles.forEach((obs) => {
      ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
    });
  }

  function collision(a, b) {
    return (
      a.x < b.x + b.w &&
      a.x + a.w > b.x &&
      a.y < b.y + b.h &&
      a.y + a.h > b.y
    );
  }

  function resetGame() {
    px.x = 30;
    px.y = 100;
    velocity = 2;
    obstacles = [];
    frame = 0;
    score = 0;
    gameOver = false;
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!gameOver) {
      if (keys["ArrowLeft"]) px.x -= 3;
      if (keys["ArrowRight"]) px.x += 3;
      px.x = Math.max(0, Math.min(canvas.width - px.w, px.x));

      if (frame % 60 === 0) {
        obstacles.push({ x: canvas.width, y: 100, w: 20, h: 20 });
      }

      obstacles.forEach((obs) => (obs.x -= velocity));
      obstacles = obstacles.filter((obs) => obs.x + obs.w > 0);

      for (let obs of obstacles) {
        if (collision(px, obs)) {
          gameOver = true;
          break;
        }
      }

      score++;
      velocity += 0.001;
    } else {
      ctx.fillStyle = "#ff1d8e";
      ctx.font = "16px monospace";
      ctx.fillText("💥 COLLISION PX", 140, 80);
      ctx.fillText("Press [R] to restart", 125, 105);
    }

    drawPX();
    drawObstacles();
    ctx.fillStyle = "#00ffe1";
    ctx.font = "12px monospace";
    ctx.fillText(`Fragments évités : ${score}`, 10, 20);

    frame++;
    requestAnimationFrame(loop);
  }

  let keys = {};
  window.addEventListener("keydown", (e) => {
    keys[e.key] = true;
    if (gameOver && e.key.toUpperCase() === "R") resetGame();
  });
  window.addEventListener("keyup", (e) => {
    keys[e.key] = false;
  });

  resetGame();
  loop();
})();
