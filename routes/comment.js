// SETUP
var User     = require('../models/user/users'),
    express  = require('express'),
    passport = require('passport'),
    Business = require('../models/business/businesses'),
    Comment  = require('../models/comment/comments'),
    middleware = require('../middleware')
    app = express();
var router = express.Router();
// ROUTES
// Comment New
router.get('/new', function(req, res) {
    res.send('Comment Form');
});
// Comment Post
// Comment Get One (Edit Form)
// Comment Put One
// Comment Delete One
// MODULE EXPORTS
module.exports = router;