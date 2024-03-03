// Import 
const router = require('express').Router();
const userRoutes = require('./userroutes');
const postRoutes = require('./postroutes');
const commentRoutes = require('./commentroutes');

// Setup routes 
// routes for user functionality
router.use('/users', userRoutes);
// routes for post functionality
router.use('/posts', postRoutes);
// routes for comment functionality
router.use('/comments', commentRoutes);

module.exports = router;