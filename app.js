//select the DOM elements
const body = document.querySelector("body");
const navBar = document.getElementById("nav-bar");
const images = document.querySelectorAll(".img");
const BtnPlay = document.getElementById("btn-Play");
const BtnStop = document.getElementById("btn-Stop");
const displayBoard = document.querySelector(".display");

const leaves = ["orange", "red", "yellow", "brown", "gold", "burgund", "bronze", "bordo"];

let music = new Audio();
let duration;
let countdown;

//get random Number ========================
function randomNumber(limit){
  return Math.floor((Math.random() * limit));
}

//get random range number
function randomTime(min , max){
  return Math.round((Math.random()* (max - min)) + min);
}

//create Leaf  ======================================
function createLeaf(){

let leafColor = leaves[randomNumber(leaves.length)];
const div = document.createElement("div");

  div.setAttribute("class", "leaf");
  div.style.left = `${randomNumber(100)}%`;
  div.style.backgroundImage = `url('images/${leafColor}.png')`;
  div.style.animation = `leaf-fall-${randomNumber(3) + 1} ${randomTime(20, 30)}s ease-in forwards`;
  body.appendChild(div);

}

//play the music and start the leaf falling ==============
function play(){

const time = Math.round(Number(music.duration)) * 1000;
const seconds = Math.floor((time/1000));

  timer(seconds);
  BtnPlay.style.display = "none";
  displayBoard.style.opacity = "1";
  music.play();
  createLeaf();
  duration = setInterval(createLeaf, 3000);

     setTimeout(()=> {
        clearInterval(duration);
        setTimeout(()=> stop() ,30000)
       }, time)
}

// stop the animation ==============
function stop(){

  clearInterval(duration);
  clearInterval(countdown);
  music.pause();
  document.title = `Autumn Landscape`;
  navBar.style.display= "flex";
  navBar.style.opacity = "1";
  BtnPlay.style.display = "block";
  displayBoard.style.opacity = "0";
  displayBoard.querySelector("span").textContent = "";
  document.querySelectorAll(".leaf").forEach((leaf)=> leaf.remove());
}

//select the audio ===================
images.forEach((img)=> img.addEventListener("click", ()=>{

const musicSource = img.querySelector("span").textContent;
const background = img.querySelector("img").getAttribute("src");

  music.src = `audio/${musicSource}.mp3`;
  body.style.backgroundImage = `url('${background}')`;
  navBar.style.opacity = "0";

  setTimeout(()=> navBar.style.display = "none", 2000)
   })
)

//timer function =========================================
function timer(seconds){

const now = Date.now();
const then = now + seconds * 1000;
displayTimeLeft(seconds)

countdown = setInterval(()=>{
const secondsLeft = Math.round((then - Date.now()) /1000);
   if(secondsLeft < 0){
     clearInterval(countdown);
     return;
      }
   displayTimeLeft(secondsLeft)
    },1000)

}

// display the remaining time ======================
function displayTimeLeft(seconds){

const minutes = Math.floor(seconds/60);
const remainingSeconds = seconds % 60;
const display = `${minutes}:${remainingSeconds < 10 ? 0 : ''}${remainingSeconds}`;

  displayBoard.querySelector("span").textContent = display;
  document.title = display;
}

// listen for events ==============================
BtnPlay.addEventListener("click", play);
BtnStop.addEventListener("click", stop);

document.addEventListener("visibilitychange", ()=> console.log("Visibility changed"));
