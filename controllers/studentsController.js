// controllers/studentsController.js
// Simple in-memory "database" so the API works out of the box.
// (On Vercel serverless this resets on cold start — swap for a real DB later.)

let students = [
  { id: 1, name: "Umar Nagra", department: "Computer Science", semester: 6, cgpa: 3.7 },
  { id: 2, name: "Ali Raza", department: "Software Engineering", semester: 4, cgpa: 3.4 },
  { id: 3, name: "Sara Khan", department: "Cybersecurity", semester: 8, cgpa: 3.9 },
  { id: 4, name: "Hamza Tariq", department: "Computer Science", semester: 2, cgpa: 3.2 },
];

let nextId = students.length + 1;

// GET /api/students
// GET /api/students?department=Computer Science
const getAllStudents = (req, res) => {
  const { department, semester } = req.query;
  let result = students;

  if (department) {
    result = result.filter(
      (s) => s.department.toLowerCase() === department.toLowerCase()
    );
  }

  if (semester) {
    result = result.filter((s) => s.semester === Number(semester));
  }

  res.status(200).json({
    success: true,
    count: result.length,
    data: result,
  });
};

// GET /api/students/:id
const getStudentById = (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: `Student with id ${id} not found`,
    });
  }

  res.status(200).json({ success: true, data: student });
};

// POST /api/students
const createStudent = (req, res) => {
  const { name, department, semester, cgpa } = req.body || {};

  if (!name || !department) {
    return res.status(400).json({
      success: false,
      message: "name and department are required fields",
    });
  }

  const newStudent = {
    id: nextId++,
    name,
    department,
    semester: semester ?? null,
    cgpa: cgpa ?? null,
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: "Student created successfully",
    data: newStudent,
  });
};

// PUT /api/students/:id
const updateStudent = (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: `Student with id ${id} not found`,
    });
  }

  const { name, department, semester, cgpa } = req.body || {};

  if (name !== undefined) student.name = name;
  if (department !== undefined) student.department = department;
  if (semester !== undefined) student.semester = semester;
  if (cgpa !== undefined) student.cgpa = cgpa;

  res.status(200).json({
    success: true,
    message: "Student updated successfully",
    data: student,
  });
};

// DELETE /api/students/:id
const deleteStudent = (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Student with id ${id} not found`,
    });
  }

  const [removed] = students.splice(index, 1);

  res.status(200).json({
    success: true,
    message: "Student deleted successfully",
    data: removed,
  });
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
