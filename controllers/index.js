// Set up routes for homepage and posts dashboard
const router = require('express').Router();

// Files that are being connected
const homeRoutes = require('./homeroutes')
const postsRoutes = require('./api/postroutes')
const userRoutes = require('./api/userroutes')
const commentRoutes = require('./api/commentroutes')

// connecting files to routes
router.use('/', homeRoutes);
router.use('/api/posts', postsRoutes);
router.use('/api/user', userRoutes);
router.use('/api/comment', commentRoutes);


// export 
module.exports = router;