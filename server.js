require("module-alias/register");

const express = require("express");
const mainRouter = require("@/routes");
const adminRouter = require("@/routes/admin");

const handleNotFound = require("@/middlewares/handleNotFound");
const handleErrors = require("@/middlewares/handleErrors");

const app = express();
const port = 3001;

app.use(express.static("public"));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "./src/views")

app.use("/admin", adminRouter);
app.use("/api/v1/", mainRouter);

app.use(handleNotFound);
app.use(handleErrors);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
