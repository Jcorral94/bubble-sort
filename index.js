const rects = [];
const rectWidth = 18;
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let globalX = 0;
let globalY = 0;

init();

function init() {
  //set dims
  canvas.width = 1000;
  canvas.height = 600;

  let initX = 2;

  for (let i = 0; i < canvas.width / (rectWidth + 2); i++) {
    let y = 10 + Math.floor(10 + Math.random() * ((canvas.height - 10) + 1 - 10));
    rects.push(new Line(initX, y, ctx, canvas));
    initX += rectWidth + 2;
  }
  requestAnimationFrame(draw);
}

function draw(time) {
  requestAnimationFrame(draw);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!ran) {
    ran = time;
  }

  if (time - ran > 10) {
    if (globalX < rects.length) {
      swap(rects, globalY, globalY + 1);
      globalY++;


      if (globalY >= rects.length - globalX) {
        globalY = 0;
        globalX++;
      }
    }
    ran = time;
  }

  for (let i = 0; i < rects.length; i++) {
    rects[i].drawLine();
  }
}

function swap(rects, a, b) {
  if (rects[b]) {
    if (rects[a].y > rects[b].y) {
      let tmp = rects[a];
      rects[a] = rects[b];
      rects[b] = tmp;

      tmp_x = rects[a].x;
      rects[a].x = rects[b].x;
      rects[b].x = tmp_x;
    }
  }
}

function Line(x, y, ctx, canvas) {
  this.x = x;
  this.y = y;
  this.ctx = ctx;
  this.drawLine = function () {
    this.ctx.beginPath();
    this.ctx.stroke();
    this.ctx.fillStyle = "#FF0000AA";
    this.ctx.fillRect(this.x, this.y, rectWidth, canvas.height - this.y);
    this.ctx.closePath();
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate((Math.PI * 1.5));
    this.ctx.fillStyle = "black";
    this.ctx.fillText(canvas.height - this.y, 0, 10);
    this.ctx.restore();
  };
}
