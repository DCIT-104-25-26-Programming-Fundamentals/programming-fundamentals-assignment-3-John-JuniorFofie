// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 6
// =============================================================================
//
// TASK: Multiplication Table Generator
//
// Write a JavaScript program that generates multiplication tables using loops
// and functions.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_06_multiplication_table.js
//
// -----------------------------------------------------------------------------
// PART A — Single Table
// -----------------------------------------------------------------------------
// - Ask the user to enter a number.
// - Print the multiplication table for that number from 1 to 12.
//
// Expected output (if user enters 5):
//
//   Multiplication Table for 5:
//   5  x  1  =  5
//   5  x  2  =  10
//   5  x  3  =  15
//   ...
//   5  x  12 =  60
//
// -----------------------------------------------------------------------------
// PART B — Bonus: Tables from 1 to N
// -----------------------------------------------------------------------------
// - Ask the user to enter a number N.
// - Print the full multiplication table for every number from 1 to N.
// - Add a separator line (e.g. "---") between each table.
//
// Expected output (if user enters 3):
//
//   Multiplication Table for 1:
//   1  x  1  =  1
//   ...
//   1  x  12 =  12
//   ---------------------------
//   Multiplication Table for 2:
//   2  x  1  =  2
//   ...
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - N must be a positive integer. If the user enters an invalid value,
//   print an error message and stop.
// - Each part must be in its own function (see scaffold below).
// - Complete Part A before attempting Part B.

//
// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readline = require('readline-sync');

function isPositiveInteger(value) {
	return Number.isInteger(value) && value > 0;
}

function generateSingleTable(n) {
	console.log(`\nMultiplication Table for ${n}:`);
	for (let i = 1; i <= 12; i++) {
		console.log(`${n}  x  ${i}  =  ${n * i}`);
	}
}

function generateTablesUpToN(N) {
	if (!isPositiveInteger(N)) {
		console.log('Error: N must be a positive integer.');
		return;
	}

	for (let num = 1; num <= N; num++) {
		generateSingleTable(num);
		if (num !== N) console.log('---------------------------');
	}
}

function promptForPositiveInteger(promptText) {
	const answer = readline.question(promptText);
	const parsed = Number(answer);
	if (!Number.isFinite(parsed) || !Number.isInteger(parsed) || parsed <= 0) {
		return null;
	}
	return parsed;
}

// Main program flow
const single = promptForPositiveInteger('Enter a number for Part A (single table): ');
if (single === null) {
	console.log('Invalid input. Please enter a positive integer.');
	process.exit(1);
}
generateSingleTable(single);

// Ask whether to run Part B
const runB = readline.question('\nDo you want to generate tables from 1 to N (Part B)? (y/n): ');
if (runB.trim().toLowerCase() === 'y') {
	const N = promptForPositiveInteger('Enter N (positive integer): ');
	if (N === null) {
		console.log('Invalid input. N must be a positive integer.');
		process.exit(1);
	}
	generateTablesUpToN(N);
}


