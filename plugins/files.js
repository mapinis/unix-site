var fs = require('fs');

// Plugin to get list of all files in a directory and find and give properties

var FILE_CONSTS = {
        DIR: 0,
        HTML: 1,
        OTHER: 2
    },
    PERMS_CONSTS = {
        NONE: "rwx------",
        READ: "rwxr-xr-x",
        WRITE: "rwxrwxrwx"
    };

module.exports = function(){
    return function(sources, metalsmith, done){
        Object.keys(sources).forEach(function(source){
            if(sources[source].key == "__index"){

                // Build a string for the path of the file
                var path = "./src";
                for(var pathPart of sources[source].path){
                    path += "/" + (pathPart == "~" ? "" : pathPart)
                }

                // Instantiante files object
                sources[source].files = {};

                // Read the filesystem
                fs.readdirSync(path).forEach(function(fileName){
                    // Create file object
                    var file = {
                        type: fs.lstatSync(path + "/" + fileName)
                                .isDirectory() ? FILE_CONSTS.DIR : FILE_CONSTS.HTML
                    }

                    // Add permissions info
                    if(fileName == "rec"){
                        file.perms = PERMS_CONSTS.NONE;
                    }
                    else {
                        file.perms = PERMS_CONSTS.READ;
                    }

                    // Switch fileName to how it would look in the final build
                    if(fileName.includes('.pug')){
                        fileName = fileName.replace('.pug', '.html');
                    }

                    // Push to files object
                    sources[source].files[fileName] = file;
                });
            }
        });
        done();
    };
}