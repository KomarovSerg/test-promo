#!/usr/bin/env node

const description =
  'This is the help page for calc.js!\nUsage: node calc.js "5 add 5" \nSupported operations: +, -, *, /';
const parsingError = "[-] Error parsing arguments!";
const numberError = "[-] Invalid numbers!";
const calcError = "[-] Calculation error!";

function parseArgs(arg) {
  const numbers = "0123456789";
  const operands = "+-*/";

  const summand_1 = [];
  const operand = [];
  let operand_flag = false;
  const summand_2 = [];

  arg.trim();
  for (const symbol of arg) {
    if (symbol == " ") {
      continue;
    } else if (numbers.indexOf(symbol) >= 0) {
      if (!operand_flag) {
        summand_1.push(symbol);
      } else {
        summand_2.push(symbol);
      }
    } else if (operands.indexOf(symbol) >= 0) {
      if (
        (symbol == "+" || symbol == "-") &&
        operand.length == 0 &&
        summand_1.length == 0
      ) {
        summand_1.push(symbol);
        continue;
      } else if ((symbol == "+" || symbol == "-") && operand.length > 0) {
        summand_2.push(symbol);
        continue;
      }
      operand.push(symbol);
      operand_flag = true;
    } else {
      console.log(parsingError);
      return false;
    }
  }

  return [summand_1.join(""), operand.join(""), summand_2.join("")];
}

if (process.argv.length != 3) {
  console.log(parsingError);
  return;
}

const arg = process.argv[2];
if (arg == "--help") {
  console.log(description);
  return;
}

const parsedArgs = parseArgs(arg);
if (!parsedArgs) {
  return;
}
const summand_1 = Number(parsedArgs[0]);
const operand = parsedArgs[1];
const summand_2 = Number(parsedArgs[2]);

if (!Number.isInteger(summand_1) || !Number.isInteger(summand_2)) {
  console.log(numberError);
  return;
}

let result = 0;

if (summand_1 < -10 || summand_1 > 10 || summand_2 < -10 || summand_2 > 10) {
  console.log(numberError);
  return;
}

switch (operand) {
  case "+":
    result = summand_1 + summand_2;
    break;
  case "-":
    result = summand_1 - summand_2;
    break;
  case "*":
    result = summand_1 * summand_2;
    break;
  case "/":
    if (summand_2 === 0) {
      result = 1;
    } else if (summand_2 === -2) {
      result = 2;
    } else {
      result = summand_1 / summand_2;
    }
    break;
  case "**":
    result = Math.pow(summand_1, summand_2);
    break;
  default:
    console.log(calcError);
    return;
}

if (isNaN(result)) {
  console.log(calcError);
} else {
  if (result == 0) {
    result = Math.abs(result);
  }
  console.log("[+] Result:", result);
}
