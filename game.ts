
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
        new Enemy('red', 200, 140),
        //new Enemy('purple', 400, 20)
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
            //console.log(enemy);
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
    },

    killEnemies: function(actor){
        for(var enemy of this.enemies){
            if(actor.enemyInKillZone(enemy) ){
                return enemy;
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




let box = new Actor('blue', 100, 100);

window.addEventListener("keydown", function(e){
    //console.log(e);
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
    //console.log(e);
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
        box.jumping = false;
        box.setBottom( currentObstacle.getTop() );
        box.yVelocity = 0;
    }

    var attackedEnemy = map.killEnemies(box);
    if(attackedEnemy != null){
        console.log("Attacked Enemy: " + attackedEnemy);
        //box.jumping = false;
        box.setBottom( attackedEnemy.getTop() );
        box.yVelocity = 0;
        attackedEnemy.color = "black";
    }


    context.clearRect(0, 0, canvas.width, canvas.height);

    map.draw();
    box.draw();

    window.requestAnimationFrame(gameLoop);
}

gameLoop();