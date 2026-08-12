/* ─── Ticker ─── */
const TICKER_TEXT =
  "ADMIN PANEL · SYSTEM ACTIVE · ALL SYSTEMS NOMINAL · BIKE MANAGEMENT · USER CONTROL · REAL TIME DATA · ";
const track = document.getElementById("ticker");
track.textContent = TICKER_TEXT.repeat(6);

/* ─── Chain links ─── */
function buildChain(id, count) {
  const el = document.getElementById(id);
  for (let i = 0; i < count; i++) {
    const d = document.createElement("div");
    d.className = "link" + (i % 2 === 0 ? " filled" : "");
    el.appendChild(d);
  }
}
buildChain("chainL", 8);
buildChain("chainR", 8);

/* ─── Gear drawing ─── */
function drawGear(canvas, teeth, color = "#f97316") {
  const ctx = canvas.getContext("2d");
  const W = canvas.width,
    H = canvas.height;
  const cx = W / 2,
    cy = H / 2;
  const R = W / 2 - 2;
  const innerR = R * 0.6;
  const toothH = R * 0.22;
  const holeR = R * 0.22;

  ctx.clearRect(0, 0, W, H);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.lineJoin = "round";

  ctx.beginPath();
  for (let i = 0; i < teeth; i++) {
    const a = (i / teeth) * Math.PI * 2 - Math.PI / 2;
    const na = ((i + 1) / teeth) * Math.PI * 2 - Math.PI / 2;
    const ma = a + (na - a) * 0.5;
    const gs = a + (na - a) * 0.15;
    const ge = na - (na - a) * 0.15;
    const tw = (na - a) * 0.4;
    const ts = ma - tw,
      te = ma + tw;

    if (i === 0)
      ctx.moveTo(cx + innerR * Math.cos(gs), cy + innerR * Math.sin(gs));
    else ctx.lineTo(cx + innerR * Math.cos(gs), cy + innerR * Math.sin(gs));

    ctx.lineTo(
      cx + (R + toothH) * Math.cos(ts),
      cy + (R + toothH) * Math.sin(ts),
    );
    ctx.lineTo(
      cx + (R + toothH) * Math.cos(te),
      cy + (R + toothH) * Math.sin(te),
    );
    ctx.lineTo(cx + innerR * Math.cos(ge), cy + innerR * Math.sin(ge));
  }
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, holeR, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, holeR * 0.4, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.6;
  ctx.fill();
  ctx.globalAlpha = 1;
}

const gears = [
  { id: "gearA", teeth: 14, dir: 1, speed: 0.008 },
  { id: "gearB", teeth: 14, dir: -1, speed: 0.008 },
  { id: "gearC", teeth: 10, dir: 1, speed: 0.005 },
  { id: "gearD", teeth: 11, dir: -1, speed: 0.006 },
  { id: "gearE", teeth: 10, dir: 1, speed: 0.005 },
];

const gearAngles = gears.map(() => 0);

gears.forEach(({ id, teeth }) => {
  drawGear(document.getElementById(id), teeth);
});

/* ─── Piston state ─── */
const pistonT = { t: 0 };

/* ─── Animation loop ─── */
function animate(ts) {
  /* gears */
  gears.forEach(({ id, teeth, dir, speed }, i) => {
    gearAngles[i] += dir * speed;
    const canvas = document.getElementById(id);
    const ctx = canvas.getContext("2d");
    const W = canvas.width,
      H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.save();
    ctx.translate(W / 2, H / 2);
    ctx.rotate(gearAngles[i]);
    ctx.translate(-W / 2, -H / 2);
    drawGear(canvas, teeth);
    ctx.restore();
  });

  /* pistons */
  pistonT.t += 0.04;
  const yA = Math.sin(pistonT.t) * 14; // 0..+14 up-down
  const yB = Math.sin(pistonT.t + Math.PI) * 14; // opposite phase

  setTranslateY("rodA1", yA);
  setTranslateY("rodA2", yA);
  setTranslateY("rodB1", yB);
  setTranslateY("rodB2", yB);

  requestAnimationFrame(animate);
}

function setTranslateY(id, y) {
  document.getElementById(id).style.transform = `translateY(${y}px)`;
}

requestAnimationFrame(animate);
