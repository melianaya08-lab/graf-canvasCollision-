const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const window_height = window.innerHeight;
const window_width = window.innerWidth;

canvas.height = window_height;
canvas.width = window_width;
canvas.style.background = "rgb(250, 205, 235)";

let score = 0;

// Imagen
let img = new Image();
img.src = "assets/img/gatito.png";

class Object {

constructor(x,y,size,speed){

    this.posX = x;
    this.posY = y;
    this.size = size;

    this.speed = speed;

    // REGLAS DE VELOCIDAD
    if(score > 15){
        this.dy = this.speed + 4;   // velocidad alta
    }
    else if(score > 10){
        this.dy = this.speed + 2;   // velocidad media
    }
    else{
    this.dy = this.speed;       // velocidad inicial
    }
}

draw(context){

    context.drawImage(
        img,
        this.posX - this.size/2,
        this.posY - this.size/2,
        this.size,
        this.size
    );
}

update(context){

    this.draw(context);

    this.posY += this.dy;

    // reaparece arriba
    if(this.posY > window_height + this.size){

        this.posY = -this.size;
        this.posX = Math.random() * window_width;

    }
}

}

let objects = [];

function generateObjects(n){

    for(let i=0;i<n;i++){

        let size = 60;

        let x = Math.random() * window_width;

        let y = -size;

        let speed = Math.random()*3 + 2;

        objects.push(new Object(x,y,size,speed));
    }

}

function drawScore(){

    ctx.font = "25px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "right";

    ctx.fillText("Eliminados: " + score, window_width - 20, 40);

}

// click para eliminar
canvas.addEventListener("click", function(event){

    const rect = canvas.getBoundingClientRect();

    let mouseX = event.clientX - rect.left;
    let mouseY = event.clientY - rect.top;

    objects.forEach((obj,index)=>{

        let dx = mouseX - obj.posX;
        let dy = mouseY - obj.posY;

        let distance = Math.sqrt(dx*dx + dy*dy);

        if(distance < obj.size/2){

            objects.splice(index,1);

            score++;

            generateObjects(1);

        }

    });

});

function animate(){

    ctx.clearRect(0,0,window_width,window_height);

    objects.forEach(obj=>{
        obj.update(ctx);
    });

    drawScore();

    requestAnimationFrame(animate);
}

generateObjects(20);

animate();