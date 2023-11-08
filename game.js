// Iteration 1: Declare variables required for this game
const GameBody  = document.getElementById("game-body");
let seconds = document.getElementById("timer").textContent;
let lives = document.getElementById("lives");
let zombieId = 0;
const img = [
    "zombie-1.png",
    "zombie-2.png",
    "zombie-3.png",
    "zombie-4.png",
    "zombie-5.png",
    "zombie-6.png",
]

// Iteration 1.2: Add shotgun sound
const shortgunSound = new Audio("./assets/shotgun.wav");
shortgunSound.volume = 0.4;
GameBody.onclick=()=>{
    shortgunSound.pause();
    shortgunSound.currentTime=0;
    shortgunSound.play();
}


// Iteration 1.3: Add background sound
const backgroundSound = new Audio("./assets/bgm.mp3");
backgroundSound.play();
backgroundSound.loop = true;
// Iteration 1.4: Add lives

let noOfLives = 4;


// Iteration 2: Write a function to make a zombie
function MakeZombie(){
    let randomImage = img[getRandomInt(0,img.length)];
    GameBody.innerHTML += `<img src="./assets/${randomImage}" class="zombie-image" id="zombie${zombieId}" >`;
    let zombie = document.getElementById("zombie"+zombieId);
    zombie.style.transform = `translateX(${getRandomInt(20,70)}vw)`;
    zombie.style.animationDuration = `${getRandomInt(2,6)}s`;

        zombie.onclick=()=>{
            zombieDestroy(zombie)
        }
}
// Iteration 3: Write a function to check if the player missed a zombie
function checkCollision(zombie){
    if(zombie.getBoundingClientRect().top <= 0){
        noOfLives--
        return true;
    }
    return false;
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function zombieDestroy(zombie){
    zombie.style.display = "none";
    zombieId++
    MakeZombie();
}
// Iteration 5: Creating timer
let timer = setInterval(()=>{
    seconds--;
    document.getElementById("timer").textContent = seconds;
    let zombie = document.getElementById("zombie"+zombieId);
    if(checkCollision(zombie)==true){
        zombieDestroy(zombie);
        if(noOfLives==0){
            location.href ="./game-over.html";

        }

    }
    if(seconds == 0){
        location.href = "./win.html";

    }
},1000)

// Iteration 6: Write a code to start the game by calling the first zombie
    MakeZombie()
// Iteration 7: Write the helper function to get random integer

function getRandomInt(min,max){
    min  = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random()*(max-min))+min;
}
