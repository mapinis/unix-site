var hi = function(){
    return "<p><b>Test</b> <i>Test</i></p>"
};

var header = function(args){
    console.log(args);
    if(args.length < 2){
        return "Error: header accepts one argument"
    } else {
        document.getElementById('header').innerHTML = args[1] + "$";
        return ""
    }
}

var commands = {
    hi: hi,
    header: header
};

Terminal.init(document.getElementById("terminal"), commands);
