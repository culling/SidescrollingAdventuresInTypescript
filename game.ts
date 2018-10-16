
let canvas      =  <HTMLCanvasElement>document.getElementById('canvas') ;
let context     = canvas.getContext("2d");
//let gravity     = 1;
//let friction    = 0.9;
/*
let controller = {
    left: false,
    right: false,
    up: false
}
*/

var map = {
    enemies: [
        {
            title:  "slime1",
            controller:{
                left:   false,
                right:  false,
                up:     false
            },
            x:          200,
            y:          canvas.height - 200,
            jumping:    false,
            color:      "red",
            height:     20,
            width:      20,
            right:      this.x + this.width,
            left:       this.x,
            gravity:    1,
            friction:   0.9,
            xVelocity:  0,
            yVelocity:  0,
            defaultMoveX: 0.2,
            defaultMoveY: 20,
            jumpHeight: 20,        
            getBottom: function(){
                return this.y + this.height;
            },
            setBottom: function( newBottom ){
                this.y = newBottom - this.height;
            },
            getTop: function(){
                return this.y;
            },
            move: function(){
                let controller = this.controller;
                if(controller.up && !this.jumping){
                    this.yVelocity -= this.defaultMoveY;
                    this.jumping = true;
                }
            
                if(controller.left){
                    this.xVelocity -= this.defaultMoveX;
                }
                if(controller.right){
                    this.xVelocity += this.defaultMoveX;
                }
            
                this.yVelocity += this.gravity;
            
                this.x += this.xVelocity;
                this.y += this.yVelocity;
            
                this.xVelocity *= this.friction;
                this.yVelocity *= this.friction;
            
            },
            draw: function(){
                context.fillStyle = this.color;
                //context.arc(this.x, this.y, this.width/2, 0, 360);
                context.fillRect(this.x, this.y, this.width, this.height);
            }
        }
    ],
    obstacles: [
    {
        title:  "ground",
        x:      0,
        y:      canvas.height - 20,
        color:  "black",
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
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    },{
        title:  "ledge1",
        x:      80,
        y:      canvas.height - 80,
        color:  "black",
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
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    ],
    draw: function(){
        for(var obstacle of this.obstacles){
            obstacle.draw();
        }
        for(var enemy of this.enemies){
            enemy.draw();
        }
    },
    moveEnemies: function(){
        for(var enemy of this.enemies){
            console.log(enemy);
            enemy.move();

            
            var currentObstacle = map.getOntop(enemy);

            if(currentObstacle != null){
                enemy.jumping = false;
                enemy.setBottom( currentObstacle.getTop() );
                enemy.yVelocity = 0;
            }
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
    //console.log("Actor Bottom: " + actor.getBottom()    );
    //console.log("Obstacle Top: " + obstacle.y);

    return (inX && inY);
}


var box = {
    controller: {
        left: false,
        right: false,
        up: false
    },
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
    gravity:    1,
    friction:   0.9,
    getBottom: function(){
        return this.y + this.height;
    },
    setBottom: function( newBottom ){
        this.y = newBottom - this.height;
    },
    getTop: function(){
        return this.y;
    },
    move: function(){
        let controller = this.controller;

        if(controller.up && !this.jumping){
            this.yVelocity -= this.defaultMoveY;
            this.jumping = true;
        }
    
        if(controller.left){
            this.xVelocity -= this.defaultMoveX;
        }
        if(controller.right){
            this.xVelocity += this.defaultMoveX;
        }
    
        this.yVelocity += this.gravity;
    
        this.x += this.xVelocity;
        this.y += this.yVelocity;
    
        this.xVelocity *= this.friction;
        this.yVelocity *= this.friction;    
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
            box.controller.right = true;
            break;
        }
        case"ArrowLeft":{
            box.controller.left = true;
            break;
        }
        case"ArrowUp":{
            box.controller.up = true;
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
            box.controller.right = false;
            break;
        }
        case"ArrowLeft":{
            box.controller.left = false;
            break;
        }
        case"ArrowUp":{
            box.controller.up = false;
            break;
        }

        default:{
            break;
        }
    }
});

function gameLoop(){


    box.move();
    map.moveEnemies();
    

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