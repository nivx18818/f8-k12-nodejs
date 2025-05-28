require("module-alias/register");

const express = require("express");
const mainRouter = require("@/routes/api");
const adminRouter = require("@/routes/admin");

const handleNotFound = require("@/middlewares/handleNotFound");
const handleErrors = require("@/middlewares/handleErrors");
const expressEjsLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const handleSession = require("@/middlewares/admin/handleSession");

const app = express();
const port = 3001;

app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());
app.use(expressEjsLayouts);

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.set("layout", "admin/layouts/default");

app.use("/admin", handleSession, adminRouter);
app.use("/api/v1/", mainRouter);

app.use(handleNotFound);
app.use(handleErrors);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
