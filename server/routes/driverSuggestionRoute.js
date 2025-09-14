const express = require('express');
const router = express.Router();
const {
  getAllDriverSuggestions,
  addDriverSuggestion,
  deleteDriverSuggestion,
  updateDriverSuggestion,
  getFoundById,
getDriverSuggestions,
  joinSuggestion,
  createSuggestion,
  getPassengerSuggestions
} = require('../controllers/driverSuggestionController'); 
const verifyJWT = require('../middleware/verifyJWT'); 
router.get('/', getAllDriverSuggestions);
router.post('/', verifyJWT, addDriverSuggestion);
router.get('/:id',verifyJWT, getFoundById);
router.delete('/:id', verifyJWT, deleteDriverSuggestion);
router.put('/:id', verifyJWT, updateDriverSuggestion);
router.put('/:suggestionId/joinSuggestion',verifyJWT, joinSuggestion)
router.post('/createSuggestion',verifyJWT, createSuggestion);
router.get('/driver/:driverId',verifyJWT, getDriverSuggestions);
router.get('/passenger/:userId',verifyJWT, getPassengerSuggestions);



module.exports = router;