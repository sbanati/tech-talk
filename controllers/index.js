// Set up routes for homepage and posts dashboard
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeroutes');

// Route setup 
router.use('api', apiRoutes);
router.use('/', homeRoutes);

// export 
module.exports = router;