const express = require("express");
const mainRouter = require("./routes");

const app = express();
const port = 3001;

app.use(express.static("public"));
app.use(express.json());
app.use("/", mainRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
