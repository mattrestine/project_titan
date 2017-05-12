// SETUP
var User     = require('../models/user/users'),
    router   = express.Router(),
    express  = require('express'),
    passport = require('passport');
// ROUTES
// Index Route
router.get('/', function(req, res) {
    res.render('landing');
});
// Register Route
router.get('/register', function(req, res) {
    res.render('register');
});
router.post('/register', function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            req.flash('error', err.message);
            return res.redirect('/register');
        }
        passport.authenticate('local')(req, res, function() {
            req.flash('success', 'Welcome to DBC, ' + user.username);
            res.redirect('/home');
        });
    });
});
