var homeTemplate = require('../../build/templates/home.js');

module.exports = {
    init : function() {
        console.log("inside index page 1");
        $("#client-side-render").html(homeTemplate({data : "whatever you want!"}));
    }
};