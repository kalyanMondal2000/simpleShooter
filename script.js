// Get elements from HTML
const gameContainer = document.getElementById("game-container");
const player = document.getElementById("player");

// Set up player movement
let playerX = 225;
document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowLeft") {
    playerX -= 10;
    player.style.left = playerX + "px";
  }
  if (event.key === "ArrowRight") {
    playerX += 10;
    player.style.left = playerX + "px";
  }
});

// Set up bullet shooting
function shootBullet() {
  const bullet = document.createElement("div");
  bullet.className = "bullet";
  bullet.style.left = playerX + 22.5 + "px";
  bullet.style.bottom = "50px";
  gameContainer.appendChild(bullet);
  const bulletInterval = setInterval(function() {
    const bulletTop = parseInt(bullet.style.bottom) + 5;
    bullet.style.bottom = bulletTop + "px";
    // Check for collision with enemy
    const enemies = document.querySelectorAll(".enemy");
    enemies.forEach(function(enemy) {
      if (bulletTop > enemy.offsetTop && bulletTop < enemy.offsetTop + 50 && playerX > enemy.offsetLeft - 45 && playerX < enemy.offsetLeft + 45) {
        enemy.remove();
        clearInterval(enemyInterval);
        bullet.remove();
      }
    });
    if (bulletTop > 500) {
      clearInterval(bulletInterval);
      bullet.remove();
    }
  }, 10);
}
document.addEventListener("keydown", function(event) {
  if (event.key === " ") {
    shootBullet();
  }
});

// Set up enemy spawning
function spawnEnemy() {
  const enemy = document.createElement("div");
  enemy.className = "enemy";
  enemy.style.left = Math.floor(Math.random() * 450) + "px";
  enemy.style.top = "-50px";
  gameContainer.appendChild(enemy);
  
  // Set up enemy movement
  let enemyLeft = parseInt(enemy.style.left);
  let enemyTop = parseInt(enemy.style.top);
  let enemyXDirection = Math.random() > 0.5 ? 1 : -1;
  const enemyInterval = setInterval(function() {
    enemyTop += 5;
    enemyLeft += enemyXDirection * 2;
    enemy.style.top = enemyTop + "px";
    enemy.style.left = enemyLeft + "px";

    // Check for collision with player
    if (enemyTop > 450 && playerX > enemy.offsetLeft - 45 && playerX < enemy.offsetLeft + 45) {
      clearInterval(enemyInterval);
      enemy.remove();
      alert("Game over!");
    }

    // Check for collision with bullet
    const bullets = document.querySelectorAll(".bullet");
    bullets.forEach(function(bullet) {
      if (enemyTop > bullet.offsetTop && enemyTop < bullet.offsetTop + 20 && enemyLeft > bullet.offsetLeft - 40 && enemyLeft < bullet.offsetLeft + 40) {
        clearInterval(enemyInterval);
        enemy.remove();
        bullet.remove();
      }
    });

    // Move towards player
    if (playerX > enemyLeft) {
      enemyXDirection = 1;
    } else {
      enemyXDirection = -1;
    }
  }, 10);
}

const enemySpawnInterval = setInterval(spawnEnemy, 500);
