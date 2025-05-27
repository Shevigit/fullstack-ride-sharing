const express = require('express');
const { getAllComments, addComment } = require('../controllers/commensController');

const router = express.Router();
router.get('/', getAllComments);
router.post('/', addComment)

module.exports = router;