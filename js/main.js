const get_width_game = document.querySelector('.container-game').clientWidth;
let calculate_width_game = Math.sqrt((get_width_game*get_width_game)*2);

let player_one = document.querySelector('#player_one');
let player_two = document.querySelector('#player_two');

let layout1 = document.querySelector(".layout1-container");
let layout2 = document.querySelector(".layout2-container");
document.querySelector(".button-start-game").onclick=()=>{
    layout1.style.display='none';
    layout2.style.display='flex';
};
let state_flag = false;
var game_buttons = document.querySelectorAll(".game-button");
let game_array = [];
let cont;
game_buttons.forEach(element => {
    element.onclick=()=>{
        cont++;
        if(state_flag){
            element.innerHTML='<img src="img/circle.png" alt=""></div>';
            state_flag = false;
            game_array.push(0);
            element.dataset.status = 0;
        }
        else{
            element.innerHTML='<img src="img/cross.png" alt=""></div>';
            state_flag = true;
            game_array.push(1);
            element.dataset.status = 1;
        }
        turnAnimation(state_flag);
        element.style.pointerEvents = "none";
        validateCombinations();
    } 
});

function validateCombinations(){    
    let game_elements_array = [];
    let game_element_tmp_array = [];
    //let count_itm = 0;
    game_buttons.forEach((elm, index) => {
        game_element_tmp_array.push(elm.dataset.status);
        if(((index+1) % 3) === 0){ //lograo
            game_elements_array.push(game_element_tmp_array);
            game_element_tmp_array = [];
        }
    });
    validateH(game_elements_array);
    validateV(game_elements_array);
    validateDiagonal(game_elements_array);
    validateDiagonal_inv(game_elements_array);
    console.log(game_elements_array);
}
/**
 * Recorre la matriz horizontalmente
 * @param {array} arr 
 */
function validateH(arr){
    for(let x = 0; x < 3; x++){
        let count_O = 0;
        let count_X = 0;
        for(let y = 0; y < 3; y++){
            if(arr[x][y] === '0'){
                count_O ++;
            }
            if(arr[x][y] === '1'){
                count_X ++;
            }
            if(count_O >= 3)
            {
                //alert('ganó O');
                console.log('ganó O');
                resetGame('O', {'position':'h','location':x});
            }
            if(count_X >= 3){
                //alert('ganó X');
                console.log('ganó X');
                resetGame('X', {'position':'h','location':x});
            }
        }
    }
}
/**
 * Recorre la matriz verticalmente
 * @param {array} arr 
 */
function validateV(arr){
    for(let x = 0; x < 3; x++){
        let count_O = 0;
        let count_X = 0;
        for(let y = 0; y < 3; y++){
            if(arr[y][x] === '0'){
                count_O ++;
            }
            if(arr[y][x] === '1'){
                count_X ++;
            }
            if(count_O >= 3)
            {
                //alert('ganó O');
                console.log('ganó O');
                resetGame('O', {'position':'v','location':x});
            }
            if(count_X >= 3){
                //alert('ganó X');
                console.log('ganó X');
                resetGame('X', {'position':'v','location':x});
            }
        }
    }
}
function validateDiagonal(arr){
    let count_O = 0;
    let count_X = 0;
    for(let x = 0; x < 3; x++){
        if(arr[x][x] === '0'){
            count_O ++;
        }
        if(arr[x][x] === '1'){
            count_X ++;
        }
        if(count_O >= 3)
        {
            //alert('ganó O');
            console.log('ganó O');
            resetGame('O', {'position':'d','location':3});
        }
        if(count_X >= 3){
            //alert('ganó X');
            console.log('ganó X');
            resetGame('X', {'position':'d','location':3});
        }
    }
} 
function validateDiagonal_inv(arr){
    let count_O = 0;
    let count_X = 0;
    let cont = 2;
    for(let x = 0; x < 3; x++){
        if(arr[x][cont] === '0'){
            count_O ++;
        }
        if(arr[x][cont] === '1'){
            count_X ++;
        }
        if(count_O >= 3)
        {
            //alert('ganó O');
            console.log('ganó O');
            resetGame('O', {'position':'di','location':4});
        }
        if(count_X >= 3){
            //alert('ganó X');
            console.log('ganó X');
            resetGame('X', {'position':'di','location':4});
        }
        cont --;
    }
}
function validatePattern(game_elemnt){
    let game_elements_array = [];
        game_buttons.forEach(elm => {
            game_elements_array.push(elm.dataset.status);
        });
        console.log(game_elements_array);
    let game_combinations = [
        [1,1,1,0,0,0,0,0,0],
        [0,0,0,1,1,1,0,0,0],
        [0,0,0,0,0,0,1,1,1],
        [1,0,0,1,0,0,1,0,0],
        [0,1,0,0,1,0,0,1,0],
        [0,0,1,0,0,1,0,0,1],
        [1,0,0,0,1,0,0,0,1],
        [0,0,1,0,1,0,1,0,0]
    ];
    console.log(game_combinations);
    invert_array(game_combinations);
}
function invert_array(array){
    let array_copy = []
    array.forEach(item => {
        let array_item = []
        item.forEach(it => {
            array_item.push(!it);
        });
        array_copy.push(array_item);
    });
    console.log(array_copy);
}
function resetGame(player, position){
    game_buttons.forEach((elm, index) => {
        elm.dataset.status = "";
        elm.innerHTML='';
        elm.style.pointerEvents = "auto";
    });
    player_one.style.filter = 'grayscale(0)';
    player_one.style.webkitFilter = 'grayscale(0)';


    player_two.style.filter = 'grayscale(0)';
    player_two.style.webkitFilter = 'grayscale(0)';

    player_one.classList.remove('scale-1-5-player');
    player_one.classList.remove('scale-1-player');

    player_two.classList.remove('scale-1-5-player');
    player_two.classList.remove('scale-1-player');
    acceptAnimation(player);
    winAnimation(position);
}
function turnAnimation(flag){
    if(flag){
        player_two.style.filter = 'grayscale(1)';
        player_two.style.webkitFilter = 'grayscale(1)';

        player_one.style.filter = 'grayscale(0)';
        player_one.style.webkitFilter = 'grayscale(0)';

        player_one.classList.remove('scale-1-player');
        player_one.classList.add('scale-1-5-player');

        player_two.classList.remove('scale-1-5-player');
        player_two.classList.add('scale-1-player');
    }
    else{
        player_one.style.filter = 'grayscale(1)';
        player_one.style.webkitFilter = 'grayscale(1)';

        player_two.style.filter = 'grayscale(0)';
        player_two.style.webkitFilter = 'grayscale(0)';

        player_one.classList.remove('scale-1-5-player');
        player_one.classList.add('scale-1-player');


        player_two.classList.remove('scale-1-player');
        player_two.classList.add('scale-1-5-player');
    }
    
}

function acceptAnimation(player){
    let player_w = document.querySelector('#player_won');
    let player_w_container = document.querySelector('.container-win-message');
    
    player_w_container.style.display = "flex";
    player_w.textContent = `ganó el jugador ${player}`;
}
function acceptButton(){
    let player_w_container = document.querySelector('.container-win-message');
    let bar_animation = document.querySelector('#bar-animation');

    player_w_container.style.display = "none";
    bar_animation.style.display = "none";
}
/**
 * crea la animación de la linea para la posisción a del jugador ganador
 */
function winAnimation(position){
    let bar_animation = document.querySelector('#bar-animation');
    bar_animation.style.display = "block";

    let postn = {
        'v':90,
        'h':0,
        'd':45,
        'di':135
    };

    let horizontalP = {
        0:'25%',
        1:'50%',
        2:'77%'
    }

    let verticalP = {
        0:'62%',
        1:'50%',
        2:'38%'
    }
    
    if(position.position === 'v'){
        document.documentElement.style.setProperty('--top-line', '50%');
        document.documentElement.style.setProperty('--right-line', verticalP[position.location]);
    }
    if(position.position === 'h'){
        document.documentElement.style.setProperty('--right-line', '50%');
        document.documentElement.style.setProperty('--top-line', horizontalP[position.location]);
    }

    if(position.position === 'v' || position.position === 'h'){
        document.documentElement.style.setProperty('--width-animation', `${get_width_game}px`);
    }
    else{
        document.documentElement.style.setProperty('--right-line', '50%');
        document.documentElement.style.setProperty('--top-line', '50%');
        document.documentElement.style.setProperty('--width-animation', `${calculate_width_game}px`);
    }
    document.documentElement.style.setProperty('--transform-rotate', `${postn[position.position]}deg`);
}