require("module-alias/register");

const express = require("express");
const mainRouter = require("@/routes");
const handleNotFound = require("@/middlewares/handleNotFound");
const handleErrors = require("@/middlewares/handleErrors");

const app = express();
const port = 3001;

app.use(express.static("public"));
app.use(express.json());
app.use("/api/v1/", mainRouter);

app.use(handleNotFound);
app.use(handleErrors);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
