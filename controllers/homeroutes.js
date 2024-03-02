const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Post, User, Comment } = require('../models');

// GET route to homepage 
router.get('/', async (req, res) => {
    try {
        // Find all posts include username attribute
        const postData = await Post.findAll({
            // Specify to include model username attribute
            // Because of timestamps=true, the default behavior is to show updatedAt in descending order  
            include: [{ model: User, attributes: ['username',]}]

        });
        // Map through each post in the postData array and convert it to a plain JavaScript object
        const posts = postData.map((post) => post.get({ plain:true}));
        // Render homepage template and pass the posts and login status data
        res.render('homepage', {
            posts, // Render all posts, different than individual 
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        // If an error occurs, return a 500 status code 
        res.status(500).json(err);
    }
});