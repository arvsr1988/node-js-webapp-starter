import {init} from './page-inits/home'

const homePage = require('./page-inits/home');

$(document).ready(function(){
  console.log("from main.js");
  init();
});
