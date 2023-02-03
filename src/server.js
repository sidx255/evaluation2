
const express = require("express");
const Router = require("./routes/route");
const app = express();
const port = 3000;
//app.use(express.json());
app.use(express.json());

// add route here
app.use("/", Router);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
