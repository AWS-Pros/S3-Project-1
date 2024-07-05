const prisma = require("../prisma/prismaClient.js");

const createStudent = async (req, res) => {
  const { StudentName, Class, Age } = req.body;
  try {
    const student = await prisma.student.create({
      data: { StudentName, Class, Age },
    });
    await res.status(201).json(student);
  } catch (error) {
    console.error("Error creating student:", error.message, error.stack);
    res.status(500).json({ error: "Failed to create student" });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
};

const getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await prisma.student.findUnique({
      where: { StudentID: parseInt(id) },
    });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch student" });
  }
};

const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { StudentName, Class, Age } = req.body;
  try {
    const student = await prisma.student.update({
      where: { StudentID: parseInt(id) },
      data: { StudentName, Class, Age },
    });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: "Failed to update student" });
  }
};

const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await prisma.student.delete({
      where: { StudentID: parseInt(id) },
    });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete student" });
  }
};

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
