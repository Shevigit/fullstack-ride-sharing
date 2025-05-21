const express = require("express")
const router = express.Router()
const {updateSuggestion}=require("../controllers/userController")

const verifyJWT= require("../middleware/verifyJWT")
router.use(verifyJWT)
router.post("/updateSuggestion",verifyJWT,updateSuggestion);
module.exports = router;