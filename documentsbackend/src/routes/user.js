const { Router } = require("express");
const router = Router();

const userControl = require("../controllers/user");

router.post("/", userControl.createUser);

router.post("/login", userControl.login);

module.exports = router;
