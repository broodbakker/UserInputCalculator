const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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

function calculatorLogic(total, numbers, operators) {
  //final answer
  if (numbers[0] === undefined) {
    return total;
  }
  //error check if number
  const newNumber = parseInt(numbers[0]);
  if (isNaN(newNumber)) {
    console.log("check if all the numbers are correct");
    return;
  }
  //error check if operator
  const newTotal = calculator(operators[0], total, newNumber);
  if (isNaN(newTotal)) {
    console.log("check if all the operators are correct");
    return;
  }
  //recursion removing firs operator and number
  return calculatorLogic(newTotal, numbers.slice(1), operators.slice(1));
}

rl.question("what do you want to calculate ", answer => {
  // answer in Array
  const answerArray = answer.trim().split(" ");
  // error fill in 2 arguments
  if (answerArray.length <= 2) {
    console.log("you need to fill in a minimum of 2 numbers and a operator");
    return;
  }
  // all numbers in array
  const numbers = answerArray.filter((value, index) => {
    return index % 2 == 0;
  });
  // all operators in array
  const operators = answerArray.filter((value, index) => {
    return index % 2 == 1;
  });

  const startingTotal = parseInt(numbers[0]);

  //error check
  if (isNaN(startingTotal)) {
    console.log("first number is not a number");
    return;
  }

  //main calculator
  const finalTotal = calculatorLogic(
    startingTotal,
    numbers.slice(1),
    operators
  );
  if (finalTotal === undefined) {
    return;
  }
  // final output
  console.log(`the answer is ${finalTotal}`);

  rl.close();
});
