const withAuth = (req, res, next) => {
    // Redirect user to the login page if falsey
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        // If the login is truthy, execute following code
        next();
    }
};

module.exports = withAuth;