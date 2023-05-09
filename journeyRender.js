// Get the element on the page with the id canvas
let canvas = document.querySelector("#canvas");

let painting = false;
// TODO: Replace with your own emoji
let currentEmoji = "img/star.png";

// var img = document.createElement('img');
// img.src = './img/star.png';
// document.body.appendChild(img);

// Detect the moment we press the mouse down on the canvas div
canvas.addEventListener("mousedown", function (event) {
    painting = true;
  console.log("click!");
  // console.log(event);

  // Create a new emoji div on the page and set it equal to your desired emoji
  let newEmoji = document.createElement("img");
  newEmoji.classList.add("emoji");
  newEmoji.src = currentEmoji;

  // Set the style of that position so that it goes where you just pressed your mouse down
  newEmoji.style.left = event.pageX + "px";
  newEmoji.style.top = event.pageY + "px";

  // Add that emoji to the canvas element so that it appears on the screen
  canvas.appendChild(newEmoji);
})

// TODO: Add functionality that makes it so the emoji "paints" when you hold your mouse down and move it on the screen


canvas.addEventListener("mousemove", function(event){
  if (painting){
    let newEmoji = document.createElement("img");
    newEmoji.classList.add("emoji");
    newEmoji.src = currentEmoji;

    newEmoji.style.left = event.pageX + "px";
    newEmoji.style.top = event.pageY + "px";

    // console.log("This is the mousemove event");
    // console.log(event);

    canvas.appendChild(newEmoji);
  }
})

canvas.addEventListener("mouseup", function(event){
  painting = false;
  console.log("unclick!")
})

const emojis=["img/star.png","img/star.png","img/filled_hearts.png","img/flower.png","img/filled_flower.png","img/heart.png" ,"img/smile.png" ];
  
function changeEmojis(){
  currentEmoji = emojis[Math.floor(Math.random() * emojis.length)];
}

// TODO: Add functionality so when you hit the "Backspace" key, the contents of the canvas clears
document.addEventListener("keydown", function(event){
  console.log("This is keydown event")

// This is delete key
  if(event.keyCode === 8){
    event.preventDefault();
    canvas.innerHTML = "";
  }
// This is the spacebar key
  if (event.keyCode == 32){
    changeEmojis();
  }
})
