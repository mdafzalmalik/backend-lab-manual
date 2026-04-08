const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/collegeDB')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Create Schema
const studentSchema = new mongoose.Schema({
    name: String,
    course: String,
    year: Number
});

// Create Model
const Student = mongoose.model('Student', studentSchema);

// Insert Data
const insertStudent = async () => {
    const student = new Student({
        name: "Afzal",
        course: "Backend Engineering",
        year: 3
    });

    await student.save();
    console.log("Student inserted");
};

insertStudent();