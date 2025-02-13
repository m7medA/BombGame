//variable
let urlParams = new URLSearchParams(window.location.search);
const numPlayer = urlParams.get('player');
const boxes = document.querySelector('#bigBox');
const start = document.querySelector('#start');
let boxSmall = [];
let player = [0,1];
const arrow1 = document.querySelector('#arrow0');
const arrow2 = document.querySelector('#arrow1');
const newGame = document.querySelector('#newGame');

// for dont click start more one until click new 
let flag_start = 1;
//define how will play in single and 2 player
let flagPlayer = 0;
//to make ai function stop if some one lose
let flagZero = 1;
//flag to check ai play or not
let checkedPlay = 1;
//random number
let propNum = Math.trunc(Math.random()*36+1);
console.log(propNum);


//when click start
start.addEventListener('click',() => start_game());

//click new game
newGame.addEventListener('click',function(){
    if(flag_start == 0){
        clearBoxSmall();
        document.querySelector(`.same${flagPlayer}`).classList.remove('win');
        document.querySelector(`.same${flagPlayer}`).classList.remove('lose');
        document.querySelector(`#arrow${flagPlayer}`).style.display = 'none';
        flagPlayer = swapingFlag(flagPlayer);
        document.querySelector(`.same${flagPlayer}`).classList.remove('win');
        document.querySelector(`.same${flagPlayer}`).classList.remove('lose');
        document.querySelector(`#arrow${flagPlayer}`).style.display = 'none';
        propNum = Math.trunc(Math.random()*36+1);
        console.log(propNum);
        flag_start = 1;
        flagPlayer = 0;
        flagZero = 1;
        checkedPlay = 1;
        start_game();
    }
});

//when click on box
function twoPlayer(){
    for(let i =0;i<36;i++){
        //when click on box
        boxSmall[i][0].addEventListener('click',function(){
            if(checkedPlay){
                //work As long as flag = 1
                if(boxSmall[i][1]){
                    make_visited(boxSmall,i);
                    swapingArrow();
                    checkLose(boxSmall,i,flagPlayer);
                    // when single player
                    if(+numPlayer){
                        setTimeout(ai,1000);
                        checkedPlay = 0;
                    }
                }
            }
        })
    }
}


//ai
function ai(){
    if (flagZero){
        let choose = Math.trunc(Math.random()*36);
        while(boxSmall[choose][1] == 0){
            choose = Math.trunc(Math.random()*36);
        }
        make_visited(boxSmall,choose);
        swapingArrow();
        checkLose(boxSmall,choose,flagPlayer);
        checkedPlay = 1;
    }
}



function start_game(){
    //for click start one once until return new
    if(flag_start == 1){
        let number = 1;
        // two loop two create 36  box 
        for(let i =0;i<6;i++){
            for(let j =0;j<6;j++){
                //create box = div box
                let box = document.createElement('div');
                box.classList.add('box');
                //-j for x-axis -i for y-axis size 100*100
                box.style.backgroundPosition = `${-j * 100}px  ${-i*100}px`;
                box.textContent = number;
                number +=1;
                //push to boxSmall array [box,flag] this flag for check this box visited or not
                boxSmall.push([box,1]);
            }
        }
        //loop to append box to big div caled boxes
        for(let i = 0;i<36;i++){
            boxes.appendChild(boxSmall[i][0]);
        }
    }
    flag_start = 0;
    document.querySelector(`.same${flagPlayer}`).classList.add('active');
    document.querySelector(`#arrow${flagPlayer}`).style.display = 'block';
    //to start function after click start
    twoPlayer();
}



function make_visited(boxSmall,i){
    //make flag = 0 meaning visted
    boxSmall[i][1] = 0;
    //poperty after visited
    boxSmall[i][0].style.color = 'var(--third-color)';
    boxSmall[i][0].style.backgroundColor = 'var(--main-color)';
}

function swapingFlag(flagPlayer){
    flagPlayer = +!flagPlayer;
    return flagPlayer;
}

function swapingArrow(){
    document.querySelector(`#arrow${flagPlayer}`).style.display = 'none';
    document.querySelector(`.same${flagPlayer}`).classList.remove('active');
    flagPlayer = swapingFlag(flagPlayer);
    document.querySelector(`.same${flagPlayer}`).classList.add('active');
    document.querySelector(`#arrow${flagPlayer}`).style.display = 'block';
}

function checkLose(boxSmall,i,flagPlayer){
    if(propNum == boxSmall[i][0].textContent){
        boxSmall[i][0].style.backgroundColor = 'red';
        //add win class for pl win and lose for lose
        document.querySelector(`.same${flagPlayer}`).classList.add('win');
        document.querySelector(`#arrow${flagPlayer}`).style.display = 'block';
        document.querySelector(`.same${flagPlayer}`).classList.remove('active');
        flagPlayer = swapingFlag(flagPlayer);
        document.querySelector(`.same${flagPlayer}`).classList.add('lose');
        //call function make all div visited to stop click
        make_0();
    }
}

function make_0(){
    for(let i =0;i<36;i++){
        boxSmall[i][1] = 0;
    }
    flagZero = 0;
}

function clearBoxSmall(){
    //remove child from boxes
    for(let [i,j] of boxSmall){
        boxes.removeChild(i);
    }
    boxSmall = [];
}

