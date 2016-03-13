var request = require('request');
var chalk = require('chalk');
var fs = require('fs');

var utils = require('./utils.js');
var paths = require('./config.js').paths;


var contentful = {
  access_token : "c685bb6a2978131d6e287e6e1a6c1b1b71ce6cf3c7a3be2caa43cc6b4ec580eb",
  space_id : "ot0mnooc6nee",
  root : "https://cdn.contentful.com/spaces/"
};

var content_url = contentful.root +
    contentful.space_id +
    "/entries/?access_token=" +
    contentful.access_token;


function getPagesData(){

  //set the search attribites on the content url
  var url = content_url + "&content_type=page";
  console.log(chalk.grey("  getting pages data:"), url, "\n");

  request(url, function (error, response, body) {

    var content = JSON.parse(body);
    var sitemap = {};

    for (var i = 0; i < content.items.length; i++) {

      var thisItem = content.items[i];
      var apiData = JSON.stringify(thisItem.fields);
      var path = thisItem.fields.slug
      var levels = path.split("/");

      // if the slug is not root, make sure subdirectories exist
      if(levels.length > 1 ) {
        var last = path.lastIndexOf('/');
        var folder =  path.substr(0, last)
        utils.ensureFolder(paths.api + folder);
      }

      // output the result to file
      var outputDest = paths.api + path + ".json";
      var writeStream = fs.createWriteStream(outputDest);
      writeStream.write(apiData);
      writeStream.end();

      console.log(
        chalk.grey("  data endpoint created:"),
        outputDest
      );

      //add to the sitemap object
      sitemap[thisItem.fields.slug] = thisItem.fields;
      sitemap[thisItem.fields.slug].id = thisItem.sys.id;

    }



    // output a sitemap file
    outputDest = paths.api + "_sitemap.js";
    writeStream = fs.createWriteStream(outputDest);
    writeStream.write("module.exports = " + JSON.stringify(sitemap));
    writeStream.end();

    console.log(
      chalk.grey("\n  sitemap created:"),
      outputDest
    );


  });

}

getPagesData();



