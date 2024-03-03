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

// PUT route to edit a post 
router.put("/:id", withAuth, async (req, res) => {
    try {
      // Use Post.update to update the post with the provided data
      const [updatedRowsCount] = await Post.update(req.body, {
        where: { id: req.params.id },
      });
      // Check if any rows were affected (updated)
      if (updatedRowsCount === 0) {
        res.status(404).json({ message: "No post found with that id!" });
        return;
      }
      // Retrieve the updated post after the update operation
      const updatedPost = await Post.findOne({
        where: { id: req.params.id },
      });
      // Respond with the updated post data
      res.status(200).json(updatedPost);
    } catch (err) {
      // If an error occurs during the update, respond with a 500 status and an error message
      res.status(500).json(err);
    }
  });
  