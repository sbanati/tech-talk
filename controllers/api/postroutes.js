const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET route to display all posts 
router.get('/', async (req, res) => {
    try {
        const posts = await Post. findAll({ include: [{model: User}, {model: Comment}] });
        res.status(200).json(posts);

    }catch(err){
        res.status(500).json(err);
    }
})

// POST route to add a new post 
router.post('/', withAuth, async (req, res) => {
    try {
        // Create a new post using the Post model and user-provided data
        const newPost = await Post.create({
             // Use the spread operator to include all properties from the request body
            ...req.body,               
            // Set the user_id based on the authenticated user's session
            user_id: req.session.user_id, 
        });  
        // Respond with a JSON object containing the newly created post
        res.status(200).json(newPost);
    } catch (err) {
        // If an error occurs during the post creation, respond with a 400 status and an error message
        res.status(400).json(err);
    }  
});
