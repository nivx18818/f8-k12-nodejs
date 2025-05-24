const { throw404 } = require("./throwError");

const models = {
  posts: ["post", require("@/models/posts.model")],
  comments: ["comment", require("@/models/comments.model")],
  users: ["user", require("@/models/users.model")],
};

const attachResourceLoaders = (router, ...resources) => {
  resources.forEach((resource) => {
    router.param("id", async (req, res, next, id) => {
      const [name, model] = models[resource];
      const value = await model.findById(id);
      const errorMessage = `${name.toUpperCase() + name.slice(1)} not found`;

      if (!resource) {
        throw404(errorMessage);
      }

      req[name] = value;
      next();
    });
  });
};

module.exports = attachResourceLoaders;
