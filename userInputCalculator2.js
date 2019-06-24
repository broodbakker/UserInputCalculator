const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//calculator input
const calculator = (operator, number1, number2) => {
  switch (operator) {
    case "+":
      return number1 + number2;
    case "-":
      return number1 - number2;
    case "*":
      return number1 * number2;
    case "/":
      return number1 / number2;
    default:
      return "this is not a operator";
  }
};

//terminal input questions
const userInputCalculator = (type, total) => {
  rl.question(
    `total:${
      total[0]
    }, give a ${type}, when you are done calculating press enter. `,
    userInput => {
      //when user input "enter" finish calculations
      if (userInput === "") {
        return total;
      }

      const operators = ["+", "-", "/", "*"];
      //check if userInput "operator" is good type
      if (type === "operator" && !operators.includes(userInput)) {
        console.log("that is not a operator");
        return userInputCalculator("operator", total);
      }

      //check if userInput "number" is good type
      const userInputInt = parseInt(userInput);
      const isnan = isNaN(userInputInt);
      if (type === "number" && isnan) {
        console.log("that is not a number");
        return userInputCalculator("number", total);
      }

      //recursion, check if userinput is a number or operator, add to array
      if (type == "operator") {
        total[1] = userInput;
        return userInputCalculator("number", total);
      } else {
        total[2] = userInputInt;
        total[0] = calculator(total[1], total[0], total[2]);
        return userInputCalculator("operator", total);
      }
      rl.close();
    }
  );
};

userInputCalculator("operator", [0, "+", 0]);
