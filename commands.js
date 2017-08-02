var hi = function(){
    return "<p><b>Test</b> <i>Test</i></p>";
};

var pathadd = function(args){
    if(args.length != 2){
        return "Error: pathadd accepts one argument";
    } else {
        addToPath(args[1]);
        return "";
    }
}

var ls = function(args){
    var output = "";
    for(var file of files){
        output += "<p>" + file + "</p>";
    }
    return output;
}

var ping = function(){
    return "<p><a href='http://www.google.com/'>Pong!</a></p>"
}