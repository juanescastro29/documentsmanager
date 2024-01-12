const { Router } = require("express");
const router = Router();

const userControl = require("../controllers/user");

router.get("/", userControl.getUsers);

router.post("/", userControl.createUser);

router.post("/login", userControl.login);

router.put("/:id", userControl.updateUser);

router.delete("/:id", userControl.deleteUser);

module.exports = router;
