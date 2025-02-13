//homepage
//variable
const start = document.querySelector('#start');
const contianer_home = document.querySelector('.contianer_home');
const chosePlayer = document.querySelector('.chosePlayer')
let out = document.querySelector('#out');
const player1 = document.querySelector('#one');
const player2 = document.querySelector('#two');


//create element div .layer
const layer = document.createElement('div');
layer.classList.add('layer');
contianer_home.appendChild(layer);

//events
start.addEventListener('click',function(){
    contianer_home.appendChild(chosePlayer);
    chosePlayer.style.display = 'flex';
    layer.style.display = 'block';
})

out.addEventListener('click',function(){
    chosePlayer.style.display = 'none';
    layer.style.display = 'none';
})
