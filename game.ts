
let canvas      =  <HTMLCanvasElement>document.getElementById('canvas') ;
let context     = canvas.getContext("2d");
let gravity     = 1;
let friction    = 0.9;

let controller = {
    left: false,
    right: false,
    up: false
}


var map = {
    obstacles: [
    {
        x:      0,
        y:      canvas.height - 100,
        height: canvas.height,
        width:  canvas.width,
        right:  this.x + this.width,
        left:   this.x,
        getBottom: function(){
            return this.y + this.height;
        },
        getTop: function(){
            return this.y;
        },
        draw: function(){
            context.fillStyle = 'black';
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    ],
    draw: function(){
        for(var obstacle of this.obstacles){
            obstacle.draw();
        }
    },
    getOntop: function(actor){
        for(var obstacle of this.obstacles){
            if(isInside(actor, obstacle) ){
                return obstacle;
            }
        }
    }
}

function isInside(actor, obstacle){
    var inX = (actor.x > obstacle.x )&& (actor.x < obstacle.x + obstacle.width );
    var inY = ( actor.getBottom() > obstacle.getTop() )&& (actor.getBottom() > obstacle.getTop() );
    console.log("Actor Bottom: " + actor.getBottom()    );
    console.log("Obstacle Top: " + obstacle.y);

    return (inX && inY);
}


var box = {
    x:          100,
    y:          10,
    xVelocity:  0,
    yVelocity:  0,
    defaultMoveX: 0.8,
    defaultMoveY: 20,
    jumpHeight: 20,
    height:     20,
    width:      20,    
    left:       this.x,
    right:      this.x+ this.width,
    color:      'blue',
    jumping:    false,
    getBottom: function(){
        return this.y + this.height;
    },
    setBottom: function( newBottom ){
        this.y = newBottom - this.height;
    },
    getTop: function(){
        return this.y;
    },
    draw: function() {
        //console.log("Ball Draw function hit!");
        context.fillStyle = 'blue';
        context.fillRect(this.x, this.y, this.height , this.width);
    }
}


window.addEventListener("keydown", function(e){
    console.log(e);
    switch(e.key){
        case"ArrowRight":{
            controller.right = true;
            break;
        }
        case"ArrowLeft":{
            controller.left = true;
            break;
        }
        case"ArrowUp":{
            controller.up = true;
            break;
        }

        default:{
            break;
        }
    }
});

window.addEventListener("keyup", function(e){
    console.log(e);
    switch(e.key){
        case"ArrowRight":{
            controller.right = false;
            break;
        }
        case"ArrowLeft":{
            controller.left = false;
            break;
        }
        case"ArrowUp":{
            controller.up = false;
            break;
        }

        default:{
            break;
        }
    }
});

function gameLoop(){
    if(controller.up && !box.jumping){
        box.yVelocity -= box.defaultMoveY;
        box.jumping = true;
    }

    if(controller.left){
        box.xVelocity -= box.defaultMoveX;
    }
    if(controller.right){
        box.xVelocity += box.defaultMoveX;
    }

    box.yVelocity += gravity;

    box.x += box.xVelocity;
    box.y += box.yVelocity;

    box.xVelocity *= friction;
    box.yVelocity *= friction;


    var currentObstacle = map.getOntop(box);

    if(currentObstacle != null){
        //if(box.y > 100){
        box.jumping = false;
        box.setBottom( currentObstacle.getTop() );
        box.yVelocity = 0;
        //}
    }

    context.clearRect(0, 0, canvas.width, canvas.height);

    map.draw();
    box.draw();

    window.requestAnimationFrame(gameLoop);
}

gameLoop();