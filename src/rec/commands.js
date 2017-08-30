var commands = {};

function addCommand(command, func, desc, args = null, flags = null){
    commands[command] = {
        function: func,
        desc: desc,
        args: args,
        flags: flags
    }
}

// ls command. Takes in the -l flag as a possible arg. Displays contents of current directory
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
                output += "<p>" + (files[file].type == FILE_CONSTS.DIR ? 'd': '-') + files[file].perms + " root root " + file + "</p>";
            }
        }
    } else {
        output = "<p>Error: Incorrect use of ls (check flags)</p>";
    }
    return output;
}
addCommand("ls", ls, "Lists contents of current directory", null, ['l']);

// cd command. Takes arg of where to cd to. Redirects user to that location
var cd = function(args){
    if(args.length != 2){ //Make sure that there is an argument
        return "<p>Error: Command <b>cd</b> accepts one argument: the directory to enter</p>";
    
    } else {
        if(args[1] == "."){ // Check for cd .
            // Do Nothing
            return ""
        
        } else if(args[1] == ".."){ // Check for cd ..
            // Go back one in the path
            path.pop();
            window.location.replace(path.join("")); // Go to location less than current
            return ""

        } else if(args[1] == "~"){ // Check for cd ~
            window.location.replace("/"); // Go home
            return ""

        } else if(!(files.hasOwnProperty(args[1]))){ // Check if arg is actually a file
            return "<p>Error: Directory not found</p>";
        // If passed, continue to next check
        
        } else if(files[args[1]].type != FILE_CONSTS.DIR){ // Check if arg is a directory
            return "<p>Error: Not a directory</p>";
        // If passed, continue to next check
        
        } else if(files[args[1]].perms == PERMS_CONSTS.NONE){ // Check if dir has correct perms
            return "<p>Error: Permission denied</p>";
        // If passed, continue to next check
        
        } else if(files.hasOwnProperty(args[1]) // Do a final check of all the above
                    && files[args[1]].type == FILE_CONSTS.DIR
                    && files[args[1]].perms != PERMS_CONSTS.NONE){
            window.location.replace(path.join("") + args[1]); // Go to that location
            return ""
            
        } else {
            return "<p>Error: Please check command and try again</p>";
        }
    }
}
addCommand("cd", cd, "Changes directory", ['The directory that is being switched to']);

// help command. Takes no args, and lists all commands (including itself)
var help = function(){
    var output = "<br />";
    for(var command in commands){
        output += "<p><b><u>" + command + "</u></b>:</p>";
        output += "<p>&nbsp;<i>Description:</i> " + commands[command].desc + "</p>";
        if(commands[command].args){
            output += "<p>&nbsp;<i>Arguments:</i> " + commands[command].args + "</p>";
        }
        if(commands[command].flags){
            output += "<p>&nbsp;<i>Flags:</i> " + commands[command].flags + "</p>";
        }
        output += "<br />";
    }

    return output;
}
addCommand("help", help, "Lists commands and their descriptions, arguments, and flags");