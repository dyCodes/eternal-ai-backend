const express = require('express');
const router = express.Router();

const reportRoutes = require('./report.routes');
const chatRoutes = require('./chat.routes');

router.use('/report', reportRoutes);
router.use('/chat', chatRoutes);

module.exports = router;
