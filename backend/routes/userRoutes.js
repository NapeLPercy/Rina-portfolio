const router = require("express").Router();
const {login, sendCode, verifyCode,resetCredentials } = require("../controllers/userController");

//router.post("/register", register);
router.post("/login", login);
router.post("/send-code",sendCode);
router.post("/verify-code",verifyCode);
router.post("/reset-password",resetCredentials);
module.exports = router;