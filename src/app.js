var terminal;

var URL = "URL",
    USER = "user";

function makeHeader(){
   return URL + ":" + headerPath + " " + USER + "$ ";
}

function addToPath(newPath){
    path.push(newPath);
    headerPath = newPath;
    header = makeHeader();
}

function makePathString(){
    var out = "";
    for(var pathPart of path){
        out += "/" + (pathPart == "/" ? "" : pathPart)
    }
    return out;
}