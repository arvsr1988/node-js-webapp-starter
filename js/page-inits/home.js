var Handlebars = require("hbsfy/runtime");
var homeTemplate = require('../../views/partials/para.hbs');

module.exports = {
    init : function() {
        console.log("inside index page 1");
        $("#client-side-render").html(homeTemplate({data : "whatever you want!"}));
    }
};
