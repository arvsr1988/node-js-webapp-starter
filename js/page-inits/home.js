var Handlebars = require("hbsfy/runtime");
Handlebars.registerPartial('partial1', require('../../views/partials/partial1.hbs'));
var homeTemplate = require('../../views/partials/para.hbs');

module.exports = {
    init : function() {
        console.log("inside index page 1");
        $("#client-side-render").html(homeTemplate({data : "whatever you want!"}));
    }
};
