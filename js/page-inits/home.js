const Handlebars = require("hbsfy/runtime");
Handlebars.registerPartial('partial1', require('../../views/partials/partial1.hbs'));
const homeTemplate = require('../../views/partials/para.hbs');

export function init(){
  console.log("inside index page");
  $("#client-side-render").html(homeTemplate({data : "whatever you want!"}));
}
