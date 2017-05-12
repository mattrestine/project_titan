// SETUP
var User     = require('../models/user/users'),
    express  = require('express'),
    passport = require('passport');
var router = express.Router();
// ROUTES
// Landing Route
router.get('/', function(req, res) {
    res.render('landing');
});
// Home Route
router.get('/home', function(req, res) {
    res.render('home');
});
// Register Route
router.get('/register', function(req, res) {
    res.render('register');
});
router.post('/register', function(req, res) {
    var newUser = new User({username:req.body.username, firstname:req.body.firstname, lastname:req.body.lastname});
    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            req.flash('error', err.message);
            return res.redirect('/register');
        }
        passport.authenticate('local')(req, res, function() {
            req.flash('success', 'Welcome to DBC, ' + user.firstname);
            res.redirect('/home');
        });
    });
});
// Login Route
router.get('/login', function(req, res) {
    res.render('login');
});
router.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login'
}), function(req, res) {
    /*blank*/
});
// Logout Route
router.get('/logout', function(req, res) {
    req.logout();
    req.flash('success', 'You have logged out.');
    res.redirect('/home');
});
//Module Export
module.exports = router;