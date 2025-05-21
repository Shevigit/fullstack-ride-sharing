const express = require("express")
const router = express.Router()

const {addSuggestion,searchSuggestion,updateSuggestion}=require("../controllers/driverSuggestionController")

const verifyJWT= require("../middleware/verifyJWT")
router.use(verifyJWT)
router.post("/addSuggestion",verifyJWT,addSuggestion);
router.post("/searchSuggestion",verifyJWT,searchSuggestion);
router.post("/updateSuggestion",verifyJWT,updateSuggestion);

module.exports = router;