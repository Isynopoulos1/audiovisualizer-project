const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const microphone = new Microphone();

class Figure {
    constructor(x, y){
        this.x = x; 
        this.y = y;
        this.size = 8;
        this.color = 'white';
        this.counter = 0;
    }

    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fill();
    }

    circularMovement(){
        if(this.counter >= 360){
            this.counter = 0;
        }
        this.x += Math.cos(this.counter/180 * Math.PI);
        this.y += Math.cos(this.counter/180 * Math.PI);
        //radians to degrees formula = x / 180 * Math Pi
        this.counter++;
    }

    changeSize(value){
        const sound = value*200;
        if(sound > this.size){
            this.size = sound;
        } else {
            this.size -= this.size * 0.01;
        }
    }
    
    teleport(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
    }
}



let figures= [];
for (let i = 0; i < 10; i++) {
    figures.push(new Figure(Math.random()* canvas.width,Math.random()* canvas.height));
}

function animate(){
    if(microphone.initialized){
        const samples = microphone.getSamples();

        ctx.clearRect(0,0,canvas.width, canvas.height);

        figures.forEach((figure, index) => {
            figure.draw();
            figure.circularMovement();
            figure.changeSize(samples[index]);


            if(Math.random > 0.99){

                figure.teleport();
            }

        });

    }
    requestAnimationFrame(animate);
}

for (let i = 0; i < 5; i++) {
    animate();

    
}