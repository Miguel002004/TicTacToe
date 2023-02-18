const get_width_game = document.querySelector('.container-2').clientWidth;
let calculate_width_game = Math.sqrt((get_width_game*get_width_game)*2);
document.documentElement.style.setProperty('--width-animation', calculate_width_game+'px');

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
        element.style.pointerEvents = "none";
        validateCombinations('v');
    } 
});

function validateCombinations(recorrido){    
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
    console.log(game_elements_array);
    //recorre el array 
    for(let x = 0; x < 3; x++){
        let count_O = 0;
        let count_X = 0;
        for(let y = 0; y < 3; y++){
            if( game_elements_array[recorrido=='v' ? y : x][recorrido == 'v' ? x : y] === '0'){
                count_O ++;
            }
            if(game_elements_array[x][y] === '1'){
                count_X ++;
            }
            if(count_O >= 3)
            {
                console.log('ganó O');
                //resetGame();
            }
            if(count_X >= 3){
                console.log('ganó X');
                //resetGame();
            }
        }
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