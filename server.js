const express = require("express");
const studentRoutes = require("./src/student/routes");
const cors = require("cors");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req.body);
  res.send("Hello World");
});
app.post("/test", (req, res) => {
  console.log(req);
  res.send("test");
});

app.use("/api/v1/students", studentRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));
