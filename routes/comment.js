// SETUP
var User     = require('../models/user/users'),
    express  = require('express'),
    passport = require('passport'),
    Business = require('../models/business/businesses'),
    Comment  = require('../models/comment/comments'),
    middleware = require('../middleware')
    app = express();
var router = express.Router({mergeParams: true});
// ROUTES
// Comment New
router.get('/new', function(req, res) {
      Business.find(req.params.id, function(err, data) {
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
    //seek for business ID
    //create post
})

// Comment Get One (Edit Form)
// Comment Put One
// Comment Delete One
// MODULE EXPORTS
module.exports = router;