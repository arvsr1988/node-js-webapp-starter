const Handlebars = require("hbsfy/runtime");
Handlebars.registerHelper('toJSON', JSON.stringify);
require('es6-promise').polyfill();
require('isomorphic-fetch');

const addTodoTemplate = require('../views/add_todo.hbs');
const todoListTemplate = require('../views/todo_list.hbs');

const updateView = function(html){
  $("#container").html(html);
}

window.onpopstate = function(event) {
  onRouteChanged(event);
};

const changeRoute = function(event, path){
  onRouteChanged({}, path);
  window.history.pushState(window.todos, document.title, path);
}

const routeHandler = {
  '/' : () => {
    updateView(todoListTemplate({todos: window.todos}));
    $("input[name='id']").change((ev) => {
      const {value, checked } = ev.target;
      fetch('/todo', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body : JSON.stringify({id: value, done: checked})
      }).then(resp => {
        window.todos.find(todo => todo.id == value).done = checked;
        changeRoute({}, '/');
      });
    })
  },
  '/todo/add': () => {
    updateView(addTodoTemplate());
    const addTodoForm = document.querySelector("#add-todo-form");
    var formData = new FormData();
    addTodoForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(addTodoForm);
      const body = Array.from(formData.entries()).reduce((values, pair) => {values[pair[0]] = pair[1]; return values;}, {})
      fetch('/todo', {
        method: 'POST',
         headers: {
           'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then(response => {
        return response.json();
      }).then((json) =>{
        window.todos.push(json);
        changeRoute({}, '/');
      })
    })
  }
};

const onRouteChanged = function(event, path) {
  const location =  path || document.location.pathname;
  console.log(" location ", location, " event ", event);
  const locationHandler = routeHandler[location];
  if(locationHandler) {
    locationHandler();
  }
  $("a[data-internal='true']").click(function(ev){
    ev.preventDefault();
    const self = this;
    const href= $(self).prop('href').replace(window.location.origin, '');
    changeRoute({}, href);
  });
};

$(document).ready(function(){
  onRouteChanged({});
});