
let canvas      =  <HTMLCanvasElement>document.getElementById('canvas') ;
let context     = canvas.getContext("2d");


var map = {
    currentScreenMapX: 0,
    enemies: [
        new Enemy('red', 200, 140),
        new Enemy('purple', 400, 20)
    ],
    obstacles: [
        new Platform(
            "ground",
            "black",
            0,
            canvas.height - 20,
            canvas.width * 30,
            20
        ),
        new Platform(
            "platform1",
            "black",
            80,
            canvas.height - 80,
            canvas.width,
            80
        ),
        new Platform(
            "platform2",
            "black",
            canvas.width + 180,
            canvas.height - 80,
            160,
            80
        ),
        new Platform(
            "platform3",
            "black",
            canvas.width + 280,
            canvas.height - 100,
            260,
            180
        )
    ],
    getGroundWidth(){
        for(var obstacle of this.obstacles){
            if(obstacle.title == "ground"){
                return obstacle.getWidth()
            }
        }
    },
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
            if(actor.enemyInKillZone(enemy) && (! enemy.isDead() ) ){
                return enemy;
            }
        }
    },
    attackActor: function(actor){
        for(var enemy of this.enemies){
            if(enemy.enemyInKillZone(actor) && (! enemy.isDead()) ){
                console.log("Actor attacked: " + actor );
                return actor;
            }
        }
    },
    clear: function(){
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
}


function isInside(actor, obstacle){
    //console.log("Obstacle:" + obstacle);
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
        box.setBottom( attackedEnemy.getTop() );
        box.yVelocity = 0;
        attackedEnemy.takesDamage(box.damage);
    }
    

    let attackingEnemy:Enemy = map.attackActor(box);
    if((attackingEnemy != null ) && (! attackingEnemy.isDead())){
        box.takesDamage(attackingEnemy.damage);
    }


    map.clear();

    let scrollBorder ={
        forward:(canvas.width/2),
        backward:(canvas.width/10)
    }

    if(box.x > (map.currentScreenMapX + scrollBorder.forward ) ){

        map.currentScreenMapX += (box.x - (map.currentScreenMapX + scrollBorder.forward));
    }
    if(box.x < (map.currentScreenMapX +  scrollBorder.backward ) ){
        map.currentScreenMapX += (box.x - (map.currentScreenMapX + scrollBorder.backward));
    }

    map.draw();
    box.draw();
    map.currentScreenMapX = 0;

    window.requestAnimationFrame(gameLoop);
}

gameLoop();