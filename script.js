var player = new Image;
player.src = "sprite.png"

function startGame(){
  myGamePiece = new component(player, 300, 200);
  myGameArea.start();
  var interval = setInterval(updateGameArea, 20);
}

var myGameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext("2d");
    this.frameNo = 0;
    document.getElementById('div').insertBefore(this.canvas, document.getElementById('div').childNodes[0]);
  },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

function component(img, x, y) {
  this.img = img;
  this.x = x;
  this.y = y;
  this.update = function() {
    myGameArea.context.drawImage(this.img, this.x, this.y);
  }
}

function updateGameArea() {
  myGameArea.clear();
  myGamePiece.update();
}

document.addEventListener("keydown", function(e) {
  var key = e.keyCode;
  if(key == 65) {
    console.log("a");
    if (myGamePiece.x > 0) {
      myGamePiece.x -= 5
    }
  } // keyCode for a
  if (key == 87) {
    console.log("w");
    if (myGamePiece.y > 0) {
      myGamePiece.y -= 5
    }
  } // keyCode for w
  if (key == 68) {
    console.log("d");
    if (myGamePiece.x < 448) {
      myGamePiece.x += 5
    }
  } // keyCode for d
  if (key == 83) {
    console.log("s");
    if (myGamePiece.y < 238) {
      myGamePiece.y += 5
    }
  } // keyCode for s
});
