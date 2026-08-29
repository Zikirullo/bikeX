// clock
function tick() {
  document.getElementById("clock").textContent = new Date()
    .toTimeString()
    .slice(0, 8);
}
tick();
setInterval(tick, 1000);

// ticker
var TICKER =
  "BIKE STORE ADMIN · LIVE DASHBOARD · BIKE MANAGEMENT · USER CONTROL · REAL TIME DATA · ";
document.getElementById("ticker").textContent = TICKER.repeat(6);

// bike canvas
var canvas = document.getElementById("bikeCanvas");
var ctx = canvas.getContext("2d");
var W = canvas.width;
var H = canvas.height;
var wA = 0;
var pA = 0;

function drawWheel(x, y, r, a) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.strokeStyle = "#f5f5f5";
  ctx.lineWidth = 9;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x, y, r - 6, 0, Math.PI * 2);
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 3;
  ctx.stroke();

  for (var i = 0; i < 8; i++) {
    var sa = a + (i * Math.PI) / 4;
    ctx.beginPath();
    ctx.moveTo(x + 6 * Math.cos(sa), y + 6 * Math.sin(sa));
    ctx.lineTo(x + (r - 7) * Math.cos(sa), y + (r - 7) * Math.sin(sa));
    ctx.strokeStyle = i === 0 ? "#f97316" : "#444";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.arc(x, y, 5, 0, Math.PI * 2);
  ctx.fillStyle = "#f97316";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x, y, 2.5, 0, Math.PI * 2);
  ctx.fillStyle = "#0c0c0c";
  ctx.fill();
}

function draw() {
  ctx.clearRect(0, 0, W, H);

  var rW = 52;
  var rX = W / 2 - 80;
  var fX = W / 2 + 78;
  var gY = H - 40;
  var wheelY = gY - rW;

  var bbX = W / 2 - 8;
  var bbY = wheelY - 4;
  var sTX = W / 2 - 40;
  var sTY = wheelY - 88;
  var hTX = W / 2 + 48;
  var hTY = wheelY - 80;
  var hBX = W / 2 + 56;
  var hBY = wheelY - 18;

  // chain stays
  ctx.beginPath();
  ctx.moveTo(rX, wheelY);
  ctx.lineTo(bbX, bbY);
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(rX, wheelY);
  ctx.lineTo(sTX, sTY + 8);
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 4;
  ctx.stroke();

  // main tubes
  ctx.beginPath();
  ctx.moveTo(hBX, hBY);
  ctx.lineTo(bbX, bbY);
  ctx.strokeStyle = "#f5f5f5";
  ctx.lineWidth = 7;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(bbX, bbY);
  ctx.lineTo(sTX, sTY);
  ctx.strokeStyle = "#f5f5f5";
  ctx.lineWidth = 6;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(sTX, sTY);
  ctx.lineTo(hTX, hTY);
  ctx.strokeStyle = "#f5f5f5";
  ctx.lineWidth = 5;
  ctx.stroke();

  // orange accent
  ctx.beginPath();
  ctx.moveTo(bbX, bbY);
  ctx.lineTo(hBX - 8, hBY + 10);
  ctx.strokeStyle = "#f97316";
  ctx.lineWidth = 2;
  ctx.stroke();

  // head tube
  ctx.beginPath();
  ctx.moveTo(hTX, hTY);
  ctx.lineTo(hBX, hBY);
  ctx.strokeStyle = "#f97316";
  ctx.lineWidth = 7;
  ctx.stroke();

  // fork
  ctx.beginPath();
  ctx.moveTo(hBX, hBY);
  ctx.lineTo(fX, wheelY);
  ctx.strokeStyle = "#555";
  ctx.lineWidth = 5;
  ctx.stroke();

  // handlebar
  ctx.beginPath();
  ctx.moveTo(hTX - 16, hTY - 20);
  ctx.lineTo(hTX + 10, hTY - 2);
  ctx.strokeStyle = "#555";
  ctx.lineWidth = 5;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(hTX - 16, hTY - 20, 4, 0, Math.PI * 2);
  ctx.fillStyle = "#f97316";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(hTX + 10, hTY - 2, 4, 0, Math.PI * 2);
  ctx.fillStyle = "#f97316";
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(hTX, hTY);
  ctx.lineTo(hTX, hTY - 16);
  ctx.strokeStyle = "#f5f5f5";
  ctx.lineWidth = 5;
  ctx.stroke();

  // seat post
  var spY = sTY - 24;
  ctx.beginPath();
  ctx.moveTo(sTX, sTY);
  ctx.lineTo(sTX - 3, spY);
  ctx.strokeStyle = "#555";
  ctx.lineWidth = 5;
  ctx.stroke();

  // saddle
  ctx.beginPath();
  ctx.moveTo(sTX - 22, spY);
  ctx.bezierCurveTo(sTX - 10, spY - 8, sTX + 10, spY - 8, sTX + 20, spY);
  ctx.strokeStyle = "#f97316";
  ctx.lineWidth = 3;
  ctx.stroke();

  // chainring
  ctx.beginPath();
  ctx.arc(bbX, bbY, 13, 0, Math.PI * 2);
  ctx.strokeStyle = "#f97316";
  ctx.lineWidth = 3;
  ctx.stroke();

  // cranks and pedals
  var sides = [0, Math.PI];
  for (var s = 0; s < sides.length; s++) {
    var ang = pA + sides[s];
    var cx2 = bbX + 17 * Math.cos(ang);
    var cy2 = bbY + 17 * Math.sin(ang);

    ctx.beginPath();
    ctx.moveTo(bbX, bbY);
    ctx.lineTo(cx2, cy2);
    ctx.strokeStyle = "#f5f5f5";
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(
      cx2 - 7 * Math.cos(ang + Math.PI / 2),
      cy2 - 7 * Math.sin(ang + Math.PI / 2),
    );
    ctx.lineTo(
      cx2 + 7 * Math.cos(ang + Math.PI / 2),
      cy2 + 7 * Math.sin(ang + Math.PI / 2),
    );
    ctx.strokeStyle = "#f97316";
    ctx.lineWidth = 3.5;
    ctx.stroke();
  }

  // rear sprocket
  ctx.beginPath();
  ctx.arc(rX, wheelY, 8, 0, Math.PI * 2);
  ctx.strokeStyle = "#f97316";
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // chain
  ctx.beginPath();
  ctx.moveTo(bbX + 13, bbY);
  ctx.lineTo(rX + 8, wheelY);
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(bbX - 13, bbY + 2);
  ctx.lineTo(rX - 8, wheelY + 2);
  ctx.strokeStyle = "#2a2a2a";
  ctx.lineWidth = 2;
  ctx.stroke();

  drawWheel(rX, wheelY, rW, wA);
  drawWheel(fX, wheelY, rW, wA);
}

function loop() {
  wA += 0.04;
  pA += 0.034;
  draw();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
