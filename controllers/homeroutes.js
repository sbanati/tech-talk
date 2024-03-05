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
        // send to homepage.handlebars
        res.render('homepage', {
            posts, // Render all posts, different than individual 
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        // If an error occurs, return a 500 status code 
        res.status(500).json({error: 'Internal Server Error'});
    }
});



// GET route to dashboard that requires log-in 
router.get('/dashboard', withAuth, async (req, res) => {
    // If we try to go to the dashboard without logging in, we will be redirected to the login page
    try {
        const rawPosts = await Post.findAll({
            include: [{
                model: User,
                where: { username: req.session.username },
            }]
        });
        const posts = rawPosts.map((post) => post.get({ plain: true }));
        
        // Send posts to dashboard.handlebars
        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn,
            currentUser: req.session.username
        });
    } catch (err) {
        res.status(500).json(err);
    }
});



//GET request to be taken to LOGIN page 
router.get('/login', (req, res) =>{
    try {
        // send to login.handlebars
        res.render('login');
    }catch {
        res.status(500).json({error: 'Internal Server Error'});
    }
})


// Get request to be taken to CREATE POST page 
router.get('/createPost', withAuth, (req, res) => {
    try {
        // send to createPost.handlebars
        res.render('createPost',
        {
            loggedIn: req.session.loggedIn,
            user: {username: req.session.username}
        });
    }catch (err){
        res.json(err);
    }
});


// Get request to be taken to INDIVIDUAL POST & COMMENTS page 
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
        // send to post.handlebars 
        res.render('viewPost', {
            ...post,
            loggedIn: req.session.loggedIn,
        });
            
    } catch (err) {

        res.status(500).json(err);
    }
});


// GET request to go to EDIT PAGE to edit a singular post
router.get('/editpost/:id', withAuth, async (req, res) => {
    try {
        // Find the post by its ID
        const postData = await Post.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ['username'] },
                {
                    model: Comment,
                    include: [{ model: User, attributes: ['username'] }],
                },
            ],
        });
        // Check if the post with the given ID exists
        if (!postData) {
            res.status(404).json({ message: 'No post found with that ID' });
            return;
        }
        // Convert post data to a plain JS object
        const post = postData.get({ plain: true });
        // Render the 'editpost' template and pass the post data and login status
        res.render('editpost', {
            ...post,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        // Handle any errors that may occur during the process
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;
