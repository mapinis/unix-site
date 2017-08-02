var terminal;

var URL = "URL",
    USER = "user";

var headerPath = "~",
    path = "/"

function makeHeader(){
   return URL + ":" + headerPath + " " + USER + "$";
}

var header = makeHeader();

function addToPath(newPath){
    path += "/" + newPath;
    headerPath = newPath;
    header = makeHeader();
}

var files = [
    "aboutme.txt",
    "programming.txt",
    "photography.txt"
]