const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const newGameBtn = document.querySelector('.btn');


let currentPlayer;
let gameGrid;

const winningPositions = [

    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


// Let's create the function to initialise the game
function initGame(){

    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];

    boxes.forEach( (box,index) =>{

        box.innerText = "";
        boxes[index].style.pointerEvents = "all";

        // initialise box with css properties again
        box.classList = `box box${index+1}`;    

    });


    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player -- ${currentPlayer}`;

}
// Function call for resat the all value
initGame();


// Put eventlistenrer on every box and call handleclick function using this event
boxes.forEach( (box,index) =>{

    box.addEventListener('click',()=>{
        handleClick(index);
    })
})


// For handling boxes and put value in box
function handleClick(index){

    if( gameGrid[index] === ""){
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;

        boxes[index].style.pointerEvents = "none";

        // console.log(gameGrid);

        // Swap turn
        swapTurn();

        // check someone win or not
        checkGameOver();
    }
}


// For using swap turn like X to O and O to X
function swapTurn(){

    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }

    // UI update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}


// Who is winner of this tic-tac-toi game
function checkGameOver(){

    let answer = "";

    winningPositions.forEach( (position) => {

        //all 3 boxes should be non-empty and exactly same in value

        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            // check if winner is X
            if(gameGrid[position[0]] === "X"){
                answer = "X";
            }
            else{
                answer = "O";
            }

            // Disable pointer event because of we get winner
            boxes.forEach( (box)=>{
                box.style.pointerEvents = "none";
            } )

            // now we know X or O is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    // It means we have a winner
    if(answer != ""){

        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add('active');
    }

    // When there is no winner

    let fillCount = 0;

    gameGrid.forEach((box) =>{

        if(box != ""){
            fillCount++;
        }
    });

    if(fillCount === 9){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add('active');
    }
    
}


// New game event listnere

newGameBtn.addEventListener('click', initGame)