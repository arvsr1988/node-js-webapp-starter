var module1 = require('./module1');
var homeTemplate = require('../build/templates/home.js');

$(document).ready(function(){
    module1.init();
    $("#client-side-render").html(homeTemplate({data : "whatever you want!"}));
});