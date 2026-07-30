// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 8
// =============================================================================
//
// TASK: Student Record Management System
//
// Build a console-based program that stores and manages student information.
// Each student is represented as a JavaScript object containing:
//
//   - name   : the student's full name  (string)
//   - id     : a unique student ID number (number, e.g. 20240001)
//   - scores : an array of scores from multiple assessments (e.g. [75, 88, 90])
//
// Example object:
//   { name: "Alice Mensah", id: 20240001, scores: [78, 85, 90] }
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_08_student_records.js
//
// -----------------------------------------------------------------------------
// FEATURES YOUR PROGRAM MUST SUPPORT
// -----------------------------------------------------------------------------
//
//   1. Add a Student
//      - Ask the user to enter the student's name and ID.
//      - Ask how many scores to enter, then collect each score one by one.
//      - Save the student object and confirm it was added.
//
//   2. Display All Students
//      - Print a formatted table showing every student's:
//          Name, ID, individual scores, and their average score.
//      - If no students have been added yet, print a message saying so.
//
//   3. Calculate Average Score for a Specific Student
//      - Ask the user to enter a student ID.
//      - Find the student and print their average score.
//      - If the ID is not found, print an error message.
//
//   4. Quit
//
// -----------------------------------------------------------------------------
// HOW THE MENU SHOULD LOOK
// -----------------------------------------------------------------------------
//
//   ================================
//      STUDENT RECORD SYSTEM MENU
//   ================================
//   1. Add student
//   2. Display all students
//   3. Calculate average score
//   4. Quit
//   Enter your choice (1-4):
//
// -----------------------------------------------------------------------------
// EXPECTED INTERACTION EXAMPLE
// -----------------------------------------------------------------------------
//
//   Enter your choice (1-4): 1
//   Student name: Alice Mensah
//   Student ID: 20240001
//   How many scores? 3
//   Enter score 1: 78
//   Enter score 2: 85
//   Enter score 3: 90
//   Student "Alice Mensah" added successfully.
//
//   Enter your choice (1-4): 3
//   Enter student ID: 20240001
//   Alice Mensah's average score: 84.33
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Store all student records in an array of objects.
// - Average scores must be displayed to 2 decimal places (use .toFixed(2)).
// - Each feature MUST be in its own function (see scaffold below).
// - Handle invalid menu choices and missing student IDs gracefully.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readline = require('readline-sync');

let students = [];

function promptNumber(promptText) {
	const ans = readline.question(promptText);
	const num = Number(ans);
	if (!Number.isFinite(num)) return null;
	return num;
}

function addStudent(studentsArr) {
	const name = readline.question('Student name: ').trim();
	if (name.length === 0) {
		console.log('Name cannot be empty.');
		return;
	}
	const idInput = readline.question('Student ID: ').trim();
	const id = Number(idInput);
	if (!Number.isInteger(id)) {
		console.log('Invalid ID. Please enter a numeric ID.');
		return;
	}

	const countInput = readline.question('How many scores? ').trim();
	const count = Number(countInput);
	if (!Number.isInteger(count) || count < 0) {
		console.log('Invalid number of scores.');
		return;
	}

	const scores = [];
	for (let i = 0; i < count; i++) {
		const s = promptNumber(`Enter score ${i + 1}: `);
		if (s === null || s < 0) {
			console.log('Invalid score. Please enter a non-negative number.');
			return;
		}
		scores.push(s);
	}

	studentsArr.push({ name, id, scores });
	console.log(`Student "${name}" added successfully.`);
}

function average(scores) {
	if (!scores || scores.length === 0) return 0;
	const sum = scores.reduce((a, b) => a + b, 0);
	return sum / scores.length;
}

function displayAllStudents(studentsArr) {
	if (studentsArr.length === 0) {
		console.log('No students have been added yet.');
		return;
	}
	console.log('\nName\t| ID\t| Scores\t| Average');
	console.log('--------------------------------------------------------');
	for (const s of studentsArr) {
		const avg = average(s.scores).toFixed(2);
		console.log(`${s.name}\t| ${s.id}\t| [${s.scores.join(', ')}]\t| ${avg}`);
	}
}

function calculateAverageForStudent(studentsArr) {
	const idInput = readline.question('Enter student ID: ').trim();
	const id = Number(idInput);
	if (!Number.isInteger(id)) {
		console.log('Invalid ID.');
		return;
	}
	const found = studentsArr.find(s => s.id === id);
	if (!found) {
		console.log('Student ID not found.');
		return;
	}
	const avg = average(found.scores).toFixed(2);
	console.log(`${found.name}'s average score: ${avg}`);
}

function showMenu() {
	console.log('\n================================');
	console.log('   STUDENT RECORD SYSTEM MENU');
	console.log('================================');
	console.log('1. Add student');
	console.log('2. Display all students');
	console.log('3. Calculate average score');
	console.log('4. Quit');
}


while (true) {
	showMenu();
	const choice = readline.question('Enter your choice (1-4): ').trim();
	switch (choice) {
		case '1':
			addStudent(students);
			break;
		case '2':
			displayAllStudents(students);
			break;
		case '3':
			calculateAverageForStudent(students);
			break;
		case '4':
			console.log('Goodbye!');
			process.exit(0);
		default:
			console.log('Invalid choice. Please enter a number between 1 and 4.');
	}
}

