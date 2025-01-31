class Platform{
    title:string        = "platform";
    color:string        = 'blue';
    controller          = new Controller(false, false, false, false);
    x:number            = 100;
    y:number            = 10;
    xVelocity:number    = 0;
    yVelocity:number    = 0;
    defaultMoveX:number = 0.8;
    defaultMoveY:number = 0.8;
    jumpHeight:number   = 15;
    height:number       = 20;
    width:number        = 20;    
    jumping:boolean     = false;
    gravity:number      = 1;
    friction:number     = 0.9;
    health:number       = 1;
    damage:number       = 1;


    toString(){
        let myDescription:String = new String();
        myDescription += "{";
        myDescription += "title: "  + this.title + "; ";
        myDescription += "top: "    + this.getTop() + "; ";
        myDescription += "bottom: " + this.getBottom()+ "; ";
        myDescription += "left: "   + this.getLeft()+ "; ";
        myDescription += "right: "  + this.getRight()+ "; ";

        myDescription += "}";
        return myDescription;
    };

    getKillZone(){
       let killZone:KillZone = new KillZone(
            this.getTop(),
            this.getBottom() + 5,
            this.getLeft(),
            this.getRight()
        );
       return killZone;
    }

    enemyInKillZone(enemy:Actor){
        var killZone = this.getKillZone();
        let xKill:boolean       = (enemy.getLeft() < killZone.right) && (enemy.getRight() > killZone.left);
        let yKill:boolean       = (enemy.getTop() < killZone.bottom) && (enemy.getBottom() > killZone.top);
        let topKill:boolean     = (enemy.getTop() < killZone.bottom) && (enemy.getTop() > killZone.top);
        let bottomKill:boolean  = (enemy.getBottom() < killZone.bottom) && (enemy.getBottom() > killZone.top);
        let leftKill:boolean    = (enemy.getLeft() < killZone.right) && (enemy.getLeft() > killZone.left);
        let rightKill:boolean    = (enemy.getRight() < killZone.right) && (enemy.getRight() > killZone.left);

        if (topKill && xKill){
            return true;
        }
        if (bottomKill && xKill){
            return true;
        }
        if (leftKill && yKill){
            return true;
        }
        if (rightKill && yKill){
            return true;
        }        
        return false
    }

    getBottom(){
        return this.y + this.height;
    }

    setBottom( newBottom ){
        this.y = newBottom - this.height;
    }

    setHeight(height:number){
        this.height = height;
    }

    setWidth(width:number){
        this.width = width;
    }

    getWidth(){
        return this.width;
    }

    getTop(){
        return this.y;
    }

    getLeft(){
        return this.x;
    }

    getRight(){
        return this.x + this.width;
    }

    move(){
        let controller = this.controller;

        if(controller.up && !this.jumping){
            //this.yVelocity -= this.defaultMoveY;
            this.yVelocity -= this.jumpHeight;
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
    }

    draw() {
        this.x -= map.currentScreenMapX;
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    setPosition(x:number, y:number){
        this.x = x;
        this.y = y;
    }

    takesDamage(damage:number){
        console.log(this.title + " takes " + damage + " damage");
        this.xVelocity *= -1;
        
        this.health -= damage;
        if(this.health < 1){
            this.dies();
        }
    }

    isDead(){
        return (this.health < 1);
    }

    dies(){
        this.deathAnimation();
        console.log(this.title  + " has Died");
    }
    
    deathAnimation(){
        this.gravity    = -0.1;
        this.color      = "grey";
        this.height     = this.width *=  0.8;
    };

    public constructor(name:string, color: string, x: number, y: number, width: number, height: number){
        this.title  = name;
        this.color  = color;
        this.x      = x;
        this.y      = y;
        this.setWidth(width);
        this.setHeight(height);
    };

}
