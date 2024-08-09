const express = require('express');
const router = express.Router();

const reportRoutes = require('./report.routes');

router.use('/report', reportRoutes);

module.exports = router;
