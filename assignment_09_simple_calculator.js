// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 9
// =============================================================================
//
// TASK: Console-Based Simple Calculator
//
// Build a calculator program that runs in the console and performs basic
// arithmetic operations based on the user's input.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_09_simple_calculator.js
//
// -----------------------------------------------------------------------------
// OPERATIONS YOUR CALCULATOR MUST SUPPORT
// -----------------------------------------------------------------------------
//
//   1. Addition          ( + )    e.g.  10 + 3  =  13
//   2. Subtraction       ( - )    e.g.  10 - 3  =  7
//   3. Multiplication    ( * )    e.g.  10 * 3  =  30
//   4. Division          ( / )    e.g.  10 / 3  =  3.33
//   5. Modulus           ( % )    e.g.  10 % 3  =  1  (remainder)
//   6. Exponentiation    ( ** )   e.g.  2 ** 8  =  256
//   7. Quit
//
// -----------------------------------------------------------------------------
// HOW THE MENU SHOULD LOOK
// -----------------------------------------------------------------------------
//
//   ============================
//        SIMPLE CALCULATOR
//   ============================
//   1. Addition
//   2. Subtraction
//   3. Multiplication
//   4. Division
//   5. Modulus
//   6. Exponentiation
//   7. Quit
//   Select an operation (1-7):
//
// -----------------------------------------------------------------------------
// EXPECTED INTERACTION EXAMPLE
// -----------------------------------------------------------------------------
//
//   Select an operation (1-7): 4
//   Enter first number : 10
//   Enter second number: 3
//   Result: 10 / 3 = 3.33
//
//   Select an operation (1-7): 4
//   Enter first number : 5
//   Enter second number: 0
//   Error: Cannot divide by zero.
//
//   Select an operation (1-7): 7
//   Goodbye!
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Each arithmetic operation MUST be written as its own function.
// - Use a loop so the calculator keeps running until the user selects Quit.
// - Division by zero must be caught and handled with a clear error message
//   (do NOT let the program crash).
// - Display results to 2 decimal places using .toFixed(2).
// - Handle invalid menu choices gracefully.
//

//
// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readline = require('readline-sync');

function toNumber(input) {
	const n = Number(input);
	return Number.isFinite(n) ? n : null;
}

function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	if (b === 0) return null; // signal division by zero
	return a / b;
}

function modulus(a, b) {
	if (b === 0) return null;
	return a % b;
}

function exponentiate(a, b) {
	return a ** b;
}

function promptForNumber(promptText) {
	const ans = readline.question(promptText);
	const n = toNumber(ans);
	if (n === null) {
		console.log('Invalid number.');
		return null;
	}
	return n;
}

function showMenu() {
	console.log('\n============================');
	console.log('     SIMPLE CALCULATOR');
	console.log('============================');
	console.log('1. Addition');
	console.log('2. Subtraction');
	console.log('3. Multiplication');
	console.log('4. Division');
	console.log('5. Modulus');
	console.log('6. Exponentiation');
	console.log('7. Quit');
}

// Main loop
while (true) {
	showMenu();
	const choice = readline.question('Select an operation (1-7): ').trim();
	if (choice === '7') {
		console.log('Goodbye!');
		break;
	}

	const a = promptForNumber('Enter first number : ');
	if (a === null) continue;
	const b = promptForNumber('Enter second number: ');
	if (b === null) continue;

	let result;
	let opSymbol = '';

	switch (choice) {
		case '1':
			result = add(a, b);
			opSymbol = '+';
			break;
		case '2':
			result = subtract(a, b);
			opSymbol = '-';
			break;
		case '3':
			result = multiply(a, b);
			opSymbol = '*';
			break;
		case '4':
			result = divide(a, b);
			opSymbol = '/';
			if (result === null) {
				console.log('Error: Cannot divide by zero.');
				continue;
			}
			break;
		case '5':
			result = modulus(a, b);
			opSymbol = '%';
			if (result === null) {
				console.log('Error: Cannot modulus by zero.');
				continue;
			}
			break;
		case '6':
			result = exponentiate(a, b);
			opSymbol = '**';
			break;
		default:
			console.log('Invalid choice. Please select a number between 1 and 7.');
			continue;
	}

	// Display result to 2 decimal places
	const display = typeof result === 'number' ? result.toFixed(2) : result;
	console.log(`Result: ${a} ${opSymbol} ${b} = ${display}`);
}



