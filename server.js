var http = require('http');
var express = require('express');
var cookieParser = require('cookie-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb');


var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var sessionStore = new MongoStore({ mongooseConnection: mongoose.connection });

// app setup
var app = express();
var server = http.createServer(app);

var key = 'mykey', 
    secret = 'fakeSecret',
    GOOGLE_CLIENT_ID = '33815653519-jh94hqfkkumbgdsrb05ck1eoiea7kf8u.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET = '2DtFN21fZsU4ph4rBTvvzxAU';

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: 'https://mymean-nixondanielj.c9.io/auth/google'
    },
    function(accessToken, refreshToken, profile, done){
        // find user here
        done(null, profile);
    })
);

passport.serializeUser(function(user, callback){
        console.log('serializing user.');
        callback(null, user);
    });

passport.deserializeUser(function(user, callback){
       console.log('deserialize user.');
       callback(null, user);
    });

app.use(session({
    key: key,
    secret: secret,
    store: sessionStore
}));
app.use(express.static(__dirname + '/client'));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google/init', passport.authenticate('google', { scope: 'email' }));

app.get('/auth/google', 
    passport.authenticate('google', {failureRedirect: '/#/authFail'}),
    function(req, res) {
        console.log('successful login');
        res.redirect('/');
    });
app.get('/status', function(req, res){
    if(req.isAuthenticated()){
        res.send('thanks bro');
    } else {
        res.sendStatus(401);
    }
});
// socket io setup
var io = require('socket.io')(server);
var sockets = [];
var socketPassport = require('passport.socketio');
io.set('authorization', socketPassport.authorize({
    cookieParser: cookieParser,
    key: key,
    secret: secret,
    store: sessionStore,
    success: function(data, accept){
        console.log('Socket connection authenticated');
        accept(null, true);
    },
    error: function(data, message, error, accept){
        console.log('Socket connection authentication failed');
        console.log(message);
        
        // if there was a real error
        if(error) {
            accept(new Error(message));
        }
        
        // if user was unauthorized
        accept(null, false);
    }
}));

io.on('connection', function(socket){
    console.log('Added a new socket');
    sockets.push(socket);
    socket.on('test', function(){
        if(socket.request.user && socket.request.user.logged_in){
            socket.emit('authed');
        }
    });
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});