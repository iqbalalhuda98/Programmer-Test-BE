const getStudents = "SELECT * FROM students";
const getStudentsById = "SELECT * FROM students WHERE id = $1";
const checkEmailExists = "SELECT s FROM students s WHERE s.email = $1";
const addStudent =
  "INSERT INTO students (name, email, password, birth) VALUES ($1, $2, $3, $4)";
const removeStudent = "DELETE FROM students WHERE id = $1";
const updateStudent =
  "UPDATE students SET name = ($2), email = ($3), password = ($4), birth = TO_TIMESTAMP($5, 'yyyy-mm-dd') WHERE id = ($1)";
const getStudentsByEmailPassword =
  "SELECT * FROM students WHERE email = ($1) AND password = ($2)";
const getStudentsByCredentials =
  "SELECT * FROM students WHERE email = ($1) AND password = ($2)";

module.exports = {
  getStudents,
  getStudentsById,
  checkEmailExists,
  addStudent,
  removeStudent,
  updateStudent,
  getStudentsByEmailPassword,
  getStudentsByCredentials,
};
