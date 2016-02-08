var homePage = require('./page-inits/home');

$(document).ready(function(){
    console.log("from main.js");
    homePage.init();
});