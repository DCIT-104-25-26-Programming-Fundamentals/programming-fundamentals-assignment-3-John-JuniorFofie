// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');
function readMatrix(rows, cols, promptPrefix = 'Enter') {
	const matrix = [];
	for (let r = 0; r < rows; r++) {
		const line = readlineSync.question(`${promptPrefix} row ${r+1}: `);
		const values = line.trim().split(/\s+/).map(Number);
		if (values.length !== cols || values.some(v => Number.isNaN(v))) {
			console.log('Error: Invalid row input. Please enter exactly ' + cols + ' numbers separated by spaces.');
			r--;
			continue;
		}
		matrix.push(values);
	}
	return matrix;
}

function printMatrix(matrix) {
	if (matrix.length === 0) {
		console.log('[]');
		return;
	}
	const cols = matrix[0].length;
	const colWidths = new Array(cols).fill(0);
	for (let r = 0; r < matrix.length; r++) {
		for (let c = 0; c < cols; c++) {
			const s = String(matrix[r][c]);
			if (s.length > colWidths[c]) colWidths[c] = s.length;
		}
	}
	for (let r = 0; r < matrix.length; r++) {
		let line = '';
		for (let c = 0; c < cols; c++) {
			const s = String(matrix[r][c]);
			line += s.padStart(colWidths[c] + 1, ' ');
		}
		console.log(line.trimStart());
	}
}

function transposeMatrix(matrix) {
	const rows = matrix.length;
	const cols = matrix[0].length;
	const result = [];
	for (let c = 0; c < cols; c++) {
		const row = [];
		for (let r = 0; r < rows; r++) {
			row.push(matrix[r][c]);
		}
		result.push(row);
	}
	return result;
}

function addMatrices(A, B) {
	const m = A.length;
	const n = A[0].length;
	const result = [];
	for (let i = 0; i < m; i++) {
		const row = [];
		for (let j = 0; j < n; j++) {
			row.push(A[i][j] + B[i][j]);
		}
		result.push(row);
	}
	return result;
}

function multiplyMatrices(A, B) {
	const m = A.length;
	const n = A[0].length; // cols of A
	const p = B[0].length; // cols of B
	const result = [];
	for (let i = 0; i < m; i++) {
		const row = [];
		for (let j = 0; j < p; j++) {
			let sum = 0;
			for (let k = 0; k < n; k++) {
				sum += A[i][k] * B[k][j];
			}
			row.push(sum);
		}
		result.push(row);
	}
	return result;
}

function partA() {
	console.log('\nPART A — Transpose a Matrix');
	const rows = readlineSync.questionInt('Enter number of rows: ');
	const cols = readlineSync.questionInt('Enter number of columns: ');
	const matrix = readMatrix(rows, cols, 'Enter');
	console.log('\nOriginal Matrix:');
	printMatrix(matrix);
	const transposed = transposeMatrix(matrix);
	console.log('\nTransposed Matrix:');
	printMatrix(transposed);
}

function partB() {
	console.log('\nPART B — Add Two Matrices');
	const m = readlineSync.questionInt('Enter number of rows: ');
	const n = readlineSync.questionInt('Enter number of columns: ');
	console.log('Matrix A:');
	const A = readMatrix(m, n, 'Enter');
	console.log('Matrix B:');
	const B = readMatrix(m, n, 'Enter');
	const sum = addMatrices(A, B);
	console.log('\nResult (A + B):');
	printMatrix(sum);
}

function partC() {
	console.log('\nPART C — Multiply Two Matrices');
	const m = readlineSync.questionInt('Enter number of rows for matrix A: ');
	const n = readlineSync.questionInt('Enter number of columns for matrix A (and rows for matrix B): ');
	const p = readlineSync.questionInt('Enter number of columns for matrix B: ');
	console.log('Matrix A:');
	const A = readMatrix(m, n, 'Enter');
	console.log('Matrix B:');
	const B = readMatrix(n, p, 'Enter');
	const product = multiplyMatrices(A, B);
	console.log('\nResult (A x B):');
	printMatrix(product);
}

function main() {
	partA();
	partB();
	partC();
}

main();

