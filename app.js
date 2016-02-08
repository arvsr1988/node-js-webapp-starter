var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var expressHbs = require('express-handlebars');
var path = require('path');
var http = require('http');
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.engine('hbs', expressHbs({extname:'hbs', defaultLayout : 'main.hbs'}));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || '5000');

//TODO : move this to a new file
app.get("/", function(req, res){
    var data = {name : "arvind"};
    res.render('home', data);
});

//using the main layout
app.get("/hello", function(req,res){
    var data = {name : "abc"};
    res.render('hello', data);
});

module.exports = app;
var server = http.createServer(app);
server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});