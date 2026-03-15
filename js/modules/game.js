// Game entrance animation
gsap.from('.game-hero', {
    opacity: 0, y: 50, duration: 1, ease: 'expo.out',
    scrollTrigger: { trigger: '.game-section', start: 'top 80%' }
});
gsap.from('.game-container', {
    opacity: 0, y: 60, scale: 0.96, duration: 1, delay: 0.2, ease: 'expo.out',
    scrollTrigger: { trigger: '.game-section', start: 'top 75%' }

});

// ══════════════════════════════════════════════════════
// CAN CATCHER MINI GAME
// ══════════════════════════════════════════════════════
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('game-score');
const bestEl = document.getElementById('game-best');
const overlay = document.getElementById('game-overlay');
const overlayBtn = document.getElementById('overlay-btn');
const overlayTitle = document.getElementById('overlay-title');
const overlaySub = document.getElementById('overlay-sub');
const lifeDots = [
    document.getElementById('life-1'),
    document.getElementById('life-2'),
    document.getElementById('life-3'),
];

const CAN_COLORS = ['green', 'cyan', 'purple', 'red'];
const CAN_HEX = { green: '#7fc12b', cyan: '#00e5ff', purple: '#9c27b0', red: '#f44336' };

// ── No external images needed — cans drawn procedurally ─

// ── Canvas sizing ─────────────────────────────────────
function resizeCanvas() {
    const w = canvas.parentElement.clientWidth;
    canvas.width = w;
    canvas.height = Math.round(w * 0.55);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// ── Game State ────────────────────────────────────────
let gameRunning = false;
let score = 0, bestScore = 0, lives = 3;
let paddleX = 0;
let cans = [];
let particles = [];
let frameId;
let spawnTimer = 0;
let spawnInterval = 90; // frames
let speed = 2.5;
let frameCount = 0;

// ── Paddle tracks pointer (mouse + touch) ─────────────
const isTouchDevice = () => window.matchMedia('(pointer: coarse)').matches;

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    paddleX = (e.clientX - rect.left) * (canvas.width / rect.width);
});

function handleTouch(e) {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    paddleX = (e.touches[0].clientX - rect.left) * (canvas.width / rect.width);
}
canvas.addEventListener('touchstart', handleTouch, { passive: false });
canvas.addEventListener('touchmove', handleTouch, { passive: false });

// ── Preload logo image ────────────────────────────────
const monsterLogo = new Image();
monsterLogo.src = 'assets/images/logo.png';

// ── Drop object ───────────────────────────────────────
function spawnDrop() {
    const color = CAN_COLORS[Math.floor(Math.random() * CAN_COLORS.length)];
    // The monster logo is wider than a can, let's make it more square
    const size = canvas.width * 0.07;
    const x = Math.random() * (canvas.width - size - 20) + 10;
    cans.push({ x, y: -size, w: size, h: size, color, vy: speed + Math.random() * 1.2 });
}

// ── Particle burst on catch ───────────────────────────
function burst(x, y, hex) {
    for (let i = 0; i < 14; i++) {
        const angle = Math.random() * Math.PI * 2;
        const vel = 2 + Math.random() * 4;
        particles.push({
            x, y,
            vx: Math.cos(angle) * vel,
            vy: Math.sin(angle) * vel,
            r: 3 + Math.random() * 3,
            alpha: 1,
            color: hex,
        });
    }
}

// ── Draw helpers ──────────────────────────────────────
function drawPaddle() {
    const W = canvas.width;
    const H = canvas.height;
    const pw = W * 0.15;
    const ph = H * 0.025;
    const py = H - ph - 12;
    const px = Math.max(pw / 2, Math.min(W - pw / 2, paddleX));
    const hex = root.style.getPropertyValue('--accent') || '#7fc12b';

    // Glow
    ctx.shadowColor = hex;
    ctx.shadowBlur = 18;

    // Pill shape
    ctx.beginPath();
    ctx.roundRect(px - pw / 2, py, pw, ph, ph / 2);
    ctx.fillStyle = hex;
    ctx.fill();

    // Shine
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    ctx.beginPath();
    ctx.roundRect(px - pw / 2 + 4, py + 2, pw * 0.5, ph * 0.4, 2);
    ctx.fill();

    return { px, py, pw, ph };
}

// ── Draw the Monster Logo Drops ───────────────────────────
function drawDrops() {
    if (!monsterLogo.complete) return;
    cans.forEach(c => {
        ctx.save();
        ctx.shadowColor = CAN_HEX[c.color];
        ctx.shadowBlur = 16;
        // Draw logo image tinted via shadow, or just use glow around the actual logo png
        ctx.drawImage(monsterLogo, c.x, c.y, c.w, c.h);
        ctx.restore();
    });
}

function drawParticles() {
    particles.forEach(p => {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
    });
}

// ── Update ────────────────────────────────────────────
function update() {
    frameCount++;

    // Difficulty ramp every 10 catches
    speed = 2.5 + Math.floor(score / 10) * 0.4;
    spawnInterval = Math.max(38, 90 - Math.floor(score / 5) * 5);

    // Spawn
    spawnTimer++;
    if (spawnTimer >= spawnInterval) { spawnDrop(); spawnTimer = 0; }

    const W = canvas.width, H = canvas.height;
    const pw = W * 0.15, ph = H * 0.025;
    const py = H - ph - 12;
    const px = Math.max(pw / 2, Math.min(W - pw / 2, paddleX));

    // Move drops
    for (let i = cans.length - 1; i >= 0; i--) {
        const c = cans[i];
        c.y += c.vy;

        // Catch check
        if (c.y + c.h >= py && c.y + c.h <= py + ph + c.vy + 4 &&
            c.x + c.w >= px - pw / 2 && c.x <= px + pw / 2) {
            burst(c.x + c.w / 2, py, CAN_HEX[c.color]);
            cans.splice(i, 1);
            score++;
            scoreEl.textContent = score;
            if (score > bestScore) { bestScore = score; bestEl.textContent = bestScore; }
            // Flash accent
            root.style.setProperty('--accent', CAN_HEX[c.color]);
            continue;
        }

        // Missed
        if (c.y > H + 10) {
            cans.splice(i, 1);
            lives--;
            updateLives();
            if (lives <= 0) { endGame(); return; }
        }
    }

    // Particles
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        p.alpha -= 0.035;
        p.r *= 0.97;
        if (p.alpha <= 0) particles.splice(i, 1);
    }
}

function updateLives() {
    lifeDots.forEach((dot, i) => {
        dot.classList.toggle('active', i < lives);
    });
}

// ── Draw ──────────────────────────────────────────────
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Subtle grid
    ctx.strokeStyle = 'rgba(255,255,255,0.02)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    drawDrops();
    drawParticles();
    drawPaddle();

    // Score flash ring when catching
    if (frameCount % 2 === 0 && particles.length > 6) {
        ctx.save();
        ctx.globalAlpha = 0.1;
        ctx.strokeStyle = root.style.getPropertyValue('--accent') || '#7fc12b';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 16;
        ctx.shadowColor = ctx.strokeStyle;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
    }
}

// ── Game Loop ─────────────────────────────────────────
function loop() {
    if (!gameRunning) return;
    update();
    draw();
    frameId = requestAnimationFrame(loop);
}

function startGame() {
    score = 0; lives = 3; cans = []; particles = [];
    spawnTimer = 0; frameCount = 0; speed = 2.5; spawnInterval = 90;
    scoreEl.textContent = '0';
    updateLives();
    paddleX = canvas.width / 2;  // start centred so paddle is visible immediately

    // Lock touch-action so scrolling can't steal touch events during play
    canvas.style.touchAction = 'none';

    // Hide overlay with GSAP
    gsap.to(overlay, { opacity: 0, duration: 0.4, ease: 'expo.out', onComplete: () => { overlay.style.display = 'none'; } });

    gameRunning = true;
    cancelAnimationFrame(frameId);
    loop();
}

function endGame() {
    gameRunning = false;
    cancelAnimationFrame(frameId);

    // Restore scroll-friendly touch-action
    canvas.style.touchAction = 'pan-y';

    // Show game-over overlay
    overlay.style.display = 'flex';
    overlay.style.opacity = '0';
    overlayTitle.textContent = 'GAME OVER';
    overlaySub.innerHTML = `You caught <strong style="color:var(--accent)">${score}</strong> logos.<br>Best: ${bestScore}`;
    overlayBtn.textContent = 'PLAY AGAIN';

    gsap.to(overlay, { opacity: 1, duration: 0.5, ease: 'expo.out' });

    // Shake the container
    gsap.fromTo('#game-container', { x: -10 }, { x: 10, duration: 0.05, repeat: 8, yoyo: true, ease: 'none', onComplete: () => gsap.set('#game-container', { x: 0 }) });
}

overlayBtn.addEventListener('click', startGame);
