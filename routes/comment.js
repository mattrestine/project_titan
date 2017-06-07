// SETUP
var User     = require('../models/user/users'),
    express  = require('express'),
    passport = require('passport'),
    Business = require('../models/business/businesses'),
    Comments  = require('../models/comment/comments'),
    middleware = require('../middleware')
    app = express();
var router = express.Router({mergeParams: true});
// ROUTES
// Comment New
router.get('/new', middleware.isLoggedIn, function(req, res) {
      Business.findById(req.params.id, function(err, data) {
        if(err) {
            console.log(err);
            //req.flash('error', err.message);
            res.redirect('/business');
        }
            res.render('comments/new', {data: data});
    });
});

//Comment Post
router.post('/', function(req, res){
    Business.findById(req.params.id, function(err, data){
        if(err){
            console.log(err);
            res.redirect('/business');
        } else {
            Comments.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err)
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    //--//
                    data.comments.push(comment);
                    data.save();
                    //--//
                    req.flash("success", "Success: Submission Completed!");
                    res.redirect('/business/' + data._id);
                }
            });
        }
    })
})

// Comment Get One (Edit Form)
// Comment Put One
// Comment Delete One
// MODULE EXPORTS
module.exports = router;