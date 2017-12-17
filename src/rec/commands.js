let commands = {};

function addCommand(command, func, desc, args = null, flags = null){
    commands[command] = {
        function: func,
        desc: desc,
        args: args,
        flags: flags
    }
}

// help command. Takes no args, and lists all commands (including itself)
const help = function(){
    let output = "";
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

const basicinfo = function(){
    return "<p>My name is Mark Apinis</p>" +
           "<p>Contact me at <a href='mailto:mapinis2019@gmail.com'>mapinis2019@gmail.com</a></p><br />";
}
addCommand("basicinfo", basicinfo, "Outputs my basic info (name and email)");

const credits = function(){
    return "<p>Thank you GitHub User AVGP for <a href='https://github.com/avgp/terminal.js'>terminal.js</a>, the base framework for all of this</p>" + 
           "<p>Also, thank you to Stack Overflow for always being there for me.</p>" +
           "<p>Oh yea also my parents and computer science teachers, they helped a lot with this and life.</p><br />";
}
addCommand("credits", credits, "Thanks those that made this website happen (other than me, of course)");


// ls command. Takes in the -l flag as a possible arg. Displays contents of current directory
const ls = function(args){
    let output = "";
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
        output = "<p>Error: Incorrect use of ls (check flags)</p><br />";
    }
    return output + "<br />";
}
addCommand("ls", ls, "Lists contents of current directory", null, ['l']);

// cd command. Takes arg of where to cd to. Redirects user to that location
const cd = function(args){
    if(args.length == 1){
        window.location.replace("/");
        return null;

    } else if(args.length != 2){ //Make sure that there is an argument
        return "<p>Error: Command <b>cd</b> accepts one argument (the directory to enter) or no argument</p><br />"
    
    } else {
        if(args[1] == "."){ // Check for cd .
            // Do Nothing
            return "";
        
        } else if(args[1] == ".."){ // Check for cd ..
            // Go back one in the path
            path.pop();
            window.location.replace(path.join("/") === "" ? "/" : path.join("/")); // Go to location less than current
            return null;

        } else if(args[1] == "~"){ // Check for cd ~
            window.location.replace("/"); // Go home
            return null;

        } else if(!(files.hasOwnProperty(args[1]))){ // Check if arg is actually a file
            return "<p>Error: Directory not found</p><br />";
        // If passed, continue to next check
        
        } else if(files[args[1]].type != FILE_CONSTS.DIR){ // Check if arg is a directory
            return "<p>Error: Not a directory</p><br />";
        // If passed, continue to next check
        
        } else if(files[args[1]].perms == PERMS_CONSTS.NONE){ // Check if dir has correct perms
            return "<p>Error: Permission denied</p><br />";
        // If passed, continue to next check
        
        } else if(files.hasOwnProperty(args[1]) // Do a final check of all the above
                    && files[args[1]].type == FILE_CONSTS.DIR
                    && files[args[1]].perms != PERMS_CONSTS.NONE){
            window.location.replace("/" + path.join("/") + "/" + args[1]); // Go to that location
            return null;
            
        } else {
            return "<p>Error: Please check command and try again</p><br />";
        }
    }
}
addCommand("cd", cd, "Changes directory", ['(Optional) The directory that is being switched to']);

// view command, takes on argument: the directory
const view = function(args){
    if(args.length != 2){
        return "<p>Error: Command <b>view</b> requires one argument (the html file to view)</p><br />"
    } else {
        if(!files.hasOwnProperty(args[1])){
            return "<p>Error: File not found</p><br />"

        } else if(files[args[1]].type != FILE_CONSTS.HTML){
            return "<p>Error: Not an html file</p><br />"
        
        } else if(files[args[1].perms == PERMS_CONSTS.NONE]){
            return "<p>Error: Permission denied</p><br />"

        } else if(files.hasOwnProperty(args[1]) // Do a final check of all the above
                    && files[args[1]].type == FILE_CONSTS.HTML
                    && files[args[1]].perms != PERMS_CONSTS.NONE){
            window.location.replace("/" + path.join("/") + "/" + args[1]); // View that file
            return null;

        } else {
            return "<p>Error: Please check command and try again</p><br />";
        }
    }
}
addCommand("view", view, "Views a specified HTML file", ["The html file that you want to view"]);


