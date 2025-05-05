//Global varible to hold our current math problem
let mathProblem = "";

//global array var to hold all calcs
let history = [];

//event listner that listens for any click on the page
document.addEventListener("click", (event) => {
    let itemThatWasClick = event.target
    //check to see if the item that was click was a button element
    if(itemThatWasClick.matches("button")){
        //check to see if the button has the data attribute of data-number
        //if the data-attribute (data-number) is not on this button, it will be undefined
        if(itemThatWasClick.dataset.number !== undefined){
            mathProblem += itemThatWasClick.dataset.number
        } else {
            //fall into this else if data-number is not on this button
            if(itemThatWasClick.dataset.operation === "ce"){
                //if the button CE was clicked, clear everything and return
                //a return will stop the execuition of this function
                clearEverything()
                return;
            } else if(itemThatWasClick.dataset.operation !== "="){
                //if any button execpt for = was clicked, append it to our math problem
                mathProblem += itemThatWasClick.dataset.operation
            } else {
                //if the = button was clicked call a function to update the answer label
                updateAnswer()
            }
        }
        //update the label with our current math problem
        updateCurrentProblem(mathProblem)
    }
})

//this function just set our problem label  to empty
//reset are global varible to a empty string.
function clearEverything(){
    document.getElementById("equation").textContent = ""
    mathProblem = ""
}

//function to update the equation label to what was passed in as a argument
function updateCurrentProblem(current){
    document.getElementById("equation").textContent = current
}

//function to do the math for the math problem, after that is done clear the label for the problem and the global var
function updateAnswer(){
    try {
        const result = safeEvaluate(mathProblem);

        // Add the calculation to history
        history.push(`${mathProblem} = ${result}`);

        // Render updated history
        renderHistory();

        // Show result
        document.getElementById("solution").textContent = result;

        // Clear the equation display
        clearEverything();
    } catch (e) {
        document.getElementById("solution").textContent = "Error";
        console.error("Evaluation error:", e.message);
    }
}


function safeEvaluate(mathProblem){
    if (!/^[\d+\-*/ ().]+$/.test(mathProblem)) {
        throw new Error("Invalid characters in expression.");
    }

    // Use Function constructor for isolated evaluation
    return Function(`"use strict"; return (${mathProblem})`)();
}

function renderHistory() {
    const container = document.getElementById("calcHistoryDisplay");
    container.innerHTML = ""; // Clear previous content

    const list = document.createElement("ul");
    list.classList.add("list-group");

    history.forEach(entry => {
        const li = document.createElement("li");
        li.classList.add("list-group-item");
        li.textContent = entry;

        // Allow clicking a history item to reuse the equation
        li.addEventListener("click", () => {
            const equation = entry.split("=")[0].trim();
            mathProblem = equation;
            updateCurrentProblem(mathProblem);
        });

        list.appendChild(li);
    });

    container.appendChild(list);
}