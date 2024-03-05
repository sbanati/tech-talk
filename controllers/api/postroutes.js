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

// Get route to display individual post by id and show comments associated with the post
router.get("/:id", async (req, res) => {
    try {
      // Find the post by its primary key (ID)
      const postData = await Post.findByPk(req.params.id, {
        // Include associated User model to get the post's username
        include: [
          { model: User, attributes: ["username"] },
          {
            // Include associated Comment model with nested User model to get comments and their usernames
            model: Comment,
            include: [{ model: User, attributes: ["username"] }],
          },
        ],
      });
      // Check if the post with the given ID exists
      if (!postData) {
        // If not found, respond with a 404 status and an error message
        res.status(404).json({ message: "No post found with that id!" });
        return;
      }
  
      // Respond with a 200 status and the data about the requested post
      res.status(200).json(postData);
    } catch (err) {
      // If an error occurs during the retrieval, respond with a 500 status and the error details
      res.status(500).json(err);
    }
  });
  

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
        console.log(err)
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

// DELETE route to delete a post 
router.delete('/:id', withAuth, async (req, res) => {
    try {
        // Check if the post exists by finding it using its primary key
        const existingPost = await Post.findByPk(req.params.id);
        // If the post is not found, respond with a 404 status and an error message
        if (!existingPost) {
            res.status(404).json({ error: 'Post Not Found' });
            return;
        }
        // Delete all the comments attached to the post using Comment model
        await Comment.destroy({
            where: { post_id: req.params.id },
        });
        // Now, delete the post itself using the destroy method on the existingPost instance
        const deletedPost = await existingPost.destroy();
        // Respond with a 200 status and the data about the deleted post
        res.status(200).json(deletedPost);
    } catch (err) {
        // If an error occurs during the deletion, respond with a 500 status and the error details
        res.status(500).json(err);
    }
});

  
  // Export the router
  module.exports = router; 