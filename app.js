

class Calculator {
    constructor (displayPrevious, displayCurrent) {
        this.displayPrevious = displayPrevious;
        this.displayCurrent = displayCurrent;
        this.lastType = undefined;
        this.isDefault = true;
    }

    clear() {
        this.displayPrevious.innerText = "0";
        this.displayCurrent.innerText = "0";
        this.lastType = undefined;
        this.isDefault = true;
    }

    addNumber(number) {
        if (this.displayCurrent.innerText == "0") {
            this.displayCurrent.innerText = "";
            }
        if (this.lastType == 'operator') {
            this.displayPrevious.innerText += this.displayCurrent.innerText;
            this.displayCurrent.innerText = "";
        }
        this.displayCurrent.innerText+=number;
        this.lastType = "number";
        this.isDefault = false;
    }

    allowedToUseDecimal() {
        let str = this.displayCurrent.innerText;
        if (str.length == 0) {
            return false;
    }
        else if(str.includes(".") === true) {
            return false;
        }
        else if(this.lastType == "operator") {
            return false;
        }
        else {
            return true;
        }
    }

    addDecimal(){
        if (this.allowedToUseDecimal() === true) {
        this.displayCurrent.innerText+=".";
        this.lastType = "decimal";
        }
    }

    addOperator(operator) {
        if (this.isDefault === true) { return 0}
        if (this.lastType == 'number') {
            if (this.displayPrevious.innerText.length==1 && this.displayPrevious.innerText=="0") { this.displayPrevious.innerText = ""}
            this.displayPrevious.innerText += this.displayCurrent.innerText;
            this.displayCurrent.innerText = "";
        }
        if (this.lastType == "operator") {
            this.displayCurrent.innerText="";
        }
        this.displayCurrent.innerText+=operator;
        this.lastType = "operator";
    }

    isNum(value) {
        return value >= 0 && value < 10;
    }

    editStr() {
        var str = displayPrevious.innerText;
        var finalArr = [];
        var lastStep = "";
    
        for (var i=0; i <= str.length; i++) {
            if (this.isNum(str[i]) || str[i] == ".") {
                lastStep += str[i];
            }
            else if(i == str.length) {
                finalArr.push(lastStep);
            }
            else {
                finalArr.push(lastStep);
                finalArr.push(str[i]);
                lastStep = "";
            }
        }
        if (finalArr[finalArr.length-1] == '""') {
            finalArr.pop()
        }
        return finalArr;
    }

    getResult() {
        var inputArr = this.editStr();
        var actualResult = parseFloat(inputArr[0]);
        var subArray;
        for (var i=1; i < inputArr.length; i++) {
          subArray = inputArr[i];
          if (isNaN(subArray)) {
              if (subArray == "+") {
              actualResult += parseFloat(inputArr[i+1]);
              }
              else if(subArray == "x") {
                  actualResult *= parseFloat(inputArr[i+1]);
              }
              else if(subArray == "-") {
                  actualResult -= parseFloat(inputArr[i+1]);
              }
              else if(subArray == "/") {
                  actualResult /= parseFloat(inputArr[i+1]);
              }
          }
        }
        this.displayPrevious.innerText = actualResult;
        this.displayCurrent.innerText = "";
        this.lastType = undefined;
      }

} 



// displays
const displayPrevious = document.getElementById("display-previous");
const displayCurrent = document.getElementById("display-current");

// clear button
const clearBtn = document.getElementById("clear");

// operators
const allOperatorButtons = document.getElementsByClassName("operator");
const addBtn = document.getElementById("add");
const divideBtn = document.getElementById("divide");
const multiplyBtn = document.getElementById("multiply");
const subtractBtn = document.getElementById("subtract");
const equalsBtn = document.getElementById("equals");

// numbers 
const allNumberButtons = document.getElementsByClassName("number");

// decimal
const decimalBtn = document.getElementById("decimal");

const calculator = new Calculator(displayPrevious, displayCurrent);

//event listeners
clearBtn.addEventListener('click', () =>{
    calculator.clear();
})

decimalBtn.addEventListener('click', () =>{
    calculator.addDecimal();
})

equalsBtn.addEventListener('click', () =>{
   var lastCharInDisplayPrevious = calculator.displayCurrent.innerText[calculator.displayCurrent.innerText.length-1];
    if (calculator.isNum(lastCharInDisplayPrevious) === true) {
        calculator.displayPrevious.innerText += calculator.displayCurrent.innerText;
    }
    calculator.getResult();
})

// event listeners for number buttons
for (let i=0; i < allNumberButtons.length; i++) {
    allNumberButtons[i].addEventListener('click', () =>{
        calculator.addNumber(allNumberButtons[i].innerText)
    }
    )
}

for (let i=0; i < allOperatorButtons.length; i++) {
    allOperatorButtons[i].addEventListener('click', () =>{
        calculator.addOperator(allOperatorButtons[i].innerText)
    }
    )
}