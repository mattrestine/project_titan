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
// Business Index (Show All)
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
    
        var bname = req.body.bname;
        var logo = req.body.logo;
        var desc = req.body.desc;
        var video = req.body.video;
        var url = req.body.url;
        var owner = {
            id: req.user._id,
            firstname: req.user.firstname,
            lastname: req.user.lastname
        };
        var newData = {bname:bname, logo:logo, desc:desc, video:video, url:url, owner:owner};
    Business.create(newData, function(err, data) {
        if(err) {
            req.flash('error', err.message);
            res.redirect('/business');
        }
        req.flash('success', 'Added new business: ', req.body.bname);
        res.redirect('/business');
    });
});
// Business Index (Show One)
router.get('/:id', middleware.isLoggedIn, function(req, res) {
    Business.findById(req.params.id, function(err, data) {
        if(err) {
            console.log(err);
            req.flash('error', err.message);
        }
        res.render('business/show', {data:data});
    });
});
// MODULE EXPORTS
module.exports = router;