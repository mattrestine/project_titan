// SETUP
var Business = require('../models/business/businesses');
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