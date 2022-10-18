const pool = require("../../db");
const queries = require("./queries");

const getStudents = (req, res) => {
  pool.query(queries.getStudents, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getStudentsById = (req, res) => {
  const { id } = req.params;

  pool.query(queries.getStudentsById, [id], (error, results) => {
    if (error) {
      res.status(400).json(error);
      console.log(error);
    }
    if (results) {
      res.status(200).json(results.rows);
      res.send(id);
    }
  });
};

const getStudentsByCredentials = (req, res) => {
  const { email } = req.body;
  const { password } = req.body;

  pool.query(
    queries.getStudentsByCredentials,
    [email, password],
    (error, results) => {
      console.log(results);
      if (error) throw error;
      res.status(200).json(results.rows);
    }
  );
};

const getStudentsByEmailPassword = (req, res) => {
  const { email } = req.query;
  const { password } = req.query;

  pool.query(
    queries.getStudentsByEmailPassword,
    [email, password],
    (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    }
  );
};

const addStudent = (req, res) => {
  const { name, email, password, birth } = req.body;
  // check apakah email tersedia
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (results.rows.length) {
      res.send("Email sudah terdaftar");
    }

    // jika email belum ada, tambahkan email ke database
    pool.query(
      queries.addStudent,
      [name, email, password, birth],
      (error, results) => {
        if (error) throw error;
        res.status(201).send("Data berhasil ditambahkan");
      }
    );
  });
};

const removeStudent = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getStudentsById, [id], (error, results) => {
    const noStudentFound = !results.rows.length;
    if (noStudentFound) {
      res.send("Data tidak tersedia");
    }

    pool.query(queries.removeStudent, [id], (error, results) => {
      if (error) throw error;
      res.status(200).send("Data berhasil dihapus");
    });
  });
};

const updateStudent = (req, res) => {
  if (!req.params.id) {
    console.log(typeof req.params.id);
    res.status(405).send("Data tidak tersedia");
  }
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentsById, [id], (error, tmp) => {
    if (error) {
      res.status(400).send(error);
      throw error;
    }

    pool.query(queries.getStudentsById, [id], (error, results) => {
      const noStudentFound = !results.rows.length;
      if (noStudentFound) {
        res.send("Data tidak tersedia");
      }
    });

    const name = req?.body?.name ? req?.body?.name : tmp.rows[0].name;
    const email = req?.body?.email ? req?.body?.email : tmp.rows[0].email;
    const password = req?.body?.password
      ? req?.body?.password
      : tmp.rows[0].password;
    const birth = req?.body?.birth ? req?.body?.birth : tmp.rows[0].birth;
    console.log("vars", name, email, password, birth);
    //res.status(200).send(id, name, email, password, birth);

    pool.query(
      queries.updateStudent,
      [id, name, email, password, birth],
      (error, results) => {
        if (error) throw error;
        console.log(results);
        res.status(200).send(id, name, email, password, birth);
      }
    );
    //console.log(tmp); testing
  });
};

module.exports = {
  getStudents,
  getStudentsById,
  addStudent,
  removeStudent,
  updateStudent,
  getStudentsByEmailPassword,
  getStudentsByCredentials,
};
