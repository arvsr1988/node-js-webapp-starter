const Handlebars = require("hbsfy/runtime");
Handlebars.registerHelper('toJSON', JSON.stringify);

const router = function(event) {
  debugger;
  console.log(" location ", document.location, " event ", event);
}
window.onpopstate = function(event) {
  router(event);
  // alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
};

$(document).ready(function(){
  router({});
  $("a[data-internal='true']").click(function(){
    event.preventDefault();
    const self = this;
    const href= $(self).prop('href').replace(window.location.origin, '');
    router();
    window.history.pushState({ 'some' : 'state' }, document.title, href);
  });
});