const express = require('express');
const { getTasks, createTask } = require('../controllers/taskController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/',auth, getTasks);
router.post('/',auth, createTask);

module.exports = router;