// fileSystem.js

const fs = require('fs');

// Create a file
fs.writeFileSync('student.txt', 'Student Name: Afzal\n');
console.log("File created successfully.");

// Append data to the file
fs.appendFileSync('student.txt', 'Course: Backend Engineering\n');
console.log("Data appended successfully.");

// Read data from the file
const data = fs.readFileSync('student.txt', 'utf8');
console.log("File Content:\n", data);

// Delete file (optional)
// fs.unlinkSync('student.txt');
// console.log("File deleted successfully.");