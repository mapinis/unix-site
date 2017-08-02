var hi = function(){
    return "<p><b>Test</b> <i>Test</i></p>";
};

var pathadd = function(args){
    if(args.length < 2){
        return "Error: header accepts one argument";
    } else {
        addToPath(args[1]);
        return "";
    }
}
