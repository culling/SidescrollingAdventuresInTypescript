class Actor{
    title:string    = "actor";
    //name:String     = new String();
    color:string    = 'blue';
    controller= {
        left:   false,
        right:  false,
        up:     false
    };
    x:number            = 100;
    y:number            = 10;
    xVelocity:number    = 0;
    yVelocity:number    = 0;
    defaultMoveX:number = 0.8;
    defaultMoveY:number = 20;
    jumpHeight:number   = 20;
    height:number       = 20;
    width:number        = 20;    
    //left:number    =   this.x;
    //right:number   =   this.x+ this.width;
    jumping:boolean     = false;
    gravity:number      = 1;
    friction:number     = 0.9;

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
    }

    getKillZone(){
        var killZone={
            top:    this.getTop(),
            bottom: this.getBottom() + 5,
            left:   this.getLeft(),
            right:  this.getRight()
        }
        return killZone;
    }

    enemyInKillZone(enemy:Actor){
        
        var killZone = this.getKillZone();
        let yKill:boolean       = (enemy.getTop() < killZone.bottom) && (enemy.getTop() > killZone.top);
        let xKill:boolean       = (enemy.getLeft() < killZone.right) && (enemy.getRight() > killZone.left );
        if(xKill && yKill){
            console.log("Enemy: " + enemy.toString() );
        }
        return (xKill && yKill);
    }

    getBottom(){
        return this.y + this.height;
    }

    setBottom( newBottom ){
        this.y = newBottom - this.height;
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
    }

    draw() {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.height, this.width);
    }

    public constructor(color: string, x: number, y: number){
        this.color = color;
        this.x =        x;
        this.y =        y;
    };

}

class Enemy extends Actor{
    title= "Enemy";

    draw(){
        //console.log("Ball Draw function hit!");
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x + this.width/2, this.y + this.width/2, this.width/2, 0, 360, false);        
        context.stroke();
        context.fill();
    }
}