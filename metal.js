var Metalsmith = require('metalsmith');
var pug = require('metalsmith-pug');
var layouts = require('metalsmith-layouts');

new Metalsmith(__dirname)
    .metadata({
        title: "mapinis",
        description: "A unix-looking site",
        generator: "Metalsmith",
        url: "mapinis.github.io"
    })
    .source('./src')
    .destination('./build')
    .clean(false)
    .use(pug({
        useMetadata: true,
        pretty: false,
        locals: {
           postname: "N/A" 
        }
    }))
    .use(layouts({
        engine: 'pug',
        directory: './layouts'
    }))
    .build(function(err, files){
        if(err){throw err;}
    });