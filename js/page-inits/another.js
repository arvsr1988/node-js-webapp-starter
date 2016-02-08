var init = function(){
    $(document).ready(function(){
        console.log("from another.js");
    })
};

module.exports = {
    init : init
};