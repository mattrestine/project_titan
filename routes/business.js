// SETUP
var express  = require('express'),
    passport = require('passport'),
    Business = require('../models/business/businesses'),
    Comments  = require('../models/comment/comments'),
    middleware = require('../middleware')
    app = express();
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
        var logo  = req.body.logo;
        var desc  = req.body.desc;
        var video = req.body.video;
        var url   = req.body.url;
        var owner = {
            id: req.user._id,
            firstname: req.user.firstname,
            lastname: req.user.lastname
        };
        var address = {
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode
        };
        var images = {
            img0: req.body.img0,
            img1: req.body.img1,
            img2: req.body.img2,
            img3: req.body.img3,
            img4: req.body.img4
        };
        var newData = { bname:bname, logo:logo, desc:desc, video:video, url:url, owner:owner, address:address, images:images};
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
    Business.findById(req.params.id).populate("comments").exec(function(err, data) {
        if(err) {
            req.flash('error', err.message);
            res.redirect('/business/' + req.params.id);
        }
        res.render('business/show', {data:data});
    });
});
// Business Edit (Edit One)
router.get('/:id/edit', middleware.isLoggedIn, function(req, res) {
    Business.findById(req.params.id, function(err, data) {
        if(err) {
            console.log(err);
            req.flash('error', err.message);
            res.redirect('back');
        }
        res.render('business/edit', {data:data});
    });
});
// Business PUT
router.put('/:id', middleware.isLoggedIn, function(req, res){
    Business.findByIdAndUpdate(req.params.id, req.body.data, function(err, update){
        if(err){
            req.flash('error', err.message);
            req.redirect('back')
        } else {
            req.flash('success', req.body.data.bname + " have been successfully updated.");
            res.redirect('/business/' + req.params.id);          
        }
    });
});
// Business Delete (Delete One)
router.delete('/:id', middleware.isLoggedIn, function(req, res){
    Business.findByIdAndRemove(req.params.id, req.body.data, function(err){
        if(err){
            req.flash('error', err.message);
            res.redirect('back');
        } else {
             req.flash('success', "Your business has been deleted.");
             res.redirect('/business');
        }
       }); 
});



// MODULE EXPORTS
module.exports = router;