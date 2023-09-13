//Select the elements to start the game
let coverPage = document.querySelector(".control-buttons");
let startButton = document.querySelector(".control-buttons span");
let playerName = document.querySelector(".name span");
let winTime = document.querySelector(".win-time");
let triesNumber = document.querySelector(".tries span");

let allGameBlocks = document.querySelectorAll(".game-block");





startButton.onclick = function() {

    allGameBlocks.forEach((block) =>{
        block.classList.add("has-matched");
        setTimeout(function(){
            block.classList.remove("has-matched");
        },5000)
    });
    //get the name of the Player
    let yourName = prompt(`"What is your name"  "Ecris ton prenom to register ton record"`);

    //1-check if the name of the player is empty or not
    if(yourName == null || yourName == ""){
        // if empty it will return unknown player
        playerName.innerHTML = "Joueur Inconnu";

    }
    else{
        playerName.innerHTML = yourName;
        const localStorageContent = localStorage.getItem("name");

        let names;
        if(localStorageContent == null){
            names = [];
            names += yourName;

        }else{
            JSON.parse(localStorageContent);
        }

        localStorage.setItem(names, names);

    }
    //2- Remove the cover page in all the cases
    coverPage.remove();
    theCountDown();
}




//define the duration to flip the cards
let duration = 1000;
//Get the main game blocks container
let gameBlocks = document.querySelector(".memory-blocks-container");
//get all the blocks into an array ES6 from the main container
let blocks = Array.from(gameBlocks.children);


//Make an order to shuffle the cards randomly
let rangeOrder = [...Array(blocks.length).keys()];
shuffle(rangeOrder);


//Add order css property to the game blocks
//1- loop for each block in the game blocks
blocks.forEach((block, index) =>{
    // Add the order in the block using the index in the block
    block.style.order = rangeOrder[index];

    //Add event Listener to flip the block on click
    block.addEventListener('click',function(){
        //activate the flip block function
        flipBlock(block);
    });
});



//create the flip block function to flip the selected block
function flipBlock(selectedBlock){
    //Add class is- flipped to the selected block
    selectedBlock.classList.add("is-flipped");

    //Collect all the flipped cards in the game state
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains("is-flipped"));
    // Add a condition to know if there is a two cards has been selected
    if(allFlippedBlocks.length === 2){


    //Stop clicking function
    stopClicking();

    //Check if the selected cards are matched or not
    //Matched Block function

    checkMatchedBlock(allFlippedBlocks[0], allFlippedBlocks[1]);

}

    winTheGame();

}

//create the shuffle function
function shuffle(array){

    //identify the vars in the function
    let current = array.length,
    temp,
    random;

    // create a loop into the array to get the random numbers
    while(current > 0){
        //get the random number from the array
        random = Math.floor(Math.random()* current);
        // decrease the number decrement
        current--;


        //Steps to shuffle
        //1- get the current array in temp
        temp = array[current];
        //2- get the current into random array
        array[current] = array[random];
        //3- the random array replace the current array in the temp
        array[random] = temp;
    }

    return array;
}
//Stop clicking function
function stopClicking(){

    //Add class no clicking to the main conintainer
    gameBlocks.classList.add("no-clicking");

    //Set time out to restore the clicking function
    setTimeout(()=>{
        gameBlocks.classList.remove("no-clicking");
    }, duration);
};
    //Matched Block function
    function checkMatchedBlock(firstBlock, secondBlock){
        //get the number of tries to match


        // the check condition
        if(firstBlock.dataset.animals === secondBlock.dataset.animals){
            // remove the is flipped class from the blocks to avoid the accumlation in the allflipped cards variables
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");

            // add an new class with the same prorteies
            firstBlock.classList.add("has-matched");
            secondBlock.classList.add("has-matched");
            document.getElementById("succes").play();
        }
        else{
            triesNumber.innerHTML = parseInt(triesNumber.innerHTML) + 1;
            //localStorage.setItem("tries", triesNumber.innerHTML);

            setTimeout(() =>{
                firstBlock.classList.remove("is-flipped");
                secondBlock.classList.remove("is-flipped");
            }, duration)
            document.getElementById("fail").play();
        }
    };

    let gameWinResult = document.querySelector(".game-win-result");
//Create win the game function in case if you win the game in time
let yourTime = document.querySelector(".your-time");
let reCommence =document.getElementById("recommence-button");
function winTheGame() {

//identify if all the cards are flipped
    let allFlippedBlocks2 = blocks.filter(flippedBlock => flippedBlock.classList.contains("has-matched"));
//collect all the variables

//create the condition that make the check
    if(allFlippedBlocks2.length === blocks.length){
            //Add the show class to the page
            gameWinResult.classList.add("show");
            //Activate the click function to reload the page
            reCommence.addEventListener('click',function(){
                //reload the page
                location.reload();
                //stop the counter

        });
        //play the win music
            document.getElementById("win").play();

    }
};

function theCountDown(){
    // the starting minutes

    const startingMinutes = 3;
    let time = startingMinutes * 60;

    //get the element in the page
    const countDownEl = document.getElementById("timer");
    const timerEl = setInterval(updateTimer, 1000);

    //create the function to update the timer
    function updateTimer(){
        const minutes = Math.floor(time/ 60);
        let secondes = time % 60;

        secondes = secondes < 1  ? '0' + secondes : secondes;
        countDownEl.innerHTML = `${minutes}:${secondes}`;
        time--;
        if (time < 0 || gameWinResult.classList.contains("show")){
            clearInterval(timerEl);
            winTime.innerHTML = countDownEl.innerHTML ;
            localStorage.setItem(playerName.innerHTML, `Essaies = ${triesNumber.innerHTML} \u00A0\u00A0\u00A0\u00A0\  Le Temps = ${countDownEl.innerHTML}`);
            /*localStorage.setItem(countDownEl.innerHTML, countDownEl.innerHTML)
            for(let[key, value] of Object.entries(localStorage)){
                let records =document.querySelector(".records");
                records.innerHTML += `<span>  <br> ${value} </span>`;
            }
*/
        }

        if(time < 0){
            let gameLoseResult = document.querySelector(".game-lose-result");
            let reCommence2 = document.getElementById("recommence-button2");
            gameLoseResult.classList.add("show");
            document.getElementById("lose").play();
            reCommence2.addEventListener('click',function(){
                //reload the page
                location.reload();
                //stop the counter


        });
        }
    };
    };
let recordsDiv = document.querySelector(".records");
let showRecords = document.getElementById("show-records");
let recordSpan =document.createElement("span");
recordSpan.className="records-span";
recordsDiv.appendChild(recordSpan);
showRecords.onclick = function(){
    recordsDiv.classList.toggle("show");
    for(let [key, value] of Object.entries(localStorage)){
        recordSpan.innerHTML += `<span class="span-name">${key}</span> <span class="span-value"> ${value} </span> <hr/>`;
    }

};
let gameRestart = document.getElementById("recommence-main");

gameRestart.onclick = function(){
    location.reload();
};