const express = require('express');
const app = express();

app.use(express.json());

let students = [
    { id: 1, name: 'Kirti', course: "Laravel" },
    { id: 2, name: 'Laksh', course: "Node.js" },
    { id: 3, name: 'Nikihil', course: "Node.js" },
];

app.get('/students', (req, res) => {
    res.json(students);
});

app.get('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(s => s.id == id);

    if (!student) {
        return res.status(404).json(
            {
                message: "Student Not Found"
            }
        );
    }

    res.json(student);

});



app.get('/search', (req, res) => {
    const course = req.query.course;

    const filteredStudents = students.filter(
        s => s.course === course
    );

    res.json(filteredStudents);
});

app.post('/students', (req, res) => {
    const { name, course } = req.body;

    const newStudent = {
        id: students.length + 1,
        name,
        course
    };

    students.push(newStudent);

    res.status(201).json(
        {
            message: "Student Added Successfully",
            student: newStudent
        }
    );

});

app.put('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const studentsIndex = students.find(s => s.id === id);

    if (!studentsIndex) {
        return res.status(404).json(
            {
                message: "Student Not Found"
            }
        )
    }

    students.name = req.body.name || studentsIndex.name;
    students.course = req.body.curse || studentsIndex.course;

    res.json({
        message: "Student updated",
        studentsIndex
    });
});

app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  students.splice(index, 1);

  res.json({ message: "Student deleted" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

