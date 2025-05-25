const express=require('express');
const router=express.Router();
const { getAllDriverSuggestions, addDriverSuggestion, getActiveDriverSuggestions, filterDriverSuggestions, deleteDriverSuggestion, updateDriverSuggestion}=require('../controllers/driverSuggestionController');
const verifyJWT = require('../middleware/verifyJWT');

router.get('/suggestions', getAllDriverSuggestions);
router.get('/suggestions/filter', filterDriverSuggestions);
router.get('/suggestions/active', getActiveDriverSuggestions);
router.post('/suggestions', verifyJWT, addDriverSuggestion);

router.delete('/suggestions/:id', verifyJWT, deleteDriverSuggestion);
router.put('/suggestions/:id', verifyJWT, updateDriverSuggestion);


module.exports=router;
