const express = require('express');
const router = express.Router();
const {
  getAllDriverSuggestions,
  addDriverSuggestion,
  deleteDriverSuggestion,
  updateDriverSuggestion,
  getFoundById,
} = require('../controllers/driverSuggestionController'); 
const verifyJWT = require('../middleware/verifyJWT'); 
router.get('/', getAllDriverSuggestions);
router.post('/',verifyJWT, addDriverSuggestion)
router.get('/:id', getFoundById);
router.delete('/:id', verifyJWT, deleteDriverSuggestion);
router.put('/:id', verifyJWT, updateDriverSuggestion);
module.exports = router;