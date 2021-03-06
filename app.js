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
//todo - the helpers should be in a common place
app.engine('hbs', expressHbs({
    extname:'hbs',
    defaultLayout : 'main.hbs',
    helpers: {
      toJSON : JSON.stringify
    }
  }
));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || '5000');

const todos = [
  {id: 1, done: false, description: 'Buy Groceries'},
  {id: 2, done: true, description: 'Pay Telephone Bill'},
  {id: 3, done: false, description: 'Book movie tickets'},
]

app.get("/", function(req, res){
  res.render('todo_list', {todos});
});

app.get('/todo/add', (req, res) => {
  res.render("add_todo", {todos})
});

app.post('/todo', (req, res) => {
  const newTodo = {id: todos[todos.length -1].id + 1, done: false, description: req.body.description};
  todos.push(newTodo);
  res.json(newTodo);
});

app.put('/todo', (req, res) => {
  const {id, done} = req.body;
  todos.find(todo => todo.id == req.body.id).done = req.body.done;
  res.status(200).send();
})

module.exports = app;
var server = http.createServer(app);
server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});