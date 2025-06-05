require("module-alias/register");

const express = require("express");
const expressEjsLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");

const mainRouter = require("@/routes/api");
const adminRouter = require("@/routes/admin");

const handleNotFound = require("@/middlewares/handleNotFound");
const handleErrors = require("@/middlewares/handleErrors");
const session = require("@/middlewares/admin/session");
const shareLocals = require("@/middlewares//admin/shareLocals");
const checkAuth = require("@/middlewares/admin/checkAuth");

const app = express();
const port = 3001;

app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());
app.use(expressEjsLayouts);

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.set("layout", "admin/layouts/default");

app.use("/admin", session, shareLocals, checkAuth, adminRouter);
app.use("/api/v1/", mainRouter);

app.use(handleNotFound);
app.use(handleErrors);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
