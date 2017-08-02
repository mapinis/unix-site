var terminal;

var URL = "URL",
    USER = "user";

var path = "~";

function makeHeader(){
   return URL + ":" + path + " " + USER + "$";
}

var header = makeHeader();

function addToPath(newPart){
    path += "/" + newPart;
    header = makeHeader();
}