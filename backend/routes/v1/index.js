const express = require("express");
const userRoutes = require("./user.route");

const router = express.Router();

const routes = [
  {
    path: "/users",
    route: userRoutes,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
