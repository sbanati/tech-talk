const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Post, User, Comment } = require('../models');

// GET route to the HOME page 
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
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        // If an error occurs, return a 500 status code 
        res.status(500).json({error: 'Internal Server Error'});
    }
});


// GET request to DASHBOARD page
router.get('/dashboard', withAuth, async (req, res) => {
    // If no authentication, redirect to login page
    try {
        const postData = await Post.findAll({
            where: { user_id: req.session.user_id },
            include: [{ model: User, attributes: ['username'] }],
            
        });
        // Convert post data to JS object 
        const posts = postData.map((post) => post.get({plain: true}));

        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn,
        });
    }catch (err){
        res.status(500).json(err)
    }
});

//GET request to LOGIN page 
router.get('/login', (req, res) =>{
    try {
        res.render('login');
    }catch {
        res.status(500).json({error: 'Internal Server Error'});
    }
})


// Get request to CREATE POST page 
router.get('/createPost', withAuth, (req, res) => {
    try {
        res.render('create-post',
        {
            loggedIn: req.session.loggedIn,
            user: {username: req.session.username}
        });
    }catch (err){
        res.json(err);
    }
});


// Get request to INDIVIDUAL POST & COMMENTS page 
router.get('/post/:id', withAuth, async (req, res) =>{
    try  {

        const postData = await Post.findByPk(req.params.id, {
            include: [
                {model: User, attributes: ['username']},
                {
                    model: Comment, 
                    include: [{ model: User, attributes: ['username']}],
                },
            ],
        });
        // Convert to plain JS object 
        const post = postData.get({ plain: true });
        // Render post template 
        res.render('post', {
            ...post,
            loggedIn: req.session.loggedIn,
        });
            
    } catch (err) {

        res.status(500).json(err);
    }
});


















module.exports = router;