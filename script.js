let penColor = 'black';
let container = document.querySelector('.container');
let blackPenBtn = document.querySelector('#black');
let redPenBtn = document.querySelector('#red');
let customPenBtn = document.querySelector('#custom');
let changeSizeBtn = document.querySelector('#changeSizeBtn');
let eraserBtn = document.querySelector('#eraser');
let resetBtn = document.querySelector('#reset');
let isDrawing = false; //variable that tracks if user is drawing or not

blackPenBtn.addEventListener('click', () => penColor = 'black');
redPenBtn.addEventListener('click', () => penColor = 'red')
customPenBtn.addEventListener('click', () => penColor = customColor());
eraserBtn.addEventListener('click', () => penColor = 'white');
resetBtn.addEventListener('click', () => resetGrid());
container.addEventListener('mouseenter', () => isDrawing = false); //for the case if you leave the drawing board
changeSizeBtn.addEventListener('click', setupGrid);
createGrid(25); //initial grid 



function colorMe(e) {
    e.target.style.backgroundColor = penColor;
}

//input: a number, to set number of squares per side
function createGrid(numberOfSquares) {
    for(let i = 1; i <= numberOfSquares; i++) {
        let row = document.createElement('div');
        row.setAttribute('class', 'row');

        for (let j = 1; j <= numberOfSquares; j++) {
            let pixel = document.createElement('div');
            pixel.setAttribute('class', 'pixel');
            pixel.addEventListener('mousedown', (e) => {
                isDrawing = true; //sets drawing to true for hold
                colorMe(e); //color the square
                });
            pixel.addEventListener('mouseenter', (e) => {
                if(isDrawing === true) colorMe(e); //color is the drawing state is stil lactive
                });
            pixel.addEventListener('mouseup', () => {
                isDrawing = false; //set drawing state to false
                });
            row.appendChild(pixel);
        }
        container.appendChild(row);
    }
}

function deleteGrid() {
    container.replaceChildren(); //rids of all the rows
}

function setupGrid() {
    let inputSquares = Number(prompt("How many squares would like to build the grid? Max 100."))
    if(inputSquares > 100 || inputSquares <= 0 || isNaN(inputSquares)) return; 

    deleteGrid();
    createGrid(inputSquares);
}   

function customColor() { //prompts user for color and updates penColor if valid
    let inputColor = prompt("Enter a valid CSS color.").toLowerCase(); //some boilerplate, basically checks
    let s = new Option().style;                          //if its a valid color then s.color will have been equal to       
    s.color = inputColor;                               //the inputColor after assignment, otherwise it failed and is not
    if (s.color == inputColor) return inputColor;
    else return 'black'; //default to black
}

function resetGrid() { //sets all pixels to white
    let rows = container.children;
    for (let row of rows) {
        
        let pixels = row.children;

        for (let pixel of pixels){
            pixel.style.backgroundColor = 'white';
        }
    }
}