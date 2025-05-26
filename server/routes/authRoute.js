const express = require("express")
const router = express.Router()
const {login,register}=require("../controllers/authController");
const verifyJWT = require("../middleware/verifyJWT");

router.post("/register",register);
router.post("/login",login);
module.exports = router;