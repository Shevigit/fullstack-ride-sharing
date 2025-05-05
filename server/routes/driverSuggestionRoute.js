const express=require('express');
const router=express.Router();
const {addDriverSuggestion,getAllDriverSuggestions}=require('../controllers/driverSuggestionController');
router.post('/',addDriverSuggestion);
router.get('/',getAllDriverSuggestions);
module.exports=router;
