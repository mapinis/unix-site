var commands = {};

function addCommand(command, func, desc, args = null, flags = null){
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
addCommand("hi", hi, "Simple test command");

var pathadd = function(args){
    if(args.length != 2){
        return "Error: pathadd accepts one argument";
    } else {
        addToPath(args[1]);
        return "";
    }
}
addCommand("pathadd", pathadd, "Adds argument to path", ["Path to be added"]);

var ls = function(args){
    var output = "";
    if(args.length == 1){
        for(var file in files){
            if(files.hasOwnProperty(file)){
                output += "<p>" + file + "</p>";
            }
        }
    } else if(args[1] == "-l"){
        for(var file in files){
            if(files.hasOwnProperty(file)){
                output += "<p>" + files[file].perms + " root root " + file + "</p>";
            }
        }
    } else {
        output = "Incorrect use of ls (check flags)";
    }
    return output;
}
addCommand("ls", ls, "Lists contents of current directory", null, ['l']);

var ping = function(){
    return "<p><a href='http://www.google.com/'>Pong!</a></p>"
}
addCommand("ping", ping, "Test command for links");

var help = function(){
    var output = "<br />";
    for(var command in commands){
        output += "<p><b><u>" + command + "</u></b>:</p>";
        output += "<p> <i>Description:</i> " + commands[command].desc + "</p>";
        if(commands[command].args){
            output += "<p> <i>Arguments:</i> " + commands[command].args + "</p>";
        }
        if(commands[command].flags){
            output += "<p> <i>Flags:</i> " + commands[command].flags + "</p>";
        }
        output += "<br />";
    }

    return output;
}
addCommand("help", help, "Lists commands and their descriptions, arguments, and flags");