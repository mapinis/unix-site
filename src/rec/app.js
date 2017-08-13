var terminal;

var URL = "URL",
    USER = "user",
    FILE_CONSTS = {
        DIR: 0,
        HTML: 1,
        OTHER: 2
    },
    PERMS_CONSTS = {
        NONE: "rwx------",
        READ: "rwxr-xr-x",
        WRITE: "rwxrwxrwx"
    }

function makePathString(){
    var out = "";
    for(var pathPart of path){
        out += "/" + (pathPart == "/" ? "" : pathPart)
    }
    return out;
}