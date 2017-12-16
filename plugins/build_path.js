// Plugin that will be run on all files to build their path without me doing any work
//      Nothing like spending time to spend less time in the future.

module.exports = function() {
  return function(sources, metalsmith, done) {
    Object.keys(sources).forEach(function(source) {
      // Init new path string
      var path = [""];

      // Loop over split source, add it to path
      for (var pathPart of source.split("/")) {
        path.push(pathPart);
      }

      // Get rid of trailing index.pug. I am writing it in a way that users should go
      // directly to the directory, not directory/index.html. Sure, users <i>can</i>
      // do that, but my code is not gonna reflect that.
      if (path[path.length - 1] == "index.pug") {
        path.pop();
      }

      // Convert all .pugs to .html
      if (path[path.length - 1].includes(".pug")) {
        path[path.length - 1] = path[path.length - 1].replace(".pug", ".html");
      }

      // Push to .path
      sources[source].path = path;
    });
    done();
  };
};
