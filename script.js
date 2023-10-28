const input         = document.getElementById("calculation");
const resultDisplay = document.getElementById("result");
const errorPopup    = document.getElementById("popup_error");
let startup     = true;
let placeHolder = true;

const keys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", ".", "÷", "x", "%"];
const specialKeys = [{"Delete": del()}, {"Backspace": clearScreen()}];
const replaceValues = [["x", "*"], ["÷", "/"]];

document.addEventListener('keyup', function(event) {
    let keyPressed = event.key;

    for (value of replaceValues) {
        if(keyPressed == value[1]) {
            keyPressed = value[0];
            break;
        };
    };


    for(const key of keys) {
        if(keyPressed === key) 
            return display(keyPressed);
    };

    switch (keyPressed) {
        case "Delete": {
            clearScreen();
            break;
        };
        
        case "Backspace": {
            del();
            break;
        };
        
        case "Enter": {
            calculate();
            break;
        };
    };
});



function display(value) {
    input.value += value;
};

function del() {
    input.value = input.value.slice(0,-1);
};

function clearScreen() {
    input.value         = "";
    resultDisplay.value = "";
};
 
function calculate() {
    if(input.value == '') return;

    if(startup) {
        const display = document.querySelector(".results");
        display.classList.add("active");

        startup = !startup;
    };
    
    let result_trueValues = input.value;

    if(input.value === '') 
        return resultDisplay.value = ". . .";
    

    for (value of replaceValues) {
        result_trueValues = result_trueValues.replaceAll(value[0], value[1]);
    };

    console.log("\nMath: ", result_trueValues, "\nResult: ", eval(result_trueValues));    

    const result = eval(result_trueValues);
    return resultDisplay.value = result;
};




// Any error that occours will be shown both on console and as a popup.
// Currently, I have no math logic. That means any bad input will return a popup error.
window.onerror = function(event, source, lineno, colno, error) {
    console.error(`Something went wrong\n------------------------\n\nEvent: ${event}\nSource: ${source}\nLine Nº: ${lineno}\nCol Nº: ${colno}\nError: ${error}`);

    const displayErrorMessage = `<div class=\"button error\">
            <h3>Something went wrong</h3>
            <p>${event}</p>
        </div>
    `;

    errorPopup.classList.remove("hide");
    errorPopup.innerHTML += displayErrorMessage;

    setTimeout(removeLastErrorPopup, 5000);
    return true;
};

function removeLastErrorPopup () {
    errorPopup.removeChild(errorPopup.firstElementChild);
};