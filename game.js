function loadimage()
{
    virus_image = new Image;
    virus_image.src="pics/virus.png";
    playerimg=new Image;
    playerimg.src="pics/robot.png";
    // gem=new Image;
    // gem.src="pics/gemm.png";
    gem_image = new Image;
	gem_image.src = "pics/gem.png";
}





// movement to the bird

function init()
{
    canvas=document.getElementById('mycanvas');
// change height and width
    W=750
    H=450

    canvas.width=W;
    canvas.height=H;

// canvas work
    pen = canvas.getContext('2d');
    console.log(pen);
    score=0;
    game_over=false;
    // we want to create a box
    e1={
        x:150,
        y:60,
        h:60,
        w:60,
        speed : 10,
    
    };
    e2={
        x:300,
        y:60,
        h:60,
        w:60,
        speed : 20,
    
    };
    e3={
        x:450,
        y:60,
        h:80,
        w:80,
        speed : 30,
    
    };
    enemies=[e1,e2,e3];
    player={
        x:20,
        y:H/2,
        w:60,
        h:60,
        speed : 20,
        moving : false,

    }
    gem={
        x:W-100,
        y:H/2,
        w:60,
        h:60,
    }
    canvas.addEventListener("mousedown",function(){
        console.log("you pressed the mouse");
        player.moving=true;
    });
    canvas.addEventListener("mouseup",function(){
        console.log("you release the mouse");
        player.moving=false;
    });
//     canvas.addEventListener("mousedown",function()
//                         {
//     console.log("clicked");
// });


}
// Game loop
function draw(){
    pen.clearRect(0,0,W,H);
    
    pen.drawImage(playerimg,player.x,player.y,player.w,player.h);
    pen.drawImage(gem_image,gem.x,gem.y,gem.w,gem.h);
    // pen.fillStyle="white";
    pen.fillText("Score "+score,10,20);
    for(let i=0;i<enemies.length;i++)
    {
    

    // pen.fillStyle="blue";
    // pen.fillRect(bird.x,bird.y,bird.w,bird.h);
    pen.drawImage(virus_image,enemies[i].x,enemies[i].y,enemies[i].w,enemies[i].h);
    }

}
function iscolliding(b1,b2)
{
    if(Math.abs(b1.x-b2.x)<=30 && Math.abs(b1.y-b2.y)<=30)
    {
        return true;
    }
    return false;

}

function update(){
    if(player.moving)
    {
        player.x+=10;
        score+=10;
    }
    // check for collision between corona and ts player
    for(let i=0;i<enemies.length;i++)
    {
        if(iscolliding(enemies[i],player))
        {
            score-=(i+1)*50;
            if(score<0)
            {
                game_over=true;
                alert("Game over");
            }
        }
    }
    if(iscolliding(gem,player))
    {
        game_over=true;
        // draw();
        alert("Game over and the score is"+score);
    }

    for(let i=0;i<enemies.length;i++)
    {

    enemies[i].y+=enemies[i].speed;
    if(enemies[i].y+enemies[i].h>H || enemies[i].y<0)
    {
        enemies[i].speed*=-1;

    }
}


}

loadimage();
init();
function gameloop()
{ 
    //it will break the set interval
    if(game_over)
    clearInterval(f);

    if(!game_over)
    {
      draw();
    update()
    }
    // console.log("in game loop");
    ;
}

// repeatedly call game loop
var f=setInterval(gameloop,100);



