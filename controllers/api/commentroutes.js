const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// POST route to make a new comment 
router.post('/', withAuth, async (req, res) => {
    try {
        // Create a new comment with the provided data and associate it with the authenticated user
        const newComment = await Comment.create({
             // Spread the request body to include comment content
            ...req.body,
            // Set the user_id based on the authenticated user's session         
            user_id: req.session.user_id,  
        });
        // Respond with a JSON object containing the newly created comment data
        res.status(200).json(newComment);
    } catch (err) {
        // If an error occurs during the comment creation, respond with a 400 status and an error message
        res.status(400).json({error: 'Failed to create comment'});
    }
});

module.exports = router;

