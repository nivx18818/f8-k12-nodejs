const checkAuth = (req, res, next) => {
  const authPaths = ["/login", "/register", "/verify-email", "/forgot-password"];
  const isAuthRequired = !authPaths.includes(req.path);

  if (!res.locals.auth && isAuthRequired) {
    res.flash("warning", "Please login to access this page.");
    return res.redirect("/admin/login");
  }

  if (res.locals.auth && isAuthRequired && !res.locals.auth.verified_at) {
    res.flash("error", "Please verify your email to access this page.");
    return res.redirect("/admin/login");
  }

  if (res.locals.auth && !isAuthRequired && res.locals.auth.verified_at) {
    return res.redirect("/admin/dashboard");
  }

  next();
};

module.exports = checkAuth;
