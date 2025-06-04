const express = require('express');
const router = express.Router();
const {
  getAllDriverSuggestions,
  addDriverSuggestion,
  deleteDriverSuggestion,
  updateDriverSuggestion,
  getFoundById,
  joinSuggestion,
  createSuggestion
} = require('../controllers/driverSuggestionController'); 
const verifyJWT = require('../middleware/verifyJWT'); 
router.get('/', getAllDriverSuggestions);
router.post('/', addDriverSuggestion)
router.get('/:id',verifyJWT, getFoundById);
router.delete('/:id', verifyJWT, deleteDriverSuggestion);
router.put('/:id', verifyJWT, updateDriverSuggestion);
router.put('/:suggestionId/joinSuggestion', joinSuggestion)
router.post('/createSuggestion', createSuggestion);
module.exports = router;