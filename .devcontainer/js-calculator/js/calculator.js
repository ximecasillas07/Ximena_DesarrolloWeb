// ==========================================
// 1. UI SELECTORS
// ==========================================

const num1Input = document.getElementById('num1'); //get refrence from Active button id="calculate-btn"
const num2Input = document.getElementById('num2');
const operationSelect = document.getElementById('operation');
const calculateBtn = document.getElementById('calculate-btn');
const resultStatus = document.getElementById('result-status');

// ==========================================
// 2. TODO: BASIC CALLBACK MATH FUNCTIONS (Students write these)
// ==========================================

// TODO: Write "add" callback expression (a, b) => ...
//function add(a, b) {return a + b; }
//typescript, to make it more strict, has hinting->declaring the type of variables you are using
//( a: number, b: number): number => { return a + b; } typescript version
const add = (a, b) => { return a + b; }
//another option: const add = (a, b) => a + b; //shorter version, for small operations

// TODO: Write "subtract" callback expression (a, b) => ...
const subtract = (a, b) => { return a - b; }

// TODO: Write "multiply" callback expression (a, b) => ...
const multiply = (a, b) => { return a * b; }

// TODO: Write "divide" callback expression (a, b) => ...
// Rule: Guard against division-by-zero! Return an Error or string warning.
const divide = (a, b) => {
    /*try {
        return a / b;
    } catch (error) {
        return -1;
    }*/ //try catch is better to use when you have incertanties
    if (b === 0) 
        throw new Error("Can not divide by zero");
    return a / b;
}

// ==========================================
// 3. TODO: HIGHER-ORDER FUNCTION ENGINE (Students write this)
// ==========================================

// TODO: Write the "calculator" orchestrator function
// Arguments: numA (Number), numB (Number), callback (Function)
// Checks:
//   - Is numA and numB actually valid numbers?
//   - Is callback actually a function?
// Execution: Returns callback(numA, numB)
const calculator = (numA, numB, callback) => { //callback func that will react to actions of the user through the system
    //instead of making 1 func per operation, we make one that will do the operation based on the users decision, the control is now in the users hands
    return callback(numA, numB); //call the callback 
};

/*const sayHello = (name) => { //this will appear in console, you need to be careful because this is a way people can put in malware 
    return `Hello ${name}`;
};*/


// ==========================================
// 4. TODO: EVENT OBSERVER & INTEGRATION WIRING (Students write this)
// ==========================================
calculateBtn.addEventListener('click', () => {
    try{
        //alert('click');      //link comes from the html document
        // TODO: Extract values from the inputs and parse them as floats.
        const valA= parseFloat(num1Input.value); //save the value of the input field into a variable
        const valB= parseFloat(num2Input.value);
        /*console.log("num1: " + num1Input.value); //log the value of the input field into the console
        console.log("num2: " + num2Input.value);
        const res = add(valA, valB); //call the add function with the values of the input fields
        console.log("res: " + res); //log the result of the add function into the console
        //whenever you read a value from html, bc html doesnt know better, it takes them as strings. The operation above just concatenates the two strings together. To fix this, we need to parse the values as floats. We can do this by using the parseFloat() function.*/
    
        // TODO: Retrieve the selected operation string value.
        const oper = operationSelect.value; //get the value of the selected option in the select element
        if(num1Input.value === "" || num2Input.value === "") { //using three === is a typesave
            throw new Error("Introduce a number");
        }
        if(!oper){
            throw new Error("Select an operation");
        }

        // TODO: Match the selected operation string to its corresponding function reference.
        //select what the callback func will be 
        let targetCallback;
        switch(oper) {
            case 'add' : 
                targetCallback = add; 
                break;
            case 'subtract' : 
                targetCallback = subtract; 
                break;
            case 'multiply' : 
                targetCallback = multiply; 
                break;
            case 'divide' : 
                targetCallback = divide; 
                break;
            default:
                throw new Error("Operation not defined");
        }

        // TODO: Execute the higher-order 'calculator' function with input values and the matched function reference.
        const res = calculator(valA, valB, targetCallback); //call the calculator function with the values of the input fields and the selected operation
        //we got rid of this after doing the last one, we want the answer to show up on screen not console: console.log("Result: " + res); //log the result of the calculator function into the console
        // TODO: Update resultStatus text, toggling classes (e.g., alert-success vs alert-danger) based on outcomes!
        resultStatus.className = "alert alert-success text-center"; //change the class of the resultStatus element to alert-success
        resultStatus.textContent = `Result: ${res}`; //update the text content of the resultStatus element with the result of the calculator function
        //if the user doesnt look at the console, they wont know whats happening. thats why we put the try before everything 
    } catch (error) {
        resultStatus.className = "alert alert-danger text-center"; //change the class of the resultStatus element to alert-danger
        resultStatus.textContent = `Error: ${error.message}`; //update the text content of the resultStatus element with the error message
    }
});