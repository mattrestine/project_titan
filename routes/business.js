// SETUP
var express  = require('express'),
    passport = require('passport'),
    Business = require('../models/business/businesses'),
    Address  = require('../models/address/addresses'),
    Contact  = require('../models/contact/contacts'),
    Image    = require('../models/image/images'),
    Comment  = require('../models/comment/comments'),
    middleware = require('../middleware');
var router = express.Router();
// ROUTES
// Business Index
router.get('/', function(req, res) {
    Business.find({}, function(err, data) {
        if(err) {
            req.flash('error', err.message);
            res.redirect('/');
        }
        res.render('business/business', {data:data, currentUser:req.user});
    });
});
// Register new business
router.get('/new', middleware.isLoggedIn, function(req, res) {
    res.render('business/new');
});
// Save new business to db
router.post('/', middleware.isLoggedIn, function(req, res) {
    var newData = {
        name: req.body.name,
        logo: req.body.logo,
        desc: req.body.desc,
        video: req.body.video,
        url: req.body.url,
        owner: req.user
    };
    Business.create(newData, function(err, data) {
        if(err) {
            req.flash('error', err.message);
            res.redirect('/business');
        }
        res.redirect('/business');
    });
});
// MODULE EXPORTS
module.exports = router;