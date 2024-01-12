const { Router } = require("express");
const multer = require("multer");
const router = Router();
const upload = multer();

const fileControl = require("../controllers/file");

router.get("/:id", fileControl.getFiles);
router.post("/:id", upload.any(), fileControl.upload);
router.delete("/", fileControl.delete);

module.exports = router;
