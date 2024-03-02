// Import necessary modules
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// GET route to Display all users
router.get('/', async (req, res) => {
    try {
        // Fetch all users with associated posts and comments
        const users = await User.findAll({
            include: [{ model: Post }, { model: Comment }],
            // Exclude the 'password' attribute to hide sensitive information
            attributes: { exclude: ['password'] }, 
        });

        // Respond with a JSON array of users
        res.status(200).json(users);
    } catch (err) {
        // Handle errors and respond with a 500 Internal Server Error
        res.status(500).json({ error: 'Failed to retrieve list of all users' });
    }
});

// Get route to Display single user by id
router.get('/:id', async (req, res) => {
    try {
        // Fetch the user with associated posts
        const user = await User.findByPk(req.params.id, {
            include: [{ model: Post }],
            attributes: { exclude: ['password'] }, 
        });
        if (!user) {
            // If the user does not exist, respond with a 404 Not Found status
            res.status(404).json({ error: 'User with that id not found'  });
            return;
        }
        // If the user exists, respond with the user data
        res.status(200).json(user);
    } catch (err) {
        // Handle other errors and respond with a 500 Internal Server Error
        res.status(500).json({ error: 'Failed to retrieve user data' });
    }
});


// POST route to create new user 
router.post('/signup', async (req, res) => {
    try {
        const usernameExists = await User.findOne({
            where: {username: req.body.username}
        });
        const emailExists = await User.findOne({
            where: {email: req.body.email}
        });

        if(!usernameExists && !emailExists){
            const newUser = {
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            }
            await User.create(newUser);

            res.status(200).json({error: "Successfully Signed Up"});
        }
    } catch(err) {
        res.status(500).json({error: "Failed to signup"});
    }
})


module.exports = router;
