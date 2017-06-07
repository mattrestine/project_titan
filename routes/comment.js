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
            req.flash('error',  err.message);
        } else {
            res.render('comments/new', {data: data});
        }      
    });
});

//Comment Post
router.post('/', middleware.isLoggedIn, function(req, res){
    Business.findById(req.params.id, function(err, data){
        if(err){
            console.log(err);
            req.flash('error', err.message);
            res.redirect('/business');
        } else {
            Comments.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash('error',  err.message);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    //--//
                    data.comments.push(comment);
                    data.save();
                    //--//
                    req.flash('success', "Success: Submission Completed!");
                    res.redirect('/business/' + data._id);
                }
            });
        }
    });
});

// Comment Get One (Edit Form)
router.get('/:comment_id/edit', function(req, res){
    Comments.findById(req.params.comment_id, function(err, editComment){
        if(err){
            req.flash('error', err.message);
            res.redirect('back')
        } else {
            res.render('comments/edit', {data_id: req.params.id, comment: editComment});
        }
    });   
});
// Comment Put One
router.put('/:comment_id', function(req, res){
    Comments.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updateComments){
        if(err){
            req.flash('error', err.message);
            res.redirect('back');
        } else {
            req.flash('success', "Success: Submission Updated");
            res.redirect('/business/' + req.params.id);
        }
    });
});

// Comment Delete One
router.delete('/:comment_id', function(req, res){
    Comments.findByIdAndRemove(req.params.comment_id, req.body.comment, function(err){
        if(err){
            res.redirect('back');
        } else {
            req.flash('success', "Success: Submission Deleted");
            res.redirect('/business/' + req.params.id);
        }
    })
})

// MODULE EXPORTS
module.exports = router;