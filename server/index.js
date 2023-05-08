// const express = require("express");
// const cors = require("cors");

// const app = express();

// app.use(cors());

// app.get("/test", (req, res) => {
//   const message = "hello you reached the endpoint";
//   console.log(message);
//   const filePath = path.join();
//   res.sendFile(filePath);
// });

// app.listen(3000, () => {
//   console.log("server was started on port 3000 ");
// });
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "../client")));

app.get("/test", (req, res) => {
  const message = "hello you reached the endpoint";
  console.log(message);

  const filePath = path.join(__dirname, "../client", "test.html");
  res.sendFile(filePath);
});

app.listen(3000, () => {
  console.log("server was started on port 3000 ");
  console.log(__dirname);
});
