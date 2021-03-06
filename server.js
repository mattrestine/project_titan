// REQUIRES
var User           = require('./models/user/users'),
    flash          = require('connect-flash'),
    express        = require('express'),
    mongoose       = require('mongoose'),
    passport       = require('passport'),
    bodyParser     = require('body-parser'),
    localStrategy  = require('passport-local'),
    Comments       = require('./models/comment/comments'),
    Business       = require('./models/business/businesses'),
    methodOverride = require('method-override');
// SETUP
// Mongoose
mongoose.connect('mongodb://localhost/dbc');
mongoose.Promise = global.Promise;
// Variables
var app = express();
var indexRoute = require('./routes/index');
var businessRoute = require('./routes/business');
var commentRoute = require('./routes/comment');
// Set and Use
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());
app.set('view engine', 'ejs');
// Passport Configuration
app.use(require('express-session')({
    secret: 'May The Force Be With You',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});
// ROUTES
// Index Route
app.use('/', indexRoute);
app.use('/business', businessRoute);
app.use('/business/:id/comments', commentRoute);
// LISTEN
app.listen('3000', 'localhost', function() {
    console.log('Server is running...');
});
