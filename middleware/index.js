// SETUP
var Business      = require('../models/business/businesses');
var Comment       = require('../models/comment/comments');
var middlewareObj = {};

// OWNERSHIP
//Business Owner
middlewareObj.businessOwnerQ = function(req, res, next) {
    if(req.isAuthenticated()) {
        Business.findById(req.params.id, function(err, bus) {
            if(err) {
                req.flash('error', 'Business you are looking for does not exist in our database!');
                res.redirect('/business');
            } else {
                if(bus.owner.id.equals(req.currentUser._id)) {
                    next();
                } else {
                    req.flash('error', 'Access Denied! You do not have permission to do that.');
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', 'Please login first.');
        res.redirect('/login');
    }
};

//Comments Ownership
middlewareObj.isCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if(err) {
                req.flash('error', err.message);
                res.redirect('/business/' + req.params.id);
            } else {
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', 'Access Denied! You do not have permission to do that.');
                    res.redirect('/business/' + req.params.id);
                }
            }
        });
    } else {
        req.flash('error', 'Please login first.');
        res.redirect('/login');
    }
};

// LOGIN STATUS
middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'Please login first.');
    res.redirect('/login');
};
//MODULE EXPORTS
module.exports = middlewareObj;