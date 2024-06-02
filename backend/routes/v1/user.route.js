const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user.controller");

router.post("/login", userController.login);

router.post("/register", userController.register);

router.use(userController.authMiddleware);

router.get("/me", userController.getMe, userController.getUser);

module.exports = router;