const express = require("express");
const userRoutes = require("./user.route");
const adminRoutes = require("./admin.route");

const router = express.Router();

const routes = [
  {
    path: "/users",
    route: userRoutes,
  },
  // {
  //   path : "/admins",
  //   route: adminRoutes,
  // }
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
