var commands = {};

function addCommand(command, func, desc, args, flags){
    commands[command] = {
        function: func,
        desc: desc,
        args: args,
        flags: flags
    }
}

var hi = function(){
    return "<p><b>Test</b> <i>Test</i></p>";
};
addCommand("hi", hi, "Simple Test Command", null, null);

var pathadd = function(args){
    if(args.length != 2){
        return "Error: pathadd accepts one argument";
    } else {
        addToPath(args[1]);
        return "";
    }
}
addCommand("pathadd", pathadd, "Adds argument to path", ["Path to be added"], null);

var ls = function(args){
    var output = "";
    for(var file in files){
        if(files.hasOwnProperty(file)){
            output += "<p>" + file + "</p>";
        }
    }
    return output;
}
addCommand("ls", ls, "Lists contents of current directory", null, ['l']);

var ping = function(){
    return "<p><a href='http://www.google.com/'>Pong!</a></p>"
}
addCommand("ping", ping, "Test command for links", null, null);