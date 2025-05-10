require("module-alias/register");

const express = require("express");
const mainRouter = require("@/routes");
const notFoundHandler = require("@/middlewares/notFoundHandler");
const errorHandler = require("@/middlewares/errorHandler");

const app = express();
const port = 3001;

app.use(express.static("public"));
app.use(express.json());
app.use("/api/v1/", mainRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
