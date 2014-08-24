var homePage = require('./page-inits/home');
var globalInits = require('./page-inits/global');

$(document).ready(function(){
    console.log("main");
    globalInits.init();

    var pageInitHash =
    {
        "home" : {"context" : homePage}
    };

    var pageName = $("#page-name");
    if(!pageName.length) {
        return false;
    }
    var pageContext = pageInitHash[pageName.val()]["context"];
    var init = pageContext.init;
    init.apply(pageContext);
});